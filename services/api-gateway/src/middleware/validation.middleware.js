const { body, param, query, validationResult } = require('express-validator');
const { isEmail } = require('validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validation rules
const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 100 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid 10-digit phone number')
    .isLength({ min: 10, max: 10 }),

  handleValidationErrors
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),

  handleValidationErrors
];

// Address validation rules
const addressValidator = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),

  body('street')
    .trim()
    .notEmpty().withMessage('Street address is required'),

  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isIn(['New Delhi', 'Delhi', 'Delhi NCR']).withMessage('We only deliver to Delhi/NCR currently'),

  body('pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required')
    .matches(/^110\d{3}$/).withMessage('Please enter a valid Delhi pincode (110xxx)'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid 10-digit phone number'),

  body('isDefault').optional().isBoolean(),

  handleValidationErrors
];

// Product validation rules
const productValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Product name must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

  body('price').notEmpty().withMessage('Price is required').isFloat({ min: 0 }),

  body('stock').notEmpty().withMessage('Stock quantity is required').isInt({ min: 0 }),

  body('unit').optional().isIn(['kg', 'g', 'piece', 'pack']).withMessage('Invalid unit'),

  body('category').optional().isMongoId().withMessage('Invalid category ID'),

  body('brand').optional().trim(),

  handleValidationErrors
];

// Order validation rules
const orderValidator = [
  body('addressId')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isMongoId().withMessage('Invalid address ID'),

  body('deliverySlot').optional().isISO8601().withMessage('Invalid delivery slot'),

  body('paymentMethod')
    .trim()
    .notEmpty().withMessage('Payment method is required')
    .isIn(['razorpay', 'cod']).withMessage('Invalid payment method'),

  handleValidationErrors
];

// Category validation rules
const categoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),

  body('description').optional().trim(),

  body('image').optional().isURL().withMessage('Invalid image URL'),

  body('parentCategory').optional().isMongoId().withMessage('Invalid parent category ID'),

  handleValidationErrors
];

module.exports = {
  registerValidator,
  loginValidator,
  addressValidator,
  productValidator,
  orderValidator,
  categoryValidator,
  handleValidationErrors
};
