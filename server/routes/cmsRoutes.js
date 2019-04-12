// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
var userController = require("../controller/userController");
var categoryController = require("../controller/categoryController");
var jwt = require("jsonwebtoken");
var config = require("../config/config-" + process.env.NODE_ENV + ".js");

// categories
router.route("/category").post(categoryController.category);
// sub categories
router.route("/subcategory").post(categoryController.subCategory);
// media
router.route("/media").post(categoryController.media);

// Export API routes
module.exports = router;
