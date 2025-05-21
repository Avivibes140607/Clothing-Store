const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please enter coupon code'],
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: [true, 'Please specify the coupon type'],
    enum: {
      values: ['percentage', 'fixed'],
      message: 'Coupon type must be percentage or fixed'
    }
  },
  discount: {
    type: Number,
    required: [true, 'Please enter discount amount'],
    min: [1, 'Discount cannot be less than 1'],
    max: [100, 'Discount cannot exceed 100 for percentage type']
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: [0, 'Minimum purchase amount cannot be negative']
  },
  maxUses: {
    type: Number,
    default: null
  },
  usedCount: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: function() {
      // Default expiry is 30 days from creation date
      const now = new Date();
      now.setDate(now.getDate() + 30);
      return now;
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.active &&
    now >= this.validFrom &&
    now <= this.validUntil &&
    (this.maxUses === null || this.usedCount < this.maxUses)
  );
};

module.exports = mongoose.model('Coupon', couponSchema); 