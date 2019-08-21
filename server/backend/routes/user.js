const express = require('express');
const router = express.Router();

var userController = require('../controllers/user.controller');

//routes
router.post('/login', userController.login);
module.exports = router;