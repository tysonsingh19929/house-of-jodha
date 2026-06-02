import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract product names from ProductCatalog.jsx
const productCatalogPath = path.join(__dirname, '../src/components/ProductCatalog.jsx');
const catalogContent = fs.readFileSync(productCatalogPath, 'utf-8');

// Parse products - extract name and category
const productRegex = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",.*?category:\s*"([^"]+)"/g;
const productDatabase = {};
let match;

while ((match = productRegex.exec(catalogContent)) !== null) {
  const [_, id, name, category] = match;
  productDatabase[id] = { name, category };
}

console.log(`✅ Extracted ${Object.keys(productDatabase).length} products`);

// Generate search queries from product names
const generateSearchQuery = (productName) => {
  // Remove price ranges and numbers, keep key descriptive terms
  const keywords = productName
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word && word.length > 2 && !/^\d+/.test(word))
    .slice(0, 4) // First 4 significant words
    .join(' ');
  
  return keywords || 'ethnic wear';
};

// Create imageDatabase mapping product IDs to Unsplash URLs
// Each product gets a unique search query based on its name
const imageDatabase = {};

Object.entries(productDatabase).forEach(([id, { name, category }]) => {
  const searchQuery = generateSearchQuery(name);
  // Use Unsplash Source API with product-specific search query
  const imageUrl = `https://source.unsplash.com/400x600/?${encodeURIComponent(searchQuery)}`;
  imageDatabase[id] = imageUrl;
  
  // Also store by product name for easier lookup
  imageDatabase[name] = imageUrl;
});

// Generate the new imageDatabase.js
let databaseContent = `// Image mapping for individual products
// Each product searches Unsplash using its own name/description
// Uses Unsplash Source API: https://source.unsplash.com/
// Format: Each product ID → Unsplash search URL with product-specific query

const productImageDatabase = {
`;

// Add database entries
const entries = Object.entries(imageDatabase);
entries.forEach(([key, url], index) => {
  // Skip non-numeric keys for the main export
  if (!/^\d+$/.test(key)) return;
  
  const productInfo = productDatabase[key];
  if (productInfo) {
    databaseContent += `  // ${productInfo.category}: ${productInfo.name}\n`;
    databaseContent += `  "${key}": "${url}",\n`;
  }
});

// Remove trailing comma
databaseContent = databaseContent.replace(/,\n$/, '\n');

databaseContent += `};\n\n`;
databaseContent += `// Fallback function: Get image by product ID\n`;
databaseContent += `export const getProductImage = (productId) => {\n`;
databaseContent += `  return productImageDatabase[productId] || null;\n`;
databaseContent += `};\n\n`;
databaseContent += `export default productImageDatabase;\n`;

const dbPath = path.join(__dirname, '../src/data/productImageDatabase.js');
fs.writeFileSync(dbPath, databaseContent);

console.log(`\n✨ Product-specific image database created!`);
console.log(`📊 Summary:`);
console.log(`  - ${Object.keys(productDatabase).length} products indexed`);
console.log(`  - Each product has a unique Unsplash search query`);
console.log(`  - File: src/data/productImageDatabase.js\n`);

// Show some examples
console.log('📝 Example matches:\n');
Object.entries(productDatabase).slice(0, 5).forEach(([id, { name, category }]) => {
  const query = generateSearchQuery(name);
  console.log(`  ID ${id} (${category}):\n    Product: "${name}"\n    Search: "${query}"\n`);
});
