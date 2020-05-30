let AudioModel = require('../../model/Audio'),
    UserMap = require('../../model/UserMap'),
    UserProfile = require('../../model/UserProfileModel'),
    async = require('async');

module.exports = {
    /**
     * Add a bookmark from Audio list and store in My Bookmarks list
     */
    add: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null };

        let getUser = n => {
            //  get the user map
            let filter = { userId: req.body.userId };
            UserMap.findOne(filter, (err, doc) => {
                if (doc) {
                    /* updating default bookmarks */
                    if (doc.bookmarks.length && doc.bookmarks.indexOf(req.body.audioId) == -1) {
                        doc.bookmarks.push(req.body.audioId);
                        doc.save(e => {
                            console.log(e);
                        });
                    } else if (doc.bookmarks.length == 0) {
                        doc.bookmarks.push(req.body.audioId);
                        doc.save(e => {
                            console.log('EEE', e);
                        });
                    }
                } else {
                    var userMap = new UserMap();
                    userMap.userId = req.body.userId;
                    userMap.bookmarks.push(req.body.audioId);
                    userMap.save(err, data => {
                        console.log(data, '==data==.....');
                    });
                }
                return n();
            });
        };
        async.series([getUser.bind()], () => {
            responseObj.status = 'SUCCESS';
            callback(responseObj);
        });
    },

    /**
     * Remove a bookmark from Audio list/My Bookmark list
     */
    remove: (req, callback) => {
        let responseObj = { status: 'FAILED', message: null },
            getUser = n => {
                //  get the user map
                let filter = { userId: req.body.userId };
                UserMap.findOne(filter, (err, doc) => {
                    if (doc) {
                        /* updating default bookmarks */
                        if (doc.bookmarks.length) {
                            doc.bookmarks.map((i, j) => {
                                if (i == req.body.audioId) doc.bookmarks.splice(j, 1);
                            });
                            doc.save(e => {
                                console.log('EEE', e);
                            });
                        }
                    }
                    return n();
                });
            };
        async.series([getUser.bind()], () => {
            responseObj.status = 'SUCCESS';
            callback(responseObj);
        });
    },

    /**
     * List of All Bookmarks of Audios
     * */
    list: (req, callback) => {
        let responseObj = { status: 'FAILED', data: null };
        let bookmarks = null;
        let getUser = n => {
            //  get the user map
            let filter = { userId: req.body.userId };
            UserMap.findOne(filter, (err, doc) => {
                if (doc && doc.bookmarks && doc.bookmarks.length) {
                    bookmarks = doc.bookmarks;
                }
                return n();
            });
        };
        let audios = null;
        let getAudios = n => {
            if (bookmarks) {
                let filters = {
                    audioId: {
                        $in: bookmarks,
                    },
                };
                AudioModel.find(filters, (e, docs) => {
                    audios = docs;
                    return n();
                });
            } else {
                return n();
            }
        };
        let premiumStatus = n => {
            if (audios) {
                let filter = { userId: req.body.userId };
                UserProfile.findOne(filter, (e, docs) => {
                    if (docs && docs.premiumUser) {
                        for (var i = 0; i < audios.length; i++) {
                            audios[i].premium = false;
                        }
                    }
                    return n();
                });
            } else {
                return n();
            }
        };
        async.series([getUser.bind(), getAudios.bind(), premiumStatus.bind()], () => {
            if (audios) {
                responseObj.status = 'SUCCESS';
                responseObj.data = audios;
            }
            callback(responseObj);
        });
    },
};
