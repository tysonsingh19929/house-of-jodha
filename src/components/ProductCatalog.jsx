import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products.js";

export default function ProductCatalog({ onAddToCart, onRemoveProduct }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProducts, setAddedProducts] = useState({});
  
  // Load custom products from localStorage
  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
  
  // Combine hardcoded and custom products
  const allProducts = [...products, ...customProducts];
  
  const isMobile = window.innerWidth <= 768;

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleDecreaseQuantity = (product) => {
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[product.id] || 0) - 1);
      if (newQty === 0) {
        const updated = {...prev};
        delete updated[product.id];
        onRemoveProduct?.(product.id);
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };
  
  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];
  
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const gridCols = isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <div style={{ padding: isMobile ? "15px 12px" : "30px 20px", width: "100%", background: "#f5f5f5" }}>
      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: isMobile ? "15px" : "30px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: isMobile ? "7px 12px" : "10px 20px",
              fontSize: isMobile ? "12px" : "14px",
              background: selectedCategory === cat ? "var(--accent)" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#666",
              border: selectedCategory === cat ? "none" : "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedCategory === cat ? "600" : "500",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ padding: isMobile ? "8px" : "15px", background: "#fff3cd", borderRadius: "4px", marginBottom: isMobile ? "15px" : "30px", fontSize: isMobile ? "12px" : "14px", fontWeight: "600", textAlign: "center" }}>
        ✨ {filteredProducts.length} {selectedCategory} products
      </div>

      {/* Product Grid - 2 columns on mobile, 4 on desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: "12px",
        width: "100%"
      }}>
        {filteredProducts.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                background: "#fff",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                position: "relative"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
              }}
            >
              {/* Image Container */}
              <div style={{
                background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "60px",
                position: "relative",
                overflow: "hidden"
              }}>
                {typeof product.image === "string" && (product.image.startsWith("http") || product.image.startsWith("data:") || product.image.startsWith("/")) ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "60px" }}>{product.image}</span>
                )}
                {/* Wishlist Icon */}
                <button
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#fff",
                    border: "none",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  ♡
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: isMobile ? "8px" : "12px" }}>
                {/* Brand/Category Badge */}
                <div style={{ fontSize: "10px", color: "#999", marginBottom: "3px", textTransform: "uppercase", fontWeight: "600" }}>
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 style={{
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "4px",
                  lineHeight: "1.4",
                  minHeight: "auto",
                  maxHeight: isMobile ? "auto" : "auto",
                  overflow: "visible",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-word"
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div style={{ fontSize: isMobile ? "11px" : "12px", marginBottom: "4px", color: "#ff6b6b" }}>
                  ⭐ 4.3 ★ <span style={{ color: "#999", fontSize: "10px" }}>(2.2k)</span>
                </div>

                {/* Pricing */}
                <div style={{ marginBottom: isMobile ? "8px" : "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "700", color: "#333" }}>
                      ₹{product.price}
                    </span>
                    <span style={{ fontSize: isMobile ? "11px" : "13px", color: "#999", textDecoration: "line-through" }}>
                      ₹{product.originalPrice}
                    </span>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: "600", color: "#ff6b6b" }}>
                      ({discount}%)
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                {addedProducts[product.id] ? (
                  <div style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center"
                  }}>
                    <button
                      onClick={() => handleDecreaseQuantity(product)}
                      style={{
                        flex: 1,
                        padding: isMobile ? "5px" : "6px",
                        fontSize: isMobile ? "12px" : "14px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      −
                    </button>
                    <span style={{ flex: 1, textAlign: "center", fontSize: isMobile ? "11px" : "13px", fontWeight: "600", color: "var(--accent)" }}>
                      {addedProducts[product.id]}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      style={{
                        flex: 1,
                        padding: isMobile ? "5px" : "6px",
                        fontSize: isMobile ? "12px" : "14px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddProduct(product)}
                    style={{
                      width: "100%",
                      padding: isMobile ? "6px" : "8px",
                      fontSize: isMobile ? "12px" : "13px",
                      background: "var(--accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.background = "#c9860f"}
                    onMouseLeave={e => e.target.style.background = "var(--accent)"}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}