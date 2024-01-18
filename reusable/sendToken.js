const jwt = require('jsonwebtoken');

const signToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

const sendToken = (statusCode, user, res) => {
    const token = signToken(user._id);
    res.cookie('moviejwt', token, {expires: new Date(Date.now() + 30 * 60 * 60 * 1000), httpOnly: true, path: '/'});
  
    res.status(statusCode).json({
      status: "success",
      data: user,
      token
    });
  
  }

module.exports = sendToken;