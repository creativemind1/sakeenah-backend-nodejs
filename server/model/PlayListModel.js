"use strict";
/**
 * @description This Model is used for Media
 * @author Ahmed
 * @since MAR-28-2019
 *
 */
var mongoose = require("mongoose");
var playListSchema = mongoose.Schema({
  mediaId: String,
  premium: { type: Boolean },
  audioID: String,
  name:  String ,
  authorBy: String,
  companyId: String,
  description: String, 
  createdBy: String,
  modifiedBy: String,
  selectDay:Number,
  thumbImageUrl: { key: String,value:String },
  create_date: {
    type: Date
  },
  modify_date: {
    type: Date
  }
});

var playList = (module.exports = mongoose.model("playList", playListSchema));
module.exports.get = function(callback, limit) {
  playList.find(callback).limit(limit);
};
