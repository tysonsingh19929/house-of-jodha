import React from "react";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div style={{ flex: 1 }}></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/house-of-jodha-logo.png" alt="House of Jodha" style={{ height: isMobile ? "120px" : "150px", width: "auto" }} />
      </div>
      <div style={{ 
        display: "flex", 
        gap: isMobile ? "8px" : "30px", 
        alignItems: "center",
        fontSize: isMobile ? "12px" : "14px",
        flex: 1,
        justifyContent: isMobile ? "space-around" : "flex-end"
      }}>
        <a href="#home" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600", display: isMobile ? "none" : "inline" }}>Home</a>
        <a href="#products" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600", display: isMobile ? "none" : "inline" }}>Shop</a>
        <a href="#reviews" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600", display: isMobile ? "none" : "inline" }}>Reviews</a>
        <a href="#about" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600", display: isMobile ? "none" : "inline" }}>About</a>
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
    </div>
  );
}