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
    original_transaction_id: { type: String },
    purchase_date_ms: { type: String },
    original_purchase_date_ms: { type: String },
    expires_date_ms: { type: String },
    web_order_line_item_id: { type: String },
    receipt_key: { type: String },
    subscription_expiry: { type: Number },
    active: { type: Boolean },
    trial_period: { type: String },
    intro_offer_period: { type: String },
    receiptLog: { type: String },
});
// Export Contact model
module.exports = mongoose.model('ApplePayReceipts', schema, 'ApplePayReceipts');
