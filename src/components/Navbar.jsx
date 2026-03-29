import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [menuOpen]);

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
    <div ref={navbarRef} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "10px 15px" : "10px 30px",
      gap: "0",
      background: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Left Section - Menu Button */}
      <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              padding: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08060d"
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* Desktop Navigation - Left */}
      {!isMobile && (
        <div style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          fontSize: "14px"
        }}>
          <button 
            onClick={() => handleNavClick("home")}
            style={{ 
              textDecoration: "none", 
              color: "#08060d", 
              fontWeight: "600", 
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
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "inherit"
            }}
          >
            About
          </button>
          <button 
            onClick={() => navigate("/admin-dashboard")}
            style={{ 
              textDecoration: "none", 
              color: "#D4AF37", 
              fontWeight: "600", 
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "inherit"
            }}
          >
            📊 Admin
          </button>
        </div>
      )}

      {/* Center - Logo */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

      {/* Right Section - Cart Button */}
      <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button 
          onClick={onCartClick}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: isMobile ? "8px 12px" : "8px 14px",
            fontSize: isMobile ? "13px" : "13px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap"
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
          <button 
            onClick={() => {
              setMenuOpen(false);
              navigate("/admin-dashboard");
            }}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              borderBottom: "1px solid #e5e4e7",
              cursor: "pointer",
              color: "#D4AF37",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            📊 Admin Dashboard
          </button>
        </div>
      )}
    </div>
  );
}