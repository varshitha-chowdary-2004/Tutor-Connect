
const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    whatsapp: String,
    gender: String,
    dob: String,
    qualification: String,
    college: String,
    applyFor: String,
    experience: String,
    grades: [String],
    subjects: [String],
    country: String,
    state: String,
    city: String,
    language: String,
    pincode: String,
    address: String,
});

module.exports = mongoose.model('Tutor', tutorSchema);
