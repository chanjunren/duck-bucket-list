const jwt = require('jsonwebtoken');
const HttpError = require('../models/http_error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new HttpError("Token not found!", 401));
        }
        const decodedToken = jwt.verify(token, 'super_ultraAAA_seCreT_passWorD');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        return next(new HttpError("The header is probably missing or something!", 401));
    }
};