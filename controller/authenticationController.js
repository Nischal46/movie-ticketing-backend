const AppError = require("../reusable/handleAppError");
const handleAsyncAwait = require("../reusable/handleAsyncAwait");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const sendToken = require('./../reusable/sendToken');
const userDTO = require("../model/userModel");
const { log } = require("console");


exports.login = handleAsyncAwait(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please enter all the credentials', 401));

    const user = await userDTO.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword)) return next(new AppError('Incorrect Email or Password', 401));
    

   sendToken(200, user, res)

})


exports.protect = handleAsyncAwait(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
    else if(req.cookies) token = req.cookies.moviejwt;

    if (!token) return next(new AppError('You are not logged in. Please Log in first', 404));

    const veryfying_jwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await userDTO.findById(veryfying_jwt.id);

    if(!currentUser) return next(new AppError('Not existance of token to user', 401));

    req.user = currentUser;
    next();


});

exports.getMe = handleAsyncAwait(async(req, res, next) => {
    let token;
    if(req.cookies) token = req.cookies.moviejwt;
    log(token);

    const verify_jwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const me = await userDTO.findById(verify_jwt.id);
    if(!me) return next(new AppError('Token is missing. Please Login', 401));

    res.status(200).json({
        status: 'success',
        data: me
    })
})

exports.permission_access = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You donot have permissions', 401))
        };

        next();
    }
};
