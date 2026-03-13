const Referral = require('../models/Referral.model');
const User = require('../models/User.model');
const Wallet = require('../models/Wallet.model');

const referralController = {
  getReferralCode: async (req, res) => {
    try {
      let referral = await Referral.findOne({ referredUserId: req.user.id });
      
      if (!referral) {
        const user = await User.findById(req.user.id);
        const code = `FM${user.phone.slice(-6)}${Date.now().toString().slice(-4)}`;
        
        referral = await Referral.create({
          referrerId: req.user.id,
          referralCode: code
        });
      }
      
      res.json({
        success: true,
        data: { referralCode: referral.referralCode }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  applyReferralCode: async (req, res) => {
    try {
      const { referralCode } = req.body;
      
      if (!referralCode) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a referral code'
        });
      }
      
      const existingReferral = await Referral.findOne({ referredUserId: req.user.id });
      if (existingReferral) {
        return res.status(400).json({
          success: false,
          message: 'You have already used a referral code'
        });
      }
      
      const referrerReferral = await Referral.findOne({ referralCode: referralCode.toUpperCase() });
      
      if (!referrerReferral) {
        return res.status(404).json({
          success: false,
          message: 'Invalid referral code'
        });
      }
      
      if (referrerReferral.referredUserId.toString() === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'You cannot refer yourself'
        });
      }
      
      await Referral.create({
        referrerId: referrerReferral.referrerId,
        referredUserId: req.user.id,
        referralCode: referralCode.toUpperCase()
      });
      
      res.json({
        success: true,
        message: 'Referral code applied successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getReferralStats: async (req, res) => {
    try {
      const referrals = await Referral.find({ referrerId: req.user.id });
      
      const stats = {
        totalReferrals: referrals.length,
        successfulReferrals: referrals.filter(r => r.referrerBonusStatus === 'credited').length,
        pendingReferrals: referrals.filter(r => r.referrerBonusStatus === 'pending').length,
        totalEarnings: referrals
          .filter(r => r.referrerBonusStatus === 'credited')
          .reduce((sum, r) => sum + r.referrerBonus, 0)
      };
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  creditReferralBonus: async (referredUserId, orderAmount) => {
    try {
      const referral = await Referral.findOne({ referredUserId });
      
      if (!referral || referral.referredBonusStatus !== 'pending') {
        return;
      }
      
      if (orderAmount < 200) {
        return;
      }
      
      referral.firstOrderId = referredUserId;
      referral.firstOrderAmount = orderAmount;
      referral.referredBonusStatus = 'credited';
      referral.referrerBonusStatus = 'credited';
      referral.bonusCreditedAt = new Date();
      await referral.save();
      
      let referredWallet = await Wallet.findOne({ userId: referredUserId });
      if (!referredWallet) {
        referredWallet = await Wallet.create({ userId: referredUserId });
      }
      await referredWallet.addTransaction('credit', referral.referredBonus, 'Referral signup bonus');
      
      let referrerWallet = await Wallet.findOne({ userId: referral.referrerId });
      if (!referrerWallet) {
        referrerWallet = await Wallet.create({ userId: referral.referrerId });
      }
      await referrerWallet.addTransaction('credit', referral.referrerBonus, `Referral bonus - ${referral.referredUserId}`);
      
    } catch (error) {
      console.error('Error crediting referral bonus:', error);
    }
  }
};

module.exports = referralController;
