import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick, wishlistCount = 0, onWishlistClick }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);

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

  const iconBtnStyle = {
    background: "none",
    border: "none",
    color: "#333",
    width: "36px",
    height: "36px",
    padding: "0",
    cursor: "pointer",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <div ref={navbarRef} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 16px",
      background: "#f5f5f5",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 9999,
      height: "64px",
      boxSizing: "border-box",
      borderBottom: "1px solid #e0e0e0",
    }}>

      {/* Left: Menu + Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ ...iconBtnStyle, userSelect: "none" }}
        >
          ☰
        </div>

        <span
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "15px",
            fontWeight: "bold",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#B8860B",
            lineHeight: "1",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          House of Jodha
        </span>
      </div>

      {/* Right: Wishlist + Cart */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div
          onClick={onWishlistClick}
          style={{ ...iconBtnStyle, position: "relative", fontSize: "24px", cursor: "pointer" }}
        >
          ♡
          {wishlistCount > 0 && (
            <span style={{
              position: "absolute", top: "-4px", right: "-4px",
              background: "#E91E63", color: "#fff",
              fontSize: "10px", width: "17px", height: "17px",
              borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontWeight: "bold",
            }}>
              {wishlistCount}
            </span>
          )}
        </div>

        <div
          onClick={onCartClick}
          style={{ ...iconBtnStyle, position: "relative", cursor: "pointer" }}
        >
          🛍️
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: "-4px", right: "-4px",
              background: "#E91E63", color: "#fff",
              fontSize: "10px", width: "17px", height: "17px",
              borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontWeight: "bold",
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "64px", left: 0, right: 0,
          background: "#fff",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          display: "flex", flexDirection: "column",
          zIndex: 9998,
          borderBottom: "1px solid #e0e0e0",
        }}>
          {[
            { icon: "🏠", label: "Home" },
            { icon: "🛍️", label: "Shop" },
            { icon: "📊", label: "Admin" },
            { icon: "🔐", label: "Login" },
            { icon: "✍️", label: "Sign Up" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              onClick={() => {
                setMenuOpen(false);
                if (label === "Home") navigate("/");
                else if (label === "Shop") navigate("/collection/all");
                else if (label === "Admin") navigate("/admin-dashboard");
                else if (label === "Login") navigate("/login");
                else if (label === "Sign Up") navigate("/signup");
              }}
              style={{
                padding: "12px 16px",
                background: "none",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer", color: "#333",
                fontWeight: "500", fontSize: "14px",
                display: "flex", alignItems: "center", gap: "12px",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              {icon} {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
