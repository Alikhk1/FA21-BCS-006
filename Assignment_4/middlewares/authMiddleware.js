const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust path as needed

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the 'Authorization' header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            // Store user information in the request object
            req.user = decoded;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = authenticateJWT;
