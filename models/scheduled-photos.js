const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduledPhotos = new Schema({
    location: String,
    username: String,
    password: String,
    message: String,
    uploaded: Boolean,
    time: Number
})

module.exports = mongoose.model('ScheduledPhotos', ScheduledPhotos)