const handleAsyncAwait = require("./handleAsyncAwait");
const cloudinary = require('./cloudinary');
const fs = require('fs');
const AppError = require("./handleAppError");
const jwt = require('jsonwebtoken');
const sendToken = require('./sendToken');

// const signToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

const handleSuccessResponse = (statusCode, document, res) => {
  if (statusCode === 400) {
    res.send("Deleted Successfully");
  } else {

   
    res.status(statusCode).json({
      status: "success",
      data: document,
    });
  }
};

exports.createDocument = (Model, db_sensitive) =>
  handleAsyncAwait(async (req, res, next) => {
    if (db_sensitive === "User_DB") {
      const { name, email, password, contact, confirmPassword } = req.body;
      console.log(req.body);
      const document = await Model.create({
        name,
        email,
        contact,
        password,
        confirmPassword,
      });

     sendToken(201, document, res);
    }
    else if(db_sensitive === "Filim_DB"){
      const photoresponse = await cloudinary.uploader.upload(req.file.path);

      fs.unlink(req.file.path, function(err){
        if(err) return next(new AppError('Error encounter while deleting', 400));
        console.log('Deleted successfully');
      })

      //photo response got from the cloudinary
      const imageSource = photoresponse.url;

      const { movieName, movieCast, genre, release_date, duration, imageCover, price} = req.body;

      const document = await Model.create({ movieName, movieCast, genre, release_date, duration, imageCover: imageSource, price});
      handleSuccessResponse(201, document, res);
    }
    else {
      const document = await Model.create(req.body);
      handleSuccessResponse(201, document, res);
    }
  });

exports.getDocument = (Model) => {
  return handleAsyncAwait(async (req, res, next) => {
    let document;
    if (req.params.id) document = await Model.findById(req.params.id);

    else{

      document = await Model.find();
    }

    if (!document)
      return res.status(400).json({
        status: "fail",
        message: "No document found with this id",
      });

    handleSuccessResponse(200, document, res);
  });
};

exports.updateDocument = (Model) =>
  handleAsyncAwait(async (req, res, next) => {
    const document = await Model.findByIDAndUpdate(req.params.id, req.body, {
      virtuals: true,
      new: true,
    });

    if (!document)
      return res.status(400).json({
        status: "fail",
        message: "No document found with this id",
      });

    handleSuccessResponse(200, document, res);
  });

exports.deleteDocument = (Model) =>
  handleAsyncAwait(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document)
      return res.status(400).json({
        status: "fail",
        message: "No document found with this id",
      });

    handleSuccessResponse(200, document, res);
  });
