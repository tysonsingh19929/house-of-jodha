import Seller from '../models/Seller.js';

export const seedSellers = async () => {
  try {
    // Check if sellers already exist
    const existingSellers = await Seller.countDocuments();
    if (existingSellers > 0) {
      console.log('Sellers already exist, skipping seed');
      return;
    }

    // Create demo sellers
    const sellers = [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        businessName: 'Super Admin',
        role: 'admin',
        verified: true
      },
      {
        name: 'Priya Textiles',
        email: 'seller@example.com',
        password: 'seller123',
        businessName: 'Priya Textiles',
        role: 'seller',
        verified: true
      },
      {
        name: 'Elegant Wear',
        email: 'seller2@example.com',
        password: 'seller456',
        businessName: 'Elegant Wear',
        role: 'seller',
        verified: true
      }
    ];

    await Seller.insertMany(sellers);
    console.log('Demo sellers created successfully');
  } catch (error) {
    console.error('Error seeding sellers:', error);
  }
};
