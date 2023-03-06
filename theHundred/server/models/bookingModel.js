const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    bookingDate: {type: String, required: true}
    
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking