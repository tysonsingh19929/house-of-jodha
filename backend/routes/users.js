import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import Seller from '../models/Seller.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, phone, address, city, state, zipCode } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, city, state, zipCode },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, city, state, zipCode } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      state,
      zipCode
    });
    
    const savedUser = await user.save();
    
    // Create token
    const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: savedUser._id, 
        name: savedUser.name, 
        email: savedUser.email,
        phone: savedUser.phone,
        address: savedUser.address,
        city: savedUser.city,
        state: savedUser.state,
        zipCode: savedUser.zipCode
      },
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      message: 'Login successful',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    let account = await User.findOne({ email });
    let accountType = 'user';
    
    if (!account) {
      account = await Seller.findOne({ email });
      accountType = 'seller';
    }
    
    if (!account) {
      return res.status(400).json({ message: 'Account not found with this email' });
    }
    
    // Generate reset token
    const resetToken = jwt.sign({ userId: account._id, accountType }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    let emailSent = false;
    
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset',
          html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        };
        await transporter.sendMail(mailOptions);
        emailSent = true;
      }
    } catch (mailError) {
      console.warn("Email sending failed or skipped:", mailError);
    }
    
    if (emailSent) {
      res.json({ message: 'Password reset email sent' });
    } else {
      res.json({ 
        message: 'Dev mode: Email skipped, use link to reset',
        devResetLink: resetUrl
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    let account;
    if (decoded.accountType === 'seller') {
      account = await Seller.findById(decoded.userId);
    } else {
      account = await User.findById(decoded.userId);
    }
    
    if (!account) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedPassword;
    await account.save();
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default router;
