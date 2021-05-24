const uuid = require('uuid');
const util = require('util');

const HttpError = require('../models/http_error');

var DUMMY_USERS = [
    {
        id: 'userId1',
        email: 'ongbengchia@gmail.com',
        password: 'hello123',
        role: 'administrator'
    },
    {
        id: 'userId2',
        email: 'kaisocool@gmail.com',
        password: 'kaivomit',
        role: 'dumb'
    }
];

const getAllUsers = (req, res, next) => {
    if (DUMMY_USERS.length === 0) {
        return next(new HttpError('There are no registered users! :(', 404));
    }
    console.log("=== ALL USERS === ");
    console.log(util.inspect(DUMMY_USERS, false, null, true));
    res.status(200).json({'users': DUMMY_USERS});
};

const registerUser = (req, res, next) => {
    const {email, password, role} = req.body;

    const existingEmail = DUMMY_USERS.find(user => user.email === email);
    
    if (existingEmail) {
        return next(new HttpError('A user with this email already exists! D:', 409));
    }

    const newUser = {
        id: uuid.v4(),
        email: email,
        password: password,
        role: role
    };

    DUMMY_USERS.push(newUser);

    console.log(" === USER SUCCESFULLY ADDED ===");
    console.log(util.inspect(DUMMY_USERS, false, null, true));
    
    res.status(201).json({"New User": newUser});
};

const loginUser = (req, res, next) => {
    const {email, password} = req.body;
    const user = DUMMY_USERS.find(user => user.email === email);
    if (!user) {
        return next(new HttpError("Invalid email! D:", 401));
    }

    if (user.password != password) {
        return next(new HttpError("Incorrect password! D:", 401));
    }

    res.status(200).json({messsage: "successfully logged in! :D"});
};


exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;