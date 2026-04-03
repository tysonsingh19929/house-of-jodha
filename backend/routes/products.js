import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// This is your data "blueprint"
const productsData = [
  { id: 101, name: "Multicolor Organza Silk Printed & Hand Embroidered Lehenga Set", price: 12300, originalPrice: 14700, image: "👗", category: "Lehenga", occasion: "mehendi" },
  { id: 102, name: "Green Luxe Fabric Embroidered Saree", price: 9800, originalPrice: 12900, image: "🧥", category: "Saree", occasion: "mehendi" },
  { id: 103, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, image: "👚", category: "Sharara", occasion: "mehendi" },
  { id: 104, name: "Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug", price: 14500, originalPrice: 16300, image: "👗", category: "Sharara", occasion: "mehendi" },
  { id: 105, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, image: "👗", category: "Lehenga", occasion: "mehendi" },
  { id: 201, name: "Gold Tissue Silk Embroidered Lehenga Set", price: 24000, originalPrice: 31000, image: "👗", category: "Lehenga", occasion: "sangeet" },
  { id: 202, name: "Ivory Georgette Embroidered Anarkali Suit", price: 16000, originalPrice: 20000, image: "👗", category: "Anarkali", occasion: "sangeet" },
  { id: 301, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga Set", price: 27000, originalPrice: 32900, image: "👗", category: "Lehenga", occasion: "wedding" },
  { id: 302, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, image: "👗", category: "Lehenga", occasion: "wedding" }
];

// 1. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET BY OCCASION (For your Landing Pages)
router.get('/occasion/:occasionName', async (req, res) => {
  try {
    const { occasionName } = req.params;
    const products = await Product.find({ 
      occasion: { $regex: new RegExp(occasionName, "i") } 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. GET BY ID (For the Detail Page)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. THE MAGIC SEED ROUTE (Run this once to fix the empty page!)
router.get('/seed/data', async (req, res) => {
  try {
    await Product.deleteMany({}); // Clear old data
    const newProducts = await Product.insertMany(productsData); // Upload new data
    res.json({ message: "Success! Database is now full.", count: newProducts.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;