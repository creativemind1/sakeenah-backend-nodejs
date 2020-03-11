"use strict";
/**
 * @description This Model is used for Media
 * @author Ahmed
 * @since MAR-28-2019
 *
 */
var mongoose = require("mongoose");
var mediaSchema = mongoose.Schema({
  mediaId: String,
  active: { type: Boolean, default: true },
  categoryId: [{ type: String }],
  subCategoryId: [{ type: String }],
  videoUrl: [{ key: String,value:String ,position:String,
    mimetype:String}],
  companyId: String,
  title: String,
  description: String,
  thumbImageUrl: { key: String,value:String },
  authorImageUrl: String,
  mediaType: String,
  narrator: String,
  author: String,
  premium: Boolean,
  duration: String,
  createdBy: String,
  modifiedBy: String,
  create_date: {
    type: Date
  },
  modify_date: {
    type: Date
  },
  sequence: Number
});

var media = (module.exports = mongoose.model("media", mediaSchema));
module.exports.get = function(callback, limit) {
  media.find(callback).limit(limit);
};
