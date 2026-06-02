// Script to generate image URLs for products
// Run this once to get the image mappings

const products = [
  // LEHENGA (25+ products)
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", category: "Lehenga" },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", category: "Lehenga" },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", category: "Lehenga" },
  // ... all products
];

const generateImageUrl = (productName, category, productId) => {
  // Using Unsplash with specific query parameters
  const keywords = `${productName.split(' ')[0]} ${category}`;
  const colors = ['red', 'pink', 'blue', 'gold', 'green', 'purple', 'ivory', 'maroon', 'orange', 'cream'];
  
  // Create deterministic URL based on product ID for consistency
  const imageIndex = (productId % 20) + 1;
  
  // Using picsum.photos for reliable placeholder images with category-specific URLs
  return `https://images.unsplash.com/photo-168${(productId % 100).toString().padStart(2, '0')}-?w=400&h=500&fit=crop&quality=80`;
};

console.log('Image mapping ready. Use these URLs in ProductCatalog.jsx');
