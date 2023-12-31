const handleAsyncAwait = require("../reusable/handleAsyncAwait");

exports.protect = handleAsyncAwait(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.Authorization.split(' ')[1];


});

exports.permission_access = () => {};
