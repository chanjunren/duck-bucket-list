const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/users_controller');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/signup',
    [check('email').normalizeEmail().isEmail(),
    check('name').notEmpty(),
    check('password').isLength({ min: 6 })],
    userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;