'use strict';
/**
 * @description This Model is used for storing login credentials
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userProfileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: String,
    emailId: String,
    password: String,
    type: String,
    active: { type: Boolean, default: false },
    socialMedia: { type: Boolean, default: false },
    premiumUser: { type: Boolean, default: false },
    freeTrial: { type: Boolean, default: false },
    create_date: {
        type: Date,
    },
    age: String,
    country: String,
    gender: String,
    profileUrl: { key: String, value: String },
    appleID: String,
});
// Export Contact model
var UserProfile = (module.exports = mongoose.model('userProfile', userProfileSchema));

// checking if password is valid
userProfileSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports.get = function (callback, limit) {
    UserProfile.find(callback).limit(limit);
};
