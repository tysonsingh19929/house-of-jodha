import { useState, useRef } from "react";


export default function AddProductWizard({ API_BASE_URL, fetchProducts, sellerId, sellerName, isSuperAdmin }) {
  const [mode, setMode] = useState("single"); // 'single' or 'bulk'
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  
  // Single Product State
  const [formData, setFormData] = useState({
    name: "", category: "Lehenga", description: "", occasions: "", videoUrl: "",
    basePrice: "", baseOriginalPrice: ""
  });
  
  // EAV Attributes
  const [attributes, setAttributes] = useState([
    { key: "Brand", value: sellerName || "MS Retail" },
    { key: "Material", value: "" },
    { key: "Fit", value: "" }
  ]);

  // Variants
  const [variants, setVariants] = useState([]);
  
  // Images
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Bulk Upload State
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkProgress, setBulkProgress] = useState("");
  const fileInputRef = useRef(null);

  const categories = ["Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara", "Necklaces", "Earrings", "Rings", "Bracelets", "Bridal Sets", "Co-ords", "Dresses", "Footwear"];

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  // Base64 Image Compression
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/webp", 0.7);
          setImagePreviews(prev => [...prev, compressed]);
          setImages(prev => [...prev, compressed]);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(p => p.filter((_, i) => i !== index));
    setImages(p => p.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { sku: `SKU-${Date.now().toString().slice(-6)}`, size: "", color: "", price: formData.basePrice || 0, originalPrice: formData.baseOriginalPrice || 0, stock: 10 }]);
  };

  const updateVariant = (index, field, value) => {
    const newV = [...variants];
    newV[index][field] = value;
    setVariants(newV);
  };

  const removeVariant = (index) => setVariants(v => v.filter((_, i) => i !== index));

  const addAttribute = () => setAttributes([...attributes, { key: "", value: "" }]);
  const updateAttribute = (index, field, value) => {
    const newA = [...attributes];
    newA[index][field] = value;
    setAttributes(newA);
  };
  const removeAttribute = (index) => setAttributes(a => a.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!formData.name || !formData.basePrice) return alert("Please fill required fields (Name, Price).");
    if (images.length === 0) return alert("Please upload at least one image.");
    
    try {
      setIsSaving(true);
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        occasions: formData.occasions.split(',').map(s => s.trim()),
        videoUrl: formData.videoUrl,
        price: Number(formData.basePrice),
        originalPrice: Number(formData.baseOriginalPrice || formData.basePrice),
        image: images[0],
        images: images,
        attributes: attributes.filter(a => a.key && a.value),
        variants: variants.map(v => ({...v, price: Number(v.price), originalPrice: Number(v.originalPrice), stock: Number(v.stock)})),
        sellerId: sellerId || 'admin',
        sellerName: sellerName || 'MS Retail'
      };

      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Product added successfully!");
        setFormData({ name: "", category: "Lehenga", description: "", occasions: "", videoUrl: "", basePrice: "", baseOriginalPrice: "" });
        setAttributes([{ key: "Brand", value: sellerName || "MS Retail" }, { key: "Material", value: "" }, { key: "Fit", value: "" }]);
        setVariants([]);
        setImages([]); setImagePreviews([]);
        setStep(1);
        fetchProducts();
      } else {
        const err = await res.json();
        alert("Error adding product: " + err.message);
      }
    } catch (e) {
      alert("Error adding product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) return alert("Please select an Excel or CSV file first.");
    const fData = new FormData();
    fData.append("file", bulkFile);
    fData.append("sellerId", sellerId || "admin");
    fData.append("sellerName", sellerName || "MS Retail");
    
    try {
      setBulkProgress("Uploading and processing file...");
      const res = await fetch(`${API_BASE_URL}/bulk-upload`, {
        method: "POST",
        body: fData
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Successfully imported ${data.count} products!`);
        fetchProducts();
        setBulkFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        alert("Bulk upload failed: " + data.message);
      }
    } catch (e) {
      alert("Error during bulk upload. Make sure backend route is working.");
    } finally {
      setBulkProgress("");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #eaeaea", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Mode Toggle */}
      <div style={{ display: "flex", borderBottom: "1px solid #eaeaea" }}>
        <button 
          onClick={() => setMode("single")} 
          style={{ flex: 1, padding: "16px", backgroundColor: mode === "single" ? "#FAFAFA" : "#fff", border: "none", borderBottom: mode === "single" ? "3px solid #D4AF37" : "3px solid transparent", fontSize: "16px", fontWeight: "600", color: mode === "single" ? "#0f172a" : "#64748b", cursor: "pointer", transition: "all 0.2s" }}
        >
          Single Upload Wizard
        </button>
        <button 
          onClick={() => setMode("bulk")} 
          style={{ flex: 1, padding: "16px", backgroundColor: mode === "bulk" ? "#FAFAFA" : "#fff", border: "none", borderBottom: mode === "bulk" ? "3px solid #D4AF37" : "3px solid transparent", fontSize: "16px", fontWeight: "600", color: mode === "bulk" ? "#0f172a" : "#64748b", cursor: "pointer", transition: "all 0.2s" }}
        >
          Bulk Upload (Excel/CSV)
        </button>
      </div>

      <div style={{ padding: "24px" }}>
        {mode === "bulk" ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h3 style={{ fontSize: "20px", color: "#0f172a", margin: "0 0 16px 0" }}>Upload Bulk Catalog (Excel/CSV)</h3>
            <p style={{ color: "#64748b", marginBottom: "24px", maxWidth: "600px", margin: "0 auto 24px", lineHeight: "1.5" }}>
              Save time by uploading your standard product listing template. The system will automatically map parent products, SKUs, and dynamic attributes.
            </p>
            
            <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", padding: "40px", backgroundColor: "#f8fafc", maxWidth: "500px", margin: "0 auto", marginBottom: "24px" }}>
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".xlsx, .xls, .csv" 
                onChange={(e) => setBulkFile(e.target.files[0])} 
                style={{ marginBottom: "16px" }}
              />
              {bulkFile && <p style={{ color: "#10b981", fontWeight: "600", marginTop: "16px" }}>Selected: {bulkFile.name}</p>}
            </div>

            <button 
              onClick={handleBulkUpload} 
              disabled={!!bulkProgress}
              style={{ backgroundColor: "#D4AF37", color: "#fff", padding: "14px 32px", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: bulkProgress ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)" }}
            >
              {bulkProgress || "Import Catalog"}
            </button>
          </div>
        ) : (
          <div>
            {/* Wizard Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", backgroundColor: "#e2e8f0", zIndex: 0 }} />
              {[1, 2, 3, 4].map(num => (
                <div key={num} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: step >= num ? "#0f172a" : "#f1f5f9", color: step >= num ? "#fff" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", border: step >= num ? "none" : "2px solid #e2e8f0", transition: "all 0.3s" }}>
                    {num}
                  </div>
                  <span style={{ fontSize: "12px", marginTop: "8px", color: step >= num ? "#0f172a" : "#94a3b8", fontWeight: "600", display: window.innerWidth < 600 ? "none" : "block" }}>
                    {num === 1 ? "Basics" : num === 2 ? "Attributes" : num === 3 ? "Variants" : "Media"}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Basics */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s" }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Product Basics</h3>
                <div>
                  <label style={labelStyle}>Product Title *</label>
                  <input style={inputStyle} type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Elegant Red Silk Saree" />
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Category *</label>
                    <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Occasions (Comma Separated)</label>
                    <input style={inputStyle} type="text" value={formData.occasions} onChange={e => setFormData({...formData, occasions: e.target.value})} placeholder="Wedding, Reception" />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Base Price (₹) *</label>
                    <input style={inputStyle} type="number" value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: e.target.value})} placeholder="Selling Price" />
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Base MRP (₹)</label>
                    <input style={inputStyle} type="number" value={formData.baseOriginalPrice} onChange={e => setFormData({...formData, baseOriginalPrice: e.target.value})} placeholder="Original Price" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{...inputStyle, height: "100px", resize: "vertical"}} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Write a compelling description..." />
                </div>
              </div>
            )}

            {/* Step 2: Attributes */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s" }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Dynamic Attributes</h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Define category-specific features like Fabric, Work, Pattern, or Care Instructions. This acts like a spec sheet.</p>
                
                {attributes.map((attr, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <input style={{...inputStyle, flex: "1 1 120px"}} type="text" placeholder="e.g. Fabric" value={attr.key} onChange={e => updateAttribute(i, "key", e.target.value)} />
                    <input style={{...inputStyle, flex: "2 1 200px"}} type="text" placeholder="e.g. Pure Georgette" value={attr.value} onChange={e => updateAttribute(i, "value", e.target.value)} />
                    <button onClick={() => removeAttribute(i)} style={{ backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", width: "40px", height: "40px", cursor: "pointer", fontWeight: "bold" }}>X</button>
                  </div>
                ))}
                <button onClick={addAttribute} style={{ alignSelf: "flex-start", padding: "10px 16px", backgroundColor: "#f1f5f9", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>+ Add Attribute</button>
              </div>
            )}

            {/* Step 3: Variants */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s" }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Product Variants (SKUs)</h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Add size and color combinations. If you don't add variants, we'll just use the Base Price for the item.</p>

                {variants.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                    <p style={{ color: "#94a3b8", marginBottom: "16px" }}>No variants added yet. Selling a one-size item?</p>
                    <button onClick={addVariant} style={{ padding: "10px 24px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>+ Create First Variant</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {variants.map((v, i) => (
                      <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", position: "relative" }}>
                        <button onClick={() => removeVariant(i)} style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "transparent", color: "#ef4444", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "18px" }}>&times;</button>
                        
                        <div style={{ flex: "1 1 100%" }}>
                          <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>SKU ID</label>
                          <input style={{...inputStyle, padding: "8px", fontSize: "14px"}} type="text" value={v.sku} onChange={e => updateVariant(i, "sku", e.target.value)} />
                        </div>
                        <div style={{ flex: "1 1 80px" }}>
                          <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Size</label>
                          <input style={{...inputStyle, padding: "8px", fontSize: "14px"}} type="text" placeholder="S/M/L" value={v.size} onChange={e => updateVariant(i, "size", e.target.value)} />
                        </div>
                        <div style={{ flex: "1 1 80px" }}>
                          <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Color</label>
                          <input style={{...inputStyle, padding: "8px", fontSize: "14px"}} type="text" placeholder="Red" value={v.color} onChange={e => updateVariant(i, "color", e.target.value)} />
                        </div>
                        <div style={{ flex: "1 1 80px" }}>
                          <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Stock</label>
                          <input style={{...inputStyle, padding: "8px", fontSize: "14px"}} type="number" value={v.stock} onChange={e => updateVariant(i, "stock", e.target.value)} />
                        </div>
                        <div style={{ flex: "1 1 90px" }}>
                          <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Price (₹)</label>
                          <input style={{...inputStyle, padding: "8px", fontSize: "14px"}} type="number" value={v.price} onChange={e => updateVariant(i, "price", e.target.value)} />
                        </div>
                      </div>
                    ))}
                    <button onClick={addVariant} style={{ alignSelf: "flex-start", padding: "10px 16px", backgroundColor: "#f1f5f9", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>+ Add Another SKU</button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Media */}
            {step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s" }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Media & Images</h3>
                
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", backgroundColor: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "12px", cursor: "pointer" }}>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} />
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>+ Click to Upload Images</span>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>Supports JPG, PNG, WEBP</span>
                </label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
                  {imagePreviews.map((src, i) => (
                    <div key={i} style={{ position: "relative", width: "120px", height: "120px" }}>
                      <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px", border: "2px solid #e2e8f0" }} />
                      <button onClick={() => removeImage(i)} style={{ position: "absolute", top: "-8px", right: "-8px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>&times;</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #eaeaea" }}>
              <button 
                onClick={handlePrev} 
                disabled={step === 1}
                style={{ padding: "12px 24px", backgroundColor: step === 1 ? "transparent" : "#f1f5f9", color: step === 1 ? "transparent" : "#0f172a", border: "none", borderRadius: "8px", fontWeight: "600", cursor: step === 1 ? "default" : "pointer" }}
              >
                Back
              </button>
              
              {step < 4 ? (
                <button 
                  onClick={handleNext} 
                  style={{ padding: "12px 32px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 12px rgba(15,23,42,0.2)" }}
                >
                  Continue
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSaving}
                  style={{ padding: "12px 32px", backgroundColor: "#D4AF37", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: isSaving ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)" }}
                >
                  {isSaving ? "Publishing..." : "Publish Product"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px 16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "15px", color: "#0f172a", outline: "none", boxSizing: "border-box" };
const labelStyle = { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#334155" };
