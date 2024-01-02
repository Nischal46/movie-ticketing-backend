const AppError = require("../reusable/handleAppError");
const handleAsyncAwait = require("../reusable/handleAsyncAwait");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const createSendToken = require('./../reusable/sendToken');
const userDTO = require("../model/userModel");


exports.login = handleAsyncAwait(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please enter all the credentials', 401));

    const user = await userDTO.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword)) return next(new AppError('Incorrect Email or Password', 401));

    createSendToken(user, 200, res)

})


exports.protect = handleAsyncAwait(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];

    if (!token) return next(new AppError('You are not logged in. Please Log in first', 404));

    const veryfying_jwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await userDTO.findById(veryfying_jwt.id);

    if(!currentUser) return next(new AppError('Not existance of token to user', 401));

    req.user = currentUser;
    next();


});

exports.permission_access = () => { };
