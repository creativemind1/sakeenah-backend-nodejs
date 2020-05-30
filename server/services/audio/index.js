let AudioModel = require('../../model/Audio'),
    AlbumModel = require('../../model/Album'),
    UserMap = require('../../model/UserMap'),
    UserProfile = require('../../model/UserProfileModel'),
    async = require('async'),
    premiumUser = false;

module.exports = {
    list: (req, callback) => {
        let responseObj = {
            status: 'FAILED',
            data: null,
            category: req.body.categoryId, // WILL COME BACK HERE SOON.....
            album: req.body.albumId,
        };
        let premium_user = false;
        let premiumStatus = n => {
            let filter = { userId: req.body.userId };
            UserProfile.findOne(filter, (err, profile) => {
                if (profile && profile.premiumUser) {
                    premium_user = true;
                }
                return n();
            });
        };
        let audios = null;
        let getAudios = n => {
            const filter = {
                albumId: req.body.albumId,
            };
            const projection = {
                thumbImageUrl: 1,
                albumId: 1,
                audioId: 1,
                premium: 1,
                name: 1,
                create_date: 1,
                description: 1,
                episode: 1,
            };
            AudioModel.find(filter, projection, (err, docs) => {
                if (docs && docs.length) {
                    audios = JSON.parse(JSON.stringify(docs));
                    audios.sort((a, b) => a.episode - b.episode);
                }
                return n();
            });
        };
        let userAudios = null;
        let bookmarks = null;
        let getUser = n => {
            let filter = { userId: req.body.userId };
            let projection = { _id: 0, audios: 1, bookmarks: 1 };
            UserMap.findOne(filter, projection, (err, doc) => {
                if (doc) {
                    bookmarks = doc.bookmarks;
                    if (!premium_user) {
                        userAudios = doc.audios;
                    }
                }
                return n();
            });
        };
        async.series([premiumStatus.bind(), getAudios.bind(), getUser.bind()], () => {
            if (audios) {
                for (let audio of audios) {
                    if (premium_user || (userAudios && userAudios.indexOf(audio.audioId) != -1)) {
                        audio.premium = false;
                    }
                    if (bookmarks && bookmarks.indexOf(audio.audioId) != -1) {
                        audio.bookmark = true;
                    }
                }
                responseObj.status = 'SUCCESS';
                responseObj.data = audios;
            }
            callback(responseObj);
        });
    },

    completed: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null },
            audios = null,
            episode = parseInt(req.body.episode),
            seq = episode + 1,
            nextAudio = null,
            albumFinished = false;

        let premiumStatus = n => {
            let filter = { userId: req.body.userId };
            UserProfile.findOne(filter, (err, profile) => {
                if (profile && profile.premiumUser) {
                    premiumUser = true;
                }
                return n();
            });
        };

        let getAudios = n => {
            const filter = {
                albumId: req.body.albumId,
            };
            const projection = {
                thumbImageUrl: 1,
                albumId: 1,
                audioId: 1,
                premium: 1,
                name: 1,
                create_date: 1,
                description: 1,
                episode: 1,
            };
            AudioModel.find(filter, projection, (err, docs) => {
                if (docs && docs.length) {
                    audios = docs;
                    audios.sort((a, b) => a.episode - b.episode);
                    for (let audio of audios) {
                        if (audio.episode == seq) {
                            audio.premium = false;
                            nextAudio = audio.audioId;
                        }
                    }
                    /* check did user finished all the audios of the album */
                    if (audios.length < seq) {
                        albumFinished = true;
                    }
                }
                return n();
            });
        };

        let nextAlbum = null;
        let getAlbums = n => {
            if (albumFinished) {
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
                    sequence: 1,
                };

                AlbumModel.find(filter, projection, (err, albums) => {
                    if (albums && albums.length) {
                        albums.sort((a, b) => a.sequence - b.sequence);
                        for (let index = 0; index < albums.length; index++) {
                            if ((albums[index].albumId = req.body.albumId) && albums[index + 1]) {
                                nextAlbum = albums[index + 1].albumId;
                            }
                        }
                    }
                    return n();
                });
            } else {
                return n();
            }
        };

        let getUser = n => {
            //  get the user map
            let filter = { userId: req.body.userId };
            // let projection = {  audios: 1, albums: 1 };
            if (premiumUser) return n();
            UserMap.findOne(filter, (err, doc) => {
                if (doc) {
                    /* updating default audios */
                    if (doc.audios.indexOf(nextAudio) == -1 || doc.audios.length == 0) {
                        doc.audios.push(nextAudio);
                    }
                    /* update albums*/
                    if (
                        nextAlbum &&
                        (doc.albums.indexOf(nextAlbum) == -1 || doc.albums.length == 0)
                    ) {
                        doc.albums.push(nextAlbum);
                    }
                    /*save the user map*/
                    doc.save((e, s) => {
                        console.log('EEE', e);
                        console.log('SSS', s);
                    });
                } else {
                    var userMap = UserMap();
                    userMap.userId = req.body.userId;
                    userMap.audios.push(req.body.audioId);
                    userMap.save(err => {
                        console.log(err, '==error==.....');
                    });
                }
                return n();
            });
        };
        async.series(
            [premiumStatus.bind(), getAudios.bind(), getAlbums.bind(), getUser.bind()],
            () => {
                responseObj.status = 'SUCCESS';
                responseObj.data = audios;
                callback(responseObj);
            }
        );
    },
};
