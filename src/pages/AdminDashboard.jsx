import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "Lehenga",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const categories = ["Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];

  // Get seller info from localStorage
  const isSeller = localStorage.getItem("seller_authenticated") === "true";
  const sellerId = localStorage.getItem("seller_id");
  const sellerName = localStorage.getItem("seller_name");
  const isSuperAdmin = localStorage.getItem("is_super_admin") === "true";

  // Redirect if not seller
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
      // If super admin, get all products; otherwise get seller's products
      const url = isSuperAdmin 
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/seller/${sellerId}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const canEditProduct = (product) => {
    return isSuperAdmin || product.sellerId === sellerId;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.originalPrice || !formData.image) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: parseInt(formData.price),
          originalPrice: parseInt(formData.originalPrice),
          image: formData.image,
          sellerId: sellerId,
          sellerName: sellerName,
          description: "",
          stock: 0
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setFormData({
        name: "",
        price: "",
        originalPrice: "",
        category: "Lehenga",
        image: ""
      });
      setImagePreview(null);

      fetchProducts();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
        setEditFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startEdit = (product) => {
    if (!canEditProduct(product)) {
      alert("You don't have permission to edit this product");
      return;
    }
    setEditingId(product._id);
    setEditFormData({ ...product });
    setEditImagePreview(product.image);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
    setEditImagePreview(null);
  };

  const saveEdit = async () => {
    if (!editFormData.name || !editFormData.price || !editFormData.originalPrice) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: editFormData.name,
          category: editFormData.category,
          price: parseInt(editFormData.price),
          originalPrice: parseInt(editFormData.originalPrice),
          image: editFormData.image,
          description: editFormData.description || "",
          stock: editFormData.stock || 0,
          sellerId: sellerId,
          isSuperAdmin: isSuperAdmin
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update product");
      }

      cancelEdit();
      fetchProducts();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product: " + error.message);
    }
  };

  const deleteProduct = async (productId, product) => {
    if (!canEditProduct(product)) {
      alert("You don't have permission to delete this product");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sellerId: sellerId,
          isSuperAdmin: isSuperAdmin
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete product");
      }

      fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + error.message);
    }
  };

  if (!isSeller) {
    return null;
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 style={{ color: "#2C4F3E", marginBottom: "5px" }}>🛍️ Product Management Dashboard</h1>
          <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
            {isSuperAdmin ? "🔑 Super Admin" : "👤 Seller"} • {sellerName}
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("seller_authenticated");
            localStorage.removeItem("seller_id");
            localStorage.removeItem("seller_name");
            localStorage.removeItem("seller_email");
            localStorage.removeItem("seller_role");
            localStorage.removeItem("is_super_admin");
            navigate("/");
          }}
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={e => e.target.style.background = "#ff5252"}
          onMouseLeave={e => e.target.style.background = "#ff6b6b"}
        >
          🚪 Logout
        </button>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: window.innerWidth <= 1024 ? "1fr" : "1fr 1fr", 
        gap: "30px", 
        marginBottom: "40px" 
      }}>
        
        <div style={{ background: "#fff", borderRadius: "12px", padding: "30px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2C4F3E", marginBottom: "25px", fontSize: "20px" }}>➕ Add New Product</h2>
        
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Red Silk Embroidered Lehenga"
                  required
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Sale Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  required
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Original Price (₹) *</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="e.g., 20000"
                  required
                  style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "12px", color: "#333" }}>Product Image * (Required)</label>

              {imagePreview && (
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "2px solid var(--accent)" }} />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: "" }));
                    }}
                    style={{ display: "block", marginTop: "8px", padding: "6px 12px", fontSize: "12px", background: "#ff6b6b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                  >
                    Remove Image
                  </button>
                </div>
              )}

              {!imagePreview && (
                <label
                  style={{
                    display: "block", padding: "30px", border: "2px dashed var(--accent)", borderRadius: "8px",
                    textAlign: "center", cursor: "pointer", background: "#fafafa", transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fff3cd"; e.currentTarget.style.borderColor = "#c9860f"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                >
                  <input type="file" accept="image/*" onChange={handleImageUpload} required style={{ display: "none" }} />
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>📸</div>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#333", margin: "0 0 6px 0" }}>Click to Upload Product Image</p>
                  <p style={{ fontSize: "12px", color: "#999", margin: "0" }}>Supports JPG, PNG, GIF, WebP</p>
                </label>
              )}
            </div>

            <button
              type="submit"
              style={{ width: "100%", padding: "14px", fontSize: "16px", fontWeight: "600", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#c9860f"}
              onMouseLeave={e => e.target.style.background = "var(--accent)"}
            >
              ✅ Add Product to Catalog
            </button>
          </form>
        </div>

        <div style={{ background: "#fff", borderRadius: "12px", padding: "30px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <h2 style={{ color: "#2C4F3E", marginBottom: "0", fontSize: "20px" }}>📦 Your Products ({products.length})</h2>
            {products.length > 0 && (
              <button
                onClick={fetchProducts}
                style={{ padding: "8px 14px", fontSize: "12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                onMouseEnter={e => e.target.style.background = "#45a049"}
                onMouseLeave={e => e.target.style.background = "#4CAF50"}
              >
                🔄 Refresh
              </button>
            )}
          </div>

          {loading && <div style={{ textAlign: "center", padding: "40px 20px" }}><p style={{ fontSize: "16px", color: "#666", margin: "0" }}>⏳ Loading products...</p></div>}

          {!loading && products.length > 0 ? (
            <div style={{ overflowX: "auto", maxHeight: "600px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#2C4F3E", borderBottom: "2px solid #1a2f28", color: "#fff" }}>
                    <th style={{ padding: "14px", textAlign: "left", fontWeight: "700", fontSize: "13px" }}>Product</th>
                    <th style={{ padding: "14px", textAlign: "left", fontWeight: "700", fontSize: "13px" }}>Seller</th>
                    <th style={{ padding: "14px", textAlign: "left", fontWeight: "700", fontSize: "13px" }}>Category</th>
                    <th style={{ padding: "14px", textAlign: "left", fontWeight: "700", fontSize: "13px" }}>Price</th>
                    <th style={{ padding: "14px", textAlign: "center", fontWeight: "700", fontSize: "13px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const canEdit = canEditProduct(product);
                    return (
                      <tr key={product._id} style={{ borderBottom: "1px solid #eee", transition: "background-color 0.2s", opacity: canEdit ? 1 : 0.7 }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >
                        <td style={{ padding: "12px" }}>
                          <img src={product.image} alt={product.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px", marginRight: "8px", display: "inline-block", verticalAlign: "middle" }} />
                          <span style={{ verticalAlign: "middle" }}>{product.name}</span>
                        </td>
                        <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>{product.sellerName}</td>
                        <td style={{ padding: "12px" }}>{product.category}</td>
                        <td style={{ padding: "12px", fontWeight: "600", color: "var(--accent)" }}>₹{product.price}</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          {canEdit ? (
                            <>
                              <button onClick={() => startEdit(product)} style={{ padding: "8px 12px", fontSize: "12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "700", marginRight: "6px", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.target.style.background = "#45a049"; e.target.style.transform = "scale(1.05)"; }}
                                onMouseLeave={e => { e.target.style.background = "#4CAF50"; e.target.style.transform = "scale(1)"; }}
                              >✏️ Edit</button>
                              <button onClick={() => deleteProduct(product._id, product)} style={{ padding: "8px 12px", fontSize: "12px", background: "#ff6b6b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "700", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.target.style.background = "#ff5252"; e.target.style.transform = "scale(1.05)"; }}
                                onMouseLeave={e => { e.target.style.background = "#ff6b6b"; e.target.style.transform = "scale(1)"; }}
                              >🗑️ Delete</button>
                            </>
                          ) : (<span style={{ fontSize: "12px", color: "#999" }}>View Only</span>)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : !loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <p style={{ fontSize: "16px", color: "#999", margin: "0" }}>📭 No products yet. Add one from the left side!</p>
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a href="/" style={{ display: "inline-block", padding: "12px 24px", background: "var(--accent)", color: "#fff", textDecoration: "none", borderRadius: "4px", fontWeight: "600", fontSize: "14px" }}>
          ← Back to Home
        </a>
      </div>

      {editingId && editFormData && (
        <div style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "1000", padding: "20px" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ color: "#2C4F3E", marginBottom: "25px" }}>✏️ Edit Product</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Product Name *</label>
                <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Category *</label>
                <select name="category" value={editFormData.category} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }}>
                  {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Sale Price (₹) *</label>
                <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>Original Price (₹) *</label>
                <input type="number" name="originalPrice" value={editFormData.originalPrice} onChange={handleEditChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "12px", color: "#333" }}>Product Image</label>
              {editImagePreview && (
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <img src={editImagePreview} alt="Preview" style={{ maxWidth: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "2px solid var(--accent)" }} />
                  <button type="button" onClick={() => { setEditImagePreview(null); setEditFormData(prev => ({ ...prev, image: "" })); }} style={{ display: "block", marginTop: "8px", padding: "6px 12px", fontSize: "12px", background: "#ff6b6b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600", margin: "8px auto 0 auto" }}>Remove Image</button>
                </div>
              )}
              {!editImagePreview && (
                <label style={{ display: "block", padding: "30px", border: "2px dashed var(--accent)", borderRadius: "8px", textAlign: "center", cursor: "pointer", background: "#fafafa", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fff3cd"; e.currentTarget.style.borderColor = "#c9860f"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                >
                  <input type="file" accept="image/*" onChange={handleEditImageUpload} style={{ display: "none" }} />
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>📸</div>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#333", margin: "0 0 6px 0" }}>Click to Upload New Image</p>
                  <p style={{ fontSize: "12px", color: "#999", margin: "0" }}>Supports JPG, PNG, GIF, WebP</p>
                </label>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={saveEdit} style={{ flex: 1, padding: "12px", fontSize: "16px", fontWeight: "600", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#c9860f"}
                onMouseLeave={e => e.target.style.background = "var(--accent)"}
              >✅ Save Changes</button>
              <button onClick={cancelEdit} style={{ flex: 1, padding: "12px", fontSize: "16px", fontWeight: "600", background: "#ddd", color: "#333", border: "none", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#ccc"}
                onMouseLeave={e => e.target.style.background = "#ddd"}
              >❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
