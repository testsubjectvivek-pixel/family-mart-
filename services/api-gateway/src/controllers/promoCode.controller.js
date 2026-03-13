const PromoCode = require('../models/PromoCode.model');

// @desc    Validate promo code
// @route   POST /api/promo/validate
// @access  Public
const validatePromoCode = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }

    // Check if promo is valid
    const now = new Date();
    if (!promo.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This promo code is no longer active'
      });
    }

    if (now < promo.validFrom) {
      return res.status(400).json({
        success: false,
        message: 'This promo code is not yet valid'
      });
    }

    if (now > promo.validUntil) {
      return res.status(400).json({
        success: false,
        message: 'This promo code has expired'
      });
    }

    if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'This promo code has reached its usage limit'
      });
    }

    if (orderAmount && orderAmount < promo.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${promo.minOrderAmount}`
      });
    }

    // Calculate discount
    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = (orderAmount * promo.discountValue) / 100;
      if (promo.maxDiscountAmount && discount > promo.maxDiscountAmount) {
        discount = promo.maxDiscountAmount;
      }
    } else {
      discount = promo.discountValue;
    }

    res.json({
      success: true,
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discount: Math.round(discount)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Apply promo code (increment usage count)
// @route   POST /api/promo/apply
// @access  Private
const applyPromoCode = async (req, res) => {
  try {
    const { code } = req.body;

    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (promo) {
      promo.usageCount += 1;
      await promo.save();
    }

    res.json({
      success: true,
      message: 'Promo code applied successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all promo codes (Admin)
// @route   GET /api/promo
// @access  Private (Admin)
const getPromoCodes = async (req, res) => {
  try {
    const promos = await PromoCode.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: promos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create promo code (Admin)
// @route   POST /api/promo
// @access  Private (Admin)
const createPromoCode = async (req, res) => {
  try {
    const { code, description, discountType, discountValue, minOrderAmount, maxDiscountAmount, usageLimit, isActive, validFrom, validUntil, applicableCategories } = req.body;

    const promo = await PromoCode.create({
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      usageLimit,
      isActive,
      validFrom,
      validUntil,
      applicableCategories
    });

    res.status(201).json({
      success: true,
      message: 'Promo code created successfully',
      data: promo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update promo code (Admin)
// @route   PUT /api/promo/:id
// @access  Private (Admin)
const updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const promo = await PromoCode.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }

    res.json({
      success: true,
      message: 'Promo code updated successfully',
      data: promo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete promo code (Admin)
// @route   DELETE /api/promo/:id
// @access  Private (Admin)
const deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;

    const promo = await PromoCode.findByIdAndDelete(id);

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }

    res.json({
      success: true,
      message: 'Promo code deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  validatePromoCode,
  applyPromoCode,
  getPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode
};
