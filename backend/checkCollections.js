import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seller from './models/Seller.js';
import Product from './models/Product.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

async function check() {
  await mongoose.connect(mongoUri);
  console.log('Connected!');
  
  const productCount = await Product.countDocuments();
  console.log('Total Products:', productCount);
  
  const sampleProduct = await Product.findOne();
  console.log('Sample Product:', JSON.stringify(sampleProduct, null, 2));

  const sellerCount = await Seller.countDocuments();
  console.log('Total Sellers:', sellerCount);
  
  const sampleSeller = await Seller.findOne();
  console.log('Sample Seller:', JSON.stringify(sampleSeller, null, 2));

  await mongoose.disconnect();
}

check();
