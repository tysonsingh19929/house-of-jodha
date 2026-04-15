import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icons (Lucide React style SVGs)
const HomeIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const PackageIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const PlusCircleIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const SettingsIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const LogOutIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const ActivityIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const UsersIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const DollarSignIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, add_product, settings
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", price: "", originalPrice: "", category: "Lehenga", image: "", images: [], description: "", stock: "", occasions: "", videoUrl: ""
  });
  
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [editImagePreviews, setEditImagePreviews] = useState([]);
  const categories = ["Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];

  const isSeller = localStorage.getItem("seller_authenticated") === "true";
  const sellerId = localStorage.getItem("seller_id");
  const sellerName = localStorage.getItem("seller_name");
  const isSuperAdmin = localStorage.getItem("is_super_admin") === "true";

  useEffect(() => {
    if (!isSeller) {
      navigate("/seller-login");
    } else {
      fetchProducts();
    }
  }, [isSeller, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = isSuperAdmin 
        ? '/products'
        : `/products/seller/${sellerId}`;
      const response = await fetch(`${API_BASE_URL}${url}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const canEditProduct = (product) => isSuperAdmin || product.sellerId === sellerId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
        setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.originalPrice || formData.images.length === 0) {
      alert("Please fill all required fields and upload at least one image");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, category: formData.category,
          price: parseInt(formData.price), originalPrice: parseInt(formData.originalPrice),
          image: formData.images[0], images: formData.images, sellerId: sellerId, sellerName: sellerName,
          description: formData.description || "", stock: parseInt(formData.stock) || 0,
          occasions: formData.occasions ? formData.occasions.split(',').map(s => s.trim()) : []
        })
      });

      if (!response.ok) throw new Error("Failed to add product");

      setFormData({ name: "", price: "", originalPrice: "", category: "Lehenga", image: "", images: [], description: "", stock: "", occasions: "" });
      setImagePreviews([]);
      fetchProducts();
      alert("Product added successfully!");
      setActiveTab("products");
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreviews(prev => [...prev, reader.result]);
        setEditFormData(prev => ({ ...prev, images: [...(prev.images || []), reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const startEdit = (product) => {
    if (!canEditProduct(product)) { alert("You don't have permission to edit this product"); return; }
    setEditingId(product._id);
    
    // Ensure images array exists even for old products
    const existingImages = product.images && product.images.length > 0 ? product.images : [product.image];
    
    setEditFormData({ ...product, images: existingImages, occasions: Array.isArray(product.occasions) ? product.occasions.join(', ') : (product.occasions || "") });
    setEditImagePreviews(existingImages);
  };

  const cancelEdit = () => {
    setEditingId(null); setEditFormData(null); setEditImagePreviews([]);
  };

  const saveEdit = async () => {
    if (!editFormData.name || !editFormData.price || !editFormData.originalPrice) {
      alert("Please fill all required fields"); return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editFormData.name, category: editFormData.category,
          price: parseInt(editFormData.price), originalPrice: parseInt(editFormData.originalPrice),
          image: editFormData.images[0], images: editFormData.images, description: editFormData.description || "",
          stock: editFormData.stock || 0, sellerId: sellerId, isSuperAdmin: isSuperAdmin,
          occasions: typeof editFormData.occasions === 'string' ? editFormData.occasions.split(',').map(s => s.trim()) : editFormData.occasions
        })
      });
      if (!response.ok) { const error = await response.json(); throw new Error(error.message); }
      cancelEdit(); fetchProducts(); alert("Product updated successfully!");
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  const deleteProduct = async (productId, product) => {
    if (!canEditProduct(product)) { alert("Permission denied"); return; }
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerId: sellerId, isSuperAdmin: isSuperAdmin })
      });
      if (!response.ok) { const error = await response.json(); throw new Error(error.message); }
      fetchProducts(); alert("Product deleted!");
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
  };

  if (!isSeller) return null;

  // Calculate some mock metrics for the dashboard
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 1)), 0);

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: isMobile ? "100%" : "260px", minHeight: isMobile ? "auto" : "100vh", backgroundColor: "#1e293b", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#facc15", display: "flex", alignItems: "center", gap: "10px" }}>
            ✨ Seller Panel
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#94a3b8" }}>{isSuperAdmin ? "Super Admin" : sellerName}</p>
        </div>
        
        <nav style={{ flex: 1, padding: isMobile ? "10px" : "20px 0", display: isMobile ? "flex" : "block", flexWrap: "wrap", justifyContent: "space-around" }}>
          {[
            { id: "dashboard", icon: <HomeIcon />, label: "Dashboard" },
            { id: "products", icon: <PackageIcon />, label: "My Products" },
            { id: "add_product", icon: <PlusCircleIcon />, label: "Add Product" },
            { id: "settings", icon: <SettingsIcon />, label: "Settings" }
          ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: isMobile ? "auto" : "100%", display: "flex", alignItems: "center", gap: "12px", padding: isMobile ? "12px" : "16px 24px",
                  backgroundColor: activeTab === item.id ? "rgba(255,255,255,0.1)" : "transparent",
                  color: activeTab === item.id ? "#fff" : "#94a3b8",
                  border: "none", borderLeft: !isMobile && activeTab === item.id ? "4px solid #facc15" : "4px solid transparent",
                  borderBottom: isMobile && activeTab === item.id ? "4px solid #facc15" : (isMobile ? "4px solid transparent" : "none"),
                  cursor: "pointer", fontSize: isMobile ? "13px" : "15px", fontWeight: "500", transition: "all 0.2s ease"
                }}
              >
                {item.icon} {!isMobile && item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px",
              backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
          >
            <LogOutIcon /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: isMobile ? "16px" : "32px", overflowY: "auto", width: isMobile ? "100%" : "auto" }}>
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: "28px", color: "#0f172a" }}>Welcome back, {sellerName}! 👋</h1>
            <p style={{ color: "#64748b", marginBottom: "32px" }}>Here's what's happening with your store today.</p>
            
            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PackageIcon />
                </div>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Products</p>
                  <h3 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>{totalProducts}</h3>
                </div>
              </div>
              
              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#f0fdf4", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <DollarSignIcon />
                </div>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Inventory Value</p>
                  <h3 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>₹{totalValue.toLocaleString('en-IN')}</h3>
                </div>
              </div>

              <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ActivityIcon />
                </div>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Store Views</p>
                  <h3 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>1,248</h3>
                </div>
              </div>
            </div>

            {/* Recent Products Summary */}
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>Recently Added Products</h3>
                <button onClick={() => setActiveTab("products")} style={{ background: "none", border: "none", color: "#3b82f6", fontWeight: "600", cursor: "pointer" }}>View All</button>
              </div>
              {products.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
                  {products.slice(0, 5).map(p => (
                    <div key={p._id} style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                      <img src={p.image} alt={p.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                      <div style={{ padding: "12px" }}>
                        <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "600", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                        <p style={{ margin: 0, fontSize: "13px", color: "#3b82f6", fontWeight: "700" }}>₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#64748b" }}>No products added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h1 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>My Products</h1>
              <button 
                onClick={() => setActiveTab("add_product")}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", backgroundColor: "#facc15", color: "#000", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 4px rgba(250, 204, 21, 0.3)" }}
              >
                <PlusCircleIcon /> Add New
              </button>
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading products...</div>
              ) : products.length > 0 ? (
                isMobile ? (
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {products.map(product => (
                      <div key={product._id} style={{ display: "flex", flexDirection: "column", gap: "12px", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", backgroundColor: "#f8fafc" }}>
                        <div style={{ display: "flex", gap: "12px" }}>
                          <img src={product.image} alt={product.name} style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: "0 0 4px", fontWeight: "600", color: "#0f172a", fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "12px", color: "#64748b", padding: "2px 8px", backgroundColor: "#e2e8f0", borderRadius: "12px" }}>{product.category}</span>
                              <span style={{ fontWeight: "700", color: "#3b82f6", fontSize: "14px" }}>₹{product.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", paddingTop: "12px", borderTop: "1px solid #e2e8f0" }}>
                          {canEditProduct(product) ? (
                            <>
                              <button onClick={() => startEdit(product)} style={{ flex: 1, padding: "10px", backgroundColor: "#eff6ff", color: "#3b82f6", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                                ✎ Edit
                              </button>
                              <button onClick={() => deleteProduct(product._id, product)} style={{ flex: 1, padding: "10px", backgroundColor: "#fef2f2", color: "#ef4444", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                                🗑️ Delete
                              </button>
                            </>
                          ) : (
                             <span style={{ fontSize: "13px", color: "#94a3b8", flex: 1, textAlign: "center", padding: "10px" }}>View Only</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price</th>
                        <th style={{ padding: "16px 24px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id} style={{ borderBottom: "1px solid #e2e8f0", transition: "background-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}>
                          <td style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
                            <img src={product.image} alt={product.name} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                            <div>
                              <p style={{ margin: "0 0 4px", fontWeight: "600", color: "#0f172a" }}>{product.name}</p>
                              {isSuperAdmin && <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Seller: {product.sellerName}</p>}
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 12px", backgroundColor: "#f1f5f9", color: "#475569", borderRadius: "20px", fontSize: "13px", fontWeight: "500" }}>{product.category}</span>
                          </td>
                          <td style={{ padding: "16px 24px", fontWeight: "600", color: "#0f172a" }}>₹{product.price.toLocaleString('en-IN')}</td>
                          <td style={{ padding: "16px 24px", textAlign: "right" }}>
                            {canEditProduct(product) ? (
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                <button onClick={() => startEdit(product)} style={{ padding: "6px 12px", backgroundColor: "#eff6ff", color: "#3b82f6", border: "none", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>Edit</button>
                                <button onClick={() => deleteProduct(product._id, product)} style={{ padding: "6px 12px", backgroundColor: "#fef2f2", color: "#ef4444", border: "none", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>Delete</button>
                              </div>
                            ) : (
                              <span style={{ fontSize: "13px", color: "#94a3b8" }}>View Only</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : (
                <div style={{ padding: "60px", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", padding: "20px", backgroundColor: "#f8fafc", borderRadius: "50%", color: "#94a3b8", marginBottom: "16px" }}><PackageIcon /></div>
                  <h3 style={{ margin: "0 0 8px", color: "#0f172a" }}>No products found</h3>
                  <p style={{ margin: 0, color: "#64748b" }}>Get started by adding your first product to the catalog.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === "add_product" && (
          <div style={{ animation: "fadeIn 0.3s ease", maxWidth: "800px" }}>
            <h1 style={{ margin: "0 0 32px", fontSize: "28px", color: "#0f172a" }}>Add New Product</h1>
            
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", padding: isMobile ? "20px" : "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Sale Price (₹) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Original Price (₹) *</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Occasions (Comma Separated)</label>
                  <input type="text" placeholder="Cocktail, Sangeet" name="occasions" value={formData.occasions} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Video / Instagram Reel URL</label>
                  <input type="text" placeholder="https://www.instagram.com/reel/..." name="videoUrl" value={formData.videoUrl || ""} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none" }} />
                </div>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Images *</label>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
                  {imagePreviews.map((src, index) => (
                    <div key={index} style={{ position: "relative" }}>
                      <img src={src} alt="Preview" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px", border: "2px solid #e2e8f0" }} />
                      <button type="button" onClick={() => {
                        const newPreviews = [...imagePreviews]; newPreviews.splice(index, 1);
                        const newImages = [...formData.images]; newImages.splice(index, 1);
                        setImagePreviews(newPreviews); setFormData(prev => ({ ...prev, images: newImages }));
                      }} style={{ position: "absolute", top: "-8px", right: "-8px", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#ef4444", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", padding: 0 }}>&times;</button>
                    </div>
                  ))}
                </div>

                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", backgroundColor: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#94a3b8"} onMouseLeave={e => e.currentTarget.style.borderColor = "#cbd5e1"}>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} />
                  <div style={{ color: "#94a3b8", marginBottom: "12px" }}><PlusCircleIcon /></div>
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#475569" }}>Click to upload images</span>
                  <span style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>JPG, PNG or WEBP (You can select multiple)</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" style={{ padding: "12px 24px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={e => e.target.style.backgroundColor = "#1e293b"} onMouseLeave={e => e.target.style.backgroundColor = "#0f172a"}>
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={{ animation: "fadeIn 0.3s ease", maxWidth: "600px" }}>
            <h1 style={{ margin: "0 0 32px", fontSize: "28px", color: "#0f172a" }}>Account Settings</h1>
            
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", padding: "32px", marginBottom: "24px" }}>
              <h3 style={{ margin: "0 0 20px", color: "#0f172a" }}>Profile Information</h3>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Store/Seller Name</label>
                  <input type="text" value={sellerName} disabled style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#64748b", outline: "none", cursor: "not-allowed" }} />
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#94a3b8" }}>Contact administrator to change store name.</p>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Seller ID</label>
                  <input type="text" value={sellerId} disabled style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#64748b", outline: "none", cursor: "not-allowed" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Role</label>
                  <input type="text" value={isSuperAdmin ? "Super Admin" : "Seller"} disabled style={{ width: "100%", padding: "12px 16px", backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#64748b", outline: "none", cursor: "not-allowed" }} />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* EDIT MODAL */}
      {editingId && editFormData && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "20px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", animation: "slideUp 0.3s ease" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 10 }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#0f172a" }}>Edit Product</h2>
              <button onClick={cancelEdit} style={{ background: "none", border: "none", fontSize: "24px", color: "#94a3b8", cursor: "pointer", padding: "4px" }}>&times;</button>
            </div>
            
            <div style={{ padding: "32px" }}>
              <div style={{ display: "grid", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Name *</label>
                  <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Category *</label>
                    <select name="category" value={editFormData.category} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }}>
                      {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Stock</label>
                    <input type="number" name="stock" value={editFormData.stock} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Sale Price (₹) *</label>
                    <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Original Price (₹) *</label>
                    <input type="number" name="originalPrice" value={editFormData.originalPrice} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Occasions (Comma Separated)</label>
                    <input type="text" placeholder="Cocktail, Sangeet" name="occasions" value={editFormData.occasions} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Video / Instagram Reel URL</label>
                    <input type="text" name="videoUrl" value={editFormData.videoUrl || ""} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>Product Images</label>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
                    {editImagePreviews.map((src, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img src={src} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                        <button type="button" onClick={() => {
                          const newPreviews = [...editImagePreviews]; newPreviews.splice(index, 1);
                          const newImages = [...editFormData.images]; newImages.splice(index, 1);
                          setEditImagePreviews(newPreviews); setEditFormData(prev => ({ ...prev, images: newImages }));
                        }} style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ef4444", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", padding: 0 }}>&times;</button>
                      </div>
                    ))}
                  </div>

                  <label style={{ display: "block", padding: "20px", backgroundColor: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "8px", textAlign: "center", cursor: "pointer" }}>
                    <input type="file" accept="image/*" multiple onChange={handleEditImageUpload} style={{ display: "none" }} />
                    <span style={{ color: "#475569", fontWeight: "500" }}>Click here to add more images</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={cancelEdit} style={{ padding: "12px 24px", backgroundColor: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                <button onClick={saveEdit} style={{ padding: "12px 24px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Basic Keyframes for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
