import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products as allProducts } from "../data/products.js";

// Function to get random products for an occasion (deterministic based on occasion name)
const getRandomProductsForOccasion = (occasion, allProducts, count = 12) => {
  if (!allProducts || allProducts.length === 0) return [];
  
  // Use occasion name as seed for consistent results
  const seed = occasion.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Shuffle array using seed
  const shuffled = [...allProducts].sort((a, b) => {
    const aScore = (a.id * seed) % 100;
    const bScore = (b.id * seed) % 100;
    return aScore - bScore;
  });
  
  return shuffled.slice(0, count);
};

export default function OccasionPage({ 
  cartCount, onCartClick, onAddToCart, wishlistOpen, setWishlistOpen, wishlistItems, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const occasionDetails = {
    mehendi: { name: "MEHENDI", bgColor: "#D4F1D4", textColor: "#2C6B2C", description: "Celebrate the joy of Mehendi with our vibrant and colorful collection. Green is the color of choice for this auspicious occasion.", tips: "Mehendi designs should be bright, festive, and comfortable. Opt for light fabrics with beautiful embroidery." },
    sangeet: { name: "SANGEET", bgColor: "#FFF4D6", textColor: "#8B7500", description: "Get ready to dance with our elegant Sangeet collection. Shimmer, shine, and move freely in these high-energy designs.", tips: "Choose designs that allow movement for dancing. Look for outfits with mirror work or sequins." },
    wedding: { name: "WEDDING", bgColor: "#F8D7E0", textColor: "#8B3A5C", description: "Exquisite designs for the most special day. Traditional elegance meets modern craftsmanship.", tips: "Grand and statement-making premium fabrics. Classic silks and heavy embroidery are perfect." },
    engagement: { name: "ENGAGEMENT", bgColor: "#F4ECF7", textColor: "#8e44ad", description: "Start your journey with grace. Our engagement collection features delicate pastels and sophisticated silhouettes.", tips: "Soft pastels and floral motifs create a romantic, dreamy look." },
    reception: { name: "RECEPTION", bgColor: "#E0F7F9", textColor: "#00838f", description: "Glamour takes center stage. Discover sophisticated evening wear and contemporary ethnic fusion for the grand finale.", tips: "Deep jewel tones and sleek drapes work best for evening receptions." },
    cocktail: { name: "COCKTAIL", bgColor: "#FDEDEC", textColor: "#c0392b", description: "Chic, stylish, and bold. Perfect your cocktail look with our range of modern drapes and avant-garde designs.", tips: "Don't be afraid to experiment with western-fusion silhouettes and bold cuts." }
  };

  const details = occasionDetails[occasion || 'mehendi'] || occasionDetails.mehendi;
  
  // Get random products for this occasion (memoized to avoid recalculation)
  const products = useMemo(() => {
    return getRandomProductsForOccasion(occasion || 'mehendi', allProducts, 12);
  }, [occasion, allProducts]);

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} wishlistCount={wishlistItems.length} onWishlistClick={() => setWishlistOpen(true)} />
      
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* OCCASION HEADER */}
        <div style={{ background: details.bgColor, padding: "20px", borderRadius: "10px", textAlign: "center", marginBottom: "30px", border: `2px solid ${details.textColor}33` }}>
          <h1 style={{ color: details.textColor, fontSize: "32px", margin: "0 0 10px 0", letterSpacing: "2px" }}>{details.name}</h1>
          <p style={{ fontSize: "14px", margin: "0 0 12px 0", color: "#555", lineHeight: "1.6" }}>{details.description}</p>
          <div style={{ background: "rgba(255,255,255,0.7)", padding: "10px 15px", borderRadius: "8px", fontSize: "13px", color: details.textColor, fontStyle: "italic", display: "inline-block" }}>
            💡 {details.tips}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {products.length > 0 ? products.map(product => (
            <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden", position: "relative", transition: "transform 0.3s, box-shadow 0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
            }}>
              
              {/* PRODUCT IMAGE & INFO */}
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ background: "#f8f6f0", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "180px", overflow: "hidden" }}>
                  {typeof product.image === 'string' && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                    <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ fontSize: "60px" }}>{product.image || '👗'}</div>
                  )}
                </div>
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: "600", margin: "0 0 8px 0", minHeight: "40px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "2" }}>
                    {product.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ textDecoration: "line-through", color: "#999", fontSize: "12px" }}>
                      ₹{product.originalPrice || product.price}
                    </span>
                    <span style={{ fontWeight: "bold", color: "#D4AF37", fontSize: "14px" }}>
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </Link>

              {/* WISHLIST BUTTON */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInWishlist && isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                style={{
                  position: "absolute", top: "8px", right: "8px",
                  background: isInWishlist && isInWishlist(product.id) ? "#E91E63" : "#fff",
                  border: "none", width: "32px", height: "32px",
                  borderRadius: "50%", cursor: "pointer", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "all 0.2s",
                  color: isInWishlist && isInWishlist(product.id) ? "#fff" : "#E91E63",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                title={isInWishlist && isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                {isInWishlist && isInWishlist(product.id) ? "♥" : "♡"}
              </button>

              {/* BUY NOW BUTTON */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(product);
                }}
                style={{
                  width: "90%", margin: "0 5% 12px 5%", padding: "10px", background: details.textColor || "#D4AF37",
                  color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Buy Now
              </button>
            </div>
          )) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
              <p>No products available for this occasion</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}