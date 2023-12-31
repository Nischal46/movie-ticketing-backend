const handleAsyncAwait = require("../reusable/handleAsyncAwait");
const { createDocument } = require("../reusable/handleFactoryFunction");
const userDTO = require("./../model/userModel");

exports.createUser = createDocument(userDTO, "User_DB");

exports.LoginUser = handleAsyncAwait(async (req, res, next) => {
  const { email, password } = req.body;

  // if(!email || !password)
});
