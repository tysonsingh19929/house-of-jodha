export default function PromoSection() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, #D4AF37 0%, #c9a633 100%)",
      color: "#fff",
      padding: isMobile ? "28px 16px" : "50px 40px",
      textAlign: "center",
      borderBottom: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ 
          fontSize: isMobile ? "22px" : "32px",
          marginBottom: "16px", 
          margin: "0 0 16px 0",
          fontWeight: "700",
          letterSpacing: "0.5px",
          textShadow: "none",
          opacity: "1",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          ✨ SPECIAL OFFER ✨
        </h2>
        <p style={{ 
          fontSize: isMobile ? "14px" : "17px",
          margin: "0",
          fontWeight: "500",
          letterSpacing: "0.3px",
          lineHeight: "1.6",
          opacity: "1",
          color: "rgba(255,255,255,0.95)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <span style={{ fontSize: isMobile ? "15px" : "18px", color: "#fff", fontWeight: "700", letterSpacing: "0.5px" }}>JODHA5</span>
        </p>
      </div>
    </div>
  );
}