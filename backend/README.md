# House of Jodha - Backend Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/house-of-jodha
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Lehenga` - Filter by category
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/user/:userId` - Get user's orders
- `PUT /api/orders/:id/status` - Update order status

### Cart
- `GET /api/cart` - Get cart (client-side with localStorage)
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item
- `PUT /api/cart/update/:productId` - Update cart item

## Database Models

### Product
```javascript
{
  name, category, price, originalPrice, description, image, stock
}
```

### User
```javascript
{
  name, email, password, phone, address, city, state, zipCode, country
}
```

### Order
```javascript
{
  userId, items[], totalAmount, status, shippingAddress, paymentMethod, paymentStatus
}
```

## Next Steps

1. **Connect Frontend**: Update frontend API calls to `http://localhost:5000/api`
2. **Database**: Install MongoDB locally or use MongoDB Atlas
3. **Payment Gateway**: Integrate Stripe/Razorpay for payments
4. **Authentication**: Implement JWT middleware for protected routes
5. **Admin Dashboard**: Create admin panel for product management

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running locally
- **Port Already in Use**: Change PORT in .env file
- **Module not found**: Run `npm install` again
