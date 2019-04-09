"use strict";
/**
 * @description This Model is used for saving history of the user.
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require("mongoose");
var userActivitySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  totalMindfulDays: Number,
  totalongStreak: Number,
  totalSessions: Number,
  deviceType: String,
  version: String,
  logInTime: {
    type: Date,
    default: Date.now
  }
});
// Export Contact model
var UserActivity = (module.exports = mongoose.model(
  "subCategory",
  userActivitySchema
));
module.exports.get = function(callback, limit) {
  UserActivity.find(callback).limit(limit);
};
