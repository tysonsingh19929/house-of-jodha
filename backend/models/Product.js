import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Lehenga', 'Saree', 'Anarkali', 'Salwar Kameez', 'Gharara', 'Sharara']
  },
  occasions: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  images: {
    type: [String],
    default: []
  },
  videoUrl: String,
  stock: {
    type: Number,
    default: 0
  },
  material: String,
  fabricDetails: {
    top: String,
    bottom: String,
    dupatta: String,
    blouse: String,
    saree: String
  },
  care: String,
  embroidery: String,
  deliveryType: String,
  deliveryDays: String,
  maxBustSize: String,
  freeShipping: {
    type: Boolean,
    default: false
  },
  sellerId: {
    type: String,
    required: true
  },
  sellerName: {
    type: String,
    required: true
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

export default mongoose.model('Product', productSchema);
