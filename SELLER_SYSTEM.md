# Seller-Based Product Management System

## Overview
The system now supports role-based seller product management where:
- **Super Admin** can view, edit, and delete all products
- **Regular Sellers** can only view, edit, and delete their own products

## Demo Credentials

### Super Admin
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** Can manage ALL products on the platform

### Regular Seller 1
- **Email:** seller@example.com
- **Password:** seller123
- **Role:** Can manage only their own products (Priya Textiles)

### Regular Seller 2
- **Email:** seller2@example.com
- **Password:** seller456
- **Role:** Can manage only their own products (Elegant Wear)

## Features

### 1. Seller Authentication
- Login via `/seller-login` page with email and password
- Seller information is stored in localStorage:
  - `seller_authenticated`: Login status
  - `seller_id`: Unique seller identifier
  - `seller_name`: Seller business name
  - `seller_email`: Seller email
  - `seller_role`: Role type (admin or seller)
  - `is_super_admin`: Boolean flag for admin privileges

### 2. Product Management Dashboard
**Location:** `/admin-dashboard`

#### Features:
- **Left Column:** Add New Product form
  - Product Name, Category, Sale Price, Original Price
  - Product Image upload (required)
  - Only saves products with the current seller's ID

- **Right Column:** Products List
  - Shows all products (for admins) or only seller's products (for regular sellers)
  - Displays seller name for each product
  - Edit and Delete buttons (only available for authorized products)
  - "View Only" label for products by other sellers (admins see full list)

### 3. Permission System
- **Regular Sellers:**
  - Can only edit/delete products they created
  - Can see all products in the catalog but can't modify them
  - Can add new products

- **Super Admin:**
  - Can view all products
  - Can edit any product
  - Can delete any product
  - Can add new products

## API Endpoints

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/seller/:sellerId` - Get seller's products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (requires sellerId, sellerName)
- `PUT /api/products/:id` - Update product (with permission check)
- `DELETE /api/products/:id` - Delete product (with permission check)

### Sellers
- `POST /api/sellers/register` - Register new seller
- `POST /api/sellers/login` - Seller login
- `GET /api/sellers/:id` - Get seller profile
- `PUT /api/sellers/:id` - Update seller profile
- `GET /api/sellers` - Get all sellers (admin only)

## Database Schema

### Product
```javascript
{
  name: String (required),
  category: String (enum: ['Lehenga', 'Saree', 'Anarkali', 'Salwar Kameez', 'Gharara', 'Sharara']),
  price: Number (required),
  originalPrice: Number (required),
  description: String,
  image: String,
  stock: Number (default: 0),
  sellerId: String (required, references seller),
  sellerName: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Seller
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (enum: ['admin', 'seller'], default: 'seller'),
  businessName: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  verified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the System

### Test Scenario 1: Super Admin Workflow
1. Go to `/seller-login`
2. Login with admin@example.com / admin123
3. Dashboard shows "🔑 Super Admin"
4. Create a product - it gets assigned to admin seller
5. All products on the platform are visible
6. Can edit/delete any product

### Test Scenario 2: Regular Seller Workflow
1. Go to `/seller-login`
2. Login with seller@example.com / seller123
3. Dashboard shows "👤 Seller • Priya Textiles"
4. Create a product - it gets assigned to this seller
5. Only this seller's products show Edit/Delete buttons
6. Other sellers' products show "View Only"
7. Try to edit another seller's product - get permission error

### Test Scenario 3: Product Display
1. As admin, create 3 products
2. As seller1, create 2 products
3. As seller2, create 1 product
4. Admin dashboard shows all 6 products
5. Seller1 dashboard shows only 2 products (can edit/delete)
6. Seller2 dashboard shows only 1 product (can edit/delete)

## Backend Changes
- Added `/backend/models/Seller.js` - Seller model with role support
- Updated `/backend/models/Product.js` - Added sellerId and sellerName fields
- Updated `/backend/routes/products.js` - Added seller filtering and permission checks
- Created `/backend/routes/sellers.js` - Seller authentication and management
- Updated `/backend/server.js` - Added sellers route and demo data seeding
- Created `/backend/seed.js` - Demo seller creation on startup

## Frontend Changes
- Updated `/src/pages/SellerLogin.jsx` - Email/password login instead of password-only
- Completely rewrote `/src/pages/AdminDashboard.jsx` - Backend API integration
  - Fetches products from MongoDB
  - Implements role-based edit/delete permissions
  - Displays seller name for each product
  - Shows admin/seller status in header

## Migration Notes
- Previous localStorage-based products are no longer used
- All products must now be created through the seller dashboard
- Products automatically associate with the logged-in seller
- Existing hardcoded products in components remain for display but can be managed via the dashboard

## Future Enhancements
- Add password hashing with bcryptjs
- Implement JWT token authentication
- Add seller registration validation
- Add seller verification workflow
- Add product visibility controls (draft/published)
- Add inventory management
- Add seller analytics and reporting
