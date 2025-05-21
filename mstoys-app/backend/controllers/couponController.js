const Coupon = require('../models/couponModel');

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      type,
      discount,
      minPurchase,
      maxUses,
      validFrom,
      validUntil
    } = req.body;

    // Check if coupon already exists
    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    // Create new coupon
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      type,
      discount,
      minPurchase: minPurchase || 0,
      maxUses,
      validFrom: validFrom || Date.now(),
      validUntil: validUntil || null,
      createdBy: req.user._id
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get coupon by ID
// @route   GET /api/coupons/:id
// @access  Private/Admin
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = async (req, res) => {
  try {
    const {
      code,
      type,
      discount,
      minPurchase,
      maxUses,
      active,
      validFrom,
      validUntil
    } = req.body;

    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      // Check if code is being changed and if it already exists
      if (code && code !== coupon.code) {
        const codeExists = await Coupon.findOne({ code: code.toUpperCase() });
        if (codeExists) {
          return res.status(400).json({ message: 'Coupon code already exists' });
        }
        coupon.code = code.toUpperCase();
      }

      coupon.type = type || coupon.type;
      coupon.discount = discount || coupon.discount;
      coupon.minPurchase = minPurchase !== undefined ? minPurchase : coupon.minPurchase;
      coupon.maxUses = maxUses !== undefined ? maxUses : coupon.maxUses;
      coupon.active = active !== undefined ? active : coupon.active;
      coupon.validFrom = validFrom || coupon.validFrom;
      coupon.validUntil = validUntil || coupon.validUntil;

      const updatedCoupon = await coupon.save();
      res.json(updatedCoupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      await coupon.deleteOne();
      res.json({ message: 'Coupon removed' });
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Validate a coupon code
// @route   POST /api/coupons/validate
// @access  Public
const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    // Check if coupon is valid
    if (!coupon.isValid()) {
      return res.status(400).json({ message: 'Coupon is expired or inactive' });
    }

    // Check minimum purchase requirement
    if (cartTotal < coupon.minPurchase) {
      return res.status(400).json({ 
        message: `Minimum purchase of $${coupon.minPurchase} required for this coupon` 
      });
    }

    // Return coupon details
    res.json({
      code: coupon.code,
      type: coupon.type,
      discount: coupon.discount,
      minPurchase: coupon.minPurchase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon
}; 