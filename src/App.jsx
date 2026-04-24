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

function TrustBanner() {
  const isMobile = window.innerWidth <= 768;
  const iconSize = isMobile ? "18" : "24";
  const features = [
    {
      icon: <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      title: "Assured Quality",
      sub: isMobile ? "Premium Fabrics" : "Handpicked Premium Fabrics"
    },
    {
      icon: <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
      title: "Secure Payment",
      sub: isMobile ? "100% Encrypted" : "100% Encrypted Checkout"
    },
    {
      icon: <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
      title: isMobile ? "100% Protected" : "100% Payment Protection",
      sub: isMobile ? "Safe & Fraud-Free" : "Safe & Fraud-Free Guarantee"
    }
  ];

  return (
    <div style={{
      background: "#fff",
      borderBottom: "1px solid #eaeaea",
      padding: isMobile ? "12px 8px" : "32px 0",
      width: "100%",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: isMobile ? "8px" : "40px",
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            textAlign: isMobile ? "center" : "left",
            gap: isMobile ? "6px" : "16px",
            padding: isMobile ? "8px 4px" : "0",
            background: isMobile ? "#fafafa" : "transparent",
            borderRadius: "12px",
            border: isMobile ? "1px solid #f0f0f0" : "none",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "default"
          }}
            onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              color: "#D4AF37",
              display: "flex",
              background: isMobile ? "#fff" : "#fafafa",
              padding: isMobile ? "10px" : "16px",
              borderRadius: "50%",
              boxShadow: "0 4px 16px rgba(212, 175, 55, 0.15)"
            }}>
              {f.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2px" : "4px", alignItems: isMobile ? "center" : "flex-start" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? "10px" : "14px", fontWeight: "700", color: "#1a1a1a", letterSpacing: isMobile ? "0px" : "0.5px", textTransform: "uppercase", lineHeight: 1.2 }}>
                {f.title}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? "9px" : "12px", color: "#666", lineHeight: 1.2 }}>
                {f.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({
  cartOpen, setCartOpen, cartItems, setCartItems, addToCart, removeFromCart, removeProductFromCart, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist,
  handleCartClick, handleWishlistClick
}) {
  useEffect(() => {
    document.title = "The Sringar House | Luxury Indian Ethnic Wear & Fine Jewellery";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
    const description = "Discover exquisite Indian ethnic wear, lehengas, sarees, and fine jewellery at The Sringar House. Shop premium, bespoke, and handcrafted outfits.";
    metaDesc.content = description;

    // Open Graph / Social Media meta tags
    const ogTags = {
      "og:title": "The Sringar House | Luxury Indian Ethnic Wear & Fine Jewellery",
      "og:description": description,
      "og:image": "https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&w=1200&format=webp",
      "og:url": window.location.origin,
      "og:type": "website",
      "og:site_name": "The Sringar House"
    };

    Object.keys(ogTags).forEach(property => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = ogTags[property];
    });
  }, []);

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
      <TrustBanner />
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
    if (user && user !== "undefined") {
      try { setCurrentUser(JSON.parse(user)); } catch (e) { console.error(e); }
    }

    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist && savedWishlist !== "undefined") {
      try { setWishlistItems(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart && savedCart !== "undefined") {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
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
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>
              <h2>Page Not Found</h2>
              <a href="/" style={{ color: "#D4AF37", textDecoration: "underline", marginTop: "20px", display: "inline-block" }}>Return to Home</a>
            </div>
          }
        />
      </Routes>
      <FloatingWidgets />
    </BrowserRouter>
  );
}

export default App;
