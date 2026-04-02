import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products as allProducts } from "../data/products.js";

export default function OccasionPage({ 
  cartCount, onCartClick, onAddToCart, wishlistOpen, setWishlistOpen, wishlistItems, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const occasionDetails = {
    mehendi: { name: "MEHENDI", bgColor: "#D4F1D4", textColor: "#2C6B2C", description: "Celebrate the joy of Mehendi with our vibrant collection.", tips: "Opt for light fabrics with beautiful embroidery." },
    sangeet: { name: "SANGEET", bgColor: "#FFF4D6", textColor: "#8B7500", description: "Get ready to dance with our elegant Sangeet collection.", tips: "Choose designs that allow movement for dancing." },
    wedding: { name: "WEDDING", bgColor: "#F8D7E0", textColor: "#8B3A5C", description: "Exquisite designs for the most special day.", tips: "Grand and statement-making premium fabrics." }
    // Add engagement, reception, cocktail details here...
  };

  const details = occasionDetails[occasion || 'mehendi'] || occasionDetails.mehendi;
  // Filter products from the Master List
  const products = allProducts.filter(p => p.occasion === (occasion || 'mehendi'));

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} wishlistCount={wishlistItems.length} onWishlistClick={() => setWishlistOpen(true)} />
      
      <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* SLIM HEADER */}
        <div style={{ background: details.bgColor, padding: "15px", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ color: details.textColor, fontSize: "24px", margin: "0" }}>{details.name}</h1>
          <p style={{ fontSize: "13px", margin: "5px 0" }}>{details.description}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
          {products.map(product => (
            <div key={product.id} style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              
              {/* CLICKABLE AREA */}
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: "40px", textAlign: "center", padding: "20px", background: "#f9f9f9" }}>{product.image}</div>
                <div style={{ padding: "10px" }}>
                  <h3 style={{ fontSize: "13px", margin: "0 0 5px 0" }}>{product.name}</h3>
                  <p style={{ fontWeight: "bold", color: "#D4AF37" }}>₹{product.price}</p>
                </div>
              </Link>

              <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} style={{ width: "90%", margin: "5px 5%", padding: "8px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}