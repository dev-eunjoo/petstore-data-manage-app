const mongoose = require("mongoose");

const Pet = mongoose.model(
  "Pet",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  })
);

module.exports.Pet = Pet;
