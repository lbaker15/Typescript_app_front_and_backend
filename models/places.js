const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Places = new Schema({
    businessAddress: String,
    lat: String, lng: String,
    name: String,
    telephone: Number
})

module.exports = mongoose.model('Places', Places)