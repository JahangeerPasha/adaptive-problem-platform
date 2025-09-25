// Backend/routes/auth.js
const express = require('express');
const router = express.Router();
// const { googleLogin } = require('./src/controllers/authController');
const { googleLogin } = require('../controllers/authController');

router.post('/google', googleLogin);

module.exports = router;