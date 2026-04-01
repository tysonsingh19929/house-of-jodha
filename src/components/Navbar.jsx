import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick, wishlistCount = 0, onWishlistClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isSeller, setIsSeller] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [expandedSearchInput, setExpandedSearchInput] = React.useState("");
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);
  const expandedSearchRef = React.useRef(null);

  React.useEffect(() => {
    const sellerStatus = localStorage.getItem("seller_authenticated") === "true";
    setIsSeller(sellerStatus);
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));

    const handleStorageChange = () => {
      const status = localStorage.getItem("seller_authenticated") === "true";
      setIsSeller(status);
      const userData = localStorage.getItem("currentUser");
      if (userData) setCurrentUser(JSON.parse(userData));
      else setCurrentUser(null);
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

  React.useEffect(() => {
    if (searchExpanded && expandedSearchRef.current) {
      expandedSearchRef.current.focus();
    }
  }, [searchExpanded]);

  const handleSearch = () => {
    if (expandedSearchInput.trim()) {
      setSearchExpanded(false);
      setExpandedSearchInput("");
      navigate(`/search?q=${encodeURIComponent(expandedSearchInput.trim())}`);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setSearchExpanded(false);
      setExpandedSearchInput("");
    }
  };

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0 12px" : "0 32px",
    background: "#880E4F",
    boxShadow: "0 2px 20px rgba(136,14,79,0.45)",
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 9999,
    height: isMobile ? "80px" : "140px",
    boxSizing: "border-box",
    borderBottom: "3px solid transparent",
    borderImage: "linear-gradient(90deg,#FFD54F,#E91E63,#F9A825,#F48FB1,#FFD54F) 1",
  };

  const navLinkStyle = {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
    fontSize: "14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    borderBottom: "2px solid transparent",
    transition: "color 0.2s",
    fontFamily: "inherit",
  };

  const iconBtnStyle = {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    width: "34px",
    height: "34px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  };

  return (
    <>
      <div ref={navbarRef} style={navStyle}>
        {/* Left: Menu + Search + Back */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ ...iconBtnStyle, fontSize: "20px", width: "38px", height: "38px" }}
            >
              ☰
            </button>
          )}
          <button onClick={() => navigate(-1)} style={iconBtnStyle} title="Go back">←</button>
          
          {/* Expanding Search Bar */}
          {searchExpanded ? (
            <div style={{
              display: "flex",
              gap: "4px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "4px",
              padding: "4px",
              transition: "all 0.3s ease"
            }}>
              <input
                ref={expandedSearchRef}
                type="text"
                placeholder="Search..."
                value={expandedSearchInput}
                onChange={(e) => setExpandedSearchInput(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                style={{
                  background: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "3px",
                  fontSize: "13px",
                  outline: "none",
                  width: "150px",
                  color: "#333"
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "4px 6px",
                  fontSize: "14px"
                }}
              >
                ✓
              </button>
              <button
                onClick={() => {
                  setSearchExpanded(false);
                  setExpandedSearchInput("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "4px 6px",
                  fontSize: "14px"
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchExpanded(true)} style={iconBtnStyle} title="Search">🔍</button>
          )}
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {["Home", "Shop", "Reviews", "About"].map((label, i) => (
              <button
                key={label}
                onClick={() => handleNavClick(["home", "products", "reviews", "about"][i])}
                style={navLinkStyle}
                onMouseEnter={e => { e.target.style.color = "#FFD54F"; e.target.style.borderBottomColor = "#FFD54F"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.85)"; e.target.style.borderBottomColor = "transparent"; }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate(isSeller ? "/admin-dashboard" : "/seller-login")}
              style={{ ...navLinkStyle, color: "#FFD54F" }}
            >
              📊 {isSeller ? "Dashboard" : "Seller"}
            </button>
            <button
              onClick={() => navigate("/quick-edit")}
              style={{ ...navLinkStyle, color: "#FFD54F" }}
            >
              ✏️ Edit Products
            </button>
          </div>
        )}

        {/* Center Logo - Large */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "8px 16px",
        }}>
          <img
            src="/jodha-logo.png"
            alt="House of Jodha"
            onClick={() => navigate("/")}
            style={{
              maxHeight: "95%",
              width: "auto",
              cursor: "pointer",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right: Auth + Cart */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
          {!isMobile && !currentUser && (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "transparent",
                  color: "#F48FB1",
                  border: "1.5px solid #F48FB1",
                  padding: "7px 16px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = "rgba(244,143,177,0.15)"}
                onMouseLeave={e => e.target.style.background = "transparent"}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={{
                  background: "#E91E63",
                  color: "#fff",
                  border: "none",
                  padding: "7px 16px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = "#C2185B"}
                onMouseLeave={e => e.target.style.background = "#E91E63"}
              >
                Sign Up
              </button>
            </>
          )}

          {!isMobile && currentUser && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  background: "transparent",
                  color: "#F48FB1",
                  border: "1.5px solid #F48FB1",
                  padding: "7px 16px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                👤 {currentUser.fullName?.split(" ")[0]}
              </button>
              {userMenuOpen && (
                <div style={{
                  position: "absolute", top: "110%", right: 0,
                  background: "#fff", border: "1px solid #f8bbd9",
                  borderRadius: "6px", boxShadow: "0 8px 24px rgba(136,14,79,0.15)",
                  minWidth: "160px", zIndex: 10000,
                }}>
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid #fce4ec", fontSize: "12px", color: "#888" }}>
                    {currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%", padding: "10px 14px", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#C2185B", fontWeight: "600", fontSize: "12px",
                    }}
                    onMouseEnter={e => e.target.style.background = "#fce4ec"}
                    onMouseLeave={e => e.target.style.background = "none"}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onWishlistClick}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.3)",
              padding: "8px 12px",
              fontSize: isMobile ? "11px" : "12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "rgba(255,255,255,0.25)";
              e.target.style.borderColor = "#fff";
            }}
            onMouseLeave={e => {
              e.target.style.background = "rgba(255,255,255,0.15)";
              e.target.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            title="View Wishlist"
          >
            ♡ ({wishlistCount})
          </button>

          <button
            onClick={onCartClick}
            style={{
              background: "#FFD54F",
              color: "#880E4F",
              border: "none",
              padding: "8px 14px",
              fontSize: isMobile ? "11px" : "12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
            }}
          >
            🛍️ Cart ({cartCount})
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div style={{
            position: "absolute",
            top: "64px", left: 0, right: 0,
            background: "#880E4F",
            boxShadow: "0 8px 20px rgba(136,14,79,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9998,
          }}>
            {[
              { icon: "🏠", label: "Home", section: "home" },
              { icon: "🛍️", label: "Shop", section: "products" },
              { icon: "⭐", label: "Reviews", section: "reviews" },
              { icon: "ℹ️", label: "About", section: "about" },
            ].map(({ icon, label, section }) => (
              <button
                key={label}
                onClick={() => handleNavClick(section)}
                style={{
                  padding: "14px 20px", textAlign: "left",
                  background: "none", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", color: "#fff",
                  fontWeight: "600", fontSize: "14px",
                }}
              >
                {icon} {label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); navigate(isSeller ? "/admin-dashboard" : "/seller-login"); }}
              style={{ padding: "14px 20px", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#FFD54F", fontWeight: "600", fontSize: "14px" }}
            >
              📊 {isSeller ? "Dashboard" : "Seller Login"}
            </button>
            <button
              onClick={() => { setMenuOpen(false); navigate("/quick-edit"); }}
              style={{ padding: "14px 20px", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#FFD54F", fontWeight: "600", fontSize: "14px" }}
            >
              ✏️ Edit Products
            </button>
            {!currentUser ? (
              <>
                <button onClick={() => { setMenuOpen(false); navigate("/login"); }} style={{ padding: "14px 20px", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#F48FB1", fontWeight: "600", fontSize: "14px" }}>🔐 Login</button>
                <button onClick={() => { setMenuOpen(false); navigate("/signup"); }} style={{ padding: "14px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "#F48FB1", fontWeight: "600", fontSize: "14px" }}>✍️ Sign Up</button>
              </>
            ) : (
              <>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>👤 {currentUser.fullName}</div>
                <button onClick={() => { setMenuOpen(false); handleLogout(); }} style={{ padding: "14px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "#F48FB1", fontWeight: "600", fontSize: "14px" }}>🚪 Logout</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Scrolling Promo Strip */}
      <div style={{
        position: "fixed",
        top: isMobile ? "80px" : "140px",
        left: 0, right: 0,
        zIndex: 9998,
        background: "linear-gradient(90deg,#E91E63,#C2185B,#F48FB1,#C2185B,#E91E63)",
        padding: "7px 0",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 20s linear infinite",
        }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: 0 }}>
              {["✦ Free Shipping on orders above ₹999", "New Festive Collection Arrived", "Premium Handcrafted Ethnic Wear", "✦ Use code JODHA10 for 10% off"].map((t, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "0 32px", color: "#fff", fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {t}
                  <span style={{ width: "4px", height: "4px", background: "#FFD54F", borderRadius: "50%", display: "inline-block" }} />
                </span>
              ))}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      </>
  );
}
