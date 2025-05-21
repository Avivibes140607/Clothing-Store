const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [8, 'Product price cannot exceed 8 characters'],
    default: 0.0
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Clothing',
        'Electronics',
        'Toys',
        'Home & Kitchen',
        'Books',
        'Beauty & Health',
        'Sports',
        'Others'
      ],
      message: 'Please select correct category for product'
    }
  },
  brand: {
    type: String,
    required: [true, 'Please enter product brand']
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [5, 'Product stock cannot exceed 5 characters'],
    default: 0
  },
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema); 