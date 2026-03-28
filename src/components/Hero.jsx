export default function Hero() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, var(--accent-bg) 0%, rgba(170, 59, 255, 0.05) 100%)",
      padding: isMobile ? "40px 20px" : "80px 30px",
      textAlign: "center",
      borderBottom: "1px solid var(--border)"
    }}>
      <h1 style={{ 
        fontSize: isMobile ? "32px" : "56px",
        marginBottom: "20px",
        color: "#B8448D",
        margin: "0 0 20px 0"
      }}>
        House of Jodha
      </h1>
      <p style={{ 
        fontSize: isMobile ? "16px" : "20px",
        color: "var(--text)", 
        marginBottom: "30px", 
        maxWidth: "600px", 
        margin: "0 auto 30px" 
      }}>
        Exquisite Indian ethnic wear designed for the modern diva. Handpicked, carefully curated, and tailored to perfection.
      </p>
      <button style={{
        background: "var(--accent)",
        color: "#fff",
        border: "none",
        padding: isMobile ? "10px 30px" : "12px 40px",
        fontSize: isMobile ? "14px" : "16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "600"
      }}>
        Shop Now ✨
      </button>
    </div>
  );
}