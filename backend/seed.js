import Seller from '../models/Seller.js';
import Product from '../models/Product.js';

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

export const seedProducts = async () => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('Products already exist, skipping seed');
      return;
    }

    // Sample women's clothing products with images
    const products = [
      // Lehenga Collection
      {
        name: 'Beige Gold Tissue Silk Embroidered Lehenga Set',
        category: 'Lehenga',
        price: 8999,
        originalPrice: 12999,
        description: 'Elegant beige and gold tissue silk lehenga with intricate embroidery work. Perfect for weddings and festive occasions.',
        image: '/images/lehenga/1.jpg',
        stock: 5,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Red Silk Hand Embroidered Bridal Lehenga',
        category: 'Lehenga',
        price: 15999,
        originalPrice: 21999,
        description: 'Luxurious red silk bridal lehenga with hand embroidered details and mirror work. Ideal for weddings.',
        image: '/images/lehenga/2.jpg',
        stock: 3,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Blush Pink Tissue Silk Embroidered Bridal Lehenga',
        category: 'Lehenga',
        price: 14999,
        originalPrice: 19999,
        description: 'Soft blush pink bridal lehenga with tissue silk and embroidered choli. Stunning for wedding ceremonies.',
        image: '/images/lehenga/3.jpg',
        stock: 4,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Maroon Tissue Silk Bridal Lehenga Choli Set',
        category: 'Lehenga',
        price: 13999,
        originalPrice: 18999,
        description: 'Deep maroon bridal lehenga with ornate embroidery and matching choli. Complete bridal ensemble.',
        image: '/images/lehenga/4.jpg',
        stock: 3,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Parrot Green Floral Printed Lehenga Set',
        category: 'Lehenga',
        price: 7999,
        originalPrice: 11999,
        description: 'Vibrant parrot green lehenga with floral prints and light embroidery. Perfect for celebrations.',
        image: '/images/lehenga/5.jpg',
        stock: 6,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Magenta Silk Printed & Embroidered Lehenga Set',
        category: 'Lehenga',
        price: 8499,
        originalPrice: 12499,
        description: 'Bold magenta lehenga with silk prints and embroidered details. Eye-catching and elegant design.',
        image: '/images/lehenga/6.jpg',
        stock: 5,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },

      // Saree Collection
      {
        name: 'Gold Sequined Silk Bridal Saree',
        category: 'Saree',
        price: 12999,
        originalPrice: 17999,
        description: 'Luxurious gold sequined silk saree with blouse. Perfect for bridal and festive occasions.',
        image: '/images/saree/1.jpg',
        stock: 4,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Ivory & Gold Embroidered Bridal Saree',
        category: 'Saree',
        price: 14999,
        originalPrice: 19999,
        description: 'Elegant ivory saree with gold embroidery and beadwork. Traditional bridal attire.',
        image: '/images/saree/2.jpg',
        stock: 3,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Green Luxe Fabric Embroidered Saree',
        category: 'Saree',
        price: 9999,
        originalPrice: 14999,
        description: 'Premium green saree with luxe fabric and embroidered pallu. Great for formal events.',
        image: '/images/saree/3.jpg',
        stock: 5,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Bronze Maroon Silk Embroidered Designer Saree',
        category: 'Saree',
        price: 10999,
        originalPrice: 15999,
        description: 'Rich bronze maroon silk saree with designer embroidery. Sophisticated and timeless.',
        image: '/images/saree/4.jpg',
        stock: 4,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },

      // Anarkali Collection
      {
        name: 'Designer Anarkali Suit - Midnight Blue',
        category: 'Anarkali',
        price: 6999,
        originalPrice: 9999,
        description: 'Beautiful midnight blue anarkali suit with embroidered yoke and hem. Comfortable and stylish.',
        image: '/images/anarkali/1.jpg',
        stock: 7,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Emerald Green Anarkali with Dupatta',
        category: 'Anarkali',
        price: 5999,
        originalPrice: 8999,
        description: 'Vibrant emerald green anarkali suit with matching dupatta. Perfect for weddings and festivities.',
        image: '/images/anarkali/2.jpg',
        stock: 8,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Coral Pink Embroidered Anarkali Suit',
        category: 'Anarkali',
        price: 5499,
        originalPrice: 7999,
        description: 'Lovely coral pink anarkali with delicate embroidery. Comfortable fit for all occasions.',
        image: '/images/anarkali/3.jpg',
        stock: 6,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },

      // Salwar Kameez Collection
      {
        name: 'Salwar Kameez - Emerald Green',
        category: 'Salwar Kameez',
        price: 4999,
        originalPrice: 6999,
        description: 'Classic emerald green salwar kameez with traditional embroidery. Timeless ethnic wear.',
        image: '/images/salwar/1.jpg',
        stock: 10,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Purple Silk Salwar Kameez Set',
        category: 'Salwar Kameez',
        price: 5499,
        originalPrice: 7999,
        description: 'Silk blend purple salwar kameez with embroidered neck. Perfect daily wear option.',
        image: '/images/salwar/2.jpg',
        stock: 9,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Cream & Gold Embroidered Salwar Suit',
        category: 'Salwar Kameez',
        price: 6499,
        originalPrice: 8999,
        description: 'Elegant cream salwar suit with gold embroidery. Versatile for celebrations.',
        image: '/images/salwar/3.jpg',
        stock: 7,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },

      // Gharara Collection
      {
        name: 'Ivory Chinon Silk Gharara Set',
        category: 'Gharara',
        price: 11999,
        originalPrice: 16999,
        description: 'Sophisticated ivory chinon silk gharara with intricate embroidery. Elegant bridal option.',
        image: '/images/gharara/1.jpg',
        stock: 3,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Rose Pink Embroidered Gharara Suit',
        category: 'Gharara',
        price: 10999,
        originalPrice: 15999,
        description: 'Delicate rose pink gharara with embroidered details. Perfect for weddings.',
        image: '/images/gharara/2.jpg',
        stock: 4,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Wine Red Silk Gharara with Dupatta',
        category: 'Gharara',
        price: 12499,
        originalPrice: 17999,
        description: 'Rich wine red silk gharara with matching dupatta. Luxurious bridal wear.',
        image: '/images/gharara/3.jpg',
        stock: 3,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },

      // Sharara Collection
      {
        name: 'Sharara Suit - Wine Red',
        category: 'Sharara',
        price: 9999,
        originalPrice: 14999,
        description: 'Glamorous wine red sharara suit with embroidered details. Perfect for festive celebrations.',
        image: '/images/sharara/1.jpg',
        stock: 5,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      },
      {
        name: 'Gold & Green Sharara Ensemble',
        category: 'Sharara',
        price: 10499,
        originalPrice: 15499,
        description: 'Beautiful gold and green sharara with ornate embroidery. Stunning festive wear.',
        image: '/images/sharara/2.jpg',
        stock: 4,
        sellerId: '507f1f77bcf86cd799439012',
        sellerName: 'Elegant Wear'
      },
      {
        name: 'Blush Pink Sharara with Dupatta',
        category: 'Sharara',
        price: 9499,
        originalPrice: 13999,
        description: 'Soft blush pink sharara with matching dupatta. Elegant for celebrations.',
        image: '/images/sharara/3.jpg',
        stock: 6,
        sellerId: '507f1f77bcf86cd799439011',
        sellerName: 'Priya Textiles'
      }
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} women's clothing products created successfully`);
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
