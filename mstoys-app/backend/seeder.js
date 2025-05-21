const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load models
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const Coupon = require('./models/couponModel');

// Load data
const users = require('./data/users');
const products = require('./data/products');
const coupons = require('./data/coupons');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Coupon.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user reference to products and insert them
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    // Add admin user reference to coupons and insert them
    const sampleCoupons = coupons.map(coupon => {
      return { ...coupon, createdBy: adminUser };
    });
    await Coupon.insertMany(sampleCoupons);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Coupon.deleteMany();

    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 