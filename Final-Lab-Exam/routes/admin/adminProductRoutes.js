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

// Route For Filtering, Pagination, Sorting, Searching

router.get("/Query", async (req,res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "price";

  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
    }
});

module.exports = router;
