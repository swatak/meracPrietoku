const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileModel = new Schema({
    meno: {
        type: String,
        required: true
    },
    priezvisko: {
        type: String,
        required: true
    },
    rfid: {
        type: String,
        required: true
    },
    spotreba: {
        type: Number,
        required: true,
    },
    teplota: {
        type: Number,
        required: true,
    },
    cas:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Profile", profileModel);
