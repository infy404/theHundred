const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userEmail: {type:String, required: true},
    phoneNumber: {type: Number, required: true},
    password: {type: String, required: true},
    userRole: {type: String, required: true}
})

const Users = mongoose.model('Users', userSchema)
module.exports = Users