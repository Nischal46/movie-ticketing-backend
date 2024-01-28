const handleAsyncAwait = require('../reusable/handleAsyncAwait');
const BookingDTO = require('./../model/bookingModel');

exports.createBooking = handleAsyncAwait(async (req, res, next) => {
   const {filim, user, price, seatNo, bookingDate} = req.body;
    const bookData = await BookingDTO.create({
        filim, user: req.user._id, price, seatNo, bookingDate
    })

    res.status(200).json({
        status: 'success',
        data: bookData
    })
    
})

exports.getBooking = handleAsyncAwait(async (req, res, next) => {
    const data = await BookingDTO.find();

    res.status(200).json({
        status: 'success',
        data
    })
})