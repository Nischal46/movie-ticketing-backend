const mongoose = require("mongoose");

exports.databaseConnection = async function () {
  return await mongoose.connect("mongodb://127.0.0.1:27017/filim_ticketing");
};
