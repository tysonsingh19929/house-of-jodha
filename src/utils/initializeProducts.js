const STORAGE_VERSION = 103; // Incremented to force refresh

// Map categories to their image directory names
import { products } from "../data/products.js";

const categoryImageMap = {
  "Lehenga": "lehenga",
  "Saree": "saree",
  "Sharara": "sharara",
  "Anarkali": "anarkali",
  "Salwar": "salwar",
  "Gharara": "gharara"
};

// Generate image path based on category and image index
const getImagePath = (category, imageIndex) => {
  const dirName = categoryImageMap[category] || "lehenga";
  const imgNum = (imageIndex % 25) + 1; // Cycle through 1-25 images
  return `/images/${dirName}/${imgNum}.jpg`;
};

const getImageForProduct = (productId, category, imageIndex) => {
  const fromStatic = products.find(p => p.id === productId);
  if (fromStatic?.image) return fromStatic.image;
  return getImagePath(category, imageIndex);
};

export const initializeProductsInStorage = () => {
  const storedVersion = localStorage.getItem("productsVersion");
  const existingProducts = localStorage.getItem("products");

  if (!existingProducts || storedVersion !== String(STORAGE_VERSION)) {
    localStorage.removeItem("products");
    
    const allProducts = [
        // MEHENDI PRODUCTS
      { id: 1, name: "Beige Gold Tissue Silk Lehenga", price: 25600, originalPrice: 30800, image: getImageForProduct(1, "Lehenga", 0), category: "Lehenga", occasion: "mehendi", description: "Perfect for Mehendi" },
      { id: 24, name: "Green Luxe Fabric Saree", price: 9800, originalPrice: 12900, image: getImageForProduct(24, "Saree", 1), category: "Saree", occasion: "mehendi", description: "Vibrant green saree" },
      { id: 14, name: "Parrot Green Floral Lehenga", price: 7700, originalPrice: 10500, image: getImageForProduct(14, "Lehenga", 2), category: "Lehenga", occasion: "mehendi", description: "Printed lehenga" },

      // SANGEET PRODUCTS
      { id: 11, name: "Red Silk Hand Embroidered Lehenga", price: 32000, originalPrice: 40000, image: getImageForProduct(11, "Lehenga", 3), category: "Lehenga", occasion: "sangeet", description: "Sangeet special" },
      { id: 3, name: "Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: getImageForProduct(3, "Saree", 2), category: "Saree", occasion: "sangeet", description: "Elegant drape" },
      
      // WEDDING PRODUCTS
      { id: 12, name: "Blush Pink Bridal Lehenga", price: 27000, originalPrice: 32900, image: getImageForProduct(12, "Lehenga", 4), category: "Lehenga", occasion: "wedding", description: "Bridal collection" },
      { id: 101, name: "Ivory Silk Bridal Lehenga", price: 35000, originalPrice: 44000, image: getImageForProduct(101, "Lehenga", 5), category: "Lehenga", occasion: "wedding", description: "Premium bridal" },

      // ENGAGEMENT
      { id: 108, name: "Lavender Georgette Bridal Lehenga", price: 28000, originalPrice: 35000, image: getImageForProduct(108, "Lehenga", 6), category: "Lehenga", occasion: "engagement", description: "Sophisticated look" },
      { id: 202, name: "Blush Pink Georgette Saree", price: 14200, originalPrice: 17500, image: getImageForProduct(202, "Saree", 3), category: "Saree", occasion: "engagement", description: "Pastel beauty" }
    ];

    localStorage.setItem("products", JSON.stringify(allProducts));
    localStorage.setItem("productsVersion", String(STORAGE_VERSION));
    console.log("✅ Data Initialized with Occasions!");
  }
};