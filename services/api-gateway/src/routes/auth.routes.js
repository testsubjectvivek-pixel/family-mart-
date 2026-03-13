const express = require('express');
const router = express.Router();
const { registerValidator, loginValidator, handleValidationErrors } = require('../middleware/validation.middleware');
const { register, login, logout, forgotPassword, resetPassword, getMe, refreshToken } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.post('/register', registerValidator, handleValidationErrors, register);
router.post('/login', loginValidator, handleValidationErrors, login);
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
