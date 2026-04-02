import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick, wishlistCount = 0, onWishlistClick }) {
  const [isMobile] = React.useState(window.innerWidth <= 768);
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

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#f5f5f5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: "64px",
    boxSizing: "border-box",
    borderBottom: "1px solid #e0e0e0",
  };

  const iconBtnStyle = {
    background: "none",
    border: "none",
    color: "#333",
    width: "36px",
    height: "36px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  };

  return (
    <div ref={navbarRef} style={navStyle}>
      {/* Left: Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ ...iconBtnStyle }}
        title="Menu"
      >
        ☰
      </button>

      {/* Center: Logo */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/jodha-logo.png"
            alt="House of Jodha"
            style={{
              height: "50px",
              width: "auto",
              maxWidth: "120px",
              objectFit: "contain",
            }}
          />
        </button>
      </div>

      {/* Right: Wishlist + Cart */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={onWishlistClick}
          style={{ ...iconBtnStyle, position: "relative" }}
          title="Wishlist"
        >
          ♡
          {wishlistCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#E91E63",
              color: "#fff",
              fontSize: "10px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}>
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={onCartClick}
          style={{ ...iconBtnStyle, position: "relative" }}
          title="Cart"
        >
          🛍️
          {cartCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#E91E63",
              color: "#fff",
              fontSize: "10px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "64px",
          left: 0,
          right: 0,
          background: "#fff",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
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
            <button
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
                textAlign: "left",
                background: "none",
                border: "none",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                color: "#333",
                fontWeight: "500",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onMouseEnter={e => e.target.style.background = "#f9f9f9"}
              onMouseLeave={e => e.target.style.background = "none"}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
