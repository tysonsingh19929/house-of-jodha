import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";

const occasionProducts = {
  mehendi: [
    { id: 101, name: "Multicolor Organza Silk Printed & Hand Embroidered Lehenga Set", price: 12300, originalPrice: 14700, image: "👗", category: "Lehenga" },
    { id: 102, name: "Green Luxe Fabric Embroidered Saree", price: 9800, originalPrice: 12900, image: "🧥", category: "Saree" },
    { id: 103, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, image: "👚", category: "Sharara" },
    { id: 104, name: "Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug", price: 14500, originalPrice: 16300, image: "👗", category: "Sharara" },
    { id: 105, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, image: "👗", category: "Lehenga" },
    { id: 106, name: "Forest Green Georgette Embroidered Sharara Suit Set", price: 5000, originalPrice: 8600, image: "👚", category: "Sharara" },
    { id: 107, name: "Bronze Maroon Silk Embroidered Designer Saree", price: 6100, originalPrice: 8200, image: "🧥", category: "Saree" },
    { id: 108, name: "Yellow Silk Hand Worked & Printed Lehenga Set", price: 18000, originalPrice: 21600, image: "👗", category: "Lehenga" }
  ],
  sangeet: [
    { id: 201, name: "Gold Tissue Silk Embroidered Lehenga Set", price: 24000, originalPrice: 31000, image: "👗", category: "Lehenga" },
    { id: 202, name: "Ivory Georgette Embroidered Anarkali Suit", price: 16000, originalPrice: 20000, image: "👗", category: "Anarkali" },
    { id: 203, name: "Navy Blue Crepe Silk Printed Saree", price: 11000, originalPrice: 14000, image: "🧥", category: "Saree" },
    { id: 204, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", price: 14000, originalPrice: 16900, image: "👗", category: "Anarkali" },
    { id: 205, name: "Maroon Silk Embroidered Lehenga Choli", price: 19000, originalPrice: 24000, image: "👗", category: "Lehenga" },
    { id: 206, name: "Emerald Green Kota Silk Sharara Set", price: 9800, originalPrice: 12800, image: "👚", category: "Sharara" },
    { id: 207, name: "Plum Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: "🧥", category: "Saree" },
    { id: 208, name: "Champagne Tone Georgette Embroidered Lehenga", price: 17000, originalPrice: 21000, image: "👗", category: "Lehenga" }
  ],
  wedding: [
    { id: 301, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga Set", price: 27000, originalPrice: 32900, image: "👗", category: "Lehenga" },
    { id: 302, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, image: "👗", category: "Lehenga" },
    { id: 303, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, image: "🧥", category: "Saree" },
    { id: 304, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, image: "👗", category: "Lehenga" },
    { id: 305, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, image: "🧥", category: "Saree" },
    { id: 306, name: "Deep Red Silk Embroidered Bridal Anarkali", price: 25000, originalPrice: 31000, image: "👗", category: "Anarkali" },
    { id: 307, name: "Pink Gold Tissue Silk Bridal Set", price: 23000, originalPrice: 29000, image: "👗", category: "Lehenga" }
  ],
  engagement: [
    { id: 401, name: "Blush Pink Georgette Embroidered Lehenga Set", price: 14000, originalPrice: 18000, image: "👗", category: "Lehenga" },
    { id: 402, name: "Ivory & Blush Ombre Georgette Lehenga Choli", price: 12000, originalPrice: 16000, image: "👗", category: "Lehenga" },
    { id: 403, name: "Lavender Silk Embroidered Anarkali Dress", price: 11000, originalPrice: 14500, image: "👗", category: "Anarkali" },
    { id: 404, name: "Champagne Gold Silk Embroidered Saree", price: 9000, originalPrice: 12000, image: "🧥", category: "Saree" },
    { id: 405, name: "Pale Pink Tissue Silk Lehenga Set", price: 13500, originalPrice: 17500, image: "👗", category: "Lehenga" },
    { id: 406, name: "Dusty Rose Georgette Sharara Suit", price: 9800, originalPrice: 12800, image: "👚", category: "Sharara" }
  ],
  reception: [
    { id: 501, name: "Red & Gold Silk Embroidered Lehenga", price: 21000, originalPrice: 27000, image: "👗", category: "Lehenga" },
    { id: 502, name: "Magenta Silk Printed Lehenga Set", price: 16000, originalPrice: 21000, image: "👗", category: "Lehenga" },
    { id: 503, name: "Gold Sequined Chiffon Saree", price: 14000, originalPrice: 19000, image: "🧥", category: "Saree" },
    { id: 504, name: "Deep Red Crepe Silk Lehenga Choli", price: 18000, originalPrice: 23000, image: "👗", category: "Lehenga" },
    { id: 505, name: "Burgundy & Gold Silk Embroidered Saree", price: 12000, originalPrice: 16000, image: "🧥", category: "Saree" },
    { id: 506, name: "Ruby Red Tissue Silk Anarkali", price: 15000, originalPrice: 19500, image: "👗", category: "Anarkali" }
  ],
  cocktail: [
    { id: 601, name: "Black & Gold Crepe Silk Indowestern Top & Palazzo", price: 9000, originalPrice: 12000, image: "👚", category: "Salwar Kameez" },
    { id: 602, name: "Navy Blue Georgette Modern Lehenga", price: 11000, originalPrice: 14500, image: "👗", category: "Lehenga" },
    { id: 603, name: "Deep Teal Silk Embroidered Saree", price: 8000, originalPrice: 11000, image: "🧥", category: "Saree" },
    { id: 604, name: "Black & Silver Crepe Silk Lehenga Set", price: 12000, originalPrice: 16000, image: "👗", category: "Lehenga" },
    { id: 605, name: "Midnight Blue Georgette Anarkali Dress", price: 9500, originalPrice: 13000, image: "👗", category: "Anarkali" },
    { id: 606, name: "Charcoal Grey Silk Printed Saree", price: 7000, originalPrice: 10000, image: "🧥", category: "Saree" }
  ]
};

export default function OccasionPage({ 
  cartCount, onCartClick, onAddToCart, onRemoveProduct, cartOpen, cartItems, removeFromCart,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [addedProducts, setAddedProducts] = useState({});

  const occasionDetails = {
    mehendi: {
      name: "MEHENDI",
      bgColor: "#D4F1D4",
      textColor: "#2C6B2C",
      description: "Celebrate the joy of Mehendi with our vibrant and colorful collection. Green is the color of choice for this auspicious occasion.",
      tips: "Mehendi designs should be bright, festive, and comfortable. Opt for light fabrics with beautiful embroidery."
    },
    sangeet: {
      name: "SANGEET",
      bgColor: "#FFF4D6",
      textColor: "#8B7500",
      description: "Get ready to dance and celebrate music with our elegant Sangeet collection. Perfect for a night of music and celebrations.",
      tips: "Choose designs that allow movement and comfort for dancing. Opt for fabrics that shimmer and shine."
    },
    wedding: {
      name: "WEDDING",
      bgColor: "#F8D7E0",
      textColor: "#8B3A5C",
      description: "The most special day deserves the most beautiful outfit. Our wedding collection features exquisite designs for the bride.",
      tips: "Wedding outfits should be grand and statement-making. Choose premium fabrics with intricate embroidery."
    },
    engagement: {
      name: "ENGAGEMENT",
      bgColor: "#E9D7F5",
      textColor: "#5C3D7F",
      description: "Make your engagement day memorable with our stunning and elegant collection. Perfect for the soon-to-be bride.",
      tips: "Engagement outfits should be elegant yet not overshadow the main event. Choose sophisticated designs in pastels."
    },
    reception: {
      name: "RECEPTION",
      bgColor: "#F5DCD0",
      textColor: "#8B4513",
      description: "Celebrate the union with our glamorous reception collection. Show off your style with our premium designs.",
      tips: "Reception allows for more glamour and sparkle. Choose designs with mirror work and sequins."
    },
    cocktail: {
      name: "COCKTAIL",
      bgColor: "#D4E8F5",
      textColor: "#1C3C5C",
      description: "For the modern woman who loves to party. Our cocktail collection is chic, modern, and absolutely stunning.",
      tips: "Cocktail wear can be more experimental. Choose contemporary designs with bold colors and unique patterns."
    }
  };

  const details = occasionDetails[occasion];
  const products = occasionProducts[occasion] || [];

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart?.(product);
  };

  const handleIncreaseQuantity = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart?.(product);
  };

  const handleDecreaseQuantity = (product) => {
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[product.id] || 0) - 1);
      if (newQty === 0) {
        const updated = {...prev};
        delete updated[product.id];
        onRemoveProduct?.(product.id);
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };

  if (!details) {
    return <div>Occasion not found</div>;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingTop: "64px" }}>
        <Navbar 
          cartCount={cartCount} 
          onCartClick={onCartClick}
          wishlistCount={wishlistCount}
          onWishlistClick={() => setWishlistOpen(!wishlistOpen)}
        />
        {cartOpen && (
          <Cart items={cartItems} onRemove={removeFromCart} onClose={() => onCartClick?.()} />
        )}
        {wishlistOpen && (
          <Wishlist 
            items={wishlistItems} 
            onRemove={removeFromWishlist} 
            onClose={() => setWishlistOpen(false)}
            onAddToCart={onAddToCart}
          />
        )}
        <div style={{ padding: isMobile ? "20px" : "40px 30px", maxWidth: "1126px", margin: "0 auto", width: "100%", flex: "1" }}>
          <button 
            onClick={() => navigate("/")}
            style={{ padding: "8px 16px", background: details.bgColor, color: details.textColor, border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px", fontWeight: "600" }}
          >
            ← Back to Home
          </button>
          
          <div style={{ textAlign: "center", marginBottom: "20px", background: details.bgColor, padding: "15px 20px", borderRadius: "8px" }}>
            <h1 style={{ color: details.textColor, fontSize: isMobile ? "24px" : "36px", letterSpacing: "2px", margin: "0 0 8px 0" }}>
              {details.name}
            </h1>
            <p style={{ color: details.textColor, fontSize: isMobile ? "12px" : "14px", marginBottom: "10px", maxWidth: "600px", margin: "0 auto 10px", opacity: 0.9 }}>
              {details.description}
            </p>
            <div style={{
              background: "rgba(255, 255, 255, 0.6)",
              padding: "10px 15px",
              borderRadius: "6px",
              marginTop: "10px"
            }}>
              <p style={{ color: details.textColor, fontSize: isMobile ? "11px" : "12px", margin: "0", fontWeight: "600" }}>
                💡 Styling Tip: {details.tips}
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <h2 style={{ textAlign: "center", color: details.textColor, fontSize: isMobile ? "20px" : "26px", marginBottom: "25px", letterSpacing: "1px", margin: "0 0 25px 0" }}>
            Shop {details.name}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: isMobile ? "15px" : "30px",
            marginBottom: "40px"
          }}>
            {products.map(product => (
              <div
                key={product.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  background: "#fff",
                  position: "relative"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontSize: isMobile ? "50px" : "60px",
                  textAlign: "center",
                  padding: isMobile ? "30px" : "40px",
                  background: "var(--accent-bg)",
                  position: "relative"
                }}>
                  {product.image}
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
                      position: "absolute", 
                      top: "10px", 
                      right: "10px",
                      background: "#fff", 
                      border: "none",
                      width: "28px", 
                      height: "28px",
                      borderRadius: "50%", 
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, background 0.2s, color 0.2s",
                      color: isInWishlist && isInWishlist(product.id) ? "#E91E63" : "#999",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                      if (isInWishlist && isInWishlist(product.id)) {
                        e.currentTarget.style.background = "#E91E63";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      if (isInWishlist && isInWishlist(product.id)) {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#E91E63";
                      }
                    }}
                  >
                    {isInWishlist && isInWishlist(product.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div style={{ padding: isMobile ? "15px" : "20px" }}>
                  <h3 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "10px", color: "#08060d", fontWeight: "600" }}>
                    {product.name}
                  </h3>
                  <div style={{ marginBottom: "15px" }}>
                    <span style={{ fontSize: "12px", color: "var(--text)", textDecoration: "line-through" }}>
                      ₹{product.originalPrice}
                    </span>
                    <span style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: "var(--accent)", marginLeft: "10px" }}>
                      ₹{product.price}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {addedProducts[product.id] ? (
                      <>
                        <button
                          onClick={() => handleDecreaseQuantity(product)}
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: "0",
                            fontSize: "18px",
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "var(--accent)"
                        }}>
                          ✓ Added ({addedProducts[product.id]})
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(product)}
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: "0",
                            fontSize: "18px",
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddProduct(product)}
                        style={{
                          width: "100%",
                          padding: isMobile ? "8px" : "10px",
                          fontSize: isMobile ? "13px" : "14px",
                          background: "var(--accent)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "500"
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
