const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for API testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Sample user data
const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    isAdmin: false
  }
];

// User authentication routes
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: `${user._id}_${Date.now()}`
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const userExists = users.find(u => u.email === email);
  
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  
  const newUser = {
    _id: `${users.length + 1}`,
    name,
    email,
    password,
    isAdmin: false
  };
  
  users.push(newUser);
  
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: `${newUser._id}_${Date.now()}`
  });
});

app.get('/api/users/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const userId = token.split('_')[0];
    const user = users.find(u => u._id === userId);
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

// Sample products API route
app.get('/api/products', (req, res) => {
  const products = [
    { 
      id: '1', 
      name: 'Cartoon Astronaut T-Shirt', 
      category: 'T-Shirts',
      brand: 'adidas', 
      price: 78, 
      rating: 4.5,
      reviews: 12,
      countInStock: 15,
      image: '/images/products/f1.jpg',
      description: 'High-quality cotton t-shirt with astronaut design'
    },
    { 
      id: '2', 
      name: 'Floral Pattern Shirt', 
      category: 'Shirts',
      brand: 'Nike', 
      price: 85, 
      rating: 4.2,
      countInStock: 20,
      image: '/images/products/f2.jpg',
      description: 'Beautiful floral pattern shirt for casual wear'
    },
    { 
      id: '3', 
      name: 'Printed Flowers Shirt', 
      category: 'Shirts',
      brand: 'Puma', 
      price: 68, 
      rating: 4.0,
      countInStock: 10,
      image: '/images/products/f3.jpg',
      description: 'Elegant shirt with printed flower design'
    }
  ];
  
  res.json(products);
});

// Sample product detail API route
app.get('/api/products/:id', (req, res) => {
  const product = { 
    id: req.params.id, 
    name: 'Cartoon Astronaut T-Shirt', 
    category: 'T-Shirts',
    brand: 'adidas', 
    price: 78, 
    rating: 4.5,
    reviews: 12,
    countInStock: 15,
    image: '/images/products/f1.jpg',
    description: 'High-quality cotton t-shirt with astronaut design. Made with premium materials for comfort and durability.'
  };
  
  res.json(product);
});

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 