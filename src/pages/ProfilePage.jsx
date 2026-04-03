import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProfilePage({ cartCount, onCartClick, wishlistCount, onWishlistClick }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {
        // Fetch fresh user data and their order history
        const userData = await api.getUser(storedUser.id || storedUser._id);
        const userOrders = await api.getUserOrders(storedUser.id || storedUser._id);
        
        setUser(userData);
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <div style={{ textAlign: "center", padding: "100px" }}>Loading your profile...</div>;

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#fcfaf8" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} wishlistCount={wishlistCount} onWishlistClick={onWishlistClick} />
      
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", display: "flex", gap: "30px", flexDirection: window.innerWidth < 768 ? "column" : "row" }}>
        
        {/* SIDEBAR NAVIGATION */}
        <div style={{ flex: "1", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", height: "fit-content" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#1a1a1a" }}>Account</h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["profile", "orders", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  textAlign: "left", padding: "12px", borderRadius: "6px", border: "none", cursor: "pointer",
                  background: activeTab === tab ? "#D4AF37" : "transparent",
                  color: activeTab === tab ? "#fff" : "#666",
                  fontWeight: "600", textTransform: "capitalize", transition: "0.3s"
                }}
              >
                {tab === "profile" ? "Personal Info" : tab === "orders" ? "My Orders" : "Shipping Address"}
              </button>
            ))}
            <button 
              onClick={() => { localStorage.removeItem("currentUser"); navigate("/"); }}
              style={{ textAlign: "left", padding: "12px", color: "#d32f2f", border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}
            >
              Logout
            </button>
          </nav>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: "3", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          
          {activeTab === "profile" && (
            <section>
              <h3 style={{ marginBottom: "20px" }}>Personal Information</h3>
              <div style={{ display: "grid", gap: "15px" }}>
                <div><label style={{ fontSize: "12px", color: "#999" }}>Full Name</label><p style={{ fontSize: "16px", fontWeight: "600" }}>{user?.name}</p></div>
                <div><label style={{ fontSize: "12px", color: "#999" }}>Email Address</label><p style={{ fontSize: "16px", fontWeight: "600" }}>{user?.email}</p></div>
                <button style={{ padding: "10px 20px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", marginTop: "10px", cursor: "pointer" }}>Edit Profile</button>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section>
              <h3 style={{ marginBottom: "20px" }}>Order History</h3>
              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order._id} style={{ borderBottom: "1px solid #eee", padding: "15px 0", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontWeight: "700" }}>Order #{order._id.slice(-6)}</p>
                      <p style={{ fontSize: "13px", color: "#666" }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: "700", color: "#D4AF37" }}>₹{order.totalAmount}</p>
                      <p style={{ fontSize: "12px", background: "#f0f0f0", padding: "2px 8px", borderRadius: "10px" }}>{order.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>You haven't placed any orders yet.</p>
              )}
            </section>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}