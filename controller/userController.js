const AppError = require("../reusable/handleAppError");
const handleAsyncAwait = require("../reusable/handleAsyncAwait");
const { createDocument } = require("../reusable/handleFactoryFunction");
const userDTO = require("./../model/userModel");

exports.createUser = createDocument(userDTO, "User_DB");

exports.LoginUser = handleAsyncAwait(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) return next(new AppError('Please provide Email or PAssword', 400));

  const user = await userDTO.findOne({email}).select('+password');

  if(!user || !(await user.checkPassword)) return next(new AppError('Incorrect Email or Password', 401));

  res.status(200).json({
    status: 'success',
    mssage: "Login success"
  })
});
