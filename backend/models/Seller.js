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
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
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
