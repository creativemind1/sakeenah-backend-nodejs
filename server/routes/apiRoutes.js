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

// getCategories (DEFAULT)
router.route("/getCategories").post(userController.getCategories);

// Main Cateogry_Default and Sub Category comes here
router.route("/getCategories_NEW").post(userController.getCategories_NEW);

// Album
router.route("/getMedia").post(userController.getMedia);

// Audio Mp3
router.route("/getPlaylist").post(userController.getPlayList);

// saveUserProfile
router.route("/saveUserProfile").post(userController.saveUserProfile);

// getUserProfile
router.route("/getUserProfile").post(userController.getUserProfile);

// saveUserPlayList
router.route("/saveUserPlayList").post(userController.saveUserPlayList);

// unlockNextAudio
router.route("/unlock").post(userController.unlock);

// Export API routes
module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiYWRtaW5Ac2FrZWVuYWguaW8iLCJpYXQiOjE1ODIwMjczNDUsImV4cCI6MTU4MjM3Mjk0NX0.383MhIa5Z6L_o8ZyVhA2bqMWfSQOk8CBtvlMndJRkbk

//userID: 3V5l3JF4QH
//dayNo: 2