const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Routes imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const couponRoutes = require('./routes/couponRoutes');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Try to connect to MongoDB but don't stop server if it fails
try {
  connectDB();
  console.log('Attempting to connect to MongoDB...');
} catch (error) {
  console.error(`MongoDB connection error: ${error.message}`);
  console.log('Server will continue without database connection');
}

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);

// Root route for API testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Create uploads folder
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 