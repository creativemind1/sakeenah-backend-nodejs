'use strict';
/**
 * @description apple services
 */
let UserProfile = require('../../model/UserProfileModel'),
    ApplePayReceipts = require('../../model/ApplePayReceipts'),
    async = require('async'),
    moment = require('moment'),
    axios = require('axios'),
    config = require('../../config/config-' + process.env.NODE_ENV + '.js');

module.exports = {
    monitor: () => {
        console.log(config.webUrl().appleURL, '===config.webUrl().appleURL====');
        let today = Number(moment().format('x'));
        let activeReceipts = null;
        /** get the active receipts which expires today */
        let getActiveReceipts = n => {
            ApplePayReceipts.find(
                {
                    active: true,
                },
                (e, receipts) => {
                    activeReceipts = receipts;
                    return n();
                }
            );
        };
        /*** inactivate the receipts */
        let inActivateReceipts = n => {
            ApplePayReceipts.updateMany(
                { expires_date_ms: { $lte: today } },
                { $set: { active: false } },
                () => {
                    return n();
                }
            );
        };
        /** verify the renewals */
        let verifyReceipts = n => {
            if (activeReceipts && activeReceipts.length) {
                async.eachSeries(
                    activeReceipts,
                    (receipt, next) => {
                        axios({
                            method: 'post',
                            url: config.webUrl().appleURL,
                            data: {
                                'receipt-data': receipt.receipt_key,
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

                                    // let purchaseNumber = Number(moment(latestReciptInfo.purchase_date_ms, 'x').format('YYYYMMDD'))
                                    // let oldReceiptPurchaseNumber = Number(moment(receipt.purchase_date_ms, 'x').format('YYYYMMDD'))
                                    let purchaseNumber = Number(latestReciptInfo.purchase_date_ms);
                                    let oldReceiptPurchaseNumber = Number(receipt.purchase_date_ms);
                                    if (purchaseNumber > oldReceiptPurchaseNumber) {
                                        //todo
                                        //cancellation check
                                        UserProfile.updateOne(
                                            { userId: receipt.userId },
                                            { $set: { premiumUser: true } }
                                        );
                                        let doc = {
                                            userId: receipt.userId,
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
                                            // subscription_expiry: Number(
                                            //     moment().add(30, 'days').format('YYYYMMDD')
                                            // ),
                                            active: true,
                                            trial_period:
                                                response.data.latest_receipt.is_trial_period,
                                            intro_offer_period:
                                                response.data.latest_receipt
                                                    .is_in_intro_offer_period,
                                            receiptLog: JSON.stringify(latestReciptInfo),
                                        };
                                        ApplePayReceipts(doc).save(() => {
                                            console.log(doc, '===saving doc===');
                                            next();
                                        });
                                    } else {
                                        let updateUser = n => {
                                            UserProfile.updateOne(
                                                { userId: receipt.userId },
                                                { $set: { premiumUser: false } },
                                                () => {
                                                    return n();
                                                }
                                            );
                                        };
                                        let updateReceipt = n => {
                                            ApplePayReceipts.updateOne(
                                                { transaction_id: receipt.transaction_id },
                                                { $set: { active: false } },
                                                () => {
                                                    return n();
                                                }
                                            );
                                        };
                                        async.parallel(
                                            [updateUser.bind(), updateReceipt.bind()],
                                            () => {
                                                next();
                                            }
                                        );
                                    }
                                }
                            })
                            .catch(function (err) {
                                if (err) {
                                    console.log('catch error', err);
                                }
                            });
                    },
                    e => {
                        console.log(e, '====e=====');
                        return n();
                    }
                );
            } else {
                console.log(today);
                return n();
            }
        };
        async.series(
            [getActiveReceipts.bind(), inActivateReceipts.bind(), verifyReceipts.bind()],
            err => {
                if (err) {
                    console.log(' ERROR --- applay pay receipts verified at: ', err);
                }
                console.log('applay pay receipts verified at: ', Date.now());
            }
        );
    },

    verifyUser: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        let today = Number(moment().format('x'));
        var activeReceipt = null;
        /** get the active receipts which expires today */
        let getActiveReceipts = n => {
            ApplePayReceipts.findOne(
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
        let receiptStatus = false;
        let newReceipt = false;
        let unknownReceipt = false;
        var transaction_receipt = null;
        let veriyReceipts = n => {
            if (activeReceipt) {
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
                                    ApplePayReceipts(doc).save(() => {
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
                ApplePayReceipts.updateOne(
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
            [getActiveReceipts.bind(), veriyReceipts.bind(), updateReceipts.bind()],
            err => {
                console.log(err);
                if (receiptStatus) {
                    responseObj.status = 'SUCCESS';
                }
                callback(responseObj);
            }
        );
    },

    verify: (args, callback) => {
        let responseObj = { status: 'FAILED', message: null };
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
                console.log(response, '===response===Verify==');
                if (
                    response.data &&
                    response.data.latest_receipt_info &&
                    response.data.latest_receipt_info.length
                ) {
                    let latestReciptInfo = response.data.latest_receipt_info[0];
                    //todo
                    //cancellation check

                    let doc = {
                        userId: args.userId,
                        transaction_id: latestReciptInfo.transaction_id,
                        original_transaction_id: latestReciptInfo.original_transaction_id,
                        purchase_date_ms: latestReciptInfo.purchase_date_ms,
                        original_purchase_date_ms: latestReciptInfo.original_purchase_date_ms,
                        expires_date_ms: latestReciptInfo.expires_date_ms,
                        web_order_line_item_id: latestReciptInfo.web_order_line_item_id,
                        receipt_key: response.data.latest_receipt,
                        // subscription_expiry: Number(moment().add(30, 'days').format('YYYYMMDD')),
                        active: true,
                        receiptLog: JSON.stringify(latestReciptInfo),
                    };
                    ApplePayReceipts(doc).save(() => {
                        responseObj.status = 'SUCCESS';
                        callback(responseObj);
                    });
                } else {
                    callback(responseObj);
                }
            })
            .catch(function (err) {
                if (err) {
                    console.log('catch error', err);
                }
                callback(responseObj);
            });
    },
};
