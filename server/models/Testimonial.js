const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    location: { type: String, required: true },
    treatment: { type: String, required: true },
    reviewText: { type: String, required: true },
    mediaUrl: { type: String, required: true }, // Path to file
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
