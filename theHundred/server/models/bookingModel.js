const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    bookingDate: {type: Date, required: true},
    bookingNumber: {type: String, required: true}
    
})

const Bookings = mongoose.model('Booking', bookingSchema)
module.exports = Bookings