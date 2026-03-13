const Category = require('../models/Category.model');

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Super Admin, Product Manager)
const createCategory = async (req, res) => {
  try {
    const { name, description, image, parentCategory, isActive, gstRate } = req.body;

    const category = await Category.create({
      name,
      description,
      image,
      parentCategory,
      isActive,
      gstRate
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = isActive ? { isActive } : {};

    const categories = await Category.find(filter).populate('parentCategory').sort({ name: 1 });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate('parentCategory').populate('subcategories');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Super Admin, Product Manager)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, parentCategory, isActive, gstRate } = req.body;

    let category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Update fields
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (image) category.image = image;
    if (parentCategory !== undefined) category.parentCategory = parentCategory;
    if (isActive !== undefined) category.isActive = isActive;
    if (gstRate !== undefined) category.gstRate = gstRate;

    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Super Admin, Product Manager)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
