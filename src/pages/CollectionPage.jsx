import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function CollectionPage({ cartCount, onCartClick, onAddToCart, cartOpen, cartItems, removeFromCart }) {
  const { type } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const collections = {
    lehenga: {
      name: "Lehenga Collection",
      description: "Beautiful and stunning Lehenga designs for every occasion",
      products: [
        { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, image: "👗" },
        { id: 2, name: "Royal Blue Silk Lehenga with Gold Embroidery", price: 28900, originalPrice: 35000, image: "👗" }
      ]
    },
    saree: {
      name: "Saree Collection",
      description: "Elegant and timeless Saree designs for the modern woman",
      products: [
        { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: "🧥" },
        { id: 4, name: "Cream and Gold Traditional Saree", price: 12500, originalPrice: 15000, image: "🧥" }
      ]
    },
    anarkali: {
      name: "Anarkali Collection",
      description: "Graceful and flowing Anarkali suits for every celebration",
      products: [
        { id: 5, name: "Designer Anarkali Suit - Midnight Blue", price: 18900, originalPrice: 22500, image: "👚" },
        { id: 6, name: "Maroon Silk Anarkali with Pearl Work", price: 21000, originalPrice: 25000, image: "👚" }
      ]
    },
    salwarkameez: {
      name: "Salwar Kameez Collection",
      description: "Comfortable and stylish Salwar Kameez for daily wear",
      products: [
        { id: 7, name: "Cotton Embroidered Salwar Kameez - Teal", price: 5500, originalPrice: 7000, image: "👔" },
        { id: 8, name: "Silk Salwar Kameez with Dupatta - Emerald", price: 8500, originalPrice: 10500, image: "👔" }
      ]
    }
  };

  const collection = collections[type];

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => onCartClick?.()} />
      )}
      <div style={{ padding: isMobile ? "20px" : "40px 30px", maxWidth: "1126px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
        >
          ← Back to Home
        </button>
        
        <h1 style={{ color: "#2C4F3E", fontSize: isMobile ? "28px" : "36px", marginBottom: "10px" }}>
          {collection.name}
        </h1>
        <p style={{ color: "#666", fontSize: isMobile ? "14px" : "16px", marginBottom: "30px" }}>
          {collection.description}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
          gap: isMobile ? "15px" : "30px"
        }}>
          {collection.products.map(product => (
            <div
              key={product.id}
              style={{
                border: "1px solid #e5e4e7",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff"
              }}
            >
              <div style={{
                fontSize: isMobile ? "50px" : "60px",
                textAlign: "center",
                padding: isMobile ? "30px" : "40px",
                background: "rgba(212, 175, 55, 0.08)"
              }}>
                {product.image}
              </div>
              <div style={{ padding: isMobile ? "15px" : "20px" }}>
                <h3 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "10px", color: "#08060d" }}>
                  {product.name}
                </h3>
                <div style={{ marginBottom: "15px" }}>
                  <span style={{ fontSize: "12px", color: "#666", textDecoration: "line-through" }}>
                    ₹{product.originalPrice}
                  </span>
                  <span style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: "#D4AF37", marginLeft: "10px" }}>
                    ₹{product.price}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px" : "10px",
                    fontSize: isMobile ? "13px" : "14px",
                    background: "#D4AF37",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
