const router = require('express').Router();
const bookingController = require('./../controller/bookingController');
const authController = require("./../controller/authenticationController");

router.route('/check-available').post(bookingController.checkSeaatAVailability)
router.route('/khalti').post(authController.protect, bookingController.createBooking).get(bookingController.getBooking);

module.exports = router;