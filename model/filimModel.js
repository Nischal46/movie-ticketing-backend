const mongoose = require("mongoose");

const filimSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: [true, "Please specify movie name"],
  },

  movieCast: {
    type: String,
    required: [true, "Please specify movie cast"],
  },

  genre: {
    type: String,
    required: [true, "Please specify movie genre"],
  },

  release_date: {
    type: String,
    required: [true, "Please specify movie release date"],
  },

  duration: {
    type: Number,
    required: [true, "Please specify movie duration"],
  },

  imageCover: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, "Pleae specify movie price"],
  },
});

const filimDTO = mongoose.model("Filim_DB", filimSchema);
module.exports = filimDTO;
