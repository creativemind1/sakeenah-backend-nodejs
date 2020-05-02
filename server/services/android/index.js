'use strict';
/**
 * @description apple services
 */
let UserProfile = require('../../model/UserProfileModel'),
    AndroidPayReceipts = require('../../model/AndroidPayReceipts'),
    async = require('async'),
    moment = require('moment'),
    axios = require('axios'),
    config = require('../../config/config-' + process.env.NODE_ENV + '.js');

module.exports = {
    verifyReceipt: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        let today = Number(moment().format('x'));
        var activeReceipt = null;
        let receiptStatus = false;
        let newReceipt = false;
        let unknownReceipt = false;
        var transaction_receipt = null;
        let access_token = '';

        /** get the active receipts which expires today */
        let getActiveReceipt = n => {
            AndroidPayReceipts.findOne(
                {
                    userId: req.body.userId,
                    active: true,
                },
                (e, receipt) => {
                    if (receipt) {
                        activeReceipt = receipt;
                    }
                    return n();
                }
            );
        };

        /** Generating access token from refresh_token */
        let activateToken = n => {
            axios({
                method: 'post',
                url: config.webUrl().googleAPI.token_url,
                data: {
                    grant_type: 'refresh_token',
                    refresh_token: config.webUrl().googleAPI.refresh_token,
                    client_id: config.webUrl().googleAPI.client_id,
                    client_secret: config.webUrl().googleAPI.client_secret,
                },
            })
                .then(function (response) {
                    if (response && response.access_token) {
                        access_token = response.access_token;
                        return n();
                    } else {
                        responseObj.status = 'FAILED';
                        responseObj.message = 'token not generated properly';
                        callback(responseObj);
                    }
                })
                .catch(function (err) {
                    if (err) {
                        console.log('catch error', err);
                    }
                    return n();
                });
            return n();
        };

        // Verifying the active receipt by sending access_token
        let veriyReceipts = n => {
            if (activeReceipt && access_token) {
                // JSON.parse(receipt.receiptLog)
                transaction_receipt = JSON.parse(activeReceipt.receiptLog);
                let args = {
                    receipt_key:
                        transaction_receipt.transactionReceipt || activeReceipt.receipt_key,
                    userId: req.body.userId,
                };
                axios({
                    method: 'post',
                    url: config.webUrl().appleURL,
                    data: {
                        'receipt-data': args.receipt_key,
                        password: config.webUrl().applePassword,
                        'exclude-old-transactions': true,
                    },
                })
                    .then(function (response) {
                        if (
                            response.data &&
                            response.data.latest_receipt_info &&
                            response.data.latest_receipt_info.length
                        ) {
                            let latestReciptInfo = response.data.latest_receipt_info[0];
                            if (
                                latestReciptInfo.transaction_id ==
                                (transaction_receipt.transactionId || activeReceipt.transaction_id)
                            ) {
                                // If Same receipt
                                if (Number(latestReciptInfo.expires_date_ms) > today) {
                                    // If Receipt is still valid
                                    receiptStatus = true;
                                    return n();
                                } else {
                                    // If Receipt got expired or cancelled or not renewed;
                                    unknownReceipt = true;
                                    let filter = { userId: req.body.userId };
                                    UserProfile.updateOne(
                                        filter,
                                        { $set: { premiumUser: false } },
                                        () => {
                                            return n();
                                        }
                                    );
                                }
                            } else {
                                if (Number(latestReciptInfo.expires_date_ms) > today) {
                                    // New Receipt generated
                                    receiptStatus = true;
                                    let doc = {
                                        userId: args.userId,
                                        transaction_id: latestReciptInfo.transaction_id,
                                        original_transaction_id:
                                            latestReciptInfo.original_transaction_id,
                                        purchase_date_ms: latestReciptInfo.purchase_date_ms,
                                        original_purchase_date_ms:
                                            latestReciptInfo.original_purchase_date_ms,
                                        expires_date_ms: latestReciptInfo.expires_date_ms,
                                        web_order_line_item_id:
                                            latestReciptInfo.web_order_line_item_id,
                                        receipt_key: response.data.latest_receipt,
                                        active: true,
                                        receiptLog: JSON.stringify(latestReciptInfo),
                                    };
                                    AndroidPayReceipts(doc).save(() => {
                                        responseObj.status = 'SUCCESS';
                                        newReceipt = true;
                                        return n();
                                    });
                                } else {
                                    // Last checked receipt is expired and the user has not renewed
                                    unknownReceipt = true;
                                    let filter = { userId: req.body.userId };
                                    UserProfile.updateOne(
                                        filter,
                                        { $set: { premiumUser: false } },
                                        () => {
                                            return n();
                                        }
                                    );
                                }
                            }
                            //todo
                            //cancellation check
                        } else {
                            return n();
                        }
                    })
                    .catch(function (err) {
                        if (err) {
                            console.log('catch error', err);
                        }
                        return n();
                    });
            } else {
                callback(responseObj);
            }
        };

        let updateReceipts = n => {
            if (newReceipt || unknownReceipt) {
                AndroidPayReceipts.updateOne(
                    {
                        transaction_id:
                            transaction_receipt.transactionId || activeReceipt.transaction_id,
                    },
                    { $set: { active: false } },
                    () => {
                        return n();
                    }
                );
            } else {
                return n();
            }
        };

        async.series(
            [
                getActiveReceipt.bind(),
                activateToken.bind(),
                veriyReceipts.bind(),
                updateReceipts.bind(),
            ],
            err => {
                console.log(err);
                if (receiptStatus) {
                    responseObj.status = 'SUCCESS';
                }
                callback(responseObj);
            }
        );
    },
};
