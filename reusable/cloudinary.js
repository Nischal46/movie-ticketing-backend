const cloudinary = require('cloudinary').v2;

cloudinary.config({
cloud_name: "dh2fmxdle",
  api_key: "545592863198933",
  api_secret: "LF-8WLvUTwapyAVcFYAlgIwCB7U",
})

module.exports = cloudinary;