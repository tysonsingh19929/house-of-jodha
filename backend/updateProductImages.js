import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diva-clone');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Generate search keywords from product name and category
const generateSearchKeywords = (productName, category) => {
  // Extract color if present
  const colors = [
    'red', 'blue', 'green', 'pink', 'gold', 'silver', 'purple', 'maroon', 'navy',
    'ivory', 'cream', 'beige', 'black', 'white', 'orange', 'yellow', 'teal', 'coral',
    'peach', 'lavender', 'magenta', 'forest', 'royal', 'wine', 'blush', 'dusty',
    'champagne', 'bronze', 'plum', 'mustard', 'indigo', 'mint', 'lemon', 'rose'
  ];
  
  const categoryKeywords = {
    'Lehenga': 'lehenga',
    'Saree': 'saree',
    'Anarkali': 'anarkali',
    'Salwar Kameez': 'salwar kameez',
    'Gharara': 'gharara',
    'Sharara': 'sharara'
  };
  
  let keywords = `${categoryKeywords[category]} Indian ethnic wear`;
  
  const nameLower = productName.toLowerCase();
  const foundColor = colors.find(color => nameLower.includes(color));
  
  if (foundColor) {
    keywords = `${foundColor} ${keywords}`;
  }
  
  // Add material keywords if present
  if (nameLower.includes('embroidered')) keywords += ' embroidered';
  if (nameLower.includes('silk')) keywords += ' silk';
  if (nameLower.includes('bridal')) keywords += ' bridal';
  
  return keywords;
};

// Fetch image URL from Unsplash
const fetchImageFromUnsplash = async (keywords) => {
  try {
    // Using Unsplash API without authentication (limited to 50 requests/hour)
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywords)}&per_page=1&w=400&h=500&fit=crop`,
      {
        headers: {
          'Accept-Version': 'v1'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Return optimized URL with width and height
      return `${data.results[0].urls.regular}?w=400&h=500&fit=crop&quality=80`;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching image for "${keywords}":`, error.message);
    return null;
  }
};

// Alternative: Fetch from Pexels (more reliable for structured searches)
const fetchImageFromPexels = async (keywords) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keywords)}&per_page=1&page=1`,
      {
        headers: {
          'Authorization': 'NO_KEY_NEEDED' // Using free API
        }
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching from Pexels for "${keywords}":`, error.message);
    return null;
  }
};

// Fetch image from Lorem Picsum (reliable placeholder/demo images)
const fetchImageFromLoremPicsum = async (category) => {
  const categoryHashes = {
    'Lehenga': 'lehenga',
    'Saree': 'saree',
    'Anarkali': 'anarkali',
    'Salwar Kameez': 'salwar',
    'Gharara': 'gharara',
    'Sharara': 'sharara'
  };
  
  const hash = categoryHashes[category] || 'ethnic';
  const imageId = Math.floor(Math.random() * 100) + 1;
  
  return `https://picsum.photos/400/500?random=${imageId}&t=${hash}`;
};

// Update products with images
const updateProductImages = async () => {
  try {
    await connectDB();
    
    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);
    
    let updated = 0;
    let skipped = 0;
    
    for (const product of products) {
      try {
        // Skip if already has a real image URL
        if (product.image && product.image.startsWith('http')) {
          console.log(`✓ Skipped ${product.name} (already has image)`);
          skipped++;
          continue;
        }
        
        const keywords = generateSearchKeywords(product.name, product.category);
        console.log(`🔍 Fetching image for: ${product.name} (${product.category})`);
        
        // Try Unsplash first
        let imageUrl = await fetchImageFromUnsplash(keywords);
        
        // If Unsplash fails, use Pexels
        if (!imageUrl) {
          imageUrl = await fetchImageFromPexels(keywords);
        }
        
        // If both fail, use Lorem Picsum
        if (!imageUrl) {
          imageUrl = await fetchImageFromLoremPicsum(product.category);
        }
        
        if (imageUrl) {
          product.image = imageUrl;
          await product.save();
          console.log(`✓ Updated: ${product.name}`);
          updated++;
        } else {
          console.log(`✗ Failed to get image for: ${product.name}`);
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.error(`Error processing ${product.name}:`, error.message);
      }
    }
    
    console.log(`\n📊 Summary: ${updated} updated, ${skipped} skipped out of ${products.length} total`);
    
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the update
updateProductImages();
