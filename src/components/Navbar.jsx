import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isSeller, setIsSeller] = React.useState(false);
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);

  // Check seller status on mount and when navbar updates
  React.useEffect(() => {
    // Initial check
    const sellerStatus = localStorage.getItem("seller_authenticated") === "true";
    setIsSeller(sellerStatus);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const status = localStorage.getItem("seller_authenticated") === "true";
      setIsSeller(status);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: "60px",
      boxSizing: "border-box"
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
            onClick={() => navigate(isSeller ? "/admin-dashboard" : "/seller-login")}
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
            📊 {isSeller ? "Dashboard" : "Seller"}
          </button>
        </div>
      )}

      {/* Center - Logo */}
      <div style={{ flex: isMobile ? "0 1 auto" : "1", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "0" }}>
        <img 
          src="/house-of-jodha-logo.png" 
          alt="House of Jodha" 
          onClick={() => navigate("/")}
          style={{ 
            height: isMobile ? "80px" : "150px", 
            width: "auto", 
            cursor: "pointer",
            maxWidth: isMobile ? "120px" : "100%"
          }} 
        />
      </div>

      {/* Right Section - Cart Button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: isMobile ? "120px" : "150px", flexShrink: 0, position: "relative", zIndex: 1002 }}>
        <button 
          onClick={onCartClick}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: isMobile ? "12px 12px" : "8px 14px",
            fontSize: isMobile ? "12px" : "13px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: "1",
            minHeight: isMobile ? "44px" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1002
          }}
        >
          🛍️ Cart ({cartCount})
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute",
          top: "60px",
          left: "0",
          right: "0",
          background: "#fff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 998,
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto"
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
              navigate(isSeller ? "/admin-dashboard" : "/seller-login");
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
            📊 {isSeller ? "Dashboard" : "Seller Login"}
          </button>
        </div>
      )}
    </div>
  );
}