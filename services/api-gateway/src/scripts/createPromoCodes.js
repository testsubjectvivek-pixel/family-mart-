require('dotenv').config();
const mongoose = require('mongoose');
const PromoCode = require('../models/PromoCode.model');

const promoCodesData = [
  {
    code: 'FAMILY20',
    description: '20% off on your first order',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 300,
    maxDiscountAmount: 100,
    usageLimit: 1000,
    isActive: true,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
  },
  {
    code: 'FIRST50',
    description: 'Flat ₹50 off on orders above ₹500',
    discountType: 'fixed',
    discountValue: 50,
    minOrderAmount: 500,
    usageLimit: 500,
    isActive: true,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
  },
  {
    code: 'SAVE10',
    description: '10% off on all orders',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 0,
    maxDiscountAmount: 50,
    usageLimit: null,
    isActive: true,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  }
];

const createPromoCodes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    // Check if promo codes already exist
    const existingPromoCodes = await PromoCode.countDocuments();
    if (existingPromoCodes > 0) {
      console.log('Promo codes already exist. Skipping...');
      process.exit(0);
    }

    // Create promo codes
    const createdPromoCodes = await PromoCode.insertMany(promoCodesData);

    console.log(`✓ Created ${createdPromoCodes.length} promo codes`);

    createdPromoCodes.forEach(promo => {
      console.log(`  - ${promo.code}: ${promo.discountType === 'percentage' ? promo.discountValue + '%' : '₹' + promo.discountValue} off`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating promo codes:', error);
    process.exit(1);
  }
};

createPromoCodes();
