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
                                'exclude-old-transactions': false,
                            },
                        })
                            .then(function (response) {
                                if (
                                    response.data &&
                                    response.data.latest_receipt_info &&
                                    response.data.latest_receipt_info.length
                                ) {
                                    let latestReciptInfo =
                                        response.data.latest_receipt_info[
                                            response.data.latest_receipt_info.length - 1
                                        ];
                                        
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
                                        UserProfile.updateOne(
                                            { userId: receipt.userId },
                                            { $set: { premiumUser: false } },
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
