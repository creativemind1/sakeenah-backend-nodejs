// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
var category = require("../controller/category");
var album = require("../controller/album");
var favorite = require("../controller/favorite");
var audio = require("../controller/audio");
var bookmark = require("../controller/bookmark");
var userController = require("../controller/userController");
var categoryController = require("../controller/categoryController");
var jwt = require("jsonwebtoken");
var config = require("../config/config-" + process.env.NODE_ENV + ".js");
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love !"
  });
});

// getCategories (DEFAULT)
router.route("/getCategories").post(userController.getCategories);

// Main Cateogry_Default and Sub Category comes here
router.route("/getCategories_NEW").post(userController.getCategories_NEW);

// Album
router.route("/getMedia").post(userController.getMedia);

// Audio Mp3
router.route("/getPlaylist").post(userController.userCategories);

// saveUserProfile
router.route("/saveUserProfile").post(userController.saveUserProfile);

// getUserProfile
router.route("/getUserProfile").post(userController.getUserProfile);

// saveUserPlayList
router.route("/saveUserPlayList").post(userController.saveUserPlayList);

//getUserCategories
router.route("/userCategories").post(userController.userCategories);

// unlockNextAudio
router.route("/unlock").post(userController.unlock);
router.route("/category/list").post(category.list);

router.route("/album/list").post(album.list);

// Favourite Routes
router.route("/album/favorite").post(favorite.favoriteAlbums);
router.route("/album/addFavorite").post(favorite.addFavorite);
router.route("/album/removeFavorite").post(favorite.removeFavorite);

// Audio Routes
router.route("/audio/list").post(audio.list);
router.route("/audio/completed").post(audio.completed);

// Bookmark Routes
router.route("/bookmark/add_bookmark").post(bookmark.add_bookmark);
router.route("/bookmark/remove_bookmark").post(bookmark.remove_bookmark);
router.route("/bookmark/user_bookmark").post(bookmark.user_bookmark);

// Export API routes
module.exports = router;
