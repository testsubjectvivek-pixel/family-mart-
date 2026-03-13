const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  createCategory, 
  getCategories, 
  getCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/category.controller');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin routes
router.post('/', protect, authorize('super-admin', 'product-manager'), createCategory);
router.put('/:id', protect, authorize('super-admin', 'product-manager'), updateCategory);
router.delete('/:id', protect, authorize('super-admin', 'product-manager'), deleteCategory);

module.exports = router;
