'use strict';
/**
 * @description Category model 
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    categoryName: String,
    thumbImageUrl: { key: String, value: String },
    description: String,
    seq: Number,
    active: { type: Boolean, default: true }
},
    { createdAt: 'created_at', updatedAt: 'updated_at' }
);
module.exports = mongoose.model('Category', schema, 'Category');
