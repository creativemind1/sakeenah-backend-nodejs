let AlbumModel = require('../../model/Album'),
    UserMap = require('../../model/UserMap'),
    async = require('async'),
    util = require('../../util');

module.exports = {
    /**
     * @description returns user favorite albums
     */
    allFavorites: (req, callback) => {
        let responseObj = {
            status: 'FAILED',
            data: null,
        };
        // get user favorite album ids
        let favorites = null;
        let getFavorites = n => {
            let filter = { userId: req.body.userId };
            UserMap.findOne(filter, (err, doc) => {
                if (doc && doc.favorites && doc.favorites.length) {
                    favorites = doc.favorites;
                }
                return n();
            });
        };

        //  get albums with album ids
        let albums = null;
        let getAlbums = n => {
            if (favorites) {
                let filters = { albumId: { $in: favorites } };
                AlbumModel.find(filters, (e, docs) => {
                    if (docs && docs.length) {
                        albums = docs;
                    }
                    return n();
                });
            } else {
                return n();
            }
        };
        async.series([getFavorites.bind(), getAlbums], () => {
            if (albums) {
                responseObj.data = albums;
                responseObj.status = 'SUCCESS';
            }
            callback(responseObj);
        });
    },

    addFavorite: (req, callback) => {
        let responseObj = {
            status: 'FAILED',
            data: null,
        };
        let filter = { userId: req.body.userId };
        UserMap.findOne(filter, (err, doc) => {
            if (doc) {
                if (doc && doc.favorites) {
                    if (doc.favorites.indexOf(req.body.albumId) == -1) {
                        doc.favorites.push(req.body.albumId);
                        doc.save();
                    }
                } else {
                    doc.favorites = [req.body.albumId];
                    doc['__v'] = 65;
                    doc.save(e => {
                        console.log(e);
                    });
                }
                responseObj.status = 'SUCCESS';
            }
            callback(responseObj);
        });
    },

    removeFavorite: (req, callback) => {
        let responseObj = {
            status: 'FAILED',
            data: null,
        };
        let filter = { userId: req.body.userId };
        UserMap.findOne(filter, (err, doc) => {
            if (doc && doc.favorites) {
                util.removeFromArray(doc.favorites, req.body.albumId);
                doc.save();
                responseObj.status = 'SUCCESS';
            }
            callback(responseObj);
        });
    },
};
