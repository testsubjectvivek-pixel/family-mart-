const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { validatePromoCode, applyPromoCode, getPromoCodes, createPromoCode, updatePromoCode, deletePromoCode } = require('../controllers/promoCode.controller');

// Public routes
router.post('/validate', validatePromoCode);

// Protected routes
router.post('/apply', protect, applyPromoCode);

// Admin routes
router.get('/', protect, authorize('super-admin', 'product-manager'), getPromoCodes);
router.post('/', protect, authorize('super-admin', 'product-manager'), createPromoCode);
router.put('/:id', protect, authorize('super-admin', 'product-manager'), updatePromoCode);
router.delete('/:id', protect, authorize('super-admin', 'product-manager'), deletePromoCode);

module.exports = router;
