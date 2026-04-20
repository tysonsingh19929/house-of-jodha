import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CrownIcon, SparklesIcon, TrashIcon } from "../components/Icons";

const HomeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const PackageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const OrdersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>;
const StoreIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [sellerFilter, setSellerFilter] = useState("All");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: "", price: "", originalPrice: "", category: "Lehenga", image: "", description: "", occasions: "", videoUrl: ""
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    window.history.replaceState({ tab: activeTab }, "", window.location.pathname);
    const handlePopState = (e) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
      } else {
        navigate("/");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      window.history.pushState({ tab }, "", window.location.pathname);
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    if (!adminToken) navigate("/admin-login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    fetchProducts(); fetchOrders(); fetchUsers(); fetchSellers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (res.ok) setProducts(await res.json());
    } catch (e) { console.error(e); }
  };
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (res.ok) setOrders(await res.json());
    } catch (e) { console.error(e); }
  };
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (res.ok) setUsers(await res.json());
    } catch (e) { console.error(e); }
  };
  const fetchSellers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sellers`);
      if (res.ok) setSellers(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800; // Optimal for web
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to WebP at 70% quality (cuts 10MB to ~150KB)
          const compressedDataUrl = canvas.toDataURL("image/webp", 0.7);

          setImagePreview(compressedDataUrl);
          setFormData(prev => ({ ...prev, image: compressedDataUrl }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return alert("Please fill all fields");
    try {
      setLoading(true);
      const payload = {
        ...formData,
        price: parseInt(formData.price, 10),
        originalPrice: parseInt(formData.originalPrice || formData.price, 10),
        occasions: formData.occasions ? formData.occasions.split(',').map(s => s.trim()) : [],
        sellerId: "admin",
        sellerName: "House of Jodha"
      };
      const res = await fetch(`${API_BASE_URL}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        alert("Product added successfully!");
        setFormData({ name: "", price: "", originalPrice: "", category: "Lehenga", image: "", description: "", occasions: "" });
        setImagePreview(null); fetchProducts();
      } else {
        const err = await res.json();
        alert("Error adding product: " + err.message);
      }
    } catch (e) { alert("Error adding product"); } finally { setLoading(false); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...editFormData, occasions: typeof editFormData.occasions === 'string' ? editFormData.occasions.split(',').map(s => s.trim()) : editFormData.occasions };
      const res = await fetch(`${API_BASE_URL}/products/${editingProduct._id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (e) { alert("Error deleting product"); }
  };

  const handleUpdateSellerStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/sellers/${id}/status`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      res.ok ? fetchSellers() : alert("Error updating status");
    } catch (error) { alert("Error updating status"); }
  };

  const handleDeleteSeller = async (id) => {
    if (!window.confirm("Delete this seller?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/sellers/${id}`, { method: "DELETE" });
      res.ok ? fetchSellers() : alert("Error deleting seller");
    } catch (e) { alert("Error deleting seller"); }
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalSellers: sellers.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
  };

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "'Inter', 'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{ width: isMobile ? "100%" : "260px", minHeight: isMobile ? "auto" : "100vh", backgroundColor: "#1e293b", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#facc15", display: "flex", alignItems: "center", gap: "10px" }}>
            <CrownIcon size="24px" /> Super Admin
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#94a3b8" }}>Master Control Console</p>
        </div>

        <nav style={{ flex: 1, padding: isMobile ? "10px" : "20px 0", display: isMobile ? "flex" : "block", flexWrap: "wrap", justifyContent: "space-around", overflowX: "auto" }}>
          {[
            { id: "dashboard", icon: <HomeIcon />, label: "Dashboard" },
            { id: "products", icon: <PackageIcon />, label: "Products" },
            { id: "orders", icon: <OrdersIcon />, label: "Orders" },
            { id: "users", icon: <UsersIcon />, label: "Users" },
            { id: "sellers", icon: <StoreIcon />, label: "Sellers" }
          ].map(item => (
            <button
              key={item.id} onClick={() => handleTabChange(item.id)}
              style={{
                width: isMobile ? "auto" : "100%", display: "flex", alignItems: "center", gap: "12px", padding: isMobile ? "12px 16px" : "16px 24px",
                backgroundColor: activeTab === item.id ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeTab === item.id ? "#fff" : "#94a3b8",
                border: "none", borderLeft: !isMobile && activeTab === item.id ? "4px solid #facc15" : "4px solid transparent",
                borderBottom: isMobile && activeTab === item.id ? "4px solid #facc15" : (isMobile ? "4px solid transparent" : "none"),
                cursor: "pointer", fontSize: isMobile ? "13px" : "15px", fontWeight: "500", transition: "all 0.2s ease", whiteSpace: "nowrap"
              }}
            >
              {item.icon} {!isMobile && item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={() => { localStorage.removeItem("admin_token"); navigate("/"); }} style={{ width: "100%", padding: "12px", backgroundColor: "transparent", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)"} onMouseLeave={e => e.target.style.backgroundColor = "transparent"}>
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: isMobile ? "16px" : "32px", overflowY: "auto", width: isMobile ? "100%" : "auto" }}>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "28px", color: "#0f172a" }}>Overview Metrics</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", borderTop: "4px solid #facc15" }}>
                <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Total Revenue</p>
                <h3 style={{ margin: 0, fontSize: "32px", color: "#0f172a", fontWeight: "700" }}>₹{stats.totalRevenue.toLocaleString()}</h3>
              </div>
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", borderTop: "4px solid #3b82f6" }}>
                <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Total Products</p>
                <h3 style={{ margin: 0, fontSize: "32px", color: "#0f172a", fontWeight: "700" }}>{stats.totalProducts}</h3>
              </div>
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", borderTop: "4px solid #10b981" }}>
                <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Total Sellers</p>
                <h3 style={{ margin: 0, fontSize: "32px", color: "#0f172a", fontWeight: "700" }}>{stats.totalSellers}</h3>
              </div>
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", borderTop: "4px solid #8b5cf6" }}>
                <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Total Orders</p>
                <h3 style={{ margin: 0, fontSize: "32px", color: "#0f172a", fontWeight: "700" }}>{stats.totalOrders}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: "20px", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>
                Master Control Center
              </h2>
              <p style={{ color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                You have full operational access to House of Jodha. Manage external sellers, verify their product listings, track financial metrics, and monitor user accounts. Utilize the sidebar to navigate the master administrative portals.
              </p>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div style={{ animation: "fadeIn 0.3s ease", maxWidth: "1200px" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "28px", color: "#0f172a" }}>Product Management</h1>

            <form onSubmit={handleAddProduct} style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", padding: isMobile ? "20px" : "32px", marginBottom: "32px" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: "18px", color: "#1e293b" }}>Add Master Product</h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s", appearance: "none" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"}>
                    <option>Lehenga</option><option>Saree</option><option>Anarkali</option><option>Salwar Kameez</option><option>Gharara</option><option>Sharara</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Listing Price (₹) *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Occasions (Comma Separated)</label>
                  <input type="text" placeholder="e.g. Cocktail, Reception, Wedding" value={formData.occasions} onChange={(e) => setFormData({ ...formData, occasions: e.target.value })} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s", fontFamily: "inherit", resize: "vertical" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Image *</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} required style={{ display: "block", width: "100%", padding: "12px", border: "1px dashed #cbd5e1", borderRadius: "8px", backgroundColor: "#f8fafc", cursor: "pointer", fontSize: "14px" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Video / Instagram Reel URL</label>
                  <input type="text" placeholder="https://www.instagram.com/reel/..." value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
              </div>

              <button type="submit" disabled={loading} style={{ width: isMobile ? "100%" : "auto", padding: "14px 28px", backgroundColor: "#1e293b", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background-color 0.2s" }} onMouseEnter={e => !loading && (e.target.style.backgroundColor = "#334155")} onMouseLeave={e => !loading && (e.target.style.backgroundColor = "#1e293b")}>
                <SparklesIcon size="18px" /> {loading ? "Saving..." : "Add Master Product"}
              </button>
            </form>

            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>Live Master Catalog</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}>Filter by Seller:</label>
                    <select value={sellerFilter} onChange={e => setSellerFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", outline: "none" }}>
                      <option value="All">All Products</option>
                      <option value="admin">House of Jodha (Admin)</option>
                      {sellers.filter(s => s.role !== 'admin').map(s => (
                        <option key={s._id} value={s._id}>{s.businessName || s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {products.filter(p => sellerFilter === "All" || p.sellerId === sellerFilter).length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No products found for this selection.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Product</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Category</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Seller</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Price</th>
                        <th style={{ padding: "16px 24px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(p => sellerFilter === "All" || p.sellerId === sellerFilter).map((p) => (
                        <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                          <td style={{ padding: "16px 24px" }}>
                            <div style={{ fontWeight: "500", color: "#0f172a" }}>{p.name}</div>
                          </td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", backgroundColor: "#f1f5f9", color: "#475569", borderRadius: "100px", fontSize: "12px", fontWeight: "500" }}>{p.category}</span>
                          </td>
                          <td style={{ padding: "16px 24px", color: "#64748b", fontSize: "13px", fontWeight: "500" }}>{p.sellerName || "House of Jodha"}</td>
                          <td style={{ padding: "16px 24px", color: "#0f172a", fontWeight: "600" }}>₹{p.price}</td>
                          <td style={{ padding: "16px 24px", textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                              <button onClick={() => {
                                setEditingProduct(p);
                                setEditFormData({ ...p, occasions: Array.isArray(p.occasions) ? p.occasions.join(', ') : (p.occasions || "") });
                              }} style={{ padding: "8px 12px", backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                                ✎ Edit
                              </button>
                              <button onClick={() => handleDeleteProduct(p._id)} style={{ padding: "8px 12px", backgroundColor: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fee2e2"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fef2f2"}>
                                <TrashIcon size="14px" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "28px", color: "#0f172a" }}>Global Orders</h1>

            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {orders.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No active orders.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Order ID</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Customer</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Total</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px 24px", fontWeight: "500", color: "#3b82f6" }}>#{o._id?.slice(0, 8)}</td>
                          <td style={{ padding: "16px 24px", color: "#334155" }}>{o.customerName || "N/A"}</td>
                          <td style={{ padding: "16px 24px", color: "#0f172a", fontWeight: "600" }}>₹{o.total || 0}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", backgroundColor: "#fffbeb", color: "#d97706", borderRadius: "100px", fontSize: "12px", border: "1px solid #fde68a", fontWeight: "600" }}>{o.status || "Pending"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "28px", color: "#0f172a" }}>Customer Database</h1>

            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {users.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No registered users.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Name</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Email</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px 24px", color: "#334155", fontWeight: "500" }}>{u.fullName || "N/A"}</td>
                          <td style={{ padding: "16px 24px", color: "#64748b" }}>{u.email}</td>
                          <td style={{ padding: "16px 24px", color: "#64748b" }}>{u.phone || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SELLERS TAB */}
        {activeTab === "sellers" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ margin: "0 0 24px", fontSize: "28px", color: "#0f172a" }}>Seller Verification</h1>

            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {sellers.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No registered sellers.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Boutique Name</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Email</th>
                        <th style={{ padding: "16px 24px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Products</th>
                        <th style={{ padding: "16px 24px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Storefront</th>
                        <th style={{ padding: "16px 24px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Status</th>
                        <th style={{ padding: "16px 24px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellers.map((s) => (
                        <tr key={s._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px 24px", color: "#0f172a", fontWeight: "600" }}>{s.businessName || s.name || "N/A"}{s.role === "admin" && " (Admin)"}</td>
                          <td style={{ padding: "16px 24px", color: "#64748b" }}>{s.email}</td>
                          <td style={{ padding: "16px 24px", color: "#334155", textAlign: "center", fontWeight: "600" }}>{s.productsCount || 0}</td>
                          <td style={{ padding: "16px 24px", textAlign: "center" }}>
                            {s.slug ? (
                              <a href={`${window.location.protocol}//${s.slug}.${window.location.host.replace(/^www\./, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "underline", fontSize: "13px", fontWeight: "500" }}>Visit Store ↗</a>
                            ) : (
                              <span style={{ color: "#94a3b8", fontSize: "13px" }}>N/A</span>
                            )}
                          </td>
                          <td style={{ padding: "16px 24px", textAlign: "center" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "100px", fontSize: "12px", border: "1px solid", fontWeight: "600", background: s.status === "active" ? "#ecfdf5" : s.status === "suspended" ? "#fef2f2" : "#fffbeb", color: s.status === "active" ? "#059669" : s.status === "suspended" ? "#dc2626" : "#d97706", borderColor: s.status === "active" ? "#6ee7b7" : s.status === "suspended" ? "#fca5a5" : "#fde68a" }}>
                              {s.status || "Pending"}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px", textAlign: "right" }}>
                            {s.role !== "admin" && (
                              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                {s.status !== "active" && (
                                  <button onClick={() => handleUpdateSellerStatus(s._id, "active")} style={{ padding: "6px 12px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Approve</button>
                                )}
                                {s.status === "active" && (
                                  <button onClick={() => handleUpdateSellerStatus(s._id, "suspended")} style={{ padding: "6px 12px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Suspend</button>
                                )}
                                <button onClick={() => handleDeleteSeller(s._id)} style={{ padding: "6px 12px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Delete</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal Overlay */}
      {editingProduct && editFormData && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.75)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: "20px", color: "#0f172a" }}>Edit Product</h2>
            <form onSubmit={handleEditSubmit} style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Product Name</label>
                <input type="text" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Price (₹)</label>
                  <input type="number" value={editFormData.price} onChange={e => setEditFormData({ ...editFormData, price: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Original Price (₹)</label>
                  <input type="number" value={editFormData.originalPrice} onChange={e => setEditFormData({ ...editFormData, originalPrice: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Occasions</label>
                <input type="text" placeholder="Cocktail, Sangeet" value={editFormData.occasions} onChange={e => setEditFormData({ ...editFormData, occasions: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Video / Instagram Reel URL</label>
                <input type="text" value={editFormData.videoUrl || ""} onChange={e => setEditFormData({ ...editFormData, videoUrl: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button type="submit" disabled={loading} style={{ flex: 1, padding: "12px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>{loading ? "Saving..." : "Save Changes"}</button>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: "12px", backgroundColor: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
