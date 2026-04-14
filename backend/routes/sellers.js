import express from 'express';
import Seller from '../models/Seller.js';

const router = express.Router();

// Get all sellers (admin only)
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register seller
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, businessName } = req.body;
    
    // Check if seller exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const seller = new Seller({
      name,
      email,
      password, // In production, hash this with bcrypt
      businessName,
      role: 'seller' // Default role
    });
    
    const savedSeller = await seller.save();
    
    res.status(201).json({
      message: 'Seller registered successfully',
      seller: { 
        id: savedSeller._id, 
        name: savedSeller.name, 
        email: savedSeller.email,
        role: savedSeller.role,
        businessName: savedSeller.businessName
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seller login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Simple password check (in production use bcrypt)
    if (seller.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if seller is approved
    if (seller.role !== 'admin' && seller.status === 'pending') {
      return res.status(403).json({ message: 'Your account is pending admin approval' });
    }
    if (seller.role !== 'admin' && seller.status === 'suspended') {
      return res.status(403).json({ message: 'Your account has been suspended' });
    }
    
    res.json({
      message: 'Logged in successfully',
      seller: { 
        id: seller._id, 
        name: seller.name, 
        email: seller.email,
        role: seller.role,
        businessName: seller.businessName,
        status: seller.status
      },
      isSuperAdmin: seller.role === 'admin'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update seller status (admin only - simplified without role middleware for now)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'active', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const seller = await Seller.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    
    res.json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete seller (admin only - simplified)
router.delete('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    
    res.json({ message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get seller profile
router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).select('-password');
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update seller profile
router.put('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
