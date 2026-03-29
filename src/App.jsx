import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PromoSection from "./components/PromoSection";
import SearchBar from "./components/SearchBar";
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

function HomePage({ cartOpen, setCartOpen, cartItems, setCartItems, addToCart, removeFromCart, cartCount }) {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      <PromoSection />
      <SearchBar />
      <Hero />
      <ProductCatalog onAddToCart={addToCart} />
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

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
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
            />
          } 
        />
        <Route 
          path="/occasion/:occasion" 
          element={
            <OccasionPage 
              cartCount={cartCount} 
              onCartClick={() => setCartOpen(!cartOpen)}
            />
          } 
        />
        <Route 
          path="/policy/:policy" 
          element={
            <PoliciesPage 
              cartCount={cartCount} 
              onCartClick={() => setCartOpen(!cartOpen)}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;