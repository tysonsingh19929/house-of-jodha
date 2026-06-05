import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'seller'],
    default: 'seller'
  },
  businessName: String,
  phone: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true // Allows multiple documents to have a null slug, but unique if it exists
  },
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  branding: {
    primaryColor: { type: String, default: '#B8448D' },
    accentColor: { type: String, default: '#D4AF37' },
    darkBg: { type: String, default: '#0b090f' },
    lightBg: { type: String, default: '#fafafa' },
    logoUrl: String,
    bannerUrl: String,
    faviconUrl: String
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Seller', sellerSchema);
