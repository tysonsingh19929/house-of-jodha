import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const occasionProducts = {
  mehendi: [
    { id: 101, name: "Multicolor Organza Silk Printed & Hand Embroidered Lehenga Set", price: 1230000, originalPrice: 1470000, image: "👗", category: "Lehenga" },
    { id: 102, name: "Green Luxe Fabric Embroidered Saree", price: 980000, originalPrice: 1290000, image: "🧥", category: "Saree" },
    { id: 103, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 610000, originalPrice: 1000000, image: "👚", category: "Sharara" },
    { id: 104, name: "Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug", price: 1450000, originalPrice: 1630000, image: "👗", category: "Sharara" },
    { id: 105, name: "Parrot Green Floral Printed Lehenga Set", price: 770000, originalPrice: 1050000, image: "👗", category: "Lehenga" },
    { id: 106, name: "Forest Green Georgette Embroidered Sharara Suit Set", price: 500000, originalPrice: 860000, image: "👚", category: "Sharara" },
    { id: 107, name: "Bronze Maroon Silk Embroidered Designer Saree", price: 610000, originalPrice: 820000, image: "🧥", category: "Saree" },
    { id: 108, name: "Yellow Silk Hand Worked & Printed Lehenga Set", price: 1800000, originalPrice: 2160000, image: "👗", category: "Lehenga" }
  ],
  sangeet: [
    { id: 201, name: "Indigo Blue Georgette Embroidered Anarkali Dress With Dupatta", price: 1400000, originalPrice: 1690000, image: "👗", category: "Anarkali" },
    { id: 202, name: "Ivory Georgette Embroidered Anarkali Dress With Dupatta", price: 1400000, originalPrice: 1690000, image: "👗", category: "Anarkali" },
    { id: 203, name: "Plum Georgette Embroidered Anarkali Dress With Dupatta", price: 700000, originalPrice: 830000, image: "👗", category: "Anarkali" },
    { id: 204, name: "Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set", price: 900000, originalPrice: 1110000, image: "👚", category: "Salwar Kameez" },
    { id: 205, name: "Mint Green printed & Embroidered Silk Lehenga Set", price: 1000000, originalPrice: 1230000, image: "👗", category: "Lehenga" },
    { id: 206, name: "Lemon Green & Pink Silk Embroidered Lehenga Set", price: 2900000, originalPrice: 3490000, image: "👗", category: "Lehenga" }
  ],
  wedding: [
    { id: 301, name: "Blush Pink Tissue Silk Embroidered Lehenga Set", price: 2700000, originalPrice: 3290000, image: "👗", category: "Lehenga" },
    { id: 302, name: "Orange Tissue Silk Embroidered Lehenga Set", price: 1620000, originalPrice: 1940000, image: "👗", category: "Lehenga" },
    { id: 303, name: "Plum Tissue Silk Embroidered Saree", price: 1350000, originalPrice: 1590000, image: "🧥", category: "Saree" },
    { id: 304, name: "Mustard Yellow Tissue Silk Embroidered Saree", price: 1350000, originalPrice: 1590000, image: "🧥", category: "Saree" },
    { id: 305, name: "Dark Green Embroidered Silk Saree", price: 480000, originalPrice: 600000, image: "🧥", category: "Saree" }
  ],
  engagement: [
    { id: 401, name: "Ivory & Pink Ombre Sparkling Crystal Detailed Georgette Top, Palazzo, & Shrug Set", price: 1000000, originalPrice: 1230000, image: "👚", category: "Salwar Kameez" },
    { id: 402, name: "Magenta Pink Silk Embroidered Saree", price: 610000, originalPrice: 770000, image: "🧥", category: "Saree" },
    { id: 403, name: "Pink Georgette Embroidered Lehenga Set", price: 610000, originalPrice: 800000, image: "👗", category: "Lehenga" },
    { id: 404, name: "Orange & Ivory Embroidered Chinon Silk Long Kurti Lehenga Set", price: 800000, originalPrice: 850000, image: "👗", category: "Lehenga" }
  ],
  reception: [
    { id: 501, name: "Yellow Georgette Embroidered Indowestern Top & Palazzo Set With Dupatta", price: 1050000, originalPrice: 1270000, image: "👚", category: "Salwar Kameez" },
    { id: 502, name: "Red Georgette Embroidered Lehenga Set", price: 700000, originalPrice: 910000, image: "👗", category: "Lehenga" },
    { id: 503, name: "Mustard Georgette Embroidered Kurti Lehenga Set", price: 680000, originalPrice: 1100000, image: "👗", category: "Lehenga" },
    { id: 504, name: "Magenta Silk Printed & Embroidered Lehenga Set", price: 830000, originalPrice: 1480000, image: "👗", category: "Lehenga" }
  ],
  cocktail: [
    { id: 601, name: "Beautiful Lavender Kota Doriya Cotton Silk Embroidered Kurta Set", price: 520000, originalPrice: 770000, image: "👚", category: "Salwar Kameez" },
    { id: 602, name: "Beautiful Black Kota Doriya Cotton Silk Embroidered Kurta Set", price: 520000, originalPrice: 710000, image: "👚", category: "Salwar Kameez" },
    { id: 603, name: "Orange Crepe Silk Embroidered Lehenga Set", price: 650000, originalPrice: 770000, image: "👗", category: "Lehenga" }
  ]
};

