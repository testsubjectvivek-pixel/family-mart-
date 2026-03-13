const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  updateUser, 
  deleteUser, 
  getUserAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress,
  blockUser,
  unblockUser,
  getAllUsers
} = require('../controllers/user.controller');

// User profile routes
router.put('/profile', protect, updateUser);
router.delete('/profile', protect, deleteUser);

// Address management
router.get('/addresses', protect, getUserAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);

// Admin routes
router.get('/', protect, authorize('super-admin'), getAllUsers);
router.put('/:userId/block', protect, authorize('super-admin'), blockUser);
router.put('/:userId/unblock', protect, authorize('super-admin'), unblockUser);

module.exports = router;
