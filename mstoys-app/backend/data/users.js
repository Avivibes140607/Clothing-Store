const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@mstoys.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    address: {
      street: '123 Admin St',
      city: 'Admin City',
      state: 'AC',
      postalCode: '12345',
      country: 'USA'
    },
    phone: '555-1234'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('john123', 10),
    role: 'user',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02118',
      country: 'USA'
    },
    phone: '555-5678'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('jane123', 10),
    role: 'user',
    address: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    phone: '555-9012'
  }
];

module.exports = users; 