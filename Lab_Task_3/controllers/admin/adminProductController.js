const Product = require("../../models/product.model.js");

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('admin/manageProducts', { products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Render the form to create a new product
const createProductForm = (req, res) => {
    res.render('admin/createProduct');
  };


// GET a single product by ID (for editing)
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('admin/editProduct', { product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST - Create a new product
const postProduct = async (req, res) => {
    try {
        const { name, color, price, quantity } = req.body;
        const newProduct = new Product({ name, color, price, quantity });
        await newProduct.save();
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Update an existing product (for the Edit form submission)
const putProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color, price, quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { name, color, price, quantity },
            { new: true }  // This option makes the updated document returned
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.redirect('/admin/products');  // Redirect to the list of products
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.redirect('/admin/products');  // Redirect to the list of products
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
    createProductForm, // Add this export
  };