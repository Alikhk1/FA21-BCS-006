const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const productRoute = require('./routes/admin/adminProductRoutes.js');
const adminCategoryRoutes = require('./routes/admin/adminCategoryRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const authController = require('./controllers/authController'); 
const homeController = require('./controllers/homeController.js');

const Product = require('./models/product.model.js')

let server = express();

// MIDDLEWARE ******************************************
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride('_method'));   // This tells Express to look for _method in the request body
server.use(cookieParser()); // For handling cookies
server.use(express.static("public")); // Serve static files from the 'public' folder
server.use(session({            // Use express-session middleware to store session data
    secret: 'your_secret_key',  // Replace with a strong secret
    resave: false,
    saveUninitialized: true
}));

// Set the view engine to EJS
server.set("view engine", "ejs");

// AUTHENTICATION ******************************************
// Use authenticateUser middleware globally
server.use(authController.authenticateUser);

// Pass user data to all views
server.use((req, res, next) => {
    res.locals.user = req.user; // Attach the authenticated user to locals
    next();
});

// ROUTES **************************************************
server.use('/admin/products', productRoute);
server.use('/admin/category', adminCategoryRoutes);
server.use(authRoutes);


// Route for the '/about-me' page
server.get("/about-me", (req, res) => {
    res.render("portfolio"); // Make sure the file name is portfolio.ejs
});

// Routes for the home page
server.get("/", homeController.getHomePage);
server.get('/logout', homeController.logout);
server.post('/add-to-cart', homeController.addToCart);
server.get('/cart', (req, res) => {
    // Retrieve the cart from session or create an empty array if not found
    const cart = req.session.cart || [];
    // Calculate total price if needed
    const totalPrice = cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    
    // Render cart page with cart and total price
    res.render('cart', { cart, totalPrice });
});

// CONNECTING TO MONGODB ***********************************
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the Database!');
        // Start Server after connecting to Database
        server.listen(5000, () => {
            console.log(`Server Started at http://localhost:5000`);
        });
    })
    .catch((error) => console.log(error.message));
