import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All products from ProductCatalog
const products = [
  // LEHENGA
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", category: "Lehenga", color: "Beige Gold" },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", category: "Lehenga", color: "Red" },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", category: "Lehenga", color: "Blush Pink" },
  { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", category: "Lehenga", color: "Maroon" },
  { id: 14, name: "Parrot Green Floral Printed Lehenga Set", category: "Lehenga", color: "Parrot Green" },
  { id: 15, name: "Magenta Silk Printed & Embroidered Lehenga Set", category: "Lehenga", color: "Magenta" },
  { id: 16, name: "Yellow Silk Hand Worked & Printed Lehenga Set", category: "Lehenga", color: "Yellow" },
  { id: 17, name: "Mint Green Printed & Embroidered Silk Lehenga Set", category: "Lehenga", color: "Mint Green" },
  { id: 18, name: "Lemon Green & Pink Silk Embroidered Lehenga Set", category: "Lehenga", color: "Lemon Green Pink" },
  { id: 19, name: "Orange Tissue Silk Embroidered Lehenga Set", category: "Lehenga", color: "Orange" },
  { id: 20, name: "Pink Georgette Embroidered Lehenga Set", category: "Lehenga", color: "Pink" },
  { id: 21, name: "Mustard Georgette Embroidered Kurti Lehenga Set", category: "Lehenga", color: "Mustard" },
  { id: 101, name: "Ivory Silk Embroidered Bridal Lehenga", category: "Lehenga", color: "Ivory" },
  { id: 102, name: "Navy Blue Georgette Printed Lehenga Suit", category: "Lehenga", color: "Navy Blue" },
  { id: 103, name: "Royal Purple Silk Embroidered Lehenga Set", category: "Lehenga", color: "Royal Purple" },
  { id: 104, name: "Coral Pink Tissue Silk Embroidered Lehenga", category: "Lehenga", color: "Coral Pink" },
  { id: 105, name: "Dark Green Silk Hand Embroidered Lehenga", category: "Lehenga", color: "Dark Green" },
  { id: 106, name: "Gold Georgette Embroidered Lehenga Set", category: "Lehenga", color: "Gold" },
  { id: 107, name: "Peach Chinon Silk Embroidered Lehenga", category: "Lehenga", color: "Peach" },
  { id: 108, name: "Lavender Georgette Embroidered Bridal Lehenga", category: "Lehenga", color: "Lavender" },
  { id: 109, name: "Teal Green Tissue Silk Embroidered Lehenga", category: "Lehenga", color: "Teal Green" },
  { id: 110, name: "Wine Red Silk Embroidered Bridal Lehenga Set", category: "Lehenga", color: "Wine Red" },
  { id: 111, name: "Cream & Gold Silk Embroidered Lehenga", category: "Lehenga", color: "Cream Gold" },
  { id: 112, name: "Forest Green Georgette Embroidered Lehenga", category: "Lehenga", color: "Forest Green" },
  { id: 113, name: "Rose Pink Silk Hand Embroidered Lehenga Set", category: "Lehenga", color: "Rose Pink" },
  
  // SAREE
  { id: 3, name: "Pre-draped Royal Purple Satin Saree", category: "Saree", color: "Royal Purple" },
  { id: 22, name: "Gold Sequined Silk Bridal Saree", category: "Saree", color: "Gold" },
  { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", category: "Saree", color: "Ivory Gold" },
  { id: 24, name: "Green Luxe Fabric Embroidered Saree", category: "Saree", color: "Green" },
  { id: 25, name: "Bronze Maroon Silk Embroidered Designer Saree", category: "Saree", color: "Bronze Maroon" },
  { id: 26, name: "Plum Tissue Silk Embroidered Saree", category: "Saree", color: "Plum" },
  { id: 27, name: "Mustard Yellow Tissue Silk Embroidered Saree", category: "Saree", color: "Mustard Yellow" },
  { id: 28, name: "Magenta Pink Silk Embroidered Saree", category: "Saree", color: "Magenta Pink" },
  { id: 29, name: "Dark Green Embroidered Silk Saree", category: "Saree", color: "Dark Green" },
  { id: 30, name: "Navy Blue Crepe Silk Printed Saree", category: "Saree", color: "Navy Blue" },
  { id: 201, name: "Red Silk Hand Embroidered Bridal Saree", category: "Saree", color: "Red" },
  { id: 202, name: "Blush Pink Georgette Embroidered Saree", category: "Saree", color: "Blush Pink" },
  { id: 203, name: "Cream Silk Embroidered Wedding Saree", category: "Saree", color: "Cream" },
  { id: 204, name: "Teal Blue Tissue Silk Embroidered Saree", category: "Saree", color: "Teal Blue" },
  { id: 205, name: "Peach Silk Hand Embroidered Saree", category: "Saree", color: "Peach" },
  { id: 206, name: "Lavender Georgette Embroidered Saree", category: "Saree", color: "Lavender" },
  { id: 207, name: "Forest Green Silk Embroidered Saree", category: "Saree", color: "Forest Green" },
  { id: 208, name: "Wine Red Silk Embroidered Bridal Saree", category: "Saree", color: "Wine Red" },
  { id: 209, name: "Champagne Gold Tissue Silk Saree", category: "Saree", color: "Champagne Gold" },
  { id: 210, name: "Maroon Chinon Silk Embroidered Saree", category: "Saree", color: "Maroon" },
  { id: 211, name: "Sky Blue Georgette Embroidered Saree", category: "Saree", color: "Sky Blue" },
  { id: 212, name: "Coral Pink Silk Embroidered Saree", category: "Saree", color: "Coral Pink" },
  { id: 213, name: "Royal Blue Tissue Silk Embroidered Saree", category: "Saree", color: "Royal Blue" },
  { id: 214, name: "Magenta Silk Hand Embroidered Saree", category: "Saree", color: "Magenta" },
  
  // ANARKALI
  { id: 4, name: "Designer Anarkali Suit - Midnight Blue", category: "Anarkali", color: "Midnight Blue" },
  { id: 31, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", category: "Anarkali", color: "Indigo Blue" },
  { id: 32, name: "Ivory Georgette Embroidered Anarkali Dress With Dupatta", category: "Anarkali", color: "Ivory" },
  { id: 33, name: "Plum Georgette Embroidered Anarkali Dress With Dupatta", category: "Anarkali", color: "Plum" },
  { id: 34, name: "Plum Jacquard Silk Embroidered Anarkali Dress With Dupatta", category: "Anarkali", color: "Plum" },
  { id: 35, name: "Lavender Silk Embroidered Anarkali Dress", category: "Anarkali", color: "Lavender" },
  { id: 36, name: "Deep Red Silk Embroidered Bridal Anarkali", category: "Anarkali", color: "Deep Red" },
  { id: 37, name: "Ivory Georgette Embroidered Anarkali Suit", category: "Anarkali", color: "Ivory" },
  { id: 38, name: "Ruby Red Tissue Silk Anarkali", category: "Anarkali", color: "Ruby Red" },
  { id: 39, name: "Midnight Blue Georgette Anarkali Dress", category: "Anarkali", color: "Midnight Blue" },
  { id: 301, name: "Red Silk Hand Embroidered Anarkali", category: "Anarkali", color: "Red" },
  { id: 302, name: "Blush Pink Georgette Embroidered Anarkali", category: "Anarkali", color: "Blush Pink" },
  { id: 303, name: "Forest Green Silk Embroidered Anarkali Suit", category: "Anarkali", color: "Forest Green" },
  { id: 304, name: "Peach Tissue Silk Embroidered Anarkali", category: "Anarkali", color: "Peach" },
  { id: 305, name: "Navy Blue Georgette Embroidered Anarkali Dress", category: "Anarkali", color: "Navy Blue" },
  { id: 306, name: "Gold Silk Embroidered Bridal Anarkali", category: "Anarkali", color: "Gold" },
  { id: 307, name: "Teal Chinon Silk Embroidered Anarkali", category: "Anarkali", color: "Teal" },
  { id: 308, name: "Wine Red Silk Embroidered Anarkali Suit", category: "Anarkali", color: "Wine Red" },
  { id: 309, name: "Cream & Gold Embroidered Anarkali", category: "Anarkali", color: "Cream Gold" },
  { id: 310, name: "Maroon Georgette Embroidered Anarkali Dress", category: "Anarkali", color: "Maroon" },
  { id: 311, name: "Lavender Silk Embroidered Bridal Anarkali", category: "Anarkali", color: "Lavender" },
  { id: 312, name: "Coral Pink Tissue Silk Anarkali", category: "Anarkali", color: "Coral Pink" },
  { id: 313, name: "Royal Blue Silk Hand Embroidered Anarkali", category: "Anarkali", color: "Royal Blue" },
];

// Generate smart search keywords
const generateKeywords = (product) => {
  // Use ONLY these 6 single keywords
  const keywords = {
    "Lehenga": "Lehenga",
    "Saree": "Saree",
    "Anarkali": "Anarkali",
    "Salwar Kameez": "Salwar",
    "Gharara": "Gharara",
    "Sharara": "Sharara"
  };
  
  return keywords[product.category] || product.category;
};

// Fetch from Unsplash with smart search
const fetchImageFromUnsplash = async (keywords, retries = 3) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywords)}&per_page=1&orientation=portrait`,
      {
        headers: {
          'Accept-Version': 'v1'
        }
      }
    );
    
    if (!response.ok) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return fetchImageFromUnsplash(keywords, retries - 1);
      }
      return null;
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular + "?w=400&h=600&fit=crop&q=85";
    }
    
    return null;
  } catch (error) {
    console.error(`Error with keyword "${keywords}":`, error.message);
    return null;
  }
};

// Main function to fetch all images
const main = async () => {
  console.log(`Starting to fetch images for ${products.length} products...\n`);
  
  const productImages = {};
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const keywords = generateKeywords(product);
    
    console.log(`[${i + 1}/${products.length}] Fetching: ${product.name}`);
    console.log(`  Keywords: ${keywords}`);
    
    const imageUrl = await fetchImageFromUnsplash(keywords);
    
    if (imageUrl) {
      productImages[product.id] = imageUrl;
      console.log(`  ✓ Found: ${imageUrl.substring(0, 60)}...`);
      successCount++;
    } else {
      console.log(`  ✗ Failed - using fallback`);
      // Fallback to category-based search
      const fallbackUrl = await fetchImageFromUnsplash(product.category);
      if (fallbackUrl) {
        productImages[product.id] = fallbackUrl;
        console.log(`  ✓ Fallback: ${fallbackUrl.substring(0, 60)}...`);
        successCount++;
      } else {
        failureCount++;
      }
    }
    
    // Rate limiting - Unsplash allows 50/hour without auth
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../src/data/productImages.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(productImages, null, 2));
  
  console.log(`\n✅ Complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failureCount}`);
  console.log(`Saved to: ${outputPath}`);
};

main().catch(console.error);
