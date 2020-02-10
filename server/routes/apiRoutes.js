// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
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

// getMedia
router.route("/getMedia").post(userController.getMedia);

// getCategories (DEFAULT)
router.route("/getCategories").post(userController.getCategories);

// getCategories_NEW
router.route("/getCategories_NEW").post(userController.getCategories_NEW);

// saveUserProfile
router.route("/saveUserProfile").post(userController.saveUserProfile);

// getUserProfile
router.route("/getUserProfile").post(userController.getUserProfile);

// getMedia
router.route("/getPlaylist").post(userController.getPlayList);

// saveUserPlayList
router.route("/saveUserPlayList").post(userController.saveUserPlayList);

// Export API routes
module.exports = router;
