'use strict';
/**
 * @description This Model is used for Categories like sleep and Mediate
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    active: { type: Boolean, default: true },
    categoryId: {
        type: String,
        required: true,
    },
    categoryName: String,
    description: String,
    create_date: {
        type: Date,
    },
    modify_date: {
        type: Date,
    },
    createdBy: String, // User Id of Agent who saves the record
    modifiedBy: String, //user Id of Agent who modifies the record
});
// Export Contact model
var Category = (module.exports = mongoose.model('category', categorySchema));
module.exports.get = function(callback, limit) {
    Category.find(callback).limit(limit);
};
