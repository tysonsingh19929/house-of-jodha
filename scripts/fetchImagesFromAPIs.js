import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category-specific search queries for free image APIs
const categorySearchQueries = {
  lehenga: ["lehenga embroidered", "indian lehenga", "wedding lehenga", "bridal lehenga"],
  saree: ["saree embroidered", "indian saree", "wedding saree", "bridal saree"],
  anarkali: ["anarkali dress", "indian anarkali", "embroidered anarkali", "ethnic anarkali"],
  salwar: ["salwar kameez", "indian salwar", "embroidered salwar", "ethnic kurta"],
  gharara: ["gharara dress", "indian gharara", "embroidered gharara", "ethnic dress"],
  sharara: ["sharara dress", "indian sharara", "embroidered sharara", "ethnic wear"]
};

const imageCount = {
  lehenga: 25,
  saree: 25,
  anarkali: 25,
  salwar: 21,
  gharara: 15,
  sharara: 21
};

// Use Unsplash Source API (no authentication needed, works for category searches)
const fetchFromUnsplash = async (query, limit = 6) => {
  try {
    // Use multiple search terms to get varied results
    const searchTerms = query.split(' ');
    const images = [];
    
    for (let i = 0; i < limit; i++) {
      // Create URLs using Unsplash Source API with category-based searches
      const term = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      const imageUrl = `https://source.unsplash.com/400x600/?${encodeURIComponent(query)}&${i}`;
      images.push({
        url: imageUrl,
        source: 'unsplash'
      });
    }
    return images;
  } catch (error) {
    console.warn(`⚠️ Unsplash fetch failed for "${query}": ${error.message}`);
    return [];
  }
};

// Fallback: Use Pexels API (requires free API key from https://www.pexels.com/api/)
const fetchFromPexels = async (query, limit = 6) => {
  const pexelsKey = process.env.PEXELS_API_KEY || null;
  if (!pexelsKey) {
    console.warn('⚠️ Pexels API key not set. Set PEXELS_API_KEY environment variable');
    return [];
  }
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${limit}`,
      { headers: { 'Authorization': pexelsKey } }
    );
    const data = await response.json();
    return data.photos?.map(img => ({
      url: img.src.large,
      source: 'pexels'
    })) || [];
  } catch (error) {
    console.warn(`⚠️ Pexels fetch failed for "${query}": ${error.message}`);
    return [];
  }
};

// Fallback: Use Pixabay API (requires free API key from https://pixabay.com/api/docs/)
const fetchFromPixabay = async (query, limit = 6) => {
  const pixabayKey = process.env.PIXABAY_API_KEY || null;
  if (!pixabayKey) {
    console.warn('⚠️ Pixabay API key not set. Set PIXABAY_API_KEY environment variable');
    return [];
  }
  
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${encodeURIComponent(query)}&key=${pixabayKey}&per_page=${limit}&image_type=photo`
    );
    const data = await response.json();
    return data.hits?.map(img => ({
      url: img.largeImageURL,
      source: 'pixabay'
    })) || [];
  } catch (error) {
    console.warn(`⚠️ Pixabay fetch failed for "${query}": ${error.message}`);
    return [];
  }
};

const downloadImage = async (url, filepath) => {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusCode}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.warn(`❌ Failed to download ${url}: ${error.message}`);
    return false;
  }
};

const fetchImagesForCategory = async (category, queries, count) => {
  console.log(`\n🔍 Fetching ${count} images for ${category}...`);
  
  const downloadedUrls = [];
  let downloaded = 0;
  let queryIndex = 0;

  // Try each query until we have enough images
  while (downloaded < count && queryIndex < queries.length) {
    const query = queries[queryIndex];
    console.log(`  Searching: "${query}"...`);

    // Try multiple sources
    let images = [];
    
    // Try Unsplash first (no key required)
    images = await fetchFromUnsplash(query, 6);
    
    // If Unsplash returns nothing, try Pexels
    if (images.length === 0) {
      images = await fetchFromPexels(query, 6);
    }
    
    // If Pexels returns nothing, try Pixabay
    if (images.length === 0) {
      images = await fetchFromPixabay(query, 6);
    }

    if (images.length > 0) {
      console.log(`  ✓ Found ${images.length} images`);
      
      // Download images until we have enough
      for (const image of images) {
        if (downloaded < count) {
          const filename = `${downloaded + 1}.jpg`;
          const filepath = path.join(__dirname, `../public/images/${category}/${filename}`);
          
          const success = await downloadImage(image.url, filepath);
          if (success) {
            downloadedUrls.push(`/images/${category}/${filename}`);
            process.stdout.write('.');
            downloaded++;
          }
        }
      }
    }

    queryIndex++;

    // Small delay between queries to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n  ✅ Downloaded ${downloaded}/${count} images for ${category}`);
  return downloadedUrls;
};

const updateImageDatabase = async () => {
  console.log(`\n📝 Updating imageDatabase.js with category-matched images...\n`);

  let databaseContent = `// Image mapping based on product categories
// Using Unsplash Source API - automatically fetches images matching category queries
// Images are fetched dynamically based on product category
// Formula: https://source.unsplash.com/400x600/?{category-query}&{index}

const imageDatabase = {
`;

  for (const [category, count] of Object.entries(imageCount)) {
    const queries = categorySearchQueries[category];
    const mainQuery = queries[0]; // Use first/best query for category
    
    databaseContent += `  ${category === 'salwar' ? 'salwarKameez' : category}: [\n`;
    
    for (let i = 0; i < count; i++) {
      // Generate Unsplash Source URLs that will fetch images for the query
      const unsplashUrl = `https://source.unsplash.com/400x600/?${encodeURIComponent(mainQuery)}&${i}`;
      databaseContent += `    "${unsplashUrl}"${i < count - 1 ? ',' : ''}\n`;
    }
    
    databaseContent += `  ]${category === 'sharara' ? '' : ','}\n`;
  }

  databaseContent += `};\n\nexport default imageDatabase;\n`;

  const dbPath = path.join(__dirname, '../src/data/imageDatabase.js');
  fs.writeFileSync(dbPath, databaseContent);
  console.log('✅ imageDatabase.js updated with category-matched Unsplash Source URLs');
};

const main = async () => {
  console.log('🚀 Setting up category-matched images from Unsplash Source API\n');
  console.log('Match Strategy:');
  console.log('- Lehenga → searches for: "lehenga embroidered"');
  console.log('- Saree → searches for: "saree embroidered"');
  console.log('- Anarkali → searches for: "anarkali dress"');
  console.log('- Salwar Kameez → searches for: "salwar kameez"');
  console.log('- Gharara → searches for: "gharara dress"');
  console.log('- Sharara → searches for: "sharara dress"\n');
  console.log('Source: Unsplash Source API (no authentication required)\n');

  try {
    await updateImageDatabase();
    console.log('\n📊 Summary:');
    console.log('✅ imageDatabase.js configured with category-specific image queries');
    console.log('✅ Each product category fetches relevant images from Unsplash');
    console.log('\n⚡ Next steps:');
    console.log('1. Restart dev server: npm run dev');
    console.log('2. Check http://localhost:5174 for product images');
    console.log('3. Images will load automatically from Unsplash Source API');
    console.log('\n💡 To use your own images:');
    console.log('1. Download images matching each category');
    console.log('2. Add to: /public/images/{category}/ folders');
    console.log('3. Update imageDatabase.js to use: /images/{category}/{number}.jpg');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
};

main();