export default function OccasionPage({ cartCount, onCartClick, onAddToCart }) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [addedProducts, setAddedProducts] = useState({});

  const occasionDetails = {
    mehendi: {
      name: "Mehendi Collection",
      emoji: "💚",
      description: "Celebrate the joy of Mehendi with our vibrant and colorful collection. Green is the color of choice for this auspicious occasion.",
      tips: "Mehendi designs should be bright, festive, and comfortable. Opt for light fabrics with beautiful embroidery."
    },
    sangeet: {
      name: "Sangeet Collection",
      emoji: "🎵",
      description: "Get ready to dance and celebrate music with our elegant Sangeet collection. Perfect for a night of music and celebrations.",
      tips: "Choose designs that allow movement and comfort for dancing. Opt for fabrics that shimmer and shine."
    },
    wedding: {
      name: "Wedding Collection",
      emoji: "💍",
      description: "The most special day deserves the most beautiful outfit. Our wedding collection features exquisite designs for the bride.",
      tips: "Wedding outfits should be grand and statement-making. Choose premium fabrics with intricate embroidery."
    },
    engagement: {
      name: "Engagement Collection",
      emoji: "✨",
      description: "Make your engagement day memorable with our stunning and elegant collection. Perfect for the soon-to-be bride.",
      tips: "Engagement outfits should be elegant yet not overshadow the main event. Choose sophisticated designs in pastels."
    },
    reception: {
      name: "Reception Collection",
      emoji: "🎉",
      description: "Celebrate the union with our glamorous reception collection. Show off your style with our premium designs.",
      tips: "Reception allows for more glamour and sparkle. Choose designs with mirror work and sequins."
    },
    cocktail: {
      name: "Cocktail Collection",
      emoji: "🍾",
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
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <div style={{ padding: isMobile ? "20px" : "40px 30px", maxWidth: "1126px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
        >
          ← Back to Home
        </button>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>{details.emoji}</div>
          <h1 style={{ color: "#2C4F3E", fontSize: isMobile ? "28px" : "36px", marginBottom: "15px" }}>
            {details.name}
          </h1>
          <p style={{ color: "#666", fontSize: isMobile ? "14px" : "16px", marginBottom: "20px", maxWidth: "600px", margin: "0 auto 20px" }}>
            {details.description}
          </p>
          <div style={{
            background: "rgba(212, 175, 55, 0.1)",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px"
          }}>
            <p style={{ color: "#2C4F3E", fontSize: isMobile ? "13px" : "14px", margin: "0", fontWeight: "600" }}>
              💡 Styling Tip: {details.tips}
            </p>
          </div>
        </div>

        {/* Product Grid */}
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
                background: "#fff"
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
                background: "var(--accent-bg)"
              }}>
                {product.image}
              </div>
              <div style={{ padding: isMobile ? "15px" : "20px" }}>
                <h3 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "10px", color: "#08060d", fontWeight: "600" }}>
                  {product.name}
                </h3>
                <div style={{ marginBottom: "15px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text)", textDecoration: "line-through" }}>
                    ₹{(product.originalPrice / 100).toFixed(0)}
                  </span>
                  <span style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: "var(--accent)", marginLeft: "10px" }}>
                    ₹{(product.price / 100).toFixed(0)}
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
      </div>
      <Footer />
    </>
  );
}
