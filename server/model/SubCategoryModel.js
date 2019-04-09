"use strict";
/**
 * @description This Model is used for Sub Categories like kids & fictions
 * @author Ahmed
 * @since MAR-28-2019
 *
 */
var mongoose = require("mongoose");
var subCategorySchema = mongoose.Schema({
  categoryId: [{ type: String }],
  active: { type: Boolean, default: true },
  subCategoryId: {
    type: String,
    required: true
  },
  companyId: String,
  subCategoryName: String,
  createdBy: String,
  modifiedBy: String,
  create_date: {
    type: Date
  },
  modify_date: {
    type: Date
  }
});

var subCategory = (module.exports = mongoose.model(
  "subCategory",
  subCategorySchema
));
module.exports.get = function(callback, limit) {
  subCategory.find(callback).limit(limit);
};
