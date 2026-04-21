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

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("currentUser")); } catch { return null; }
  })();

  const handleProfileClick = () => {
    navigate(currentUser ? "/profile" : "/login");
  };

  const iconBtnStyle = {
    background: "none",
    border: "none",
    color: "#555",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0",
    position: "relative",
    flexShrink: 0,
    borderRadius: "50%",
    transition: "background 0.2s, color 0.2s",
  };

  const navItems = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      label: "Search",
      path: "/search",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      ),
      label: "Home",
      path: "/",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      label: "Shop All",
      path: "/#products",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: currentUser ? "My Profile" : "Login",
      path: currentUser ? "/profile" : "/login",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      ),
      label: "Sign Up",
      path: "/signup",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      label: "Seller Login",
      path: "/admin-dashboard",
    },
  ];

  return (
    <>
      {/* Backdrop blur overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 9997,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <div
        ref={navbarRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.06)",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 9999,
          height: "64px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT: Hamburger + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              ...iconBtnStyle,
              borderRadius: "10px",
              color: menuOpen ? "#B8860B" : "#444",
              marginLeft: "-4px",
            }}
            title="Menu"
          >
            {menuOpen ? (
              // X icon when open
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Stylish 3-line hamburger
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="6" y1="12" x2="21" y2="12" />
                <line x1="9" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <span
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: window.innerWidth <= 380 ? "13px" : "15px",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #B8860B, #DAA520, #B8860B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            THE SRINGAR HOUSE
          </span>
        </div>

        {/* RIGHT: Search + Profile + Wishlist + Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

          {/* SEARCH */}
          <button onClick={() => navigate("/search")} style={iconBtnStyle} title="Search">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* PROFILE */}
          <button onClick={handleProfileClick} style={iconBtnStyle} title={currentUser ? "My Profile" : "Login"}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* WISHLIST */}
          <button onClick={onWishlistClick} style={iconBtnStyle} title="Wishlist">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
          </button>

          {/* CART */}
          <button onClick={onCartClick} style={iconBtnStyle} title="Cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div style={dropdownStyle}>
            {/* Decorative top accent */}
            <div style={{
              height: "3px",
              background: "linear-gradient(90deg, #B8860B, #DAA520, #f0c040, #DAA520, #B8860B)",
            }} />

            <div style={{ padding: "8px 0" }}>
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => {
                    setMenuOpen(false);
                    if (item.path.startsWith("/#")) {
                      navigate(item.path);
                      setTimeout(() => {
                        const id = item.path.split("#")[1];
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    } else {
                      navigate(item.path);
                    }
                  }}
                  style={{
                    ...dropdownItemStyle,
                    animationDelay: `${i * 40}ms`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#fdf8ee";
                    e.currentTarget.style.color = "#B8860B";
                    e.currentTarget.querySelector(".nav-icon").style.color = "#B8860B";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#333";
                    e.currentTarget.querySelector(".nav-icon").style.color = "#888";
                  }}
                >
                  <span
                    className="nav-icon"
                    style={{
                      width: "36px", height: "36px",
                      background: "#f7f7f7",
                      borderRadius: "10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#888",
                      flexShrink: 0,
                      transition: "color 0.2s",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ fontWeight: "600", fontSize: "14px", letterSpacing: "0.3px" }}>
                    {item.label}
                  </span>
                  {/* Chevron */}
                  <svg style={{ marginLeft: "auto", opacity: 0.3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Become a Partner Call to Action */}
            <div style={{ padding: "8px 20px 20px 20px" }}>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/seller/register');
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.5)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #dfb945 0%, #b89630 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.3)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Become a Partner
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const badgeStyle = {
  position: "absolute",
  top: "4px", right: "4px",
  background: "linear-gradient(135deg, #E91E63, #c2185b)",
  color: "#fff",
  fontSize: "9px",
  minWidth: "15px",
  height: "15px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  padding: "0 2px",
  boxShadow: "0 1px 4px rgba(233,30,99,0.4)",
};

const dropdownStyle = {
  position: "absolute",
  top: "64px", left: 0, right: 0,
  background: "#fff",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
  zIndex: 9998,
  overflow: "hidden",
  borderRadius: "0 0 16px 16px",
};

const dropdownItemStyle = {
  padding: "11px 20px",
  cursor: "pointer",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  transition: "background 0.18s, color 0.18s",
  borderRadius: "0",
};