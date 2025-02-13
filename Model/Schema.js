const mongoose = require("mongoose");

const whatsapp = new mongoose.Schema({
    "name": {type: String, required: true},
    "email": {type: String, required: true},
    "quote": {type: String, unique: true}
});

module.exports = mongoose.model('Whatsapp', whatsapp);