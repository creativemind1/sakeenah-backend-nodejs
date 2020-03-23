// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
var categoryController = require('../controller/categoryController');

// categories
router.route('/category').post(categoryController.category);

// sub categories
//router.route('/subcategory').post(categoryController.subCategory);

// Albums
router.route('/album').post(categoryController.media);

// playlist
router.route('/playlist').post(categoryController.playlist);

// Export API routes
module.exports = router;
