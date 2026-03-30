export default function PromoSection() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.9) 100%)",
      color: "#fff",
      padding: isMobile ? "20px 15px" : "40px 30px",
      textAlign: "center",
      borderBottom: "2px solid rgba(184, 68, 141, 0.5)"
    }}>
      <div>
        <h2 style={{ 
          fontSize: isMobile ? "18px" : "26px",
          marginBottom: "12px", 
          margin: "0 0 12px 0",
          fontWeight: "900",
          letterSpacing: "1px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
          opacity: "0.5"
        }}>
          ✨ SPECIAL OFFER ✨
        </h2>
        <p style={{ 
          fontSize: isMobile ? "13px" : "16px",
          margin: "0",
          fontWeight: "600",
          letterSpacing: "0.5px",
          lineHeight: "1.4",
          opacity: "0.5"
        }}>
          SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <strong style={{ fontSize: isMobile ? "14px" : "17px", color: "#fff", textDecoration: "underline" }}>JODHA5</strong>
        </p>
      </div>
    </div>
  );
}