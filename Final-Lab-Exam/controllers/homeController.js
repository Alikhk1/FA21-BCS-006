const Product = require('../models/product.model.js'); // Import Product model
const Cart = require('../models/cart.model.js');


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




exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1]; // From cookie or Authorization header
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    try {
        // Decode JWT and get user ID
        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.id;

        // Fetch the product from the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch the user's cart from the database
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingProduct = cart.items.find(item => item.productName === product.name && item.productColor === product.color);
        if (existingProduct) {
            // If product exists in the cart, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // Add the product to the cart
            cart.items.push({
                productName: product.name,
                productColor: product.color,
                productPrice: product.price,
                quantity: 1
            });
        }

        // Save the cart
        await cart.save();

        res.json({
            message: 'Product added to cart',
            cartItemCount: cart.items.length
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Cart page

exports.getCartPage = async (req, res) => {
    const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).redirect('/login'); // Redirect to login if no token
    }

    try {
        // Decode JWT to get user ID
        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.id;

        // Fetch the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.render('cart', { cart: [], totalPrice: 0 });
        }

        const totalPrice = cart.items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

        res.render('cart', { cart: cart.items, totalPrice });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Internal Server Error');
    }
};