'use strict';
/**
 * @description This Model is used for Album
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema({
    albumId: String,
    active: { type: Boolean, default: true },
    categoryId: String,
    videoUrl: [{ key: String, value: String, position: String, mimetype: String }],
    title: String,
    description: String,
    thumbImageUrl: { key: String, value: String },
    authorImageUrl: String,
    mediaType: String,
    narrator: String,
    author: String,
    premium: Boolean,
    sequence: Number,
    duration: String,
    createdBy: String,
    modifiedBy: String,
    create_date: {
        type: Date,
    },
    modify_date: {
        type: Date,
    },
});

module.exports = mongoose.model('Album', schema, 'Album');

