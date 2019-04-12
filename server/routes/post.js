// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
var userController = require("../controller/userController");
var categoryController = require("../controller/categoryController");
var jwt    = require('jsonwebtoken');
var config = require("../config/config-" + process.env.NODE_ENV + ".js");
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love !"
  });
});

// Registration
router.route("/signup").post(userController.signUp);
//Login
router.route("/login").post(userController.login);
// Reset Password
router.route("/resetpswd").post(userController.resetPswd);
// getMedia
router.route("/getMedia").post(userController.getMedia);
// getCategories
router.route("/getCategories").post(userController.getCategories);
// confirm Email
router.route("/verifyEmail").get(userController.verifyEmail);

// categories
router.route("/category").post(categoryController.category);
// sub categories
router.route("/subcategory").post(categoryController.subCategory);
// media
router.route("/media").post(categoryController.media);

// Export API routes
module.exports = router;
