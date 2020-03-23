'use strict';
/**
 * @description Payment Order Model
 *
 *
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    // orderId: {
    //     type: String,
    //     required: true,
    // },
    paymentInfo: {
        type: Array,
        required: true
    }
});
// Export Contact model
module.exports = mongoose.model('PaymentOrder', schema, 'PaymentOrder');
