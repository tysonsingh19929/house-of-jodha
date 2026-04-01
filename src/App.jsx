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

function HomePage({ cartOpen, setCartOpen, cartItems, setCartItems, addToCart, removeFromCart, removeProductFromCart, cartCount }) {
  return (
    <div style={{ background: "#fff", paddingTop: window.innerWidth <= 768 ? "160px" : "220px" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      <Hero />
      <ProductCatalog onAddToCart={addToCart} onRemoveProduct={removeProductFromCart} />
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
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize products in localStorage and check for logged-in user
  useEffect(() => {
    initializeProductsInStorage();
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

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

  const cartCount = cartItems.length;

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