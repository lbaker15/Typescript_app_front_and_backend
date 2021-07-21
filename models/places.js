const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Places = new Schema({
    firstname: String
})

module.exports = mongoose.model('Places', Places)