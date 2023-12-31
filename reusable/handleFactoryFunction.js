const handleAsyncAwait = require("./handleAsyncAwait");

const handleSuccessResponse = (statusCode, document, res) => {
  if (statusCode === 400) {
    res.send("Deleted Successfully");
  } else {
    res.status(statusCode).json({
      status: "success",
      data: {
        data: document,
      },
    });
  }
};

exports.createDocument = (Model, db_sensitive) =>
  handleAsyncAwait(async (req, res, next) => {
    if (db_sensitive === "User_DB") {
      console.log("hitt");
      const { name, email, password, contact, confirmPassword } = req.body;
      console.log(req.body);
      const document = await Model.create({
        name,
        email,
        contact,
        password,
        confirmPassword,
      });

      handleSuccessResponse(201, document, res);
    } else {
      const document = await Model.create(req.body);
      handleSuccessResponse(201, document, res);
    }
  });

exports.getDocument = (Model) => {
  return handleAsyncAwait(async (req, res, next) => {
    let filter = {};

    if (req.params.id) filter = { _id: req.params.id };

    console.log(filter);
    const document = await Model.find(filter);

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
