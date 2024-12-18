const User = require('../models/userModel'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret'; // Replace with an environment variable in production

// Render the Sign-Up page
exports.getSignupPage = (req, res) => {
    res.render('auth/signup'); // Renders signup.ejs
};

// Handle Sign-Up form submission
exports.postSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists. Please log in.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.redirect('/login'); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Render the Login page
exports.getLoginPage = (req, res) => {
    res.render('auth/login'); // Renders login.ejs
};

// Handle Login form submission
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password.');
        }

        // Generate a JWT
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Store the token in a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.redirect('/'); // Redirect to the homepage after successful login
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Middleware to authenticate user
exports.authenticateUser = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        req.user = null; // No user logged in
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { userId: decoded.userId, username: decoded.username }; // Attach user details to the request
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        req.user = null; // Invalidate user session
        next();
    }
};

// Logout functionality
exports.logout = (req, res) => {
    res.clearCookie('authToken'); // Clear the auth cookie
    res.redirect('/'); // Redirect to the homepage
};



