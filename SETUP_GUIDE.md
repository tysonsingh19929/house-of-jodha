# House of Jodha - Full E-Commerce Website

## Complete Setup Guide

### Part 1: Frontend Setup

1. **Install dependencies:**
```bash
cd diva-clone
npm install
```

2. **Create `.env.local` file:**
```
VITE_API_URL=http://localhost:5000/api
```

3. **Run development server:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

### Part 2: Backend Setup

1. **Navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup MongoDB** (Choose one):

   **Option A: Local MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Run MongoDB service
   - Update `.env`: `MONGODB_URI=mongodb://localhost:27017/house-of-jodha`

   **Option B: MongoDB Atlas (Cloud)**
   - Create account: https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Update `.env`: `MONGODB_URI=your-atlas-connection-string`

4. **Setup environment variables:**
```bash
# Copy .env template
cp .env.example .env

# Update .env with your settings
MONGODB_URI=mongodb://localhost:27017/house-of-jodha
JWT_SECRET=your-strong-secret-key-here
PORT=5000
```

5. **Start backend server:**
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

### Part 3: Seed Sample Data

Create a file `backend/seed.js`:

```javascript
import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: "Beige Gold Tissue Silk Embroidered Lehenga Set",
    category: "Lehenga",
    price: 25600,
    originalPrice: 30800,
    description: "Beautiful beige and gold tissue silk lehenga with intricate embroidery",
    stock: 10
  },
  {
    name: "Ivory Chinon Silk Gharara Set",
    category: "Gharara",
    price: 11500,
    originalPrice: 13500,
    description: "Elegant ivory chinon silk gharara with embroidered kurta and dupatta",
    stock: 8
  },
  {
    name: "Royal Purple Satin Saree",
    category: "Saree",
    price: 8900,
    originalPrice: 10500,
    description: "Pre-draped royal purple satin saree with embroidery",
    stock: 15
  },
  {
    name: "Designer Anarkali Suit - Midnight Blue",
    category: "Anarkali",
    price: 16800,
    originalPrice: 19800,
    description: "Gorgeous midnight blue Anarkali suit for weddings and parties",
    stock: 12
  },
  {
    name: "Salwar Kameez - Emerald Green",
    category: "Salwar Kameez",
    price: 7500,
    originalPrice: 9000,
    description: "Comfortable and stylish emerald green salwar kameez",
    stock: 20
  },
  {
    name: "Sharara Suit - Wine Red",
    category: "Sharara",
    price: 12500,
    originalPrice: 15000,
    description: "Stunning wine red sharara suit perfect for festive occasions",
    stock: 10
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);
    
    console.log(`${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
```

Add to `backend/package.json` scripts:
```json
"seed": "node seed.js"
```

Run: `npm run seed`

---

### Part 4: Connect Frontend to Backend

The frontend is already configured to use the API. Key files:
- `src/services/api.js` - API client
- `src/App.jsx` - Main app with cart state

To use backend data, update ProductCatalog.jsx:

```javascript
import { api } from '../services/api.js';
import { useEffect, useState } from 'react';

export default function ProductCatalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  // ... rest of component
}
```

---

### Part 5: Authentication (Optional)

To add login/register functionality:

```javascript
// In your component
const [user, setUser] = useState(null);

const handleLogin = async (email, password) => {
  const result = await api.login(email, password);
  if (result.token) {
    localStorage.setItem('token', result.token);
    setUser(result.user);
  }
};
```

---

### Part 6: Deployment

**Frontend Deployment (Vercel/Netlify):**
```bash
npm run build
# Deploy the dist/ folder
```

**Backend Deployment (Heroku/Railway/Render):**
```bash
# Add Procfile:
web: node server.js

# Push to git and deploy
```

**Environment Variables on Production:**
- Update `VITE_API_URL` to production backend URL
- Use MongoDB Atlas for database
- Use strong JWT_SECRET

---

### Architecture Overview

```
┌─────────────────────────────────────┐
│        Frontend (React)              │
│  http://localhost:5173              │
│  - Product Catalog                  │
│  - Shopping Cart                    │
│  - User Profile                     │
└────────────┬────────────────────────┘
             │
             │ API Calls (JSON)
             │
┌────────────▼────────────────────────┐
│      Backend (Express.js)           │
│  http://localhost:5000              │
│  - /api/products                    │
│  - /api/users                       │
│  - /api/orders                      │
└────────────┬────────────────────────┘
             │
             │ Database Queries
             │
┌────────────▼────────────────────────┐
│    Database (MongoDB)               │
│  - Products Collection              │
│  - Users Collection                 │
│  - Orders Collection                │
└─────────────────────────────────────┘
```

---

### Testing the API

Use Postman or cURL:

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

**Create Order:**
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"userId":"...", "items":[...], "totalAmount":25000}'
```

---

### What's Included

✅ Complete React Frontend
✅ Express.js Backend API
✅ MongoDB Database Models
✅ User Authentication (with JWT)
✅ Product Management
✅ Order Processing
✅ Shopping Cart
✅ User Profiles

---

### Next Add-ons

- Payment Gateway (Stripe/Razorpay)
- Email Notifications
- Admin Dashboard
- Analytics
- Review System
- Wishlist Feature

---

### Support & Troubleshooting

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**MongoDB Connection Issues:**
- Ensure MongoDB service is running
- Check connection string in .env
- Use MongoDB Compass for debugging

**CORS Errors:**
- Backend has CORS enabled for all origins (change in production)
- Ensure frontend API URL matches backend

---

You now have a fully functional e-commerce website! 🎉
