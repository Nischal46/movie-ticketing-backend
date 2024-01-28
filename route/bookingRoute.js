const router = require('express').Router();
const bookingController = require('./../controller/bookingController');
const authController = require("./../controller/authenticationController")

router.route('/khalti').post(authController.protect, bookingController.createBooking);

module.exports = router;