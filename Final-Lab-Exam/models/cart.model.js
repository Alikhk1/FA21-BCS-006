const mongoose = require('mongoose');

// Cart schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true,
        unique: true // Ensure each user has only one cart
    },
    items: [
        {
            productName: {
                type: String,
                required: true
            },
            productColor: {
                type: String,
                required: true
            },
            productPrice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, { timestamps: true });  // Optionally track the creation and update times

// Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
