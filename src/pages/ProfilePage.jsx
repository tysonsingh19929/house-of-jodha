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

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    let pNum = user?.phone || "";
    let cCode = "+91";
    const knownCodes = ["+971", "+91", "+44", "+61", "+1"];
    for (let code of knownCodes) {
      if (pNum.startsWith(code)) {
        cCode = code;
        pNum = pNum.substring(code.length).trim();
        break;
      }
    }
    setFormData({
      name: user?.name || "",
      countryCode: cCode,
      phone: pNum,
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || ""
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, phone: formData.phone ? `${formData.countryCode || "+91"}${formData.phone}` : "" };
      const updatedUser = await api.updateUser(user._id || user.id, payload);
      setUser(updatedUser);
      setIsEditing(false);
      const currentLoc = JSON.parse(localStorage.getItem("currentUser"));
      localStorage.setItem("currentUser", JSON.stringify({ ...currentLoc, ...updatedUser }));
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedStr = localStorage.getItem("currentUser");
      if (!storedStr || storedStr === "undefined") {
        navigate("/login");
        return;
      }

      let storedUser;
      try {
        storedUser = JSON.parse(storedStr);
      } catch (e) {
        navigate("/login");
        return;
      }

      try {
        // Fetch fresh user data and their order history
        const userData = await api.getUser(storedUser.id || storedUser._id);
        const userOrders = await api.getUserOrders(storedUser.id || storedUser._id);

        setUser(userData && !userData.message ? userData : storedUser);
        setOrders(Array.isArray(userOrders) ? userOrders : []);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setUser(storedUser); // fallback so page still loads on network errors
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>Personal Information</h3>
                {!isEditing ? (
                  <button onClick={handleEdit} style={{ padding: "8px 16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit Details</button>
                ) : (
                  <div>
                    <button onClick={() => setIsEditing(false)} style={{ padding: "8px 16px", background: "#f5f5f5", color: "#333", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>Cancel</button>
                    <button onClick={handleSave} disabled={isSaving} style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>{isSaving ? "Saving..." : "Save Changes"}</button>
                  </div>
                )}
              </div>
              <div style={{ display: "grid", gap: "15px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>Full Name</label>
                  {isEditing ? (
                    <input name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                  ) : (
                    <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.name}</p>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>Email Address</label>
                  <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.email} <span style={{ fontSize: '11px', color: '#999', fontWeight: 'normal' }}>(cannot be changed)</span></p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>Phone</label>
                  {isEditing ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select
                        name="countryCode"
                        value={formData.countryCode || "+91"}
                        onChange={handleChange}
                        style={{ padding: "10px 8px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#f9f9f9", cursor: "pointer", width: "100px" }}
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+971">+971 (AE)</option>
                      </select>
                      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" style={{ flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                  ) : (
                    <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.phone || "Not provided"}</p>
                  )}
                </div>
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

          {activeTab === "shipping" && (
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>Shipping Address</h3>
                {!isEditing ? (
                  <button onClick={handleEdit} style={{ padding: "8px 16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit Address</button>
                ) : (
                  <div>
                    <button onClick={() => setIsEditing(false)} style={{ padding: "8px 16px", background: "#f5f5f5", color: "#333", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>Cancel</button>
                    <button onClick={handleSave} disabled={isSaving} style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>{isSaving ? "Saving..." : "Save Changes"}</button>
                  </div>
                )}
              </div>
              <div style={{ display: "grid", gap: "15px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>Street Address</label>
                  {isEditing ? (
                    <input name="address" value={formData.address} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                  ) : (
                    <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.address || "Not provided"}</p>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>City</label>
                    {isEditing ? (
                      <input name="city" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    ) : (
                      <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.city || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>State</label>
                    {isEditing ? (
                      <input name="state" value={formData.state} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    ) : (
                      <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.state || "Not provided"}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "5px" }}>Zip Code</label>
                  {isEditing ? (
                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} style={{ width: "50%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
                  ) : (
                    <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{user?.zipCode || "Not provided"}</p>
                  )}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}