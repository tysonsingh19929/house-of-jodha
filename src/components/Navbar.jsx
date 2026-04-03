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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0",
    position: "relative",
    flexShrink: 0,
  };

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("currentUser")); } catch { return null; }
  })();

  const handleProfileClick = () => {
    navigate(currentUser ? "/profile" : "/login");
  };

  return (
    <div
      ref={navbarRef}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 12px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        height: "64px",
        boxSizing: "border-box",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* LEFT: Hamburger + Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ ...iconBtnStyle, fontSize: "22px" }}
        >
          ☰
        </button>
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
          }}
        >
          House of Jodha
        </span>
      </div>

      {/* RIGHT: Profile + Wishlist + Cart — tight group */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

        {/* PROFILE */}
        <button
          onClick={handleProfileClick}
          style={iconBtnStyle}
          title={currentUser ? "My Profile" : "Login"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {/* WISHLIST */}
        <button
          onClick={onWishlistClick}
          style={{ ...iconBtnStyle, fontSize: "22px" }}
          title="Wishlist"
        >
          ♡
          {wishlistCount > 0 && (
            <span style={badgeStyle}>{wishlistCount}</span>
          )}
        </button>

        {/* CART */}
        <button
          onClick={onCartClick}
          style={{ ...iconBtnStyle, fontSize: "20px" }}
          title="Cart"
        >
          🛍️
          {cartCount > 0 && (
            <span style={badgeStyle}>{cartCount}</span>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={dropdownStyle}>
          {[
            { icon: "🏠", label: "Home", path: "/" },
            { icon: "🛍️", label: "Shop All", path: "/collection/all" },
            { icon: "👤", label: currentUser ? "My Profile" : "Login", path: currentUser ? "/profile" : "/login" },
            { icon: "✍️", label: "Sign Up", path: "/signup" },
            { icon: "📊", label: "Seller login", path: "/admin-dashboard" },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => { setMenuOpen(false); navigate(item.path); }}
              style={dropdownItemStyle}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.label}
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