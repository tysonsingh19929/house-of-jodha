import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seller from './models/Seller.js';
import Product from './models/Product.js';

dotenv.config();

const mongoUri = (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<db_password>'))
  ? process.env.MONGODB_URI
  : (process.env.MONGO_URI && !process.env.MONGO_URI.includes('<db_password>'))
    ? process.env.MONGO_URI
    : null;

if (!mongoUri) {
  console.error('Error: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

async function runMigration() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // 1. Migrate Sellers (Branding configuration initialization)
    console.log('Migrating sellers...');
    const sellers = await Seller.find();
    let migratedSellers = 0;
    
    for (const seller of sellers) {
      if (!seller.branding || seller.branding.logoUrl === undefined || !seller.phone) {
        seller.phone = seller.phone || '9999999999';
        seller.branding = {
          primaryColor: seller.branding?.primaryColor || '#B8448D',
          accentColor: seller.branding?.accentColor || '#D4AF37',
          darkBg: seller.branding?.darkBg || '#0b090f',
          lightBg: seller.branding?.lightBg || '#fafafa',
          logoUrl: '',
          bannerUrl: '',
          faviconUrl: ''
        };
        await seller.save();
        migratedSellers++;
        console.log(`Updated branding for seller: ${seller.name} (${seller.businessName})`);
      }
    }
    console.log(`Seller migration finished: ${migratedSellers} updated.`);

    // 2. Migrate Products (Rental rates & availability slots initialization)
    console.log('Migrating products...');
    const products = await Product.find();
    let migratedProducts = 0;

    for (const product of products) {
      // Check if product lacks initialized rental rates
      if (!product.rentalRates || !product.rentalRates.threeDay) {
        // Ensembles like Lehengas, Sarees, Ghararas, Shararas, and Bridal sets are rentable
        const rentableCategories = ['Lehenga', 'Saree', 'Gharara', 'Sharara', 'Bridal Sets'];
        const isRentalCategory = rentableCategories.includes(product.category);
        
        product.isForRent = isRentalCategory;
        product.isForSale = true; // Still available for purchase
        
        const price = product.price || 1000;
        product.rentalRates = {
          threeDay: Math.round(price * 0.15), // 15% AOV
          sevenDay: Math.round(price * 0.25), // 25% AOV
          tenDay: Math.round(price * 0.35)    // 35% AOV
        };
        // 40% of standard price is held as refundable security deposit
        product.securityDeposit = Math.round(price * 0.40);
        product.rentedDates = [];

        await product.save();
        migratedProducts++;
        console.log(`Updated rental settings for product: ${product.name} (Rentable: ${product.isForRent})`);
      }
    }
    console.log(`Product migration finished: ${migratedProducts} updated.`);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed with error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

runMigration();
