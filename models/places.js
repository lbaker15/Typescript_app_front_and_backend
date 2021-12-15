const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Places = new Schema({
    businessAddress: String,
    lat: String, lng: String,
    name: String,
    telephone: Number,
    photo: String,
    propertytype: String,
    bedrooms: String,
    category: String,
    author: String,
    advert: String
})

module.exports = mongoose.model('Places', Places)