const mongoose = require("mongoose");

exports.databaseConnection = async function () {
  // return await mongoose.connect("mongodb://127.0.0.1:27017/filim_ticketing");
  return await mongoose.connect("mongodb+srv://nischal:Cc8Eeu9qe.A!Xei@cluster0.gljarkj.mongodb.net/filim_ticketing")
};


//nischal
// Cc8Eeu9qe.A!Xei
// mongodb+srv://nischal:<password>@cluster0.gljarkj.mongodb.net/