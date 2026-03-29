import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const query = category && category !== 'All' ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products for specific seller (for dashboard)
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ sellerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  // sellerId and sellerName must be provided
  if (!req.body.sellerId || !req.body.sellerName) {
    return res.status(400).json({ message: 'sellerId and sellerName required' });
  }

  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (only seller who created it or super admin)
router.put('/:id', async (req, res) => {
  try {
    const { sellerId, isSuperAdmin } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check permission: super admin can edit all, others can only edit their own
    if (!isSuperAdmin && product.sellerId !== sellerId) {
      return res.status(403).json({ message: 'Unauthorized: You can only edit your own products' });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (only seller who created it or super admin)
router.delete('/:id', async (req, res) => {
  try {
    const { sellerId, isSuperAdmin } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check permission: super admin can delete all, others can only delete their own
    if (!isSuperAdmin && product.sellerId !== sellerId) {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own products' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
