// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
var categoryController = require("../controller/categoryController");

// categories
router.route("/category").post(categoryController.category);

// sub categories
router.route("/subcategory").post(categoryController.subCategory);

// media
router.route("/media").post(categoryController.media);

// playlist
router.route("/playlist").post(categoryController.playlist);

// Export API routes
module.exports = router;
