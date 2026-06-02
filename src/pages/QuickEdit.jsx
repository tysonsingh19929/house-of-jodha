import { useState } from "react";

export default function QuickEdit() {
  const [products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Load products from localStorage on mount
  const handleLoadProducts = () => {
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(saved);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm(product);
    setShowEdit(true);
  };

  const handleSave = () => {
    const updated = products.map(p => 
      p.id === editingProduct.id ? editForm : p
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setShowEdit(false);
    alert("Product updated!");
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    alert("Product deleted!");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#2C4F3E", marginBottom: "20px" }}>📝 Quick Product Editor</h1>

      <button
        onClick={handleLoadProducts}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "600",
          marginBottom: "30px"
        }}
      >
        Load Products
      </button>

      {products.length > 0 && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2C4F3E", marginBottom: "20px", fontSize: "18px" }}>
            Products ({products.length})
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #2C4F3E" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Image</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Price</th>
                  <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                      />
                    </td>
                    <td style={{ padding: "12px" }}>{product.name}</td>
                    <td style={{ padding: "12px" }}>{product.category}</td>
                    <td style={{ padding: "12px", fontWeight: "600", color: "var(--accent)" }}>₹{product.price}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => handleEdit(product)}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          background: "#4CAF50",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "600",
                          marginRight: "8px"
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          background: "#ff6b6b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showEdit && editingProduct && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1000",
          padding: "20px"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h2 style={{ color: "#2C4F3E", marginBottom: "25px" }}>✏️ Edit Product</h2>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Product Name
              </label>
              <input
                type="text"
                value={editForm.name || ""}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Category
              </label>
              <input
                type="text"
                value={editForm.category || ""}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                  Sale Price (₹)
                </label>
                <input
                  type="number"
                  value={editForm.price || ""}
                  onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={editForm.originalPrice || ""}
                  onChange={(e) => setEditForm({ ...editForm, originalPrice: parseInt(e.target.value) })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Description
              </label>
              <textarea
                value={editForm.description || ""}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  minHeight: "100px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                ✅ Save
              </button>
              <button
                onClick={() => setShowEdit(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "#ddd",
                  color: "#333",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
