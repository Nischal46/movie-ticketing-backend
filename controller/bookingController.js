const { default: mongoose } = require('mongoose');
const handleAsyncAwait = require('../reusable/handleAsyncAwait');
const BookingDTO = require('./../model/bookingModel');
const filimDTO = require('../model/filimModel');

exports.createBooking = handleAsyncAwait(async (req, res, next) => {
   const {filim, user, price, seatNo, bookingDate, showTime} = req.body;
    const bookData = await BookingDTO.create({
        filim, user: req.user._id, price, seatNo, bookingDate, showTime
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

exports.checkSeaatAVailability = handleAsyncAwait(async (req, res, next) => {
        const {filmName, date, showTime} = req.body;

        const film = await filimDTO.findOne({ _id: filmName });

        if (!film) {
            return res.status(404).json({
                status: 'fail',
                message: 'Film not found'
            });
        }

        const pipeLine = [
            {
                $match: {
                    filim: film._id,
                    "bookingDate": { $eq: new Date(date) },
                    showTime: "10:00 to 12:00"
                }
            },
            {
                $unwind: "$seatNo"
            },
            {
                $project: {
                    seatNo: 1,
                    filim: 1
                }
            }
            
        ];

        const result = await BookingDTO.aggregate(pipeLine);
        res.status(200).json({
            status: 'success',
            data: result
        })
})