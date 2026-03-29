import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "12px 15px" : "15px 30px",
      flexWrap: isMobile ? "wrap" : "nowrap",
      gap: isMobile ? "10px" : "0",
      background: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "0"
          }}
        >
          ☰
        </button>
      )}

      <div style={{ flex: 1 }}></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img 
          src="/house-of-jodha-logo.png" 
          alt="House of Jodha" 
          onClick={() => navigate("/")}
          style={{ 
            height: isMobile ? "120px" : "150px", 
            width: "auto", 
            cursor: "pointer" 
          }} 
        />
      </div>
      <div style={{ 
        display: "flex", 
        gap: isMobile ? "8px" : "30px", 
        alignItems: "center",
        fontSize: isMobile ? "12px" : "14px",
        flex: 1,
        justifyContent: isMobile ? "space-around" : "flex-end"
      }}>
        <button 
          onClick={() => handleNavClick("home")}
          style={{ 
            textDecoration: "none", 
            color: "#08060d", 
            fontWeight: "600", 
            display: isMobile ? "none" : "inline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Home
        </button>
        <button 
          onClick={() => handleNavClick("products")}
          style={{ 
            textDecoration: "none", 
            color: "#08060d", 
            fontWeight: "600", 
            display: isMobile ? "none" : "inline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Shop
        </button>
        <button 
          onClick={() => handleNavClick("reviews")}
          style={{ 
            textDecoration: "none", 
            color: "#08060d", 
            fontWeight: "600", 
            display: isMobile ? "none" : "inline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Reviews
        </button>
        <button 
          onClick={() => handleNavClick("about")}
          style={{ 
            textDecoration: "none", 
            color: "#08060d", 
            fontWeight: "600", 
            display: isMobile ? "none" : "inline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          About
        </button>
        <button 
          onClick={onCartClick}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: isMobile ? "6px 12px" : "8px 16px",
            fontSize: isMobile ? "12px" : "14px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          🛍️ Cart ({cartCount})
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          background: "#fff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 99
        }}>
          <button 
            onClick={() => handleNavClick("home")}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              borderBottom: "1px solid #e5e4e7",
              cursor: "pointer",
              color: "#08060d",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            🏠 Home
          </button>
          <button 
            onClick={() => handleNavClick("products")}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              borderBottom: "1px solid #e5e4e7",
              cursor: "pointer",
              color: "#08060d",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            🛍️ Shop
          </button>
          <button 
            onClick={() => handleNavClick("reviews")}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              borderBottom: "1px solid #e5e4e7",
              cursor: "pointer",
              color: "#08060d",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            ⭐ Reviews
          </button>
          <button 
            onClick={() => handleNavClick("about")}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#08060d",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            ℹ️ About
          </button>
        </div>
      )}
    </div>
  );
}