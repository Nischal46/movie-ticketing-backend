const router = require("express").Router();
const userController = require("./../controller/userController");

router.route("/").post(userController.createUser);

module.exports = router;
