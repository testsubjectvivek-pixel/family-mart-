const Wallet = require('../models/Wallet.model');

const walletController = {
  getWallet: async (req, res) => {
    try {
      let wallet = await Wallet.findOne({ userId: req.user.id });
      
      if (!wallet) {
        wallet = await Wallet.create({ userId: req.user.id });
      }
      
      res.json({
        success: true,
        data: wallet
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getTransactions: async (req, res) => {
    try {
      const { page = 1, limit = 20, type } = req.query;
      
      let wallet = await Wallet.findOne({ userId: req.user.id });
      
      if (!wallet) {
        return res.json({
          success: true,
          data: [],
          pagination: { page: 1, limit: 20, total: 0 }
        });
      }
      
      let transactions = wallet.transactions.sort((a, b) => b.createdAt - a.createdAt);
      
      if (type) {
        transactions = transactions.filter(t => t.type === type);
      }
      
      const total = transactions.length;
      const skip = (page - 1) * limit;
      transactions = transactions.slice(skip, skip + parseInt(limit));
      
      res.json({
        success: true,
        data: transactions,
        pagination: { page: parseInt(page), limit: parseInt(limit), total }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  addMoney: async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid amount'
        });
      }
      
      let wallet = await Wallet.findOne({ userId: req.user.id });
      
      if (!wallet) {
        wallet = await Wallet.create({ userId: req.user.id });
      }
      
      await wallet.addTransaction('credit', amount, 'Money added to wallet');
      
      wallet = await Wallet.findOne({ userId: req.user.id });
      
      res.json({
        success: true,
        message: 'Money added successfully',
        data: wallet
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getBalance: async (req, res) => {
    try {
      let wallet = await Wallet.findOne({ userId: req.user.id });
      
      if (!wallet) {
        wallet = await Wallet.create({ userId: req.user.id });
      }
      
      res.json({
        success: true,
        data: { balance: wallet.balance }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = walletController;
