import { useState } from "react";

// Image URLs from free sources
const imageUrls = {
  lehenga: [
    "https://images.unsplash.com/photo-1539571696357-5a69c006a4a0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1629285066355-8f6a313b0f0e?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536173572558-7e0519e5d387?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590080876-a370dd6b91d3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589272657521-39326a5e580e?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612802e1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521309396-ce0c87bbf820?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c006a4a0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590080876-a370dd6b91d3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612802e1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1629285066355-8f6a313b0f0e?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536173572558-7e0519e5d387?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595931923881-94b745a5cbb5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610213849736-4daeaf68b0a0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541814227498-eb1190cfd37f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c006a4a0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529139574560-4bcfc17241fd?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595931923881-94b745a5cbb5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610213849736-4daeaf68b0a0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541814227498-eb1190cfd37f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1597945514159-641a08358e7e?w=400&h=500&fit=crop&q=80"
  ],
  saree: [
    "https://images.unsplash.com/photo-1506755855726-05149361a56f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514886278088-335e0504e3e0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506755855726-05149361a56f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514886278088-335e0504e3e0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506755855726-05149361a56f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514886278088-335e0504e3e0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506755855726-05149361a56f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514886278088-335e0504e3e0?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506755855726-05149361a56f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514886278088-335e0504e3e0?w=400&h=500&fit=crop&q=80"
  ],
  anarkali: [
    "https://images.unsplash.com/photo-1608660355692-d53dd99d4e44?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565379666565-4a1f03fd0a78?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608660355692-d53dd99d4e44?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565379666565-4a1f03fd0a78?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608660355692-d53dd99d4e44?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565379666565-4a1f03fd0a78?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608660355692-d53dd99d4e44?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565379666565-4a1f03fd0a78?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608660355692-d53dd99d4e44?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565379666565-4a1f03fd0a78?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80"
  ],
  salwarKameez: [
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594934707142-b17007a84432?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594934707142-b17007a84432?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594934707142-b17007a84432?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594934707142-b17007a84432?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594934707142-b17007a84432?w=400&h=500&fit=crop&q=80"
  ],
  gharara: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591088398332-8c716b5b0e4f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562173555-a639c1f47dd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591088398332-8c716b5b0e4f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562173555-a639c1f47dd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591088398332-8c716b5b0e4f?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562173555-a639c1f47dd1?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575428774223-8d430260c3f8?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604988480714-e5ae5e6b63b3?w=400&h=500&fit=crop&q=80"
  ],
  sharara: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515562141207-5dca89f118d5?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599599810694-b3fa3a3efae9?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=500&fit=crop&q=80"
  ]
};

const getImageForProduct = (category, index) => {
  const categoryKey = category === "Salwar Kameez" ? "salwarKameez" : category.toLowerCase();
  const urls = imageUrls[categoryKey] || imageUrls.lehenga;
  return urls[index % urls.length];
};

