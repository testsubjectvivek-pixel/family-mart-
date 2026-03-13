const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative']
  },
  discountedPrice: {
    type: Number,
    min: [0, 'Discounted price cannot be negative'],
    validate: {
      validator: function(v) {
        return !v || v < this.price;
      },
      message: 'Discounted price must be less than regular price'
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide category']
  },
  images: [{
    url: String,
    publicId: String
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  minStockAlert: {
    type: Number,
    default: 10
  },
  unit: {
    type: String,
    enum: ['kg', 'g', 'piece', 'pack'],
    default: 'piece'
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  weight: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  GSTRate: {
    type: Number,
    min: [0, 'GST rate cannot be negative'],
    max: [28, 'GST rate cannot exceed 28%']
  },
  ratingsAverage: {
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
    default: 0
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for search and filtering
productSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ slug: 1 }, { unique: true, sparse: true });

// Virtual for availability status
productSchema.virtual('isInStock').get(function() {
  return this.stock > 0;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.discountedPrice) return 0;
  return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
});

// Populate category on query
productSchema.pre('find', function() {
  this.populate('category');
});

productSchema.pre('findOne', function() {
  this.populate('category');
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
