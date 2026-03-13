const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

wishlistSchema.methods.addItem = function(productId) {
  const exists = this.items.find(item => 
    item.product.toString() === productId.toString()
  );
  
  if (!exists) {
    this.items.push({ product: productId });
  }
  
  return this.save();
};

wishlistSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  
  return this.save();
};

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
