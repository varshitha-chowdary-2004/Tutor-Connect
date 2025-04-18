
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    board: String,
    class: String,
    mode: String,
    preferredTutor: String,
    language: String,
    country: String,
    state: String,
    city: String,
    address: String,
});

module.exports = mongoose.model('Student', studentSchema);
