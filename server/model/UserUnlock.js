"use strict";
/**
 * @description This Model is used for storing login credentials
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require("mongoose");

var userUnlockSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  unlock: Array
});
// Export Contact model
var UserUnlock = (module.exports = mongoose.model(
  "UserUnlock",
  userUnlockSchema
));

module.exports.get = function(callback, limit) {
    UserUnlock.find(callback).limit(limit);
};


