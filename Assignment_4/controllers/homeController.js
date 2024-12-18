const Product = require('../models/product.model.js'); // Import Product model


// Controller for handling the home route
exports.getHomePage = async (req, res) => {
    try {
        // Fetch products from the database
        const products = await Product.find();

        // Render the Apple.ejs template with user and products data
        res.render("Apple", { 
            user: req.user || null,  // Pass user data if available
            products: products,      // Pass products from the database
            cart: req.session.cart || []
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Logot Functionality
exports.logout = (req, res) => {
    // Clear the authToken cookie
    res.clearCookie('authToken');

    // Redirect to login page
    res.redirect('/login');
};




// Handle adding a product to the cart
exports.addToCart = (req, res) => {
    const { productId, productName, productPrice } = req.body;

    // Initialize the cart if it doesn't exist yet
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Check if the product is already in the cart
    const existingProduct = req.session.cart.find(item => item.productId === productId);

    if (existingProduct) {
        // If product exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add the product to the cart
        req.session.cart.push({
            productId,
            productName,
            productPrice,
            quantity: 1,
        });
    }

    // Return success message
    res.json({ message: 'Product added to cart!' });
};


// Cart page

exports.getCartPage = (req, res) => {
    // Get the cart from the session (if it exists)
    const cart = req.session.cart || [];

    // Render the cart page, passing the cart data
    res.render('cart', { 
        cart: cart,
        totalPrice: cart.reduce((total, item) => total + item.productPrice * item.quantity, 0)  // Calculate total price
    });
};
