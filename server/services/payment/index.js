let PaymentOrder = require('../../model/PaymentOrder');
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
        let filter = { userId: req.body.userId };
        PaymentOrder.findOne(filter, (err, docs) => {
            if (docs && docs.length) {
                if (req.body.transaction) {
                    docs.paymentInfo.push(req.body.transaction);
                }
                docs.save((e, s) => {
                    console.log('EEE', e);
                    console.log('SSS', s);
                });
            } else {
                var payment = new PaymentOrder();
                payment.userId = req.body.userId;
                payment.paymentInfo = [];
                payment.paymentInfo.push(req.body.transaction);
                payment.save(err, data => {
                    console.log(data, '==data==.....');
                    responseObj.status = 'SUCCESS';
                    responseObj.data = null;
                });
            }
            callback(responseObj);
        });
        // PaymentOrder({ userId: req.body.userId, paymentInfo }).save((e, s) => {
        //     if (!e && s) {
        //         responseObj.status = 'SUCCESS';
        //         responseObj.data = s;
        //     }
        //     callback(responseObj);
        // });
    },
    monitor: () => {
        console.log('monitor payments');
        //todo
    },
};
