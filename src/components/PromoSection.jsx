import { useNavigate } from "react-router-dom";

export default function PromoSection() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.8) 100%)",
      color: "#fff",
      padding: isMobile ? "15px 15px" : "20px 30px",
      textAlign: "center",
      borderBottom: "1px solid rgba(184, 68, 141, 0.3)"
    }}>
      <h2 style={{ 
        fontSize: isMobile ? "16px" : "20px",
        marginBottom: "5px", 
        margin: "0 0 5px 0" 
      }}>
        ✨ SPECIAL OFFER ✨
      </h2>
      <p style={{ 
        fontSize: isMobile ? "12px" : "14px", 
        margin: "0"
      }}>
        SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF WITH CODE <strong>JODHA5</strong>
      </p>
    </div>
  );
}