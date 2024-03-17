const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    meno: {
      type: String,
      required: false,
    },
    priezvisko: {
      type: String,
      required: false,
    },
    spotreba: {
      type: Number,
      required: true,
    },
    teplota: {
      type: Number,
      required: true,
    },
    rfid: {
      type: String, 
      required: true,
    },
    cas:{
      type: Number,
      required: true
    }
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Data", dataSchema);
