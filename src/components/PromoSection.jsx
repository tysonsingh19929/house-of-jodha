export default function PromoSection() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.9) 100%)",
      color: "#fff",
      padding: isMobile ? "16px 15px" : "32px 30px",
      textAlign: "center",
      borderBottom: "1px solid rgba(255,255,255,0.15)"
    }}>
      <div>
        <h2 style={{ 
          fontSize: isMobile ? "17px" : "24px",
          marginBottom: "8px", 
          margin: "0 0 8px 0",
          fontWeight: "600",
          letterSpacing: "0.3px",
          fontStyle: "normal"
        }}>
          ✨ SPECIAL OFFER ✨
        </h2>
        <p style={{ 
          fontSize: isMobile ? "12px" : "15px",
          margin: "0",
          fontWeight: "500",
          letterSpacing: "0.2px",
          lineHeight: "1.5",
          opacity: "0.95"
        }}>
          SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <span style={{ fontSize: isMobile ? "13px" : "15px", color: "#fff", fontWeight: "600" }}>JODHA5</span>
        </p>
      </div>
    </div>
  );
}