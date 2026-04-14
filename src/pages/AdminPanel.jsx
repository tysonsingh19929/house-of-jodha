import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "Lehenga",
    image: "",
    description: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Check admin access
  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch all data
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
    fetchSellers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSellers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sellers`);
      if (response.ok) {
        const data = await response.json();
        setSellers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({ name: "", price: "", originalPrice: "", category: "Lehenga", image: "", description: "" });
        setImagePreview(null);
        fetchProducts();
      }
    } catch (error) {
      alert("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Product deleted!");
        fetchProducts();
      }
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
  };

  const handleUpdateSellerStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sellers/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchSellers();
      } else {
        const errorData = await response.json();
        alert("Error updating status: " + errorData.message);
      }
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleDeleteSeller = async (id) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/sellers/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        fetchSellers();
      } else {
        const errorData = await response.json();
        alert("Error deleting seller: " + errorData.message);
      }
    } catch (error) {
      alert("Error deleting seller: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  // Dashboard Stats
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalSellers: sellers.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
  };

  const panelStyle = {
    minHeight: "100vh",
    background: "#FAFAFA",
    paddingTop: "64px",
    paddingBottom: "40px",
    fontFamily: "'Inter', sans-serif"
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    background: "linear-gradient(135deg, #1A1A1A, #2A2A2A)",
    padding: "25px 35px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    color: "#D4AF37"
  };

  const tabBarStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    background: "#fff",
    padding: "16px",
    borderRadius: "16px",
    flexWrap: "wrap",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    border: "1px solid rgba(212,175,55,0.1)"
  };

  const tabButtonStyle = (isActive) => ({
    padding: "10px 24px",
    border: "none",
    borderRadius: "30px",
    background: isActive ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "transparent",
    color: isActive ? "#fff" : "#666",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 4px 15px rgba(212,175,55,0.3)" : "none"
  });

  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
    marginBottom: "24px",
    border: "1px solid rgba(212,175,55,0.05)"
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  };

  const statCardStyle = {
    background: "#fff",
    padding: "30px 20px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
    textAlign: "center",
    border: "1px solid rgba(0,0,0,0.04)",
    transition: "transform 0.3s ease",
    cursor: "default"
  };

  const statNumberStyle = {
    fontSize: "38px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #D4AF37, #B8860B)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "8px"
  };

  return (
    <div style={panelStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ margin: "0", color: "#D4AF37", fontSize: "28px" }}>👑 Super Admin Console</h1>
            <p style={{ margin: "5px 0 0 0", color: "#aaa", fontSize: "14px" }}>House of Jodha Headquarters</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              background: "transparent",
              color: "#fff",
              border: "1px solid #D4AF37",
              borderRadius: "30px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(212,175,55,0.1)"}
            onMouseLeave={(e) => e.target.style.background = "transparent"}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        {activeTab === "dashboard" && (
          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>{stats.totalProducts}</div>
              <div style={{ color: "#666", fontSize: "14px" }}>Total Products</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>{stats.totalOrders}</div>
              <div style={{ color: "#666", fontSize: "14px" }}>Total Orders</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>{stats.totalUsers}</div>
              <div style={{ color: "#666", fontSize: "14px" }}>Total Users</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>{stats.totalSellers}</div>
              <div style={{ color: "#666", fontSize: "14px" }}>Total Sellers</div>
            </div>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>₹{stats.totalRevenue.toLocaleString()}</div>
              <div style={{ color: "#666", fontSize: "14px" }}>Total Revenue</div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={tabBarStyle}>
          {["dashboard", "products", "orders", "users", "sellers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={tabButtonStyle(activeTab === tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#1A1A1A", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Welcome to the Command Center
            </h2>
            <p style={{ color: "#666", lineHeight: "1.6", margin: 0 }}>
              Here you hold the keys to the entire boutique. Use the navigation above to securely audit products, track incoming orders, verify user registrations, and moderate seller accounts. 
              All system metrics are tracked in real-time.
            </p>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <>
            <div style={cardStyle}>
              <h2 style={{ color: "#333", marginBottom: "20px" }}>Add New Product</h2>
              <form onSubmit={handleAddProduct} style={{ display: "grid", gap: "15px" }}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
                <input
                  type="number"
                  placeholder="Original Price"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                >
                  <option>Lehenga</option>
                  <option>Saree</option>
                  <option>Anarkali</option>
                  <option>Salwar Kameez</option>
                  <option>Gharara</option>
                  <option>Sharara</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    minHeight: "80px"
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px"
                    }}
                  />
                )}
                  <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "14px",
                    background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "700",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    transition: "opacity 0.2s"
                  }}
                >
                  {loading ? "Adding Product..." : "✨ Add Master Product"}
                </button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2 style={{ color: "#1A1A1A", marginBottom: "20px" }}>Master Catalog ({products.length})</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ background: "#FDFDFD", borderBottom: "2px solid #EAEAEA" }}>
                      <th style={{ textAlign: "left", padding: "16px", color: "#666", fontWeight: "600" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "16px", color: "#666", fontWeight: "600" }}>Category</th>
                      <th style={{ textAlign: "left", padding: "16px", color: "#666", fontWeight: "600" }}>Price</th>
                      <th style={{ textAlign: "left", padding: "16px", color: "#666", fontWeight: "600" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{product.name}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{product.category}</td>
                        <td style={{ padding: "10px", color: "#333" }}>₹{product.price}</td>
                        <td style={{ padding: "16px" }}>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            style={{
                              padding: "8px 16px",
                              background: "#ff4757",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}
                          >
                            ✖ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p style={{ color: "#666" }}>No orders yet</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Order ID</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Customer</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Total</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{order._id?.slice(0, 8)}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{order.customerName || "N/A"}</td>
                        <td style={{ padding: "10px", color: "#333" }}>₹{order.total || 0}</td>
                        <td style={{ padding: "10px" }}>
                          <span
                            style={{
                              padding: "4px 8px",
                              background: "#f39c12",
                              color: "#fff",
                              borderRadius: "4px",
                              fontSize: "12px"
                            }}
                          >
                            {order.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Users ({users.length})</h2>
            {users.length === 0 ? (
              <p style={{ color: "#666" }}>No users yet</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Email</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{user.fullName || "N/A"}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{user.email}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{user.phone || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Sellers Tab */}
        {activeTab === "sellers" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Sellers ({sellers.length})</h2>
            {sellers.length === 0 ? (
              <p style={{ color: "#666" }}>No sellers yet</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Email</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Products</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Status</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr key={seller._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.name || "N/A"}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.email}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.productsCount || 0}</td>
                        <td style={{ padding: "10px", color: "#333" }}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            background: seller.status === "active" ? "#d4edda" : seller.status === "suspended" ? "#f8d7da" : "#fff3cd",
                            color: seller.status === "active" ? "#155724" : seller.status === "suspended" ? "#721c24" : "#856404"
                          }}>
                            {seller.status || "pending"}
                          </span>
                        </td>
                        <td style={{ padding: "10px", color: "#333", display: "flex", gap: "5px" }}>
                          {seller.role !== "admin" && (
                            <>
                              {seller.status !== "active" && (
                                <button
                                  onClick={() => handleUpdateSellerStatus(seller._id, "active")}
                                  style={{
                                    padding: "6px 12px",
                                    background: "#2ecc71",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  Activate
                                </button>
                              )}
                              {seller.status === "active" && (
                                <button
                                  onClick={() => handleUpdateSellerStatus(seller._id, "suspended")}
                                  style={{
                                    padding: "6px 12px",
                                    background: "#f39c12",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  Suspend
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteSeller(seller._id)}
                                style={{
                                  padding: "6px 12px",
                                  background: "#e74c3c",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "12px"
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {seller.role === "admin" && <span style={{ fontSize: "12px", color: "#888" }}>Admin</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
