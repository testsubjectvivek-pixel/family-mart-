const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name']
  },
  street: {
    type: String,
    required: [true, 'Please provide street address']
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    default: 'New Delhi'
  },
  pincode: {
    type: String,
    required: [true, 'Please provide pincode'],
    validate: {
      validator: function(v) {
        return /^110\d{3}$/.test(v);
      },
      message: 'Please provide a valid Delhi pincode (110xxx)'
    }
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Please provide a valid 10-digit phone number'
    }
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  landmark: {
    type: String,
    default: ''
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Please provide a valid 10-digit phone number'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    min: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['customer', 'super-admin', 'product-manager', 'order-manager'],
    default: 'customer'
  },
  addresses: [addressSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const bcrypt = require('bcryptjs');
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Virtual for orders
userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
