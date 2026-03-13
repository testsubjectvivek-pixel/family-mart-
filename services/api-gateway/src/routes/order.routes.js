const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  createOrder, 
  getOrders, 
  getOrder, 
  updateOrderStatus,
  myOrders
} = require('../controllers/order.controller');

// Customer routes
router.post('/', protect, createOrder);
router.get('/me', protect, myOrders);
router.get('/:id', protect, getOrder);

// Admin routes
router.get('/', protect, authorize('super-admin', 'order-manager'), getOrders);
router.put('/:id/status', protect, authorize('super-admin', 'order-manager'), updateOrderStatus);

module.exports = router;
