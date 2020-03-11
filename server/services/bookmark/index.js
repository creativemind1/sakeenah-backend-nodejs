let AudioModel = require("../../model/PlayListModel"),
  UserMap = require("../../model/UserMap"),
  async = require("async");

module.exports = {
  /**
   * Add a bookmark from Audio list and store in My Bookmarks list
   */
  add_bookmark: (req, callback) => {
    let responseObj = { status: "FAILED", message: null };

    let getUser = n => {
      //  get the user map
      let filter = { userID: req.user.userId };
      UserMap.findOne(filter, (err, doc) => {
        if (doc) {
          /* updating default bookmarks */
          if (
            doc.bookmarks.length &&
            doc.bookmarks.indexOf(req.body.audioID) == -1
          ) {
            doc.bookmarks.push(req.body.audioID);
            doc.save((e, s) => {
              console.log(e, s);
            });
          } else if (doc.bookmarks.length == 0) {
            doc.bookmarks.push(req.body.audioID);
            doc.save((e, s) => {
              console.log("EEE", e);
              console.log("SSS", s);
            });
          }
        } else {
          var userMap = new UserMap();
          userMap.userID = req.user.userId;
          userMap.bookmarks.push(req.body.audioID);
          userMap.save(err, data => {
            console.log(data, "==data==.....");
          });
        }
        return n();
      });
    };
    async.series([getUser.bind()], e => {
      responseObj.status = "SUCCESS";
      callback(responseObj);
    });
  },

  /**
   * Remove a bookmark from Audio list/My Bookmark list
   */
  remove_bookmark: (req, callback) => {
    let responseObj = { status: "FAILED", message: null },
      getUser = n => {
        //  get the user map
        let filter = { userID: req.user.userId };
        UserMap.findOne(filter, (err, doc) => {
          if (doc) {
            /* updating default bookmarks */
            if (doc.bookmarks.length) {
              doc.bookmarks.map((i, j) => {
                if (i == req.body.audioID) doc.bookmarks.splice(j, 1);
              });
              doc.save((e, s) => {
                console.log("EEE", e);
                console.log("SSS", s);
              });
            }
          }
          return n();
        });
      };
    async.series([getUser.bind()], e => {
      responseObj.status = "SUCCESS";
      callback(responseObj);
    });
  },

  /**
   * List of All Bookmarks of Audios
   * */
  user_bookmark: (req, callback) => {
    let responseObj = { status: "FAILED", data: null };
    let bookmarks = null;
    let getUser = n => {
      //  get the user map
      let filter = { userID: req.user.userId };
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
          audioID: {
            $in: bookmarks
          }
        };
        AudioModel.find(filters, (e, docs) => {
          audios = docs;
          return n();
        });
      } else {
        return n();
      }
    };
    async.series([getUser.bind(), getAudios.bind()], e => {
      if (audios) {
        responseObj.status = "SUCCESS";
        responseObj.data = audios;
      }
      callback(responseObj);
    });
  }
};
