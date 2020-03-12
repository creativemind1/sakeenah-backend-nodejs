'use strict';
/**
 * @description This Model is used for storing login credentials
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require('mongoose');

var userPlayListSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    dayNo: Number,
    mediaId: String,
    create_date: {
        type: Date,
    },
});
// Export Contact model
var UserPlayList = (module.exports = mongoose.model('userPlayList', userPlayListSchema));

module.exports.get = function(callback, limit) {
    UserPlayList.find(callback).limit(limit);
};
