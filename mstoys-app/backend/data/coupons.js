const coupons = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    discount: 10,
    minPurchase: 50,
    maxUses: 100,
    active: true,
    validFrom: new Date('2023-01-01'),
    validUntil: new Date('2025-12-31')
  },
  {
    code: 'SUMMER20',
    type: 'percentage',
    discount: 20,
    minPurchase: 100,
    maxUses: 50,
    active: true,
    validFrom: new Date('2023-06-01'),
    validUntil: new Date('2023-09-30')
  },
  {
    code: 'FIXED25',
    type: 'fixed',
    discount: 25,
    minPurchase: 150,
    maxUses: 30,
    active: true,
    validFrom: new Date('2023-01-01'),
    validUntil: new Date('2025-12-31')
  }
];

module.exports = coupons; 