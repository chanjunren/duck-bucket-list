const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const HttpError = require('../models/http_error');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        return next(new HttpError('Something went wrong when trying to get all users! :(', 500));
    }

    console.log("=== ALL USERS === ");
    console.log(util.inspect(users, false, null, true));
    res.status(200).json({ 'users': users.map(user => user.toObject({ getters: true })) });
};

const registerUser = async (req, res, next) => {
    const { email, password, name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(util.inspect(errors, false, null, true));
        return next(new HttpError('Invalid inputs passed D:', 422));
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
        return next(new HttpError('A user with this email already exists! D:', 409));
    }

    let hashedPw;
    try {
        hashedPw = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new HttpError('An error occured while attempting to hash the password! D:', 401));
    }

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPw,
        imageUrl: req.file.path,
        places: []
    });

    try {
        console.log(" === USER SUCCESFULLY ADDED ===");
        await newUser.save();
        console.log(newUser.toObject({ getters: true }));
    } catch (err) {
        return next(new HttpError('Something went wrong when trying to create this user! D:', 500));
    }

    let token;
    try {
        token = jwt.sign({
            userId: newUser.id,
            email: newUser.email
        },
            'zhanghao_wo_ai_ni__ou_xiang',
            { expiresIn: '1h' })
        res.status(201).json({ userId: newUser._id, email: newUser.email, token: token});
    } catch (err) {
        return next(new HttpError('Something went wrong when generating the token! D:', 401));
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email: email });
        if (!user) {
            return next(new HttpError("There is no account with this email! D:", 401));
        }
    } catch (err) {
        return next(new HttpError("Something went wrong when trying to get this email! D:", 500));
    }

    let isCredentialsCorrect;
    try {
        isCredentialsCorrect = await bcrypt.compare(password, user.password);
    } catch (err) {
        return next(new HttpError("An error occured while validating your password! D:", 401));
    }

    if (!isCredentialsCorrect) {
        return next(new HttpError("The password you entered is incorrect! D:", 401));
    }

    let token;
    try {
        token = jwt.sign({
            userId: user.id,
            email: user.email
        },
            'zhanghao_wo_ai_ni__ou_xiang',
            { expiresIn: '1h' });
        res.status(201).json({ userId: user.id, email: user.email, token: token});
    } catch (err) {
        console.error(err);
        return next(new HttpError('Something went wrong when generating the token! D:', 401));
    }};


exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;