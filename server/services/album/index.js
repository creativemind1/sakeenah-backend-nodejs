let AlbumModel = require('../../model/Album'),
    UserMap = require('../../model/UserMap'),
    async = require('async'),
    premiumUser = false;

module.exports = {
    list: (req, callback) => {
        let responseObj = {
            status: 'FAILED',
            data: null,
        };
        let albums = null;
        let getAlbums = n => {
            const filter = {
                categoryId: req.body.categoryId,
            };
            const projection = {
                albumId: 1,
                title: 1,
                thumbImageUrl: 1,
                author: 1,
                premium: 1,
                duration: 1,
            };
            AlbumModel.find(filter, projection, (err, docs) => {
                if (docs && docs.length) {
                    albums = JSON.parse(JSON.stringify(docs));
                }
                return n();
            });
        };
        let userAlbums = null;
        let favorites = null;
        let getUserAlbums = n => {
            if (premiumUser) {
                return n();
            } else {
                //  get the user map
                let filter = { userId: req.body.userId };
                UserMap.findOne(filter, (err, doc) => {
                    if (doc) {
                        userAlbums = doc.albums ? doc.albums : null;
                        favorites = doc.favorites ? doc.favorites : null;
                    }
                    return n();
                });
            }
        };
        async.parallel([getAlbums.bind(), getUserAlbums.bind()], () => {
            if (albums) {
                if (premiumUser) {
                    for (let album of albums) {
                        album.premium = false;
                        if (favorites.indexOf(album.albumId) != -1) {
                            album.favorite = true;
                        }
                    }
                } else if (userAlbums) {
                    for (let album of albums) {
                        if (userAlbums.indexOf(album.albumId) != -1) {
                            album.premium = false;
                        }
                        if (favorites.indexOf(album.albumId) != -1) {
                            album.favorite = true;
                        }
                    }
                }
                responseObj.status = 'SUCCESS';
                responseObj.data = albums;
            }
            callback(responseObj);
        });
    },
};
