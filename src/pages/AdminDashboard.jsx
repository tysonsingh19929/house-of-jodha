import { useState } from "react";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "Lehenga",
    image: "👗",
    imageType: "emoji" // 'emoji' or 'upload'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const categories = ["Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];
  const imageEmojis = ["👗", "👚", "🧥", "💃"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imageType: "upload"
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    
    // Create new product with unique ID
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseInt(formData.price),
      originalPrice: parseInt(formData.originalPrice)
    };

    // Add to localStorage
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    // Reset form
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      category: "Lehenga",
      image: "👗",
      imageType: "emoji"
    });
    setImagePreview(null);

    alert("Product added successfully! Refresh the page to see it in the catalog.");
  };

  // Get custom products from localStorage
  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");

  const deleteProduct = (id) => {
    const updated = customProducts.filter(p => p.id !== id);
    localStorage.setItem("customProducts", JSON.stringify(updated));
    alert("Product deleted!");
    window.location.reload();
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#2C4F3E", marginBottom: "40px" }}>
        🛍️ Product Management Dashboard
      </h1>

      {/* Add Product Form */}
      <div style={{ background: "#fff", borderRadius: "8px", padding: "30px", marginBottom: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#2C4F3E", marginBottom: "25px" }}>Add New Product</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {/* Product Name */}
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Red Silk Embroidered Lehenga"
                required
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

            {/* Category */}
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sale Price */}
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Sale Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 15000"
                required
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

            {/* Original Price */}
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Original Price (₹) *
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="e.g., 20000"
                required
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

          {/* Image Selection - Emoji or Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "12px", color: "#333" }}>
              Product Image *
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div style={{ marginBottom: "15px", textAlign: "center" }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: "150px", 
                    height: "150px", 
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid var(--accent)"
                  }} 
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: "👗", imageType: "emoji" }));
                  }}
                  style={{
                    display: "block",
                    marginTop: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    background: "#ff6b6b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* Emoji Selection */}
            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Choose Emoji:</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {imageEmojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image: emoji, imageType: "emoji" }));
                      setImagePreview(null);
                    }}
                    style={{
                      fontSize: "32px",
                      padding: "10px 14px",
                      border: (formData.imageType === "emoji" && formData.image === emoji) ? "3px solid var(--accent)" : "2px solid #ddd",
                      borderRadius: "8px",
                      background: (formData.imageType === "emoji" && formData.image === emoji) ? "#fff3cd" : "#fff",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Or Upload Image:</p>
              <label
                style={{
                  display: "block",
                  padding: "20px",
                  border: "2px dashed var(--accent)",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#fafafa",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#fff3cd";
                  e.currentTarget.style.borderColor = "#c9860f";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>📸</div>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#333", margin: "0 0 4px 0" }}>
                  Click to Upload Image
                </p>
                <p style={{ fontSize: "11px", color: "#999", margin: "0" }}>
                  Supports JPG, PNG, GIF, WebP
                </p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#c9860f"}
            onMouseLeave={e => e.target.style.background = "var(--accent)"}
          >
            ✅ Add Product to Catalog
          </button>
        </form>
      </div>

      {/* Custom Products List */}
      {customProducts.length > 0 && (
        <div style={{ background: "#fff", borderRadius: "8px", padding: "30px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2C4F3E", marginBottom: "25px" }}>
            Your Custom Products ({customProducts.length})
          </h2>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Product</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Sale Price</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Original Price</th>
                  <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {customProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>
                      {product.imageType === "upload" ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginRight: "8px",
                            display: "inline-block",
                            verticalAlign: "middle"
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "20px", marginRight: "8px", display: "inline-block" }}>{product.image}</span>
                      )}
                      <span style={{ verticalAlign: "middle" }}>{product.name}</span>
                    </td>
                    <td style={{ padding: "12px" }}>{product.category}</td>
                    <td style={{ padding: "12px", fontWeight: "600", color: "var(--accent)" }}>₹{product.price}</td>
                    <td style={{ padding: "12px", color: "#999", textDecoration: "line-through" }}>₹{product.originalPrice}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          background: "#ff6b6b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                        onMouseEnter={e => e.target.style.background = "#ff5252"}
                        onMouseLeave={e => e.target.style.background = "#ff6b6b"}
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
      )}

      {/* Back to Home */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "var(--accent)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
