import express from 'express';

const router = express.Router();

// Get cart (session-based for now)
router.get('/', (req, res) => {
  res.json({ message: 'Get cart - use localStorage on frontend' });
});

// Add to cart
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  res.json({ message: 'Item added to cart', productId, quantity });
});

// Remove from cart
router.delete('/remove/:productId', (req, res) => {
  res.json({ message: 'Item removed from cart' });
});

// Update cart item
router.put('/update/:productId', (req, res) => {
  const { quantity } = req.body;
  res.json({ message: 'Cart updated', quantity });
});

export default router;
