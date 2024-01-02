const jwt = require('jsonwebtoken');

const signToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

module.exports = createSendToken;