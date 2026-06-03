import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import sellerRoutes from './routes/sellers.js';
import chatRoutes from './routes/chat.js';
import { seedSellers, seedProducts } from './seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: [
    'https://house-of-jodha.vercel.app',
    'https://thesringarhouse.com',
    'https://www.thesringarhouse.com',
    /^https?:\/\/([a-z0-9-]+\.)?thesringarhouse\.com$/,
    /^http:\/\/localhost:\d+$/
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Database Connection
const mongoUri = (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<db_password>'))
  ? process.env.MONGODB_URI
  : (process.env.MONGO_URI && !process.env.MONGO_URI.includes('<db_password>'))
    ? process.env.MONGO_URI
    : null;

if (!mongoUri) {
  console.error('Error: MONGODB_URI or MONGO_URI environment variable is not defined.');
  process.exit(1);
}

const connectToMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to Atlas.');
    await seedSellers();
    await seedProducts();
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
};

connectToMongo(mongoUri);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/chat', chatRoutes);

// Health checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});
app.get('/api/chat/health', (req, res) => res.status(200).send('Always Awake!'));

// Serve frontend static files in production
const frontendBuildPath = path.join(__dirname, '../dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
