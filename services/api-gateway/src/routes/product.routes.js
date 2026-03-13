const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts,
  getPopularProducts,
  getRecentProducts
} = require('../controllers/product.controller');

// Public routes
router.get('/', getProducts);
router.get('/popular', getPopularProducts);
router.get('/recent', getRecentProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

// Admin routes
router.post('/', protect, authorize('super-admin', 'product-manager'), createProduct);
router.put('/:id', protect, authorize('super-admin', 'product-manager'), updateProduct);
router.delete('/:id', protect, authorize('super-admin', 'product-manager'), deleteProduct);

module.exports = router;
