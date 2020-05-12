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
    transaction_id: { type: String },
    purchase_date_ms: { type: String },
    expires_date_ms: { type: String },
    receipt_key: { type: String },
    subscription_expiry: { type: Number },
    active: { type: Boolean },
    receiptLog: { type: String },
});
// Export Contact model
module.exports = mongoose.model('AndroidPayReceipts', schema, 'AndroidPayReceipts');
