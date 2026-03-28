# House of Jodha - Quick Start Guide

## 🚀 Fastest Way to Get Running (5 minutes)

### Step 1: Start Frontend (Terminal 1)
```bash
cd c:\Users\Tyson\Desktop\diva-clone
npm run dev
```
✅ Frontend ready at: http://localhost:5173

### Step 2: Start Backend (Terminal 2)
```bash
cd c:\Users\Tyson\Desktop\diva-clone\backend
npm install
npm run dev
```
✅ Backend ready at: http://localhost:5000

### Step 3: Setup Database
**Option A - MongoDB Atlas (Easiest):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`: `MONGODB_URI=your-connection-string`

**Option B - Local MongoDB:**
1. Download from https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Use default: `MONGODB_URI=mongodb://localhost:27017/house-of-jodha`

---

## 📁 Project Structure

```
diva-clone/
├── src/                      # Frontend (React)
│   ├── components/           # UI Components
│   ├── services/
│   │   └── api.js           # API calls to backend
│   └── App.jsx
├── backend/                  # Backend (Express, Node.js)
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── server.js
│   └── .env                 # Configuration
└── SETUP_GUIDE.md           # Full setup documentation
```

---

## 🔌 Key Features

✅ **Frontend:**
- Product catalog with filtering
- Shopping cart
- Customer reviews
- Responsive design
- Golden/Purple luxury theme

✅ **Backend:**
- Product management
- User registration/login
- Order processing
- JWT authentication
- MongoDB database

---

## 📝 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=Lehenga` | Filter by category |
| POST | `/api/users/register` | Create account |
| POST | `/api/users/login` | Login user |
| POST | `/api/orders/create` | Place order |
| GET | `/api/orders/user/:userId` | Get user orders |

---

## 🛠 Available Commands

**Frontend:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
npm run lint         # Check code quality
```

**Backend:**
```bash
npm run dev          # Start with auto-reload
npm start            # Start production mode
npm run seed         # Add sample products (after setup)
```

---

## 📦 What's Next

1. **Add Products:** Create products via API or MongoDB Compass
2. **User Registration:** Navigate to login form (when added)
3. **Test Checkout:** Add items to cart and create orders
4. **Deploy:** Push to GitHub → Deploy to Vercel/Railway

---

## ❓ Common Issues

**"Cannot find module 'express'"**
→ Run: `cd backend && npm install`

**"MongoDB connection failed"**
→ Check MongoDB is running or update MONGODB_URI in .env

**"Port 5000 already in use"**
→ Change PORT in backend/.env

**"API calls not working"**
→ Ensure backend is running on http://localhost:5000

---

## 🎯 Development Workflow

1. **Make UI changes** → Frontend hot-reloads automatically
2. **Make API changes** → Backend auto-restarts with nodemon
3. **Add new route** → Update backend route, then call from React
4. **Test in Postman** → Verify API before frontend integration

---

## 📧 Contact & Support

For issues or questions, check:
- `SETUP_GUIDE.md` - Detailed setup
- `backend/README.md` - Backend docs
- Terminal error messages for specific issues

---

## 🎉 You're All Set!

Your House of Jodha e-commerce platform is ready. Visit:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

Happy coding! 🚀
