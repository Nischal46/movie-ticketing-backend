const { default: mongoose } = require('mongoose');
const axios = require('axios');
const handleAsyncAwait = require('../reusable/handleAsyncAwait');
const BookingDTO = require('./../model/bookingModel');
const filimDTO = require('../model/filimModel');

exports.createBooking = handleAsyncAwait(async (req, res, next) => {
   const {filim, user, price, seatNo, bookingDate, showTime, amount, token} = req.body;
  

    let data = {
        "token": token,
        "amount": amount
    };

    let config = {
        headers: {
            "Authorization": `key ${process.env.KHALTI_SECRET}`
        }
    }

    console.log(data);

    const finalPayment = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    // .then(response => console.log(response.data))
    // .catch(err => console.log(err))

    console.log('final payment is ', finalPayment.data);

    const bookData = await BookingDTO.create({
        filim: finalPayment.data.product_identity, 
        user: req.user._id, 
        price, 
        seatNo, 
        bookingDate, 
        showTime,
        transactionId: finalPayment.data.idx
    });

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