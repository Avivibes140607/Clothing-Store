const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = await Cart.create({
        user: req.user._id,
        cartItems: []
      });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if quantity is valid
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: []
      });
    }

    // Check if item is already in cart
    const existItem = cart.cartItems.find(
      item => item.product.toString() === productId
    );

    if (existItem) {
      // Update quantity if item exists
      existItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        quantity
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.id;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const cartItem = cart.cartItems.find(item => item._id.toString() === itemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check if product has enough stock
    const product = await Product.findById(cartItem.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Update quantity
    cartItem.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from cart
    cart.cartItems = cart.cartItems.filter(
      item => item._id.toString() !== itemId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = [];
      await cart.save();
    }

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}; 