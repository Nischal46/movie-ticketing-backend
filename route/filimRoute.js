const router = require("express").Router();
const filimController = require("./../controller/filimController");

router
  .route("/")
  .post(filimController.createMovie)
  .get(filimController.getAllMovie);

router
  .route("/:id")
  .get(filimController.getMovie)
  .patch(filimController.updateMovie)
  .delete(filimController.deleteMovie);

module.exports = router;
