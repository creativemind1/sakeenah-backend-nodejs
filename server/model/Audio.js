'use strict';
/**
 * @description 
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema({
    albumId: String,
    premium: { type: Boolean },
    audioId: String,
    name: String,
    authorBy: String,
    description: String,
    createdBy: String,
    modifiedBy: String,
    episode: Number,
    thumbImageUrl: { key: String, value: String },
    create_date: {
        type: Date,
    },
    modify_date: {
        type: Date,
    },
});

module.exports = mongoose.model('Audio', schema, 'Audio');
