const STORAGE_VERSION = 102; // Incremented to force refresh

const womensClothingImages = [
  "https://images.pexels.com/photos/10041185/pexels-photo-10041185.jpeg",
  "https://images.pexels.com/photos/14881335/pexels-photo-14881335.jpeg",
  "https://images.pexels.com/photos/29370686/pexels-photo-29370686.jpeg",
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg"
];

export const initializeProductsInStorage = () => {
  const storedVersion = localStorage.getItem("productsVersion");
  const existingProducts = localStorage.getItem("products");

  if (!existingProducts || storedVersion !== String(STORAGE_VERSION)) {
    localStorage.removeItem("products");
    
    const allProducts = [
      // MEHENDI PRODUCTS
      { id: 1, name: "Beige Gold Tissue Silk Lehenga", price: 25600, originalPrice: 30800, image: womensClothingImages[0], category: "Lehenga", occasion: "mehendi", description: "Perfect for Mehendi" },
      { id: 24, name: "Green Luxe Fabric Saree", price: 9800, originalPrice: 12900, image: womensClothingImages[1], category: "Saree", occasion: "mehendi", description: "Vibrant green saree" },
      { id: 14, name: "Parrot Green Floral Lehenga", price: 7700, originalPrice: 10500, image: womensClothingImages[2], category: "Lehenga", occasion: "mehendi", description: "Printed lehenga" },

      // SANGEET PRODUCTS
      { id: 11, name: "Red Silk Hand Embroidered Lehenga", price: 32000, originalPrice: 40000, image: womensClothingImages[3], category: "Lehenga", occasion: "sangeet", description: "Sangeet special" },
      { id: 3, name: "Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: womensClothingImages[0], category: "Saree", occasion: "sangeet", description: "Elegant drape" },
      
      // WEDDING PRODUCTS
      { id: 12, name: "Blush Pink Bridal Lehenga", price: 27000, originalPrice: 32900, image: womensClothingImages[1], category: "Lehenga", occasion: "wedding", description: "Bridal collection" },
      { id: 101, name: "Ivory Silk Bridal Lehenga", price: 35000, originalPrice: 44000, image: womensClothingImages[2], category: "Lehenga", occasion: "wedding", description: "Premium bridal" },

      // ENGAGEMENT
      { id: 108, name: "Lavender Georgette Bridal Lehenga", price: 28000, originalPrice: 35000, image: womensClothingImages[3], category: "Lehenga", occasion: "engagement", description: "Sophisticated look" },
      { id: 202, name: "Blush Pink Georgette Saree", price: 14200, originalPrice: 17500, image: womensClothingImages[0], category: "Saree", occasion: "engagement", description: "Pastel beauty" }
    ];

    localStorage.setItem("products", JSON.stringify(allProducts));
    localStorage.setItem("productsVersion", String(STORAGE_VERSION));
    console.log("✅ Data Initialized with Occasions!");
  }
};