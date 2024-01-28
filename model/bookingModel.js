const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    filim: {
        type: mongoose.Schema.ObjectId,
        ref: 'Filim_DB',
        required: [true, 'film detail missing inorder to book movie']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User_DB',
        required: [true, 'user detail missing inorder to booking for movie']
    },
    price:{
        type: Number,
        required: [true, 'price missing for booking movie']
    },

    seatNo: {
        type: [String],
        required: [true, 'seatNo missing for booking movie']
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }

})

bookingSchema.pre(/^find/, function(next){
    this.populate('user').populate({
        path: 'filim',
        select: 'movieName'
    })
    next();
})

const BookingDTO = mongoose.model('Booking_DB', bookingSchema);
module.exports = BookingDTO