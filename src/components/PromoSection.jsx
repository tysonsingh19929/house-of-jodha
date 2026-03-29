import { useNavigate } from "react-router-dom";

export default function PromoSection() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const handleShopClick = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.8) 100%)",
      color: "#fff",
      padding: isMobile ? "15px 15px 20px" : "20px 30px",
      textAlign: "center",
      borderBottom: "1px solid rgba(184, 68, 141, 0.3)"
    }}>
      <div>
        <h2 style={{ 
          fontSize: isMobile ? "16px" : "20px",
          marginBottom: "5px", 
          margin: "0 0 5px 0" 
        }}>
          ✨ SPECIAL OFFER ✨
        </h2>
        <p style={{ 
          fontSize: isMobile ? "12px" : "14px", 
          margin: "0 0 15px 0"
        }}>
          SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <strong>JODHA5</strong>
        </p>
      </div>
      <button 
        onClick={handleShopClick}
        style={{
          background: "#fff",
          color: "#D4AF37",
          border: "none",
          padding: isMobile ? "8px 15px" : "10px 20px",
          fontSize: isMobile ? "12px" : "14px",
          borderRadius: "20px",
          fontWeight: "700",
          cursor: "pointer",
          transition: "all 0.3s"
        }}
        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
      >
        Shop Now 🛍️
      </button>
    </div>
  );
}