const jwt = require('jsonwebtoken');
const HttpError = require('../models/http_error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token: " + token)
        if (!token) {
            return next(new HttpError("Token not found!", 401));
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        console.error(err);
        return next(new HttpError("The header is probably missing or something!", 401));
    }
};