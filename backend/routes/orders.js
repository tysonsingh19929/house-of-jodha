import express from 'express';
import Order from '../models/Order.js';
import Seller from '../models/Seller.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/create', async (req, res) => {
  try {
    const orderData = { ...req.body };
    
    // Check if sellerId is provided. If not, default to the sellerId of the first item
    let sellerId = orderData.sellerId || 'admin';
    if (!orderData.sellerId && orderData.items && orderData.items.length > 0) {
      const firstItem = orderData.items[0];
      if (firstItem.sellerId) {
        sellerId = firstItem.sellerId;
      }
    }
    
    orderData.sellerId = sellerId;

    // Fetch the seller's profile to retrieve their individual commission rate
    let commissionPercentage = 10; // Default platform rate
    if (sellerId !== 'admin') {
      try {
        const seller = await Seller.findById(sellerId);
        if (seller) {
          commissionPercentage = seller.commissionPercentage !== undefined ? seller.commissionPercentage : 10;
        }
      } catch (e) {
        console.error("Failed to fetch seller commission details, using default:", e);
      }
    } else {
      commissionPercentage = 0; // Admin sales have no platform commission fee
    }

    orderData.commissionPercentage = commissionPercentage;
    orderData.commissionAmount = Math.round(Number(orderData.totalAmount || 0) * (commissionPercentage / 100));

    const order = new Order(orderData);
    const savedOrder = await order.save();

    // Automatically decrement product stock levels
    if (orderData.items && orderData.items.length > 0) {
      for (const item of orderData.items) {
        if (item.productId) {
          try {
            await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stock: -Math.abs(Number(item.quantity || 1)) } }
            );
          } catch (err) {
            console.error(`Failed to update stock for product ${item.productId}:`, err);
          }
        }
      }
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get orders for a specific seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.sellerId }).sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
