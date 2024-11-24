const Category = require('../../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('admin/manageCategories', { categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the form to create a new category
exports.createCategoryForm = (req, res) => {
  res.render('admin/createCategory');
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, description, price } = req.body;
  const category = new Category({ name, description, price });
  try {
    await category.save();
    res.redirect('/admin/category');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get the form to edit an existing category
exports.editCategoryForm = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('admin/editCategory', { category });
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    await Category.findByIdAndUpdate(req.params.id, { name, description, price });
    res.redirect('/admin/category');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/admin/category');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
