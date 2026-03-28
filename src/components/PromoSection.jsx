export default function PromoSection() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, #B8448D 0%, rgba(184, 68, 141, 0.8) 100%)",
      color: "#fff",
      padding: isMobile ? "25px 15px" : "40px 30px",
      textAlign: "center",
      borderBottom: "1px solid rgba(184, 68, 141, 0.3)"
    }}>
      <h2 style={{ 
        fontSize: isMobile ? "20px" : "28px",
        marginBottom: "10px", 
        margin: "0 0 10px 0" 
      }}>
        ✨ SPECIAL OFFER ✨
      </h2>
      <p style={{ 
        fontSize: isMobile ? "14px" : "18px", 
        marginBottom: "20px", 
        margin: "0 0 20px 0" 
      }}>
        SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <strong>JODHA5</strong>
      </p>
      <button style={{
        background: "#fff",
        color: "#B8448D",
        border: "none",
        padding: isMobile ? "10px 25px" : "12px 30px",
        fontSize: isMobile ? "14px" : "16px",
        borderRadius: "25px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s"
      }}
      onMouseEnter={e => {
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={e => {
        e.target.style.transform = "scale(1)";
      }}
      >
        Shop Now 🛍️
      </button>
    </div>
  );
}