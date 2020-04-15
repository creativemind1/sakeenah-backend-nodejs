let PaymentOrder = require('../../model/PaymentOrder'),
    UserProfile = require('../../model/UserProfileModel'),
    ApplePayReceipts = require('../../model/ApplePayReceipts'),
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
        let responseObj = { status: 'FAILED', data: null };
        //  let filter = { userId: req.body.userId };
        /* let paymentOrder = n => {
             PaymentOrder.findOne(filter, (err, doc) => {
                 if (!err && doc) {
                     doc.paymentInfo.push(req.body.transaction)
                     doc.save((e, s) => {
                         console.log(e, s)
                         return n();
                     })
 
                 }
             });
         };*/
        let verifyTransaction = n => {
            var doc = {
                userId: req.body.userId,
                transaction_id: req.body.transactionId,
                original_transaction_id: req.body.transactionId,
                purchase_date_ms: req.body.transactionDate,
                original_purchase_date_ms: req.body.transactionDate,
                expires_date_ms: moment().add(7, 'days').format('x'),
                web_order_line_item_id: null,
                receipt_key: req.body.transactionReceipt,
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
        };

        let premiumStatus = n => {
            /*UserProfile.findOne({ userId: req.body.userId }, (err, doc) => {
                if (doc) {
                    doc.premiumUser = true;
                    doc.save((e, s) => {
                        console.log(e, s);
                    });
                }
                return n();
            });*/
            UserProfile.updateOne(
                { userId: req.body.userId },
                { $set: { premiumUser: true } },
                () => {
                    return n();
                }
            );
        };

        async.series([verifyTransaction.bind(), premiumStatus.bind()], () => {
            responseObj.status = 'SUCCESS';
            responseObj.data = null;
            callback(responseObj);
        });
    },
};
