import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import SellerSignup from "./pages/SellerSignup";
import QuickEdit from "./pages/QuickEdit";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import Chatbot from "./components/Chatbot";
import { lazy, Suspense } from "react";
import SellerStorefront from "./pages/SellerStorefront";

function HomePage({
  cartOpen, setCartOpen, cartItems, setCartItems, addToCart, removeFromCart, removeProductFromCart, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist,
  handleCartClick, handleWishlistClick
}) {
  return (
    <div style={{ background: "#fff", paddingTop: "64px" }}>
      <Navbar
        cartCount={cartCount}
        onCartClick={handleCartClick}
        wishlistCount={wishlistCount}
        onWishlistClick={handleWishlistClick}
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

function FloatingWidgets() {
  const location = useLocation();
  const hiddenRoutes = ["/admin-dashboard", "/seller-login", "/seller-signup", "/admin-login", "/admin"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <Chatbot />
    </>
  );
}

const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));

function App() {
  const [subdomain, setSubdomain] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const host = window.location.hostname;
    // Ignore IP addresses (e.g., 192.168.x.x) so mobile testing works natively
    const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(host);
    if (!isIpAddress && host !== 'localhost') {
      // Vercel domains already have 3 parts (app-name.vercel.app), so we need to check specifically
      if (host.endsWith('vercel.app')) {
        const parts = host.split('.');
        if (parts.length >= 4 && parts[0] !== 'www') {
          setSubdomain(parts[0]);
        }
      } else {
        const parts = host.split('.');
        if (parts.length >= 3 && parts[0] !== 'www') {
          setSubdomain(parts[0]);
        } else if (parts.length === 2 && parts[1] === 'localhost') {
          setSubdomain(parts[0]); // Handles local testing like 'priya.localhost'
        }
      }
    }

    initializeProductsInStorage();
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Toggle handlers — clicking again closes, opening one closes the other
  const handleCartClick = () => {
    setCartOpen(prev => !prev);
    setWishlistOpen(false);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(prev => !prev);
    setCartOpen(false);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, product];
      console.log(`Cart updated. Total items: ${updatedItems.length}`);
      return updatedItems;
    });
    setWishlistItems((prevWishlist) => prevWishlist.filter(item => (item.id || item._id) !== (product.id || product._id)));
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const removeProductFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId && item._id !== productId));
  };

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => (item.id || item._id) === (product.id || product._id));
    if (!isAlreadyInWishlist) setWishlistItems([...wishlistItems, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId && item._id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId || item._id === productId);
  };

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  // If accessed via a seller subdomain, render the isolated Storefront Router
  if (subdomain) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SellerStorefront subdomain={subdomain} cartCount={cartCount} onCartClick={handleCartClick} />} />
          <Route
            path="/product/:productId"
            element={
              <Suspense fallback={<div style={{ padding: 40 }}>Loading product…</div>}>
                <ProductDetail
                  cartOpen={cartOpen} setCartOpen={setCartOpen}
                  addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} cartCount={cartCount}
                  wishlistOpen={wishlistOpen} setWishlistOpen={setWishlistOpen} wishlistItems={wishlistItems} wishlistCount={wishlistCount}
                  addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} isInWishlist={isInWishlist}
                  onCartClick={handleCartClick} onWishlistClick={handleWishlistClick}
                />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartOpen={cartOpen} setCartOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} cartCount={cartCount} onCartClick={handleCartClick} clearCart={() => setCartItems([])} />}
          />
          <Route path="*" element={<div style={{ textAlign: "center", padding: "100px" }}><h2>Page Not Found</h2><a href={`http://${window.location.hostname.replace(`${subdomain}.`, '')}`}>Return to Main Marketplace</a></div>} />
        </Routes>
        <FloatingWidgets />
      </BrowserRouter>
    );
  }

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
              handleCartClick={handleCartClick}
              handleWishlistClick={handleWishlistClick}
            />
          }
        />
        <Route
          path="/collection/:type"
          element={
            <CollectionPage
              cartCount={cartCount}
              onCartClick={handleCartClick}
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
              onWishlistClick={handleWishlistClick}
            />
          }
        />
        <Route
          path="/occasion/:occasion"
          element={
            <OccasionPage
              cartCount={cartCount}
              onCartClick={handleCartClick}
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
              onWishlistClick={handleWishlistClick}
            />
          }
        />
        <Route
          path="/policy/:policy"
          element={
            <PoliciesPage
              cartCount={cartCount}
              onCartClick={handleCartClick}
              cartOpen={cartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-signup" element={<SellerSignup />} />
        <Route path="/quick-edit" element={<QuickEdit />} />
        <Route
          path="/product/:productId"
          element={
            <Suspense fallback={<div style={{ padding: 40 }}>Loading product…</div>}>
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
                onCartClick={handleCartClick}
                onWishlistClick={handleWishlistClick}
              />
            </Suspense>
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
              onCartClick={handleCartClick}
              onWishlistClick={handleWishlistClick}
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
              onCartClick={handleCartClick}
              clearCart={() => setCartItems([])}
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
              onCartClick={handleCartClick}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistCount={wishlistCount}
              onWishlistClick={handleWishlistClick}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistItems={wishlistItems}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartCount={cartCount}
              onCartClick={handleCartClick}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistCount={wishlistCount}
              onWishlistClick={handleWishlistClick}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistItems={wishlistItems}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPassword
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartCount={cartCount}
              onCartClick={handleCartClick}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistCount={wishlistCount}
              onWishlistClick={handleWishlistClick}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistItems={wishlistItems}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
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
              onCartClick={handleCartClick}
              wishlistOpen={wishlistOpen}
              setWishlistOpen={setWishlistOpen}
              wishlistCount={wishlistCount}
              onWishlistClick={handleWishlistClick}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              wishlistItems={wishlistItems}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              cartCount={cartCount}
              onCartClick={handleCartClick}
              wishlistCount={wishlistCount}
              onWishlistClick={handleWishlistClick}
            />
          }
        />
      </Routes>
      <FloatingWidgets />
    </BrowserRouter>
  );
}

export default App;
