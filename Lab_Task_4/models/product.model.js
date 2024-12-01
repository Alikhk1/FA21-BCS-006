const mongoose = require('mongoose');

const productSchema = mongoose.Schema(

    {
        name: {
            type: String,
            require: [true, "Please Enter Product Name"]
        },

        color: {
            type: String
        },

        price: {
            type: Number,
            default: 0
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        }

    },

    {
        timestamp: true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

