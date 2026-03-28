import { useState } from "react";
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

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div style={{ background: "#fff" }}>
      <Navbar cartCount={cartItems.length} onCartClick={() => setCartOpen(!cartOpen)} />
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

export default App;