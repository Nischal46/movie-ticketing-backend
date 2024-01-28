const handleAsyncAwait = require('../reusable/handleAsyncAwait');
const BookingDTO = require('./../model/bookingModel');

exports.createBooking = handleAsyncAwait(async (req, res, next) => {
   const {filim, user, price, seatNo} = req.body;
    const bookData = await BookingDTO.create({
        filim, user: req.user._id, price, seatNo
    })

    res.status(200).json({
        status: 'success',
        data: bookData
    })
    
})