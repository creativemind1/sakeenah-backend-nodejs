let AlbumModel = require("../../model/MediaModel"),
  UserMap = require("../../model/UserMap"),
  async = require("async"),
  util = require("../../util");
premiumUser = false;

module.exports = {
  /**
   * @description returns user favorite albums
   */
  favorites: (req, callback) => {
    let responseObj = {
      status: "FAILED",
      data: null
    };
    // get user favorite album ids
    let favorites = null;
    let getFavorites = n => {
      let filter = { userID: req.user.userId };
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
        let filters = { mediaId: { $in: favorites } };
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
    async.series([getFavorites.bind(), getAlbums], e => {
      if (albums) {
        responseObj.status = "SUCCESS";
        responseObj.data = albums;
      }
      callback(responseObj);
    });
  },

  addFavorite: (req, callback) => {
    let responseObj = {
      status: "FAILED",
      data: null
    };
    let filter = { userID: req.user.userId };
    UserMap.findOne(filter, (err, doc) => {
      if (doc) {
        if (doc.favorites && doc.favorites.length) {
          if (doc.favorites.indexOf(req.body.albumId) == -1) {
            doc.favorites.push(req.body.albumId);
          }
        } else {
          doc.favorites = [req.body.albumId];
        }
        doc.save((e, s) => {
          if (!e && s) {
            responseObj.status = "SUCCESS";
          }
          callback(responseObj);
        });
      } else {
        callback(responseObj);
      }
    });
  },

  removeFavorite: (req, callback) => {
    let responseObj = {
      status: "FAILED",
      data: null
    };
    let filter = { userID: req.user.userId };
    UserMap.findOne(filter, (err, doc) => {
      if (doc && doc.favorites) {
        util.removeFromArray(doc.favorites, req.body.albumId);
        doc.save((e, s) => {
          if (!e && s) {
            responseObj.status = "SUCCESS";
          }
          callback(responseObj);
        });
      } else {
        callback(responseObj);
      }
    });
  }
};
