import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { initializeProductsInStorage } from "./utils/initializeProducts";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalog from "./components/ProductCatalog";
import ShopByOccasion from "./components/ShopByOccasion";
import Features from "./components/Features";
import Newsletter from "./components/Newsletter";
import CustomerReviews from "./components/CustomerReviews";
import FAQSection from "./components/FAQSection";
import About from "./components/About";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import CollectionPage from "./pages/CollectionPage";
import OccasionPage from "./pages/OccasionPage";
import PoliciesPage from "./pages/PoliciesPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import SellerLogin from "./pages/SellerLogin";
import QuickEdit from "./pages/QuickEdit";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function HomePage({ 
  cartOpen, setCartOpen, cartItems, setCartItems, addToCart, removeFromCart, removeProductFromCart, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  return (
    <div style={{ background: "#fff", paddingTop: window.innerWidth <= 768 ? "160px" : "220px" }}>
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setCartOpen(!cartOpen)}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setWishlistOpen(!wishlistOpen)}
      />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      {wishlistOpen && (
        <Wishlist 
          items={wishlistItems} 
          onRemove={removeFromWishlist} 
          onClose={() => setWishlistOpen(false)}
          onAddToCart={addToCart}
        />
      )}
      <Hero />
      <ProductCatalog 
        onAddToCart={addToCart} 
        onRemoveProduct={removeProductFromCart}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
        isInWishlist={isInWishlist}
      />
      <ShopByOccasion />
      <Features />
      <Newsletter />
      <CustomerReviews />
      <FAQSection />
      <About />
      <Footer />
    </div>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize products in localStorage and check for logged-in user
  useEffect(() => {
    initializeProductsInStorage();
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    // Use functional state update to avoid closure issues
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, product];
      console.log(`Cart updated. Total items: ${updatedItems.length}`);
      return updatedItems;
    });
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const removeProductFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              cartOpen={cartOpen} 
              setCartOpen={setCartOpen} 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              removeProductFromCart={removeProductFromCart}
              cartCount={cartCount}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistItems={wishlistItems}
              wishlistCount={wishlistCount}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isInWishlist={isInWishlist}
            />
          } 
        />
        <Route 
          path="/collection/:type" 
          element={
            <CollectionPage 
              cartCount={cartCount} 
              onCartClick={() => setCartOpen(!cartOpen)} 
              onAddToCart={addToCart}
              onRemoveProduct={removeProductFromCart}
              cartOpen={cartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistItems={wishlistItems}
              wishlistCount={wishlistCount}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isInWishlist={isInWishlist}
            />
          } 
        />
        <Route 
          path="/occasion/:occasion" 
          element={
            <OccasionPage 
              cartCount={cartCount} 
              onCartClick={() => setCartOpen(!cartOpen)}
              onAddToCart={addToCart}
              onRemoveProduct={removeProductFromCart}
              cartOpen={cartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistItems={wishlistItems}
              wishlistCount={wishlistCount}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isInWishlist={isInWishlist}
            />
          } 
        />
        <Route 
          path="/policy/:policy" 
          element={
            <PoliciesPage 
              cartCount={cartCount} 
              onCartClick={() => setCartOpen(!cartOpen)}
              cartOpen={cartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={<AdminDashboard />}
        />
        <Route 
          path="/seller-login" 
          element={<SellerLogin />}
        />
        <Route 
          path="/quick-edit" 
          element={<QuickEdit />}
        />
        <Route 
          path="/product/:productId" 
          element={
            <ProductDetail 
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
              cartCount={cartCount}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistItems={wishlistItems}
              wishlistCount={wishlistCount}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isInWishlist={isInWishlist}
            />
          }
        />
        <Route 
          path="/search" 
          element={
            <SearchResults 
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
              cartCount={cartCount}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistItems={wishlistItems}
              wishlistCount={wishlistCount}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isInWishlist={isInWishlist}
            />
          }
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout 
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              cartCount={cartCount}
            />
          }
        />
        <Route 
          path="/login" 
          element={
            <Login 
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartCount={cartCount}
            />
          }
        />
        <Route 
          path="/signup" 
          element={
            <Signup 
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartCount={cartCount}
            />
          }
        />
        <Route 
          path="/admin-login" 
          element={<AdminLogin />}
        />
        <Route 
          path="/admin" 
          element={<AdminPanel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;