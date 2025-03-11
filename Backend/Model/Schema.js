const mongoose = require("mongoose");

const WhatsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    quote: { type: String, required: true, unique: true } 
});

module.exports = mongoose.model("Whats", WhatsSchema);