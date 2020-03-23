let PaymentOrder = require('../../model/PaymentOrder');
module.exports = {
    orders: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        let filter={userId:'abc123'}
        PaymentOrder.find(filter, {}, (err, docs) => {
            if (docs && docs.length) {
                responseObj.status = 'SUCCESS';
                responseObj.message = docs;
            }
            callback(responseObj);
        });
    },
    capture: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };
        PaymentOrder({ userId: 'abc123', orderId: '4444' }).save((e, s) => {
            if (!e && s) {
                responseObj.status = 'SUCCESS';
                responseObj.message = s;
            }
            callback(responseObj);
        })
    }
};
