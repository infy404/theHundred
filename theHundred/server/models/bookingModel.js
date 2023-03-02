const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type:String, required: true},
    userEmail: {type:String, required: true},
    
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking