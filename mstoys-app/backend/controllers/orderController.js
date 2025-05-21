const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      appliedCoupon
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Create new order
    const orderData = {
      user: req.user._id,
      orderItems: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity || item.qty,
        image: item.image,
        price: item.price,
        product: item.product || item.id
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    };

    // Handle coupon if applied
    let discountAmount = 0;
    if (appliedCoupon && appliedCoupon.code) {
      // Get coupon from database to ensure validity
      const coupon = await Coupon.findOne({ code: appliedCoupon.code.toUpperCase() });
      
      if (coupon && coupon.isValid() && itemsPrice >= coupon.minPurchase) {
        // Calculate discount amount
        if (coupon.type === 'percentage') {
          discountAmount = (coupon.discount / 100) * itemsPrice;
        } else {
          // Fixed amount discount
          discountAmount = Math.min(coupon.discount, itemsPrice);
        }
        
        // Add coupon to order
        orderData.coupon = {
          code: coupon.code,
          type: coupon.type,
          discount: coupon.discount,
          couponRef: coupon._id
        };
        
        orderData.discountAmount = discountAmount;
        
        // Update coupon usage count
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    const order = await Order.create(orderData);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.orderStatus = 'Delivered';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = status;
      
      // If status is "Delivered", automatically update delivery status
      if (status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      
      // If status is "Cancelled", handle inventory restoration
      if (status === 'Cancelled' && !order.isCancelled) {
        // For each order item, restore the stock
        for (const item of order.orderItems) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
        order.isCancelled = true;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus
}; 