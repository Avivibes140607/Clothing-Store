const products = [
  { 
    name: 'Cartoon Astronaut T-Shirt', 
    description: 'High-quality cotton t-shirt with astronaut design. Made with premium materials for comfort and durability.',
    price: 78, 
    images: [{ url: '/images/products/f1.jpg' }],
    category: 'Clothing',
    brand: 'adidas', 
    stock: 15,
    ratings: 4.5,
    numReviews: 12,
    featured: true
  },
  { 
    name: 'Floral Pattern Shirt', 
    description: 'Beautiful floral pattern shirt for casual wear. Perfect for summer days and casual outings.',
    price: 85, 
    images: [{ url: '/images/products/f2.jpg' }],
    category: 'Clothing',
    brand: 'Nike', 
    stock: 20,
    ratings: 4.2,
    numReviews: 8,
    featured: true
  },
  { 
    name: 'Printed Flowers Shirt', 
    description: 'Elegant shirt with printed flower design. Made from breathable fabric ideal for daily wear.',
    price: 68, 
    images: [{ url: '/images/products/f3.jpg' }],
    category: 'Clothing',
    brand: 'Puma', 
    stock: 10,
    ratings: 4.0,
    numReviews: 6,
    featured: false
  },
  { 
    name: 'White Floral Dress', 
    description: 'Beautiful white dress with floral patterns. Perfect for summer days and casual events.',
    price: 78, 
    images: [{ url: '/images/products/f4.jpg' }],
    category: 'Clothing',
    brand: 'Zara', 
    stock: 12,
    ratings: 4.3,
    numReviews: 9,
    featured: false
  },
  { 
    name: 'Interactive Learning Robot', 
    description: 'Educational robot toy that teaches programming concepts through fun interactive games.',
    price: 129.99, 
    images: [{ url: '/images/products/t1.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 8,
    ratings: 4.8,
    numReviews: 15,
    featured: true
  },
  { 
    name: 'Building Blocks Set', 
    description: 'Creative building blocks set with 250 pieces for endless construction possibilities.',
    price: 45.99, 
    images: [{ url: '/images/products/t2.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 25,
    ratings: 4.6,
    numReviews: 18,
    featured: true
  },
  { 
    name: 'Science Experiment Kit', 
    description: 'Educational science kit with 20 fun experiments for young scientists to explore and learn.',
    price: 58.99, 
    images: [{ url: '/images/products/t3.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 15,
    ratings: 4.7,
    numReviews: 11,
    featured: false
  },
  { 
    name: 'Remote Control Car', 
    description: 'High-speed remote control car with rechargeable battery and all-terrain capabilities.',
    price: 89.99, 
    images: [{ url: '/images/products/t4.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 10,
    ratings: 4.5,
    numReviews: 14,
    featured: false
  },
  // New products
  { 
    name: 'Wooden Puzzle Set', 
    description: 'Classic wooden puzzle set with various difficulty levels to challenge minds of all ages.',
    price: 34.99, 
    images: [{ url: '/images/products/t5.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 18,
    ratings: 4.4,
    numReviews: 7,
    featured: false
  },
  { 
    name: 'Musical Keyboard for Kids', 
    description: 'Colorful beginner keyboard with 37 keys, multiple instrument sounds, and learning mode.',
    price: 49.99, 
    images: [{ url: '/images/products/t6.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 12,
    ratings: 4.3,
    numReviews: 9,
    featured: false
  },
  { 
    name: 'Dinosaur Figure Collection', 
    description: 'Set of 12 realistic dinosaur figures with informational cards about each species.',
    price: 29.99, 
    images: [{ url: '/images/products/t7.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 22,
    ratings: 4.7,
    numReviews: 16,
    featured: true
  },
  { 
    name: 'Deluxe Art Set', 
    description: 'Complete art kit with 120 pieces including pencils, markers, paints, and sketchpad.',
    price: 42.99, 
    images: [{ url: '/images/products/t8.jpg' }],
    category: 'Toys',
    brand: 'MS Toys', 
    stock: 14,
    ratings: 4.9,
    numReviews: 13,
    featured: true
  },
  { 
    name: 'Smart Watch for Kids', 
    description: 'Child-friendly smartwatch with GPS tracking, games, camera, and parental controls.',
    price: 69.99, 
    images: [{ url: '/images/products/e1.jpg' }],
    category: 'Electronics',
    brand: 'MS Tech', 
    stock: 9,
    ratings: 4.6,
    numReviews: 12,
    featured: true
  },
  { 
    name: 'Portable Bluetooth Speaker', 
    description: 'Compact waterproof Bluetooth speaker with 12-hour battery life and vibrant sound.',
    price: 55.99, 
    images: [{ url: '/images/products/e2.jpg' }],
    category: 'Electronics',
    brand: 'MS Tech', 
    stock: 17,
    ratings: 4.4,
    numReviews: 10,
    featured: false
  }
];

module.exports = products; 