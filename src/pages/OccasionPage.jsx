import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OccasionPage({ 
  cartCount, onCartClick, onAddToCart, wishlistItems, setWishlistOpen, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [products, setProducts] = useState([]);

  const occasionDetails = {
    mehendi: {
      name: "MEHENDI",
      tagline: "Ceremony Collection",
      bgGradient: "linear-gradient(135deg, #A8D5A2 0%, #D4F1D4 40%, #F0FAF0 100%)",
      accentColor: "#1B4332",
      accentLight: "#D4F1D4",
      accentMid: "#4A9E6B",
      btnBg: "linear-gradient(135deg, #1B4332, #2D6A4F)",
      btnHover: "#1B4332",
      cardBorder: "#A8D5A2",
      priceBg: "#E8F7E8",
      priceColor: "#1B4332",
      badgeBg: "rgba(27,67,50,0.12)",
      badgeColor: "#1B4332",
      description: "Vibrant & colorful styles for your Mehendi ceremony.",
      tips: "Bright colors look best!",
      icon: "🌿",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B4332' fill-opacity='0.06'%3E%3Cpath d='M30 0 C30 0 20 10 30 20 C40 10 30 0 30 0Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    },
    sangeet: {
      name: "SANGEET",
      tagline: "Music & Dance Collection",
      bgGradient: "linear-gradient(135deg, #F5C842 0%, #FFF4D6 40%, #FFFDF5 100%)",
      accentColor: "#744A00",
      accentLight: "#FFF4D6",
      accentMid: "#D4911A",
      btnBg: "linear-gradient(135deg, #744A00, #B87333)",
      btnHover: "#744A00",
      cardBorder: "#F5D878",
      priceBg: "#FFF8E0",
      priceColor: "#744A00",
      badgeBg: "rgba(116,74,0,0.1)",
      badgeColor: "#744A00",
      description: "Elegant, dance-ready outfits for a night of celebration.",
      tips: "Choose comfortable fabrics.",
      icon: "✨",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23744A00' fill-opacity='0.08'/%3E%3C/g%3E%3C/svg%3E")`
    },
    wedding: {
      name: "WEDDING",
      tagline: "Bridal Couture Collection",
      bgGradient: "linear-gradient(135deg, #E8A0B0 0%, #F8D7E0 40%, #FFF5F7 100%)",
      accentColor: "#590D22",
      accentLight: "#F8D7E0",
      accentMid: "#C9374A",
      btnBg: "linear-gradient(135deg, #590D22, #9A1534)",
      btnHover: "#590D22",
      cardBorder: "#F0A0B5",
      priceBg: "#FEF0F3",
      priceColor: "#590D22",
      badgeBg: "rgba(89,13,34,0.1)",
      badgeColor: "#590D22",
      description: "Exquisite bridal wear for the most special day.",
      tips: "Go for heavy embroidery.",
      icon: "💍",
      pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23590D22' fill-opacity='0.05'%3E%3Cpath d='M20 5 L22 15 L32 15 L24 21 L27 31 L20 25 L13 31 L16 21 L8 15 L18 15Z'/%3E%3C/g%3E%3C/svg%3E")`
    },
    engagement: {
      name: "ENGAGEMENT",
      tagline: "Promise & Love Collection",
      bgGradient: "linear-gradient(135deg, #C39BD3 0%, #E9D7F5 40%, #F8F4FF 100%)",
      accentColor: "#3C096C",
      accentLight: "#E9D7F5",
      accentMid: "#7B2FBE",
      btnBg: "linear-gradient(135deg, #3C096C, #7B2FBE)",
      btnHover: "#3C096C",
      cardBorder: "#C8A0E8",
      priceBg: "#F4EEFF",
      priceColor: "#3C096C",
      badgeBg: "rgba(60,9,108,0.1)",
      badgeColor: "#3C096C",
      description: "Sophisticated looks for your special announcement.",
      tips: "Pastels are trending!",
      icon: "💜",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233C096C' fill-opacity='0.06'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='50' cy='10' r='3'/%3E%3C/g%3E%3C/svg%3E")`
    }
  };

  const d = occasionDetails[occasion] || occasionDetails.mehendi;

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const filtered = all.filter(p => 
      p.occasion?.toLowerCase() === occasion?.toLowerCase() || 
      p.category?.toLowerCase() === occasion?.toLowerCase()
    );
    setProducts(filtered);
  }, [occasion]);

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh", background: "#FAFAFA" }}>
      <Navbar 
        cartCount={cartCount} 
        onCartClick={onCartClick} 
        wishlistCount={wishlistItems.length} 
        onWishlistClick={() => setWishlistOpen(true)} 
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700;800&display=swap');

        .occasion-header {
          position: relative;
          overflow: hidden;
          background: ${d.bgGradient};
        }
        .occasion-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: ${d.pattern};
          pointer-events: none;
        }
        .back-btn {
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.6);
          color: ${d.accentColor};
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Jost', sans-serif;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .back-btn:hover {
          background: rgba(255,255,255,0.8);
          transform: translateX(-2px);
        }
        .occasion-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: ${d.accentColor};
          font-size: ${isMobile ? "52px" : "72px"};
          line-height: 1;
          margin: 0;
          letter-spacing: -1px;
        }
        .occasion-tagline {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${d.accentMid};
          margin: 0;
        }
        .occasion-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: ${d.accentColor};
          opacity: 0.8;
          margin: 0;
          max-width: 280px;
          line-height: 1.6;
        }
        .tip-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 30px;
          padding: 6px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: ${d.accentColor};
          letter-spacing: 0.5px;
        }
        .divider-line {
          width: 48px;
          height: 2px;
          background: ${d.accentMid};
          opacity: 0.5;
          margin: 10px auto;
          border-radius: 2px;
        }
        .product-card {
          background: #fff;
          border: 1px solid ${d.cardBorder};
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.25,0.46,0.45,0.94);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          border-color: ${d.accentMid};
        }
        .product-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .product-name {
          font-family: 'Jost', sans-serif;
          font-size: 11.5px;
          color: #333;
          margin: 0 0 4px;
          height: 30px;
          overflow: hidden;
          font-weight: 600;
          letter-spacing: 0.2px;
          line-height: 1.3;
        }
        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 20px;
          color: ${d.priceColor};
          background: ${d.priceBg};
          display: inline-block;
          padding: 1px 8px;
          border-radius: 4px;
          margin: 0;
        }
        .add-to-cart-btn {
          width: calc(100% - 20px);
          margin: 0 10px 12px;
          padding: 10px 0;
          background: ${d.btnBg};
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          font-size: 10.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .add-to-cart-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }
        .add-to-cart-btn:hover::after {
          background: rgba(255,255,255,0.1);
        }
        .add-to-cart-btn:active {
          transform: scale(0.98);
        }
        .count-badge {
          background: ${d.badgeBg};
          color: ${d.badgeColor};
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 16px;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          font-family: 'Jost', sans-serif;
          color: ${d.accentMid};
        }
        .empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
      `}</style>

      {/* PREMIUM HEADER */}
      <div className="occasion-header" style={{ padding: "0 0 32px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px 20px 0", textAlign: "center" }}>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← BACK
          </button>

          <div style={{ marginTop: "20px" }}>
            <p className="occasion-tagline">{d.tagline}</p>
            <div className="divider-line" />
            <h1 className="occasion-name">{d.icon} {d.name}</h1>
            <div className="divider-line" style={{ margin: "12px auto" }} />
            <p className="occasion-desc">{d.description}</p>
          </div>

          <div style={{ marginTop: "18px" }}>
            <span className="tip-badge">
              💡 TIP: {d.tips}
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "24px 16px 40px" }}>
        {products.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span className="count-badge">{products.length} Styles Available</span>
          </div>
        )}

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{d.icon}</div>
            <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "6px" }}>No styles yet</p>
            <p style={{ fontSize: "13px", opacity: 0.7 }}>Check back soon for new arrivals</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {products.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block", overflow: "hidden" }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-img"
                  />
                  <div style={{ padding: "10px 10px 8px" }}>
                    <h3 className="product-name">{product.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
                      <p className="product-price">₹{product.price?.toLocaleString()}</p>
                      {product.originalPrice && (
                        <p style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "11px",
                          color: "#999",
                          textDecoration: "line-through"
                        }}>₹{product.originalPrice?.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
