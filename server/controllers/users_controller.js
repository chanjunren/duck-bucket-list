const util = require('util');
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
    const { email, password, name, imageUrl } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(util.inspect(errors, false, null, true));
        return next(new HttpError('Invalid inputs passed D:', 422));
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
        return next(new HttpError('A user with this email already exists! D:', 409));
    }

    const newUser = new User({
        name: name,
        email: email,
        password: password,
        imageUrl: imageUrl,
        places: []
    });

    try {
        console.log(" === USER SUCCESFULLY ADDED ===");
        await newUser.save();
        res.status(201).json({ "New User": newUser.toObject({ getters: true }) });
    } catch (err) {
        return next(new HttpError('Something went wrong when trying to create this user! D:', 500));
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

    if (user.password != password) {
        return next(new HttpError("Incorrect password! D:", 401));
    }

    res.status(200).json({ messsage: "successfully logged in! :D" });
};


exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;