const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
cartSchema.index({ user: 1 });

// Pre-find hook to populate items
cartSchema.pre('find', function(next) {
  this.populate('items.product');
  next();
});

// Pre-save hook to calculate totals
cartSchema.pre('save', function(next) {
  if (this.items.length > 0) {
    this.items.forEach(item => {
      item.price = item.product.price * item.quantity;
    });
    
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  } else {
    this.totalPrice = 0;
    this.totalItems = 0;
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
