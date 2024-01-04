const router = require("express").Router();
const filimController = require("./../controller/filimController");
const authController = require('./../controller/authenticationController');

router
  .route("/")
  .post(filimController.createMovie)
  .get(authController.protect, filimController.getAllMovie);

router
  .route("/:id")
  .get(authController.protect, authController.permission_access('user') ,filimController.getMovie)
  .patch(filimController.updateMovie)
  .delete(filimController.deleteMovie);

module.exports = router;
