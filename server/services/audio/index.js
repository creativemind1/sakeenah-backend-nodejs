let AudioModel = require('../../model/Audio'),
    AlbumModel = require('../../model/Album'),
    UserMap = require('../../model/UserMap'),
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
                }
                return n();
            });
        };
        let userAudios = null;
        let bookmarks = null;
        let getUser = n => {
            if (premiumUser) {
                return n();
            } else {
                //  get the user map
                let filter = { userId: req.body.userId };
                let projection = { _id: 0, audios: 1, bookmarks: 1 };
                UserMap.findOne(filter, projection, (err, doc) => {
                    if (doc) {
                        userAudios = doc.audios;
                        bookmarks = doc.bookmarks;
                    }
                    return n();
                });
            }
        };
        async.parallel([getAudios.bind(), getUser.bind()], () => {
            if (audios) {
                if (premiumUser) {
                    for (let audio of audios) {
                        audio.premium = false;
                        if (bookmarks) {
                            if (bookmarks.indexOf(audio.audioId) != -1) {
                                audio.bookmark = true;
                            }
                        }
                    }
                } else if (userAudios) {
                    for (let audio of audios) {
                        if (userAudios.indexOf(audio.audioId) != -1) {
                            audio.premium = false;
                            if (bookmarks) {
                                if (bookmarks.indexOf(audio.audioId) != -1) {
                                    audio.bookmark = true;
                                }
                            }
                        }
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
                };
                AlbumModel.find(filter, projection, { sort: { _id: -1 } }, (err, albums) => {
                    if (albums && albums.length) {
                        for (let index = 0; index < albums.length; index++) {
                            if ((albums[index].albumId = req.body.albumId)) {
                                if (albums[index + 1]) {
                                    nextAlbum = albums[index + 1].albumId;
                                }
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
            if (premiumUser) {
                return n();
            } else {
                //  get the user map
                let filter = { userId: req.body.userId };
                // let projection = {  audios: 1, albums: 1 };
                UserMap.findOne(filter, (err, doc) => {
                    if (doc) {
                        /* updating default audios */
                        if (doc.audios.indexOf(req.body.audioId) == -1 || doc.audios.length == 0) {
                            doc.audios.push(nextAudio);
                        }
                        /* update albums*/
                        if (nextAlbum) {
                            if (doc.albums.indexOf(nextAlbum) == -1) {
                                doc.albums.push(nextAlbum);
                            } else if (doc.albums.length == 0) {
                                doc.albums.push(nextAlbum);
                            }
                        }
                        /*save the user map*/
                        doc.save((e, s) => {
                            console.log('EEE', e);
                            console.log('SSS', s);
                        });
                    }
                    return n();
                });
            }
        };
        async.series([getAudios.bind(), getAlbums.bind(), getUser.bind()], () => {
            responseObj.status = 'SUCCESS';
            responseObj.data = audios;
            callback(responseObj);
        });
    },
};
