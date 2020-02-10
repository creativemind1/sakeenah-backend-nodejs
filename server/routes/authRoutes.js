// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
var userController = require("../controller/userController");

// Registration
router.route("/signup").post(userController.signUp);
//Login
router.route("/login").post(userController.login);
// Reset Password
router.route("/resetpswd").post(userController.resetPswd);

// confirm Email
router.route("/verifyEmail").get(userController.verifyEmail);
router.route("/resetPassword").get(userController.verifyResetPassword);

// Export API routes
module.exports = router;
