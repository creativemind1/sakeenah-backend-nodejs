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
// getCategories
router.route("/getCategories").post(userController.getCategories);

// Export API routes
module.exports = router;
