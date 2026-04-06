import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
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
      const response = await fetch("/api/products");
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
      const response = await fetch("/api/orders");
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
      const response = await fetch("/api/users");
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
      const response = await fetch("/api/sellers");
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
      const response = await fetch("/api/products", {
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
      const response = await fetch(`/api/products/${id}`, {
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    paddingTop: "64px",
    paddingBottom: "40px"
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
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  };

  const tabBarStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    flexWrap: "wrap",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  };

  const tabButtonStyle = (isActive) => ({
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: isActive ? "#667eea" : "#f0f0f0",
    color: isActive ? "#fff" : "#333",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s"
  });

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  };

  const statCardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  const statNumberStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "10px"
  };

  return (
    <div style={panelStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{ margin: "0", color: "#333" }}>🔐 Admin Panel</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
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
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Welcome to Admin Panel</h2>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Use the tabs above to manage products, orders, users, and sellers. 
              Click on each section to view and manage respective data.
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
                    padding: "12px",
                    background: "#667eea",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2 style={{ color: "#333", marginBottom: "20px" }}>All Products ({products.length})</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Category</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Price</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "#333" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{product.name}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{product.category}</td>
                        <td style={{ padding: "10px", color: "#333" }}>₹{product.price}</td>
                        <td style={{ padding: "10px" }}>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
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
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr key={seller._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.name || "N/A"}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.email}</td>
                        <td style={{ padding: "10px", color: "#333" }}>{seller.productsCount || 0}</td>
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
