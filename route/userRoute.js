const router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authenticationController")

router.route("/register").post(userController.createUser);
router.route("/login").post(authController.login);
router.route("/me").get(authController.getMe)

module.exports = router;
