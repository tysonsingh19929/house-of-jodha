import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  color: String,
  size: String,
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

const attributeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  occasions: { type: [String], default: [] },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  description: String,
  image: String,
  images: { type: [String], default: [] },
  videoUrl: String,
  stock: { type: Number, default: 0 },
  
  // Dynamic Myntra-like Attributes (Replaces hardcoded ones)
  attributes: { type: [attributeSchema], default: [] },
  
  // Myntra-like Variant / SKU system
  variants: { type: [variantSchema], default: [] },

  // Keeping these for backward compatibility with old data & frontend components
  material: String,
  fabricDetails: { top: String, bottom: String, dupatta: String, blouse: String, saree: String },
  metalType: String,
  gemstones: String,
  weight: String,
  plating: String,
  care: String,
  embroidery: String,
  deliveryType: String,
  deliveryDays: String,
  maxBustSize: String,
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  freeShipping: { type: Boolean, default: false },
  
  // General details
  isForRent: { type: Boolean, default: false },
  isForSale: { type: Boolean, default: true },
  rentalRates: { threeDay: Number, sevenDay: Number, tenDay: Number },
  securityDeposit: Number,
  rentedDates: [{ startDate: Date, endDate: Date, orderId: String }],
  
  // Seller info & state
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  status: { type: String, enum: ['draft', 'review', 'active', 'rejected'], default: 'active' },
  styleCode: String, // Equivalent to Group ID

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
