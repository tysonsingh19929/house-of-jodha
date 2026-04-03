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
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0",
    position: "relative",
  };

  // Check if user is logged in
  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("currentUser")); } catch { return null; }
  })();

  const handleProfileClick = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div ref={navbarRef} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 16px",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 9999,
      height: "64px",
      boxSizing: "border-box",
      borderBottom: "1px solid #e0e0e0",
    }}>

      {/* LEFT SECTION: Menu + Logo + Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ ...iconBtnStyle, fontSize: "24px" }}>
          ☰
        </button>

        {/* Logo */}
        <span
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#B8860B",
            userSelect: "none",
            whiteSpace: "nowrap",
            marginRight: "8px",
          }}
        >
          House of Jodha
        </span>

        {/* PROFILE ICON */}
        <button
          onClick={handleProfileClick}
          style={iconBtnStyle}
          title={currentUser ? "My Profile" : "Login"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        {/* WISHLIST ICON */}
        <button
          onClick={onWishlistClick}
          style={{ ...iconBtnStyle, fontSize: "24px" }}
          title="Wishlist"
        >
          ♡
          {wishlistCount > 0 && (
            <span style={badgeStyle}>{wishlistCount}</span>
          )}
        </button>

        {/* CART ICON */}
        <button
          onClick={onCartClick}
          style={{ ...iconBtnStyle, fontSize: "22px" }}
          title="Cart"
        >
          🛍️
          {cartCount > 0 && (
            <span style={badgeStyle}>{cartCount}</span>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={dropdownStyle}>
          {[
            { icon: "🏠", label: "Home", path: "/" },
            { icon: "🛍️", label: "Shop All", path: "/collection/all" },
            { icon: "👤", label: currentUser ? "My Profile" : "Login", path: currentUser ? "/profile" : "/login" },
            { icon: "📊", label: "Admin", path: "/admin-dashboard" },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => { setMenuOpen(false); navigate(item.path); }}
              style={dropdownItemStyle}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const badgeStyle = {
  position: "absolute",
  top: "2px",
  right: "2px",
  background: "#E91E63",
  color: "#fff",
  fontSize: "10px",
  minWidth: "16px",
  height: "16px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  padding: "0 2px",
};

const dropdownStyle = {
  position: "absolute", top: "64px", left: 0, right: 0,
  background: "#fff", boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  display: "flex", flexDirection: "column", zIndex: 9998,
  borderBottom: "1px solid #e0e0e0",
};

const dropdownItemStyle = {
  padding: "14px 20px", borderBottom: "1px solid #f0f0f0",
  cursor: "pointer", color: "#333", fontWeight: "600", fontSize: "14px",
  display: "flex", alignItems: "center", gap: "12px",
};