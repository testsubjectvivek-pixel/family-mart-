const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  refundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  bonusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReferralBonus'
  }
}, { timestamps: true });

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  transactions: [walletTransactionSchema]
}, { timestamps: true });

walletSchema.methods.addTransaction = async function(type, amount, description, meta = {}) {
  this.transactions.push({
    type,
    amount,
    description,
    orderId: meta.orderId,
    refundId: meta.refundId,
    bonusId: meta.bonusId
  });
  
  if (type === 'credit') {
    this.balance += amount;
  } else {
    this.balance -= amount;
  }
  
  return this.save();
};

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
