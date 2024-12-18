const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/adminCategoryController');

// Frontend Routes (Views)
router.get('/', categoryController.getAllCategories); // View all categories

router.get('/newForm', categoryController.createCategoryForm); // Get create category form

router.post('/createCategory', categoryController.createCategory); // Create a new category

router.get('/:id/edit', categoryController.editCategoryForm); // Edit category form

router.put('/:id', categoryController.updateCategory); // Update category

router.delete('/:id', categoryController.deleteCategory); // Delete category

module.exports = router;
