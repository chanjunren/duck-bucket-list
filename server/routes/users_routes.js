const express = require('express');

const userController = require('../controllers/users_controller');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;