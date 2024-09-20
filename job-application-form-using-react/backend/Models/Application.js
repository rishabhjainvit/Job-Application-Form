const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: { type: String, unique: true },
    gender: String,
    city: String,
    state: String,
    dob: Date,
    resume: String,
    tenthMarks: Number,
    twelfthMarks: Number,
    higherDegreeMarks: Number,
    preferredLanguage: String,
    technicalLanguage: String,
    workExperience: String
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
