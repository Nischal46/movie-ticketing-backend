const handleAsyncAwait = require('../reusable/handleAsyncAwait');
const BookingDTO = require('./../model/bookingModel');

exports.createBooking = handleAsyncAwait(async (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
    console.log(req.query);
    console.log(req)

    res.send('Booking route configure');
    
})