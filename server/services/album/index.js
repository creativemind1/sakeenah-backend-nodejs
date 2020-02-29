let AlbumModel = require("../../model/MediaModel"),
  UserMap = require("../../model/UserMap"),
  async = require("async"),
  premiumUser = false;

module.exports = {
  list: (req, callback) => {
    let responseObj = {
      status: "FAILED",
      message: null
    };
    let albums = null;
    let getAlbums = n => {
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
      AlbumModel.find(filter, projection, (err, docs) => {
        if (docs && docs.length) {
          albums = docs;
        }
        return n();
      });
    };
    let userAlbums = null;
    let getUser = n => {
      if (premiumUser) {
        return n();
      } else {
        //  get the user map
        let filter = { userID: req.body.userId };
        //let projection = { _id: 0, albums: 1 };
        UserMap.findOne(filter, (err, doc) => {
          if (doc) {
            userAlbums = doc.albums;
          }
          return n();
        });
      }
    };
    async.parallel([getAlbums.bind(), getUser.bind()], e => {
      if (albums) {
        if (premiumUser) {
          for (let album of albums) {
            album.premium = false;
          }
        } else if (userAlbums) {
          for (let index = 0; index < albums.length; index++) {
            if (userAlbums == albums[index].mediaId) {              
              albums[index + 1].premium = false;
            }
          }
          // for (let album of albums) {
          //   if (userAlbums.indexOf(album.mediaId) != -1) {
          //     album.premium = false;
          //   }
          // }
        }
        responseObj.status = "SUCCESS";
        responseObj.message = albums;
      }
      callback(responseObj);
    });
  }
};
