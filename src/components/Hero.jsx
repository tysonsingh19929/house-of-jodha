import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div id="home" style={{
      background: "linear-gradient(135deg, var(--accent-bg) 0%, rgba(170, 59, 255, 0.05) 100%)",
      padding: isMobile ? "20px 12px" : "60px 30px",
      textAlign: "center",
      borderBottom: "1px solid var(--border)"
    }}>
      <h1 style={{ 
        fontSize: isMobile ? "24px" : "48px",
        marginBottom: "5px",
        color: "#D4AF37",
        margin: "0 0 5px 0"
      }}>
        House of Jodha
      </h1>
      <p style={{ 
        fontSize: isMobile ? "14px" : "16px",
        color: "var(--text)", 
        marginBottom: "0", 
        maxWidth: "600px", 
        margin: "0 auto" 
      }}>
        Exquisite Indian ethnic wear designed for the modern diva. Handpicked, carefully curated, and tailored to perfection.
      </p>
    </div>
  );
}