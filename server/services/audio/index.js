let AudioModel = require("../../model/PlayListModel"),
  AlbumModel = require("../../model/MediaModel"),
  UserMap = require("../../model/UserMap"),
  async = require("async"),
  premiumUser = false;

module.exports = {
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
        selectDay: 1
      };
      AudioModel.find(filter, projection, (err, docs) => {
        if (docs && docs.length) {
          audios = docs;
        }
        return n();
      });
    };
    let userAudios = null;
    let getUser = n => {
      if (premiumUser) {
        return n();
      } else {
        //  get the user map
        let filter = { userID: "vjn6HLyqOL" };
        let projection = { _id: 0, audios: 1 };
        UserMap.findOne(filter, projection, (err, doc) => {
          if (doc) {
            userAudios = doc.audios;
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
          }
        } else if (userAudios) {
          for (let audio of audios) {
            if (userAudios.indexOf(audio.audioID) != -1) {
              audio.premium = false;
            }
          }
        }
        responseObj.status = "SUCCESS";
        responseObj.message = audios;
        responseObj.message = audios;
      }
      callback(responseObj);
    });
  },
  completed: (req, callback) => {
    let responseObj = { status: "FAILED", message: null };
    let audios = null;
    let selectDay = parseInt(req.body.selectDay);
    let seq = selectDay + 1;
    let nextAudio = null;
    let albumFinished = false;
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
        const filter = {
          subCategoryId: req.body.subCategoryId
        };
        const projection = {
          mediaId: 1,
          title: 1,
          thumbImageUrl: 1,
          author: 1,
          premium: 1,
          duration: 1
        };
        AlbumModel.find(
          filter,
          projection,
          { sort: { _id: -1 } },
          (err, albums) => {
            if (albums && albums.length) {
              for (let index = 0; index < albums.length; index++) {
                if ((albums[index].mediaId = req.body.mediaId)) {
                  if (albums[index + 1]) {
                    nextAlbum = albums[index + 1].mediaId;
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
        let filter = { userID: "vjn6HLyqOL" };
        // let projection = {  audios: 1, albums: 1 };
        UserMap.findOne(filter, (err, doc) => {
          if (doc) {
            /* updating default audios */
            if (doc.audios.indexOf(req.body.audioID) == -1) {
              doc.audios.push(req.body.audioID);
            }
            doc.audios.push(nextAudio);
            /* update albums*/
            if (nextAlbum) {
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
