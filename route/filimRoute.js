const router = require("express").Router();
const filimController = require("./../controller/filimController");
const authController = require('./../controller/authenticationController');

const upload = require('./../reusable/multer');

router
  .route("/")
  .post(upload, filimController.createMovie)
  .get(filimController.getAllMovie);

router
  .route("/:id")
  .get(authController.protect, authController.permission_access('user') ,filimController.getMovie)
  .patch(filimController.updateMovie)
  .delete(filimController.deleteMovie);

module.exports = router;
