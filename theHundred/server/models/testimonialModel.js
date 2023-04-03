const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    company: {type: String},
    date: {type: Date, required: true},
    review: {type: String, required: true},
    reviewerImage: {type: String, required: true},
    email: {type: String, required: true}
})

const Testimonials = mongoose.model('Testimonials', testimonialSchema)
module.exports = Testimonials