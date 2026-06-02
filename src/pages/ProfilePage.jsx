import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProfilePage({ cartCount, onCartClick, wishlistCount, onWishlistClick }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser || storedUser === "undefined") {
      navigate("/login");
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        navigate("/login");
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (isLoading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #f3f3f3", borderTop: "3px solid #D4AF37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Mock Data to populate the profile
  const mockOrders = [
    { id: "#ORD-9021", date: "Mar 12, 2026", status: "Delivered", total: "₹12,499", items: 2 },
    { id: "#ORD-9104", date: "Apr 05, 2026", status: "Processing", total: "₹8,999", items: 1 },
  ];

  const mockAddresses = [
    { id: 1, type: "Home", name: user.name || "Valued Customer", address: "123 Fashion Street, Bandra West", city: "Mumbai", state: "Maharashtra", pin: "400050", isDefault: true },
  ];

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Navbar cartCount={cartCount} onCartClick={onCartClick} wishlistCount={wishlistCount} onWishlistClick={onWishlistClick} />

      <main style={{ flex: 1, paddingTop: "100px", paddingBottom: "60px", paddingLeft: isMobile ? "20px" : "40px", paddingRight: isMobile ? "20px" : "40px", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "40px", textAlign: isMobile ? "center" : "left" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 8px 0" }}>My Account</h1>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Manage your orders, preferences, and personal details.</p>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "40px" }}>

          {/* Sidebar Navigation */}
          <aside style={{ width: isMobile ? "100%" : "250px", flexShrink: 0 }}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0" }}>

              {/* User Profile Snippet */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700", fontFamily: "'Cormorant Garamond', serif" }}>
                  {(user.name || "U")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name || "Valued Customer"}</h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email || "user@example.com"}</p>
                </div>
              </div>

              {/* Nav Links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { id: "dashboard", label: "Dashboard", icon: "📊" },
                  { id: "orders", label: "My Orders", icon: "🛍️" },
                  { id: "addresses", label: "Saved Addresses", icon: "📍" },
                  { id: "settings", label: "Account Settings", icon: "⚙️" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px",
                      background: activeTab === tab.id ? "#fdf8ee" : "transparent",
                      color: activeTab === tab.id ? "#B8860B" : "#555",
                      border: "none", borderRadius: "8px", cursor: "pointer",
                      fontSize: "14px", fontWeight: activeTab === tab.id ? "600" : "500",
                      textAlign: "left", transition: "all 0.2s ease",
                      borderLeft: activeTab === tab.id ? "3px solid #D4AF37" : "3px solid transparent"
                    }}
                    onMouseEnter={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.color = "#333"; } }}
                    onMouseLeave={e => { if (activeTab !== tab.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; } }}
                  >
                    <span style={{ fontSize: "16px" }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px",
                    background: "transparent", color: "#e53e3e", border: "none", borderRadius: "8px", cursor: "pointer",
                    fontSize: "14px", fontWeight: "500", textAlign: "left", transition: "all 0.2s", marginTop: "16px"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: "16px" }}>🚪</span>
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div style={{ animation: "fadeIn 0.3s ease forwards" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 16px 0" }}>Hello, {user.name?.split(" ")[0] || "there"}! 👋</h2>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px", lineHeight: "1.6" }}>
                  From your account dashboard, you can view your recent orders, manage your shipping addresses, and edit your password and account details.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
                  <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #f0f0f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: "28px", marginBottom: "12px" }}>🛍️</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>{mockOrders.length} Orders</h3>
                    <a onClick={() => setActiveTab("orders")} style={{ fontSize: "13px", color: "#D4AF37", cursor: "pointer", fontWeight: "600" }}>View all orders →</a>
                  </div>
                  <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #f0f0f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: "28px", marginBottom: "12px" }}>♡</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>{wishlistCount} Saved Items</h3>
                    <a onClick={onWishlistClick} style={{ fontSize: "13px", color: "#D4AF37", cursor: "pointer", fontWeight: "600" }}>View wishlist →</a>
                  </div>
                  <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #f0f0f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: "28px", marginBottom: "12px" }}>📍</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0" }}>{mockAddresses.length} Addresses</h3>
                    <a onClick={() => setActiveTab("addresses")} style={{ fontSize: "13px", color: "#D4AF37", cursor: "pointer", fontWeight: "600" }}>Manage addresses →</a>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div style={{ animation: "fadeIn 0.3s ease forwards" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 20px 0" }}>Order History</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {mockOrders.map((order, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "16px", transition: "box-shadow 0.2s" }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a" }}>{order.id}</span>
                          <span style={{ fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", background: order.status === "Delivered" ? "#e6ffed" : "#fffaf0", color: order.status === "Delivered" ? "#22543d" : "#c05621" }}>
                            {order.status}
                          </span>
                        </div>
                        <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#666" }}>Placed on {order.date}</p>
                        <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{order.items} {order.items === 1 ? 'item' : 'items'} • <strong>{order.total}</strong></p>
                      </div>
                      <button style={{ background: "#f8f8f8", border: "1px solid #eaeaea", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#333", cursor: "pointer", width: isMobile ? "100%" : "auto", transition: "background 0.2s" }} onMouseEnter={e => e.target.style.background = "#f0f0f0"} onMouseLeave={e => e.target.style.background = "#f8f8f8"}>
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div style={{ animation: "fadeIn 0.3s ease forwards" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>Saved Addresses</h2>
                  <button style={{ background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)" }}>+ Add New</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  {mockAddresses.map(addr => (
                    <div key={addr.id} style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "20px", position: "relative" }}>
                      {addr.isDefault && <span style={{ position: "absolute", top: "20px", right: "20px", fontSize: "10px", fontWeight: "700", background: "#f3f4f6", color: "#4b5563", padding: "4px 8px", borderRadius: "4px", textTransform: "uppercase" }}>Default</span>}
                      <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                        {addr.type === "Home" ? "🏠" : "🏢"} {addr.type}
                      </h3>
                      <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "500", color: "#1a1a1a" }}>{addr.name}</p>
                      <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>{addr.address}<br />{addr.city}, {addr.state} {addr.pin}</p>
                      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                        <button style={{ background: "none", border: "none", color: "#D4AF37", fontSize: "13px", fontWeight: "600", cursor: "pointer", padding: 0 }}>Edit</button>
                        <button style={{ background: "none", border: "none", color: "#e53e3e", fontSize: "13px", fontWeight: "600", cursor: "pointer", padding: 0 }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div style={{ animation: "fadeIn 0.3s ease forwards" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 20px 0" }}>Account Settings</h2>
                <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "16px", padding: isMobile ? "20px" : "32px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "8px" }}>Full Name</label>
                        <input type="text" defaultValue={user.name} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "8px" }}>Email Address</label>
                        <input type="email" defaultValue={user.email} disabled style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", background: "#f9f9f9", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#999", cursor: "not-allowed" }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "8px" }}>Phone Number</label>
                      <input type="tel" defaultValue={user.phone || ""} placeholder="+91 XXXXX XXXXX" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                    <div style={{ borderTop: "1px solid #eee", margin: "10px 0" }} />
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "8px" }}>New Password</label>
                      <input type="password" placeholder="Leave blank to keep unchanged" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                    <button type="submit" style={{ background: "#1a1a1a", color: "#fff", border: "none", padding: "14px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "10px", width: isMobile ? "100%" : "auto", alignSelf: "flex-start", transition: "background 0.2s" }} onMouseEnter={e => e.target.style.background = "#333"} onMouseLeave={e => e.target.style.background = "#1a1a1a"}>
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}