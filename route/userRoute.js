const router = require("express").Router();
const userController = require("./../controller/userController");

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.LoginUser);

module.exports = router;
