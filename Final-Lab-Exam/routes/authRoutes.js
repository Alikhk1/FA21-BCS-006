const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Route for rendering the Sign-Up page
router.get('/signup', authController.getSignupPage);

// Route for handling Sign-Up form submission
router.post('/signup', authController.postSignup);

// Route for rendering the Login page
router.get('/login', authController.getLoginPage);

// Route for handling Login form submission
router.post('/login', authController.postLogin);

module.exports = router;
