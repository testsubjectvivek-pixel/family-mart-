const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referredUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  referralCode: {
    type: String,
    required: true
  },
  referrerBonus: {
    type: Number,
    default: 50
  },
  referredBonus: {
    type: Number,
    default: 50
  },
  referrerBonusStatus: {
    type: String,
    enum: ['pending', 'credited', 'cancelled'],
    default: 'pending'
  },
  referredBonusStatus: {
    type: String,
    enum: ['pending', 'credited', 'cancelled'],
    default: 'pending'
  },
  firstOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  firstOrderAmount: {
    type: Number,
    default: 0
  },
  bonusCreditedAt: {
    type: Date
  }
}, { timestamps: true });

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
