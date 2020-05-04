let PaymentOrder = require('../../model/PaymentOrder'),
    UserProfile = require('../../model/UserProfileModel'),
    ApplePayReceipts = require('../../model/ApplePayReceipts'),
    AndroidPayReceipts = require('../../model/AndroidPayReceipts'),
    moment = require('moment'),
    async = require('async');

module.exports = {
    orders: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        let filter = { userId: 'abc123' };
        PaymentOrder.find(filter, {}, (err, docs) => {
            if (docs && docs.length) {
                responseObj.status = 'SUCCESS';
                responseObj.message = docs;
            }
            callback(responseObj);
        });
    },

    capture: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null },
            subscription = false;

        let getSubscription = n => {
            let { transactionId } = req.body.transaction;

            ApplePayReceipts.findOne(
                {
                    transactionId,
                },
                (e, receipt) => {
                    if (!receipt) {
                        subscription = true;
                    }
                    return n();
                }
            );
        };
        let verifyTransaction = n => {
            if (subscription) {
                var doc = {
                    userId: req.body.userId,
                    transaction_id: req.body.transaction.transactionId,
                    original_transaction_id: req.body.transaction.transactionId,
                    purchase_date_ms: req.body.transaction.transactionDate,
                    original_purchase_date_ms: req.body.transaction.transactionDate,
                    expires_date_ms: moment().add(7, 'days').format('x'),
                    web_order_line_item_id: null,
                    receipt_key: req.body.transaction.transactionReceipt,
                    // subscription_expiry: Number(
                    //     moment().add(30, 'days').format('YYYYMMDD')
                    // ),
                    active: true,
                    trial_period: null,
                    intro_offer_period: null,
                    receiptLog: JSON.stringify(req.body.transaction),
                };
                ApplePayReceipts(doc).save(() => {
                    return n();
                });
            } else {
                return n();
            }
        };

        let premiumStatus = n => {
            if (subscription) {
                UserProfile.updateOne(
                    { userId: req.body.userId },
                    { $set: { premiumUser: true } },
                    () => {
                        return n();
                    }
                );
            } else {
                return n();
            }
        };

        async.series(
            [getSubscription.bind(), verifyTransaction.bind(), premiumStatus.bind()],
            () => {
                responseObj.status = 'SUCCESS';
                responseObj.data = null;
                callback(responseObj);
            }
        );
    },

    android_capture: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null },
            subscription = false;

        let getSubscription = n => {
            const { transactionId } = req.body.transaction;

            AndroidPayReceipts.findOne(
                {
                    transaction_id: transactionId,
                },
                (e, receipt) => {
                    if (!receipt) {
                        subscription = true;
                    }
                    return n();
                }
            );
        };
        let verifyTransaction = n => {
            if (subscription) {
                var doc = {
                    userId: req.body.userId,
                    transaction_id: req.body.transaction.transactionId,
                    purchase_date_ms: req.body.transaction.transactionDate,
                    expires_date_ms: moment().add(7, 'days').format('x'),
                    receipt_key: req.body.transaction.purchaseToken,
                    active: true,
                    receiptLog: JSON.stringify(req.body.transaction),
                };
                AndroidPayReceipts(doc).save(() => {
                    return n();
                });
            } else {
                return n();
            }
        };

        let premiumStatus = n => {
            if (subscription) {
                UserProfile.updateOne(
                    { userId: req.body.userId },
                    { $set: { premiumUser: true } },
                    () => {
                        return n();
                    }
                );
            } else {
                return n();
            }
        };

        async.series(
            [getSubscription.bind(), verifyTransaction.bind(), premiumStatus.bind()],
            () => {
                responseObj.status = 'SUCCESS';
                responseObj.data = null;
                callback(responseObj);
            }
        );
    },

    recentPurchase: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null };
        let filter = { userId: req.body.userId };
        ApplePayReceipts.findOne(filter, {}, (err, docs) => {
            if (docs) {
                responseObj.status = 'SUCCESS';
            }
            callback(responseObj);
        });
    },
};
