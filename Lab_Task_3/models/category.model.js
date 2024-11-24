const mongoose = require('mongoose');

// Define Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
},
    {
        timestamps : true
    },
);

// Create Category Model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
