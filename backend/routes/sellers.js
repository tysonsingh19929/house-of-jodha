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
    const { name, email, password, businessName, phone } = req.body;

    // Check if seller exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Ensure unique seller name and business name (case-insensitive)
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existingName = await Seller.findOne({ name: { $regex: new RegExp(`^${escapeRegex(name)}$`, 'i') } });
    if (existingName) {
      return res.status(400).json({ message: 'Seller name already taken. Please choose a unique name.' });
    }
    const existingBusiness = await Seller.findOne({ businessName: { $regex: new RegExp(`^${escapeRegex(businessName)}$`, 'i') } });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business name already taken. Please choose a unique business name.' });
    }

    // Generate URL-friendly slug from business name
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existingSlug = await Seller.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ message: 'Business name results in a duplicate store URL. Please choose another.' });
    }

    const seller = new Seller({
      name,
      email,
      password, // In production, hash this with bcrypt
      businessName,
      phone,
      slug,
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
        businessName: savedSeller.businessName,
        phone: savedSeller.phone,
        slug: savedSeller.slug
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
        phone: seller.phone,
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

// Get seller store by slug (Public endpoint for subdomains)
router.get('/store/:slug', async (req, res) => {
  try {
    const seller = await Seller.findOne({ slug: req.params.slug }).select('-password');
    if (!seller) return res.status(404).json({ message: 'Store not found' });
    res.json(seller);
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
    const { name, businessName, ...otherData } = req.body;
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const updatePayload = { name, businessName, ...otherData };

    if (name) {
      const existingName = await Seller.findOne({ _id: { $ne: req.params.id }, name: { $regex: new RegExp(`^${escapeRegex(name)}$`, 'i') } });
      if (existingName) return res.status(400).json({ message: 'Seller name already taken. Please choose a unique name.' });
    }
    if (businessName) {
      const existingBusiness = await Seller.findOne({ _id: { $ne: req.params.id }, businessName: { $regex: new RegExp(`^${escapeRegex(businessName)}$`, 'i') } });
      if (existingBusiness) return res.status(400).json({ message: 'Business name already taken. Please choose a unique business name.' });

      // Also update the slug if business name changes
      const newSlug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existingSlug = await Seller.findOne({ _id: { $ne: req.params.id }, slug: newSlug });
      if (existingSlug) {
        return res.status(400).json({ message: 'Business name results in a duplicate store URL. Please choose another.' });
      }
      updatePayload.slug = newSlug;
    }

    const seller = await Seller.findByIdAndUpdate(req.params.id, updatePayload, { new: true }).select('-password');
    res.json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