const products = [
  // LEHENGA (25+ products)
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, image: getImageForProduct("Lehenga", 0), category: "Lehenga" },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, image: getImageForProduct("Lehenga", 1), category: "Lehenga" },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", price: 27000, originalPrice: 32900, image: getImageForProduct("Lehenga", 2), category: "Lehenga" },
  { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, image: getImageForProduct("Lehenga", 3), category: "Lehenga" },
  { id: 14, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, image: getImageForProduct("Lehenga", 4), category: "Lehenga" },
  { id: 15, name: "Magenta Silk Printed & Embroidered Lehenga Set", price: 8300, originalPrice: 14800, image: getImageForProduct("Lehenga", 5), category: "Lehenga" },
  { id: 16, name: "Yellow Silk Hand Worked & Printed Lehenga Set", price: 18000, originalPrice: 21600, image: getImageForProduct("Lehenga", 6), category: "Lehenga" },
  { id: 17, name: "Mint Green Printed & Embroidered Silk Lehenga Set", price: 10000, originalPrice: 12300, image: getImageForProduct("Lehenga", 7), category: "Lehenga" },
  { id: 18, name: "Lemon Green & Pink Silk Embroidered Lehenga Set", price: 29000, originalPrice: 34900, image: getImageForProduct("Lehenga", 8), category: "Lehenga" },
  { id: 19, name: "Orange Tissue Silk Embroidered Lehenga Set", price: 16200, originalPrice: 19400, image: getImageForProduct("Lehenga", 9), category: "Lehenga" },
  { id: 20, name: "Pink Georgette Embroidered Lehenga Set", price: 6100, originalPrice: 8000, image: getImageForProduct("Lehenga", 10), category: "Lehenga" },
  { id: 21, name: "Mustard Georgette Embroidered Kurti Lehenga Set", price: 6800, originalPrice: 11000, image: getImageForProduct("Lehenga", 11), category: "Lehenga" },
  { id: 101, name: "Ivory Silk Embroidered Bridal Lehenga", price: 35000, originalPrice: 44000, image: getImageForProduct("Lehenga", 12), category: "Lehenga" },
  { id: 102, name: "Navy Blue Georgette Printed Lehenga Suit", price: 9200, originalPrice: 12500, image: getImageForProduct("Lehenga", 13), category: "Lehenga" },
  { id: 103, name: "Royal Purple Silk Embroidered Lehenga Set", price: 24500, originalPrice: 30000, image: getImageForProduct("Lehenga", 14), category: "Lehenga" },
  { id: 104, name: "Coral Pink Tissue Silk Embroidered Lehenga", price: 18700, originalPrice: 23000, image: getImageForProduct("Lehenga", 15), category: "Lehenga" },
  { id: 105, name: "Dark Green Silk Hand Embroidered Lehenga", price: 26000, originalPrice: 32000, image: getImageForProduct("Lehenga", 16), category: "Lehenga" },
  { id: 106, name: "Gold Georgette Embroidered Lehenga Set", price: 15500, originalPrice: 19000, image: getImageForProduct("Lehenga", 17), category: "Lehenga" },
  { id: 107, name: "Peach Chinon Silk Embroidered Lehenga", price: 22000, originalPrice: 27000, image: getImageForProduct("Lehenga", 18), category: "Lehenga" },
  { id: 108, name: "Lavender Georgette Embroidered Bridal Lehenga", price: 28000, originalPrice: 35000, image: getImageForProduct("Lehenga", 19), category: "Lehenga" },
  { id: 109, name: "Teal Green Tissue Silk Embroidered Lehenga", price: 19500, originalPrice: 24000, image: getImageForProduct("Lehenga", 20), category: "Lehenga" },
  { id: 110, name: "Wine Red Silk Embroidered Bridal Lehenga Set", price: 31000, originalPrice: 38000, image: getImageForProduct("Lehenga", 21), category: "Lehenga" },
  { id: 111, name: "Cream & Gold Silk Embroidered Lehenga", price: 26500, originalPrice: 32500, image: getImageForProduct("Lehenga", 22), category: "Lehenga" },
  { id: 112, name: "Forest Green Georgette Embroidered Lehenga", price: 14800, originalPrice: 18500, image: getImageForProduct("Lehenga", 23), category: "Lehenga" },
  { id: 113, name: "Rose Pink Silk Hand Embroidered Lehenga Set", price: 23000, originalPrice: 28000, image: getImageForProduct("Lehenga", 24), category: "Lehenga" },

  // SAREE (25+ products)
  { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: getImageForProduct("Saree", 0), category: "Saree" },
  { id: 22, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, image: getImageForProduct("Saree", 1), category: "Saree" },
  { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, image: getImageForProduct("Saree", 2), category: "Saree" },
  { id: 24, name: "Green Luxe Fabric Embroidered Saree", price: 9800, originalPrice: 12900, image: getImageForProduct("Saree", 3), category: "Saree" },
  { id: 25, name: "Bronze Maroon Silk Embroidered Designer Saree", price: 6100, originalPrice: 8200, image: getImageForProduct("Saree", 4), category: "Saree" },
  { id: 26, name: "Plum Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: getImageForProduct("Saree", 5), category: "Saree" },
  { id: 27, name: "Mustard Yellow Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: getImageForProduct("Saree", 6), category: "Saree" },
  { id: 28, name: "Magenta Pink Silk Embroidered Saree", price: 6100, originalPrice: 7700, image: getImageForProduct("Saree", 7), category: "Saree" },
  { id: 29, name: "Dark Green Embroidered Silk Saree", price: 4800, originalPrice: 6000, image: getImageForProduct("Saree", 8), category: "Saree" },
  { id: 30, name: "Navy Blue Crepe Silk Printed Saree", price: 11000, originalPrice: 14000, image: getImageForProduct("Saree", 9), category: "Saree" },
  { id: 201, name: "Red Silk Hand Embroidered Bridal Saree", price: 24000, originalPrice: 30000, image: getImageForProduct("Saree", 10), category: "Saree" },
  { id: 202, name: "Blush Pink Georgette Embroidered Saree", price: 14200, originalPrice: 17500, image: getImageForProduct("Saree", 11), category: "Saree" },
  { id: 203, name: "Cream Silk Embroidered Wedding Saree", price: 22500, originalPrice: 28000, image: getImageForProduct("Saree", 12), category: "Saree" },
  { id: 204, name: "Teal Blue Tissue Silk Embroidered Saree", price: 12800, originalPrice: 15900, image: getImageForProduct("Saree", 13), category: "Saree" },
  { id: 205, name: "Peach Silk Hand Embroidered Saree", price: 19200, originalPrice: 24000, image: getImageForProduct("Saree", 14), category: "Saree" },
  { id: 206, name: "Lavender Georgette Embroidered Saree", price: 10500, originalPrice: 13000, image: getImageForProduct("Saree", 15), category: "Saree" },
  { id: 207, name: "Forest Green Silk Embroidered Saree", price: 15700, originalPrice: 19500, image: getImageForProduct("Saree", 16), category: "Saree" },
  { id: 208, name: "Wine Red Silk Embroidered Bridal Saree", price: 23000, originalPrice: 29000, image: getImageForProduct("Saree", 17), category: "Saree" },
  { id: 209, name: "Champagne Gold Tissue Silk Saree", price: 20500, originalPrice: 25500, image: getImageForProduct("Saree", 18), category: "Saree" },
  { id: 210, name: "Maroon Chinon Silk Embroidered Saree", price: 17800, originalPrice: 22000, image: getImageForProduct("Saree", 19), category: "Saree" },
  { id: 211, name: "Sky Blue Georgette Embroidered Saree", price: 11200, originalPrice: 14000, image: getImageForProduct("Saree", 20), category: "Saree" },
  { id: 212, name: "Coral Pink Silk Embroidered Saree", price: 13900, originalPrice: 17200, image: getImageForProduct("Saree", 21), category: "Saree" },
  { id: 213, name: "Royal Blue Tissue Silk Embroidered Saree", price: 18500, originalPrice: 23000, image: getImageForProduct("Saree", 22), category: "Saree" },
  { id: 214, name: "Magenta Silk Hand Embroidered Saree", price: 14500, originalPrice: 18000, image: getImageForProduct("Saree", 23), category: "Saree" },

  // ANARKALI (25+ products)
  { id: 4, name: "Designer Anarkali Suit - Midnight Blue", price: 16800, originalPrice: 19800, image: getImageForProduct("Anarkali", 0), category: "Anarkali" },
  { id: 31, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", price: 14000, originalPrice: 16900, image: getImageForProduct("Anarkali", 1), category: "Anarkali" },
  { id: 32, name: "Ivory Georgette Embroidered Anarkali Dress With Dupatta", price: 14000, originalPrice: 16900, image: getImageForProduct("Anarkali", 2), category: "Anarkali" },
  { id: 33, name: "Plum Georgette Embroidered Anarkali Dress With Dupatta", price: 7000, originalPrice: 8300, image: getImageForProduct("Anarkali", 3), category: "Anarkali" },
  { id: 34, name: "Plum Jacquard Silk Embroidered Anarkali Dress With Dupatta", price: 6840, originalPrice: 11700, image: getImageForProduct("Anarkali", 4), category: "Anarkali" },
  { id: 35, name: "Lavender Silk Embroidered Anarkali Dress", price: 11000, originalPrice: 14500, image: getImageForProduct("Anarkali", 5), category: "Anarkali" },
  { id: 36, name: "Deep Red Silk Embroidered Bridal Anarkali", price: 25000, originalPrice: 31000, image: getImageForProduct("Anarkali", 6), category: "Anarkali" },
  { id: 37, name: "Ivory Georgette Embroidered Anarkali Suit", price: 16000, originalPrice: 20000, image: getImageForProduct("Anarkali", 7), category: "Anarkali" },
  { id: 38, name: "Ruby Red Tissue Silk Anarkali", price: 15000, originalPrice: 19500, image: getImageForProduct("Anarkali", 8), category: "Anarkali" },
  { id: 39, name: "Midnight Blue Georgette Anarkali Dress", price: 9500, originalPrice: 13000, image: getImageForProduct("Anarkali", 9), category: "Anarkali" },
  { id: 301, name: "Red Silk Hand Embroidered Anarkali", price: 18500, originalPrice: 23000, image: getImageForProduct("Anarkali", 10), category: "Anarkali" },
  { id: 302, name: "Blush Pink Georgette Embroidered Anarkali", price: 12300, originalPrice: 15500, image: getImageForProduct("Anarkali", 11), category: "Anarkali" },
  { id: 303, name: "Forest Green Silk Embroidered Anarkali Suit", price: 17200, originalPrice: 21500, image: getImageForProduct("Anarkali", 12), category: "Anarkali" },
  { id: 304, name: "Peach Tissue Silk Embroidered Anarkali", price: 13800, originalPrice: 17000, image: getImageForProduct("Anarkali", 13), category: "Anarkali" },
  { id: 305, name: "Navy Blue Georgette Embroidered Anarkali Dress", price: 11500, originalPrice: 14200, image: getImageForProduct("Anarkali", 14), category: "Anarkali" },
  { id: 306, name: "Gold Silk Embroidered Bridal Anarkali", price: 24000, originalPrice: 30000, image: getImageForProduct("Anarkali", 15), category: "Anarkali" },
  { id: 307, name: "Teal Chinon Silk Embroidered Anarkali", price: 14200, originalPrice: 17500, image: getImageForProduct("Anarkali", 16), category: "Anarkali" },
  { id: 308, name: "Wine Red Silk Embroidered Anarkali Suit", price: 19200, originalPrice: 24000, image: getImageForProduct("Anarkali", 17), category: "Anarkali" },
  { id: 309, name: "Cream & Gold Embroidered Anarkali", price: 16500, originalPrice: 20500, image: getImageForProduct("Anarkali", 18), category: "Anarkali" },
  { id: 310, name: "Maroon Georgette Embroidered Anarkali Dress", price: 12800, originalPrice: 15900, image: getImageForProduct("Anarkali", 19), category: "Anarkali" },
  { id: 311, name: "Lavender Silk Embroidered Bridal Anarkali", price: 22000, originalPrice: 27500, image: getImageForProduct("Anarkali", 20), category: "Anarkali" },
  { id: 312, name: "Coral Pink Tissue Silk Anarkali", price: 13500, originalPrice: 16800, image: getImageForProduct("Anarkali", 21), category: "Anarkali" },
  { id: 313, name: "Royal Blue Silk Hand Embroidered Anarkali", price: 18000, originalPrice: 22500, image: getImageForProduct("Anarkali", 22), category: "Anarkali" },

  // SALWAR KAMEEZ (25+ products)
  { id: 5, name: "Salwar Kameez - Emerald Green", price: 7500, originalPrice: 9000, image: getImageForProduct("Salwar Kameez", 0), category: "Salwar Kameez" },
  { id: 40, name: "Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set", price: 9000, originalPrice: 11100, image: getImageForProduct("Salwar Kameez", 1), category: "Salwar Kameez" },
  { id: 41, name: "Ivory & Pink Ombre Sparkling Crystal Detailed Georgette Top & Palazzo", price: 10000, originalPrice: 12300, image: getImageForProduct("Salwar Kameez", 2), category: "Salwar Kameez" },
  { id: 42, name: "Beautiful Lavender Kota Doriya Cotton Silk Embroidered Kurta Set", price: 5200, originalPrice: 7700, image: getImageForProduct("Salwar Kameez", 3), category: "Salwar Kameez" },
  { id: 43, name: "Beautiful Black Kota Doriya Cotton Silk Embroidered Kurta Set", price: 5200, originalPrice: 7100, image: getImageForProduct("Salwar Kameez", 4), category: "Salwar Kameez" },
  { id: 44, name: "Yellow Georgette Embroidered Indowestern Top & Palazzo Set With Dupatta", price: 10500, originalPrice: 12700, image: getImageForProduct("Salwar Kameez", 5), category: "Salwar Kameez" },
  { id: 45, name: "Black & Gold Crepe Silk Indowestern Top & Palazzo", price: 9000, originalPrice: 12000, image: getImageForProduct("Salwar Kameez", 6), category: "Salwar Kameez" },
  { id: 46, name: "Champagne Gold Silk Embroidered Saree-Style Kurta Set", price: 9000, originalPrice: 12000, image: getImageForProduct("Salwar Kameez", 7), category: "Salwar Kameez" },
  { id: 47, name: "Emerald Green Kota Silk Sharara Set", price: 9800, originalPrice: 12800, image: getImageForProduct("Salwar Kameez", 8), category: "Salwar Kameez" },
  { id: 48, name: "Teal Georgette Embroidered Salwar Kameez Set", price: 8500, originalPrice: 11200, image: getImageForProduct("Salwar Kameez", 9), category: "Salwar Kameez" },
  { id: 401, name: "Red Silk Embroidered Salwar Kameez", price: 8200, originalPrice: 10500, image: getImageForProduct("Salwar Kameez", 10), category: "Salwar Kameez" },
  { id: 402, name: "Blush Pink Georgette Embroidered Kurta Set", price: 7800, originalPrice: 9800, image: getImageForProduct("Salwar Kameez", 11), category: "Salwar Kameez" },
  { id: 403, name: "Forest Green Cotton Silk Embroidered Salwar Kameez", price: 6500, originalPrice: 8300, image: getImageForProduct("Salwar Kameez", 12), category: "Salwar Kameez" },
  { id: 404, name: "Peach Kota Doriya Embroidered Kurta Suit", price: 5900, originalPrice: 7500, image: getImageForProduct("Salwar Kameez", 13), category: "Salwar Kameez" },
  { id: 405, name: "Navy Blue Georgette Embroidered Salwar Kameez Set", price: 8800, originalPrice: 11000, image: getImageForProduct("Salwar Kameez", 14), category: "Salwar Kameez" },
  { id: 406, name: "Gold Silk Embroidered Indowestern Top & Palazzo", price: 10200, originalPrice: 12800, image: getImageForProduct("Salwar Kameez", 15), category: "Salwar Kameez" },
  { id: 407, name: "Teal Chinon Silk Embroidered Kurta Set", price: 9500, originalPrice: 12000, image: getImageForProduct("Salwar Kameez", 16), category: "Salwar Kameez" },
  { id: 408, name: "Wine Red Silk Embroidered Salwar Kameez", price: 9300, originalPrice: 11500, image: getImageForProduct("Salwar Kameez", 17), category: "Salwar Kameez" },
  { id: 409, name: "Cream Cotton Silk Embroidered Kurta Set", price: 7200, originalPrice: 9000, image: getImageForProduct("Salwar Kameez", 18), category: "Salwar Kameez" },
  { id: 410, name: "Maroon Georgette Embroidered Salwar Kameez", price: 8600, originalPrice: 10800, image: getImageForProduct("Salwar Kameez", 19), category: "Salwar Kameez" },
  { id: 411, name: "Lavender Kota Silk Embroidered Kurta Set", price: 6800, originalPrice: 8500, image: getImageForProduct("Salwar Kameez", 20), category: "Salwar Kameez" },
  { id: 412, name: "Coral Pink Tissue Silk Embroidered Salwar Kameez", price: 8900, originalPrice: 11200, image: getImageForProduct("Salwar Kameez", 21), category: "Salwar Kameez" },

  // GHARARA (20+ products)
  { id: 2, name: "Ivory Chinon Silk Gharara Set", price: 11500, originalPrice: 13500, image: getImageForProduct("Gharara", 0), category: "Gharara" },
  { id: 49, name: "Pink Purple Georgette Embroidered Gharara Set", price: 9500, originalPrice: 12000, image: getImageForProduct("Gharara", 1), category: "Gharara" },
  { id: 50, name: "Blush Pink Georgette Embroidered Gharara Suit", price: 11000, originalPrice: 14000, image: getImageForProduct("Gharara", 2), category: "Gharara" },
  { id: 51, name: "Peach Silk Embroidered Gharara Set", price: 10200, originalPrice: 13500, image: getImageForProduct("Gharara", 3), category: "Gharara" },
  { id: 52, name: "Maroon Chinon Silk Gharara with Gold Work", price: 13800, originalPrice: 17200, image: getImageForProduct("Gharara", 4), category: "Gharara" },
  { id: 53, name: "Lavender Georgette Embroidered Gharara Suit", price: 9800, originalPrice: 12500, image: getImageForProduct("Gharara", 5), category: "Gharara" },
  { id: 54, name: "Cream & Gold Silk Gharara Set", price: 14500, originalPrice: 18000, image: getImageForProduct("Gharara", 6), category: "Gharara" },
  { id: 55, name: "Navy Blue Chinon Silk Gharara Suit", price: 12300, originalPrice: 15500, image: getImageForProduct("Gharara", 7), category: "Gharara" },
  { id: 501, name: "Red Silk Embroidered Bridal Gharara", price: 15200, originalPrice: 19000, image: getImageForProduct("Gharara", 8), category: "Gharara" },
  { id: 502, name: "Forest Green Georgette Embroidered Gharara", price: 10500, originalPrice: 13200, image: getImageForProduct("Gharara", 9), category: "Gharara" },
  { id: 503, name: "Teal Silk Embroidered Gharara Set", price: 12000, originalPrice: 15000, image: getImageForProduct("Gharara", 10), category: "Gharara" },
  { id: 504, name: "Wine Red Chinon Silk Gharara Suit", price: 13200, originalPrice: 16500, image: getImageForProduct("Gharara", 11), category: "Gharara" },
  { id: 505, name: "Gold Silk Embroidered Gharara Set", price: 14800, originalPrice: 18500, image: getImageForProduct("Gharara", 12), category: "Gharara" },
  { id: 506, name: "Coral Pink Georgette Embroidered Gharara", price: 10800, originalPrice: 13500, image: getImageForProduct("Gharara", 13), category: "Gharara" },
  { id: 507, name: "Royal Blue Silk Embroidered Gharara Suit", price: 12700, originalPrice: 15900, image: getImageForProduct("Gharara", 14), category: "Gharara" },

  // SHARARA (25+ products)
  { id: 6, name: "Sharara Suit - Wine Red", price: 12500, originalPrice: 15000, image: getImageForProduct("Sharara", 0), category: "Sharara" },
  { id: 56, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, image: getImageForProduct("Sharara", 1), category: "Sharara" },
  { id: 57, name: "Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug", price: 14500, originalPrice: 16300, image: getImageForProduct("Sharara", 2), category: "Sharara" },
  { id: 58, name: "Forest Green Georgette Embroidered Sharara Suit Set", price: 5000, originalPrice: 8600, image: getImageForProduct("Sharara", 3), category: "Sharara" },
  { id: 59, name: "Dusty Rose Georgette Sharara Suit", price: 9800, originalPrice: 12800, image: getImageForProduct("Sharara", 4), category: "Sharara" },
  { id: 60, name: "Mustard Yellow Sharara Suit with Embroidery", price: 11200, originalPrice: 14500, image: getImageForProduct("Sharara", 5), category: "Sharara" },
  { id: 61, name: "Maroon Silk Embroidered Sharara Set", price: 13500, originalPrice: 17000, image: getImageForProduct("Sharara", 6), category: "Sharara" },
  { id: 62, name: "Mint Green Georgette Sharara Suit", price: 10500, originalPrice: 13200, image: getImageForProduct("Sharara", 7), category: "Sharara" },
  { id: 63, name: "Coral Pink Shararaa with Mirror Work", price: 12800, originalPrice: 16000, image: getImageForProduct("Sharara", 8), category: "Sharara" },
  { id: 64, name: "Indigo Blue Sharara Suit Set", price: 11000, originalPrice: 14000, image: getImageForProduct("Sharara", 9), category: "Sharara" },
  { id: 601, name: "Red Silk Hand Embroidered Sharara", price: 13200, originalPrice: 16500, image: getImageForProduct("Sharara", 10), category: "Sharara" },
  { id: 602, name: "Blush Pink Georgette Embroidered Sharara Set", price: 9300, originalPrice: 11800, image: getImageForProduct("Sharara", 11), category: "Sharara" },
  { id: 603, name: "Navy Blue Silk Embroidered Sharara Suit", price: 11800, originalPrice: 14800, image: getImageForProduct("Sharara", 12), category: "Sharara" },
  { id: 604, name: "Peach Chinon Silk Embroidered Sharara", price: 10200, originalPrice: 12800, image: getImageForProduct("Sharara", 13), category: "Sharara" },
  { id: 605, name: "Lavender Georgette Sharara Suit with Dupatta", price: 9700, originalPrice: 12200, image: getImageForProduct("Sharara", 14), category: "Sharara" },
  { id: 606, name: "Gold Silk Embroidered Bridal Sharara Set", price: 15000, originalPrice: 18500, image: getImageForProduct("Sharara", 15), category: "Sharara" },
  { id: 607, name: "Teal Green Tissue Silk Sharara Suit", price: 12200, originalPrice: 15300, image: getImageForProduct("Sharara", 16), category: "Sharara" },
  { id: 608, name: "Wine Red Silk Embroidered Sharara", price: 13800, originalPrice: 17200, image: getImageForProduct("Sharara", 17), category: "Sharara" },
  { id: 609, name: "Cream Chinon Silk Embroidered Sharara Set", price: 11500, originalPrice: 14300, image: getImageForProduct("Sharara", 18), category: "Sharara" },
  { id: 610, name: "Forest Green Georgette Embroidered Sharara", price: 10000, originalPrice: 12500, image: getImageForProduct("Sharara", 19), category: "Sharara" },
  { id: 611, name: "Magenta Silk Embroidered Sharara Suit", price: 12300, originalPrice: 15500, image: getImageForProduct("Sharara", 20), category: "Sharara" },
  { id: 612, name: "Royal Blue Tissue Silk Sharara Set", price: 11600, originalPrice: 14500, image: getImageForProduct("Sharara", 21), category: "Sharara" }
];

export default function ProductCatalog({ onAddToCart, onRemoveProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProducts, setAddedProducts] = useState({});
  
  // Load custom products from localStorage
  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
  
  // Combine hardcoded and custom products
  const allProducts = [...products, ...customProducts];
  
  const isMobile = window.innerWidth <= 768;

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleDecreaseQuantity = (product) => {
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[product.id] || 0) - 1);
      if (newQty === 0) {
        const updated = {...prev};
        delete updated[product.id];
        onRemoveProduct?.(product.id);
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };
  
  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];
  
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  // Debug
  if (typeof window !== 'undefined') {
    console.log(`🔍 Category: ${selectedCategory}, Filtered Count: ${filteredProducts.length}, Total: ${products.length}`);
    if (filteredProducts.length === 0) {
      console.warn("⚠️ No products found! Check category names");
    }
  }

  const gridCols = isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <div style={{ padding: "30px 20px", width: "100%", background: "#f5f5f5" }}>
      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              background: selectedCategory === cat ? "var(--accent)" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#666",
              border: selectedCategory === cat ? "none" : "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedCategory === cat ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ padding: "15px", background: "#fff3cd", borderRadius: "4px", marginBottom: "30px", fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
        ✨ {filteredProducts.length} {selectedCategory} products
      </div>

      {/* Product Grid - 2 columns on mobile, 4 on desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: "12px",
        width: "100%"
      }}>
        {filteredProducts.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                position: "relative"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
              }}
            >
              {/* Image Container */}
              <div style={{
                background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "60px",
                position: "relative",
                overflow: "hidden"
              }}>
                {typeof product.image === "string" && product.image.startsWith("data:") ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  product.image
                )}
                {/* Wishlist Icon */}
                <button
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#fff",
                    border: "none",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  ♡
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: isMobile ? "8px" : "12px" }}>
                {/* Brand/Category Badge */}
                <div style={{ fontSize: "10px", color: "#999", marginBottom: "3px", textTransform: "uppercase", fontWeight: "600" }}>
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 style={{
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "4px",
                  lineHeight: "1.4",
                  minHeight: "auto",
                  maxHeight: isMobile ? "auto" : "auto",
                  overflow: "visible",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-word"
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div style={{ fontSize: isMobile ? "11px" : "12px", marginBottom: "4px", color: "#ff6b6b" }}>
                  ⭐ 4.3 ★ <span style={{ color: "#999", fontSize: "10px" }}>(2.2k)</span>
                </div>

                {/* Pricing */}
                <div style={{ marginBottom: isMobile ? "8px" : "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "700", color: "#333" }}>
                      ₹{product.price}
                    </span>
                    <span style={{ fontSize: isMobile ? "11px" : "13px", color: "#999", textDecoration: "line-through" }}>
                      ₹{product.originalPrice}
                    </span>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: "600", color: "#ff6b6b" }}>
                      ({discount}%)
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                {addedProducts[product.id] ? (
                  <div style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center"
                  }}>
                    <button
                      onClick={() => handleDecreaseQuantity(product)}
                      style={{
                        flex: 1,
                        padding: isMobile ? "5px" : "6px",
                        fontSize: isMobile ? "12px" : "14px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      −
                    </button>
                    <span style={{ flex: 1, textAlign: "center", fontSize: isMobile ? "11px" : "13px", fontWeight: "600", color: "var(--accent)" }}>
                      {addedProducts[product.id]}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      style={{
                        flex: 1,
                        padding: isMobile ? "5px" : "6px",
                        fontSize: isMobile ? "12px" : "14px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddProduct(product)}
                    style={{
                      width: "100%",
                      padding: isMobile ? "6px" : "8px",
                      fontSize: isMobile ? "12px" : "13px",
                      background: "var(--accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.background = "#c9860f"}
                    onMouseLeave={e => e.target.style.background = "var(--accent)"}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}