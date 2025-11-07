const express = require('express');
const { register, login, logout, userDetails } = require('../controller/user');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/userDetails',authMiddleware ,userDetails);


module.exports = router;