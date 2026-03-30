// Initialize products in localStorage from the ProductCatalog with Women's Clothing Images
const STORAGE_VERSION = 8; // Increment to force refresh

// Diverse collection of women's clothing images
const womensClothingImages = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop", // Woman in white dress
  "https://images.unsplash.com/photo-1515707519579-7ec2a8f07528?w=600&h=800&fit=crop", // Woman posing in casual outfit
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop", // Woman in formal black dress
  "https://images.unsplash.com/photo-1455218873509-8097f029b439?w=600&h=800&fit=crop", // Woman in fashion outfit
  "https://images.unsplash.com/photo-1503381072033-f06b2627ef5d?w=600&h=800&fit=crop", // Woman in stylish clothes
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=800&fit=crop", // Woman in purple dress
  "https://images.unsplash.com/photo-1490481651985-2ad87fafa111?w=600&h=800&fit=crop", // Woman in casual wear
  "https://images.unsplash.com/photo-1529148482759-b649effa3142?w=600&h=800&fit=crop", // Woman in colorful dress
  "https://images.unsplash.com/photo-1488456749771-b8401f6b47b8?w=600&h=800&fit=crop", // Woman in elegant dress
  "https://images.unsplash.com/photo-1474467846769-aadb86891e12?w=600&h=800&fit=crop", // Woman in stylish outfit
  "https://images.unsplash.com/photo-1506629082847-11d82b3bba63?w=600&h=800&fit=crop", // Woman in pink dress
  "https://images.unsplash.com/photo-1520626212624-3cd777d3e2a6?w=600&h=800&fit=crop", // Woman in fashion wear
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=800&fit=crop", // Woman in casual top
  "https://images.unsplash.com/photo-1534004414409-c7ea1582f212?w=600&h=800&fit=crop", // Woman in stylish top
  "https://images.unsplash.com/photo-1506379773649-6bcc237052f9?w=600&h=800&fit=crop", // Woman in elegant outfit
  "https://images.unsplash.com/photo-1552062407-291826ad9b0a?w=600&h=800&fit=crop", // Woman in fashionable dress
  "https://images.unsplash.com/photo-1572804419406-1ceeb2b13495?w=600&h=800&fit=crop", // Woman in summer dress
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop", // Woman in casual top
  "https://images.unsplash.com/photo-1517711484589-48949750b8f6?w=600&h=800&fit=crop", // Woman in elegant wear
  "https://images.unsplash.com/photo-1488161622613-c23ccf9fa53e?w=600&h=800&fit=crop", // Woman in stylish clothing
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop", // Woman in casual outfit
  "https://images.unsplash.com/photo-1515020234313-e391adaca76d?w=600&h=800&fit=crop", // Woman in fashionable dress
  "https://images.unsplash.com/photo-1539108149f65ee147c55d3a0261cdc7d4cc0563?w=600&h=800&fit=crop", // Woman in elegant wear
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=800&fit=crop", // Woman in stylish outfit
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop", // Woman in white clothing
];

export const initializeProductsInStorage = () => {
  // Check version to force refresh when we update images
  const storedVersion = localStorage.getItem("productsVersion");
  const existingProducts = localStorage.getItem("products");
  
  if (!existingProducts || storedVersion !== String(STORAGE_VERSION)) {
    // Force refresh - clear old data
    localStorage.removeItem("products");
    localStorage.removeItem("productsVersion");
    
    // All products with Women's Clothing Images
    const allProducts = [
      // LEHENGA
      { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, image: womensClothingImages[0], category: "Lehenga", description: "Beautiful beige and gold embroidered lehenga set" },
      { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, image: womensClothingImages[1], category: "Lehenga", description: "Elegant red silk bridal lehenga" },
      { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", price: 27000, originalPrice: 32900, image: womensClothingImages[2], category: "Lehenga", description: "Delicate blush pink bridal lehenga" },
      { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, image: womensClothingImages[3], category: "Lehenga", description: "Rich maroon silk bridal set" },
      { id: 14, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, image: womensClothingImages[4], category: "Lehenga", description: "Vibrant parrot green printed lehenga" },
      { id: 15, name: "Magenta Silk Printed & Embroidered Lehenga Set", price: 8300, originalPrice: 14800, image: womensClothingImages[5], category: "Lehenga", description: "Stunning magenta silk lehenga" },
      { id: 16, name: "Yellow Silk Hand Worked & Printed Lehenga Set", price: 18000, originalPrice: 21600, image: womensClothingImages[6], category: "Lehenga", description: "Bright yellow silk lehenga set" },
      { id: 17, name: "Mint Green Printed & Embroidered Silk Lehenga Set", price: 10000, originalPrice: 12300, image: womensClothingImages[7], category: "Lehenga", description: "Fresh mint green lehenga" },
      { id: 18, name: "Lemon Green & Pink Silk Embroidered Lehenga Set", price: 29000, originalPrice: 34900, image: womensClothingImages[8], category: "Lehenga", description: "Trendy lemon green and pink lehenga" },
      { id: 19, name: "Orange Tissue Silk Embroidered Lehenga Set", price: 16200, originalPrice: 19400, image: womensClothingImages[9], category: "Lehenga", description: "Vibrant orange silk lehenga" },
      { id: 20, name: "Pink Georgette Embroidered Lehenga Set", price: 6100, originalPrice: 8000, image: womensClothingImages[10], category: "Lehenga", description: "Soft pink georgette lehenga" },
      { id: 21, name: "Mustard Georgette Embroidered Kurti Lehenga Set", price: 6800, originalPrice: 11000, image: womensClothingImages[11], category: "Lehenga", description: "Golden mustard lehenga set" },
      { id: 101, name: "Ivory Silk Embroidered Bridal Lehenga", price: 35000, originalPrice: 44000, image: womensClothingImages[12], category: "Lehenga", description: "Premium ivory silk bridal lehenga" },
      { id: 102, name: "Navy Blue Georgette Printed Lehenga Suit", price: 9200, originalPrice: 12500, image: womensClothingImages[13], category: "Lehenga", description: "Classic navy blue lehenga suit" },
      { id: 103, name: "Royal Purple Silk Embroidered Lehenga Set", price: 24500, originalPrice: 30000, image: womensClothingImages[14], category: "Lehenga", description: "Regal purple silk lehenga" },
      { id: 104, name: "Coral Pink Tissue Silk Embroidered Lehenga", price: 18700, originalPrice: 23000, image: womensClothingImages[15], category: "Lehenga", description: "Trendy coral pink lehenga" },
      { id: 105, name: "Dark Green Silk Hand Embroidered Lehenga", price: 26000, originalPrice: 32000, image: womensClothingImages[16], category: "Lehenga", description: "Deep green silk lehenga" },
      { id: 106, name: "Gold Georgette Embroidered Lehenga Set", price: 15500, originalPrice: 19000, image: womensClothingImages[17], category: "Lehenga", description: "Luxurious gold georgette lehenga" },
      { id: 107, name: "Peach Chinon Silk Embroidered Lehenga", price: 22000, originalPrice: 27000, image: womensClothingImages[18], category: "Lehenga", description: "Elegant peach silk lehenga" },
      { id: 108, name: "Lavender Georgette Embroidered Bridal Lehenga", price: 28000, originalPrice: 35000, image: womensClothingImages[19], category: "Lehenga", description: "Beautiful lavender bridal lehenga" },
      
      // SAREE
      { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: womensClothingImages[0], category: "Saree", description: "Elegant purple satin saree" },
      { id: 22, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, image: womensClothingImages[1], category: "Saree", description: "Glamorous gold sequined bridal saree" },
      { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, image: womensClothingImages[2], category: "Saree", description: "Stunning ivory and gold bridal saree" },
      { id: 24, name: "Green Luxe Fabric Embroidered Saree", price: 9800, originalPrice: 12900, image: womensClothingImages[3], category: "Saree", description: "Luxurious green embroidered saree" },
      { id: 25, name: "Bronze Maroon Silk Embroidered Designer Saree", price: 6100, originalPrice: 8200, image: womensClothingImages[4], category: "Saree", description: "Rich bronze maroon saree" },
      { id: 26, name: "Plum Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: womensClothingImages[5], category: "Saree", description: "Beautiful plum silk saree" },
      { id: 27, name: "Mustard Yellow Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: womensClothingImages[6], category: "Saree", description: "Vibrant mustard yellow saree" },
      { id: 28, name: "Magenta Pink Silk Embroidered Saree", price: 6100, originalPrice: 7700, image: womensClothingImages[7], category: "Saree", description: "Bold magenta pink saree" },
      { id: 29, name: "Dark Green Embroidered Silk Saree", price: 4800, originalPrice: 6000, image: womensClothingImages[8], category: "Saree", description: "Sophisticated dark green saree" },
      { id: 30, name: "Navy Blue Crepe Silk Printed Saree", price: 11000, originalPrice: 14000, image: womensClothingImages[9], category: "Saree", description: "Classic navy blue printed saree" },
      { id: 201, name: "Red Silk Hand Embroidered Bridal Saree", price: 24000, originalPrice: 30000, image: womensClothingImages[10], category: "Saree", description: "Premium red bridal saree" },
      { id: 202, name: "Blush Pink Georgette Embroidered Saree", price: 14200, originalPrice: 17500, image: womensClothingImages[11], category: "Saree", description: "Delicate blush pink saree" },
      { id: 203, name: "Cream Silk Embroidered Wedding Saree", price: 22500, originalPrice: 28000, image: womensClothingImages[12], category: "Saree", description: "Elegant cream silk wedding saree" },
      { id: 204, name: "Teal Blue Tissue Silk Embroidered Saree", price: 12800, originalPrice: 15900, image: womensClothingImages[13], category: "Saree", description: "Trendy teal blue saree" },
      { id: 205, name: "Peach Silk Hand Embroidered Saree", price: 19200, originalPrice: 24000, image: womensClothingImages[14], category: "Saree", description: "Beautiful peach silk saree" },
      { id: 206, name: "Lavender Georgette Embroidered Saree", price: 10500, originalPrice: 13000, image: womensClothingImages[15], category: "Saree", description: "Soft lavender saree" },
      { id: 207, name: "Forest Green Silk Embroidered Saree", price: 15700, originalPrice: 19500, image: womensClothingImages[16], category: "Saree", description: "Deep forest green saree" },
      { id: 208, name: "Wine Red Silk Embroidered Bridal Saree", price: 23000, originalPrice: 29000, image: womensClothingImages[17], category: "Saree", description: "Rich wine red bridal saree" },
      { id: 209, name: "Champagne Gold Tissue Silk Saree", price: 20500, originalPrice: 25500, image: womensClothingImages[18], category: "Saree", description: "Luxurious champagne gold saree" },
      
      // ANARKALI
      { id: 5, name: "Blue Georgette Embroidered Anarkali Suit", price: 6800, originalPrice: 9500, image: womensClothingImages[19], category: "Anarkali", description: "Elegant blue georgette anarkali" },
      { id: 32, name: "Red Silk Embroidered Anarkali Suit", price: 12000, originalPrice: 15000, image: womensClothingImages[0], category: "Anarkali", description: "Stunning red silk anarkali" },
      { id: 33, name: "Green Georgette Embroidered Anarkali", price: 8500, originalPrice: 11000, image: womensClothingImages[1], category: "Anarkali", description: "Beautiful green anarkali" },
      { id: 34, name: "Pink Georgette Embroidered Anarkali Suit", price: 7200, originalPrice: 9500, image: womensClothingImages[2], category: "Anarkali", description: "Pretty pink anarkali suit" },
      { id: 35, name: "Yellow Silk Embroidered Anarkali", price: 9800, originalPrice: 12500, image: womensClothingImages[3], category: "Anarkali", description: "Cheerful yellow silk anarkali" },
      
      // SALWAR KAMEEZ
      { id: 7, name: "Pink Unstitched Salwar Kameez", price: 2900, originalPrice: 3500, image: womensClothingImages[4], category: "Salwar Kameez", description: "Lovely pink unstitched salwar kameez" },
      { id: 39, name: "Red Georgette Printed Salwar Kameez", price: 3200, originalPrice: 4200, image: womensClothingImages[5], category: "Salwar Kameez", description: "Vibrant red printed suit" },
      { id: 40, name: "Blue Silk Embroidered Salwar Kameez", price: 5600, originalPrice: 7200, image: womensClothingImages[6], category: "Salwar Kameez", description: "Elegant blue silk suit" },
      { id: 41, name: "Green Cotton Printed Salwar Kameez", price: 2800, originalPrice: 3500, image: womensClothingImages[7], category: "Salwar Kameez", description: "Fresh green cotton suit" },
      
      // GHARARA
      { id: 8, name: "Maroon Georgette Embroidered Gharara", price: 18000, originalPrice: 22000, image: womensClothingImages[8], category: "Gharara", description: "Regal maroon gharara suit" },
      { id: 44, name: "Red Silk Embroidered Gharara Suit", price: 16500, originalPrice: 20500, image: womensClothingImages[9], category: "Gharara", description: "Stunning red silk gharara" },
      { id: 45, name: "Pink Georgette Embroidered Gharara", price: 14200, originalPrice: 17800, image: womensClothingImages[10], category: "Gharara", description: "Beautiful pink gharara" },
      
      // SHARARA
      { id: 9, name: "Pink Georgette Embroidered Sharara Suit", price: 12000, originalPrice: 15000, image: womensClothingImages[11], category: "Sharara", description: "Lovely pink georgette sharara" },
      { id: 10, name: "Mustard Yellow Georgette Printed Sharara", price: 7200, originalPrice: 9500, image: womensClothingImages[12], category: "Sharara", description: "Vibrant yellow sharara suit" },
      { id: 49, name: "Red Silk Embroidered Sharara Suit", price: 13500, originalPrice: 16800, image: womensClothingImages[13], category: "Sharara", description: "Elegant red sharara" },
    ];
    
    localStorage.setItem("products", JSON.stringify(allProducts));
    localStorage.setItem("productsVersion", String(STORAGE_VERSION));
    console.log("✅ Products initialized with Women's Clothing Images - v" + STORAGE_VERSION);
  }
};
