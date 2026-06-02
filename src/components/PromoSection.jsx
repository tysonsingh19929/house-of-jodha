export default function PromoSection() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "#0a0f0d",
      backgroundImage: "radial-gradient(circle at 50% -100%, rgba(212, 175, 55, 0.15) 0%, #0a0f0d 100%)",
      color: "#D4AF37",
      padding: isMobile ? "12px 16px" : "14px 40px",
      textAlign: "center",
      borderBottom: "1px solid rgba(212,175,55,0.15)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: isMobile ? "6px" : "16px" }}>
        <span style={{
          fontSize: isMobile ? "11px" : "13px",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "6px",
          color: "#fff"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          Special Offer
        </span>
        <p style={{
          fontSize: isMobile ? "12px" : "14px",
          margin: "0",
          fontWeight: "500",
          letterSpacing: "0.5px",
          color: "rgba(255,255,255,0.8)"
        }}>
          SALE UP TO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <span style={{ color: "#D4AF37", fontWeight: "700", padding: "2px 8px", background: "rgba(212,175,55,0.1)", borderRadius: "4px", marginLeft: "4px" }}>SRINGAR5</span>
        </p>
      </div>
    </div>
  );
}