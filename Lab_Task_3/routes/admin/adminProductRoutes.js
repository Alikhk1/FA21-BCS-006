const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  createProductForm, // Import the new method
} = require('../../controllers/admin/adminProductController.js');

// Route to render the form for creating a new product
router.get('/newForm', createProductForm);

// Other routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
