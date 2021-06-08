const jwt = require('jsonwebtoken');
const HttpError = require('../models/http_error');

module.exports = (req, res, next) => {
    console.log("Huh?");
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token: " + token)
        if (!token) {
            return next(new HttpError("Token not found!", 401));
        }
        const decodedToken = jwt.verify(token, 'zhanghao_wo_ai_ni__ou_xiang');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        console.error(err);
        return next(new HttpError("The header is probably missing or something!", 401));
    }
};