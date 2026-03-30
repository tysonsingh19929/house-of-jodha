import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isSeller, setIsSeller] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const navbarRef = React.useRef(null);

  // Check seller status and user auth on mount and when navbar updates
  React.useEffect(() => {
    // Initial checks
    const sellerStatus = localStorage.getItem("seller_authenticated") === "true";
    setIsSeller(sellerStatus);
    
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const status = localStorage.getItem("seller_authenticated") === "true";
      setIsSeller(status);
      
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(null);
      }
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <div ref={navbarRef} style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "8px 10px" : "10px 30px",
      gap: "0",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      height: isMobile ? "100px" : "120px",
      boxSizing: "border-box",
      borderBottom: "1px solid #f0f0f0"
    }}>
      {/* Left Section - Navigation Buttons */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              padding: "0",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08060d"
            }}
          >
            ☰
          </button>
        )}
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "1px solid #ddd",
            fontSize: isMobile ? "16px" : "18px",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "4px",
            color: "#08060d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            minWidth: "40px",
            height: "40px"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#f5f5f5";
            e.target.style.borderColor = "#999";
          }}
          onMouseLeave={e => {
            e.target.style.background = "none";
            e.target.style.borderColor = "#ddd";
          }}
          title="Go back"
        >
          ←
        </button>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "1px solid #ddd",
            fontSize: isMobile ? "16px" : "18px",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "4px",
            color: "#08060d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            minWidth: "40px",
            height: "40px"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#f5f5f5";
            e.target.style.borderColor = "#999";
          }}
          onMouseLeave={e => {
            e.target.style.background = "none";
            e.target.style.borderColor = "#ddd";
          }}
          title="Go to home"
        >
          🏠
        </button>
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
          <button 
            onClick={() => navigate("/quick-edit")}
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
            ✏️ Edit Products
          </button>
        </div>
      )}

      {/* Center - Logo */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "0", height: "100%" }}>
        <img 
          src="/house-of-jodha-logo.png" 
          alt="House of Jodha" 
          onClick={() => navigate("/")}
          style={{ 
            maxHeight: "100%", 
            width: "auto", 
            cursor: "pointer",
            maxWidth: "100%",
            objectFit: "contain"
          }} 
        />
      </div>

      {/* Right Section - Auth & Cart Buttons */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "flex-end" }}>
        {!isMobile && !currentUser && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                color: "#D4AF37",
                border: "1px solid #D4AF37",
                padding: "8px 16px",
                fontSize: "12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => e.target.style.background = "rgba(212,175,55,0.1)"}
              onMouseLeave={e => e.target.style.background = "none"}
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")}
              style={{
                background: "#D4AF37",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                fontSize: "12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => e.target.style.background = "#c49a27"}
              onMouseLeave={e => e.target.style.background = "#D4AF37"}
            >
              Sign Up
            </button>
          </div>
        )}

        {!isMobile && currentUser && (
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{
                background: "none",
                color: "#D4AF37",
                border: "1px solid #D4AF37",
                padding: "8px 16px",
                fontSize: "12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => e.target.style.background = "rgba(212,175,55,0.1)"}
              onMouseLeave={e => e.target.style.background = "none"}
            >
              👤 {currentUser.fullName?.split(" ")[0]}
            </button>
            {userMenuOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "0",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                minWidth: "150px",
                zIndex: 10000,
                marginTop: "5px"
              }}>
                <div style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #eee",
                  fontSize: "12px",
                  color: "#666"
                }}>
                  {currentUser.email}
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#D4AF37",
                    fontWeight: "600",
                    fontSize: "12px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(212,175,55,0.1)"}
                  onMouseLeave={e => e.target.style.background = "none"}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button 
          onClick={onCartClick}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: "8px 10px",
            fontSize: isMobile ? "11px" : "12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          🛍️ Cart ({cartCount})
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute",
          top: isMobile ? "100px" : "120px",
          left: "0",
          right: "0",
          background: "#fff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9998
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
          <button 
            onClick={() => {
              setMenuOpen(false);
              navigate("/quick-edit");
            }}
            style={{
              padding: "12px 15px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#D4AF37",
              fontWeight: "600",
              fontSize: "14px",
              borderBottom: "1px solid #e5e4e7"
            }}
          >
            ✏️ Edit Products
          </button>

          {!currentUser && (
            <>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
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
                🔐 Login
              </button>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/signup");
                }}
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#D4AF37",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                ✍️ Sign Up
              </button>
            </>
          )}

          {currentUser && (
            <>
              <div style={{
                padding: "12px 15px",
                borderBottom: "1px solid #e5e4e7",
                fontSize: "12px",
                color: "#666"
              }}>
                👤 {currentUser.fullName}
              </div>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#D4AF37",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}