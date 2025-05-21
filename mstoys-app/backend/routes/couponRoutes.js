const express = require('express');
const router = express.Router();
const { 
  createCoupon, 
  getCoupons, 
  getCouponById, 
  updateCoupon, 
  deleteCoupon, 
  validateCoupon 
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/validate', validateCoupon);

// Admin routes
router.route('/')
  .get(protect, admin, getCoupons)
  .post(protect, admin, createCoupon);

router.route('/:id')
  .get(protect, admin, getCouponById)
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon);

module.exports = router; 