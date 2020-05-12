'use strict';
/**
 * @description This Model is used for Categories like sleep and Mediate
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    albums: {
        type: Array,
        required: true,
    },
    audios: {
        type: Array,
        required: true,
    },
    favorites: {
        type: Array,
    },
    bookmarks: {
        type: Array
    }
});
// Export Contact model
module.exports = mongoose.model('UMAP', schema, 'UMAP');
