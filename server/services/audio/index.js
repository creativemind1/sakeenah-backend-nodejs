let AudioModel = require("../../model/PlayListModel"),
  AlbumModel = require("../../model/MediaModel"),
  UserMap = require("../../model/UserMap"),
  async = require("async"),
  premiumUser = false,
  _ = require("lodash");

module.exports = {
  /**
   * Get the list of Audios based on every Album. Also checks if it's in
   * lock mode or unlock. Also checks bookmarked.
   **/
  list: (req, callback) => {
    let responseObj = {
      status: "FAILED",
      message: null,
      category: req.body.subCategoryId,
      album: req.body.mediaId
    };
    let audios = null;
    let getAudios = n => {
      const filter = {
        mediaId: req.body.mediaId
      };
      const projection = {
        thumbImageUrl: 1,
        mediaId: 1,
        audioID: 1,
        premium: 1,
        name: 1,
        create_date: 1,
        description: 1,
        selectDay: 1,
        bookmark: 1
      };
      AudioModel.find(filter, projection, (err, docs) => {
        if (docs && docs.length) {
          audios = JSON.parse(JSON.stringify(docs));
          audios.sort((a, b) => {
            return a.selectDay - b.selectDay;
          });
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
        let filter = { userID: req.user.userId };
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
    async.parallel([getAudios.bind(), getUser.bind()], e => {
      if (audios) {
        if (premiumUser) {
          for (let audio of audios) {
            audio.premium = false;
            if (bookmarks) {
              if (bookmarks.indexOf(audio.audioID) != -1) {
                audio.bookmark = true;
              }
            }
          }
        } else if (userAudios) {
          for (let audio of audios) {
            if (userAudios.indexOf(audio.audioID) != -1) {
              audio.premium = false;
              if (bookmarks) {
                if (bookmarks.indexOf(audio.audioID) != -1) {
                  audio.bookmark = true;
                }
              }
            }
          }
        }
        responseObj.status = "SUCCESS";
        responseObj.message = audios;
      }
      callback(responseObj);
    });
  },

  /**
   * Once a user completed listening to any audio, it will hit to unlock the next one.
   *
   */
  completed: (req, callback) => {
    let responseObj = { status: "FAILED", message: null },
      audios = null,
      selectDay = parseInt(req.body.selectDay),
      seq = selectDay + 1,
      nextAudio = null,
      albumFinished = false;
    let getAudios = n => {
      const filter = {
        mediaId: req.body.mediaId
      };
      const projection = {
        thumbImageUrl: 1,
        mediaId: 1,
        audioID: 1,
        premium: 1,
        name: 1,
        create_date: 1,
        description: 1,
        selectDay: 1
      };
      AudioModel.find(filter, projection, (err, docs) => {
        if (docs && docs.length) {
          audios = docs;
          for (let audio of audios) {
            if (audio.selectDay == seq) {
              audio.premium = false;
              nextAudio = audio.audioID;
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
        let filter = { subCategoryId: { $in: [req.body.subCategoryId] } };
        const projection = {
          mediaId: 1,
          title: 1,
          thumbImageUrl: 1,
          author: 1,
          premium: 1,
          duration: 1,
          sequence: 1
        };
        AlbumModel.find(
          filter,
          projection,
          { sort: { sequence: 1 } },
          (err, albums) => {
            if (albums && albums.length) {
              for (let index = 0; index < albums.length; index++) {
                if ((albums[index].mediaId = req.body.mediaId)) {
                  let seq = albums[index].sequence;
                  let next = _.find(albums, { sequence: seq + 1 });
                  if (next) {
                    nextAlbum = next.mediaId;
                  }
                }
              }
            }
            return n();
          }
        );
      } else {
        return n();
      }
    };
    let getUser = n => {
      if (premiumUser) {
        return n();
      } else {
        //  get the user map
        let filter = { userID: req.user.userId };
        // let projection = {  audios: 1, albums: 1 };
        UserMap.findOne(filter, (err, doc) => {
          if (doc) {
            /* updating default audios */
            if (doc.audios.indexOf(req.body.audioID) == -1) {
              doc.audios.push(req.body.audioID);
            }
            if (nextAudio) {
              doc.audios.push(nextAudio);
            }
            /* update albums*/
            if (nextAlbum && doc.albums.indexOf(nextAlbum) == -1) {
              doc.albums.push(nextAlbum);
            }
            /*save the user map*/
            doc.save((e, s) => {
              console.log("EEE", e);
              console.log("SSS", s);
            });
          }
          return n();
        });
      }
    };
    async.series([getAudios.bind(), getAlbums.bind(), getUser.bind()], e => {
      responseObj.status = "SUCCESS";
      responseObj.message = audios;
      callback(responseObj);
    });
  }
};
