import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products.js";

export default function ProductCatalog({ onAddToCart, onRemoveProduct }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProducts, setAddedProducts] = useState({});

  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
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
    <div id="products" style={{ padding: isMobile ? "24px 12px" : "48px 28px", background: "#FFF0F6" }}>

      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "32px" }}>
        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: isMobile ? "26px" : "36px",
          fontWeight: "700",
          color: "#880E4F",
          margin: "0 0 6px",
        }}>
          Our Collections
        </h2>
        <p style={{ color: "#9C4070", fontSize: isMobile ? "13px" : "14px", margin: 0 }}>
          Handpicked pieces for every occasion
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: isMobile ? "16px" : "28px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: isMobile ? "7px 14px" : "9px 20px",
              fontSize: isMobile ? "11px" : "13px",
              background: selectedCategory === cat
                ? "linear-gradient(135deg, #E91E63, #C2185B)"
                : "#fff",
              color: selectedCategory === cat ? "#fff" : "#C2185B",
              border: selectedCategory === cat ? "none" : "1.5px solid #F48FB1",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s",
              boxShadow: selectedCategory === cat ? "0 2px 12px rgba(233,30,99,0.35)" : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count badge */}
      <div style={{
        background: "#FCE4EC",
        border: "1px solid #F48FB1",
        borderRadius: "4px",
        padding: isMobile ? "8px 12px" : "10px 16px",
        marginBottom: isMobile ? "16px" : "24px",
        fontSize: isMobile ? "12px" : "13px",
        fontWeight: "600",
        textAlign: "center",
        color: "#880E4F",
      }}>
        ✨ {filteredProducts.length} {selectedCategory} products available
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "12px" : "16px",
        width: "100%",
      }}>
        {filteredProducts.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid rgba(244,143,177,0.25)",
                transition: "all 0.25s",
                position: "relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(194,24,91,0.18)";
                e.currentTarget.style.borderColor = "#E91E63";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(244,143,177,0.25)";
              }}
            >
              {/* Image Container */}
              <div style={{
                background: "linear-gradient(135deg, #FCE4EC 0%, #FFF0F6 100%)",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                {typeof product.image === "string" && (product.image.startsWith("http") || product.image.startsWith("data:") || product.image.startsWith("/")) ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: isMobile ? "48px" : "60px" }}>{product.image}</span>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                  <div style={{
                    position: "absolute", top: "8px", left: "8px",
                    background: "#C2185B",
                    color: "#fff",
                    fontSize: "10px", fontWeight: "700",
                    padding: "3px 8px", borderRadius: "3px",
                  }}>
                    {discount}% OFF
                  </div>
                )}

                {/* Wishlist */}
                <button
                  style={{
                    position: "absolute", top: "8px", right: "8px",
                    background: "#fff", border: "none",
                    width: "30px", height: "30px",
                    borderRadius: "50%", cursor: "pointer",
                    fontSize: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                  }}
                  onClick={e => e.stopPropagation()}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  ♡
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: isMobile ? "8px 10px 10px" : "10px 12px 12px" }}>
                <div style={{
                  fontSize: "9px", color: "#E91E63",
                  textTransform: "uppercase", fontWeight: "700",
                  letterSpacing: "1px", marginBottom: "3px",
                }}>
                  {product.category}
                </div>

                <h3 style={{
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: "600", color: "#1A0010",
                  marginBottom: "4px", lineHeight: "1.4",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {product.name}
                </h3>

                <div style={{ fontSize: isMobile ? "11px" : "12px", marginBottom: "5px", color: "#E91E63" }}>
                  ⭐ 4.3 <span style={{ color: "#bbb", fontSize: "10px" }}>(2.2k)</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: isMobile ? "8px" : "10px" }}>
                  <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "700", color: "#880E4F" }}>
                    ₹{product.price}
                  </span>
                  <span style={{ fontSize: isMobile ? "10px" : "12px", color: "#bbb", textDecoration: "line-through" }}>
                    ₹{product.originalPrice}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#E91E63" }}>
                    ({discount}%)
                  </span>
                </div>

                {/* Add to Cart / Quantity Controls */}
                {addedProducts[product.id] ? (
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <button
                      onClick={e => { e.stopPropagation(); handleDecreaseQuantity(product); }}
                      style={{
                        flex: 1, padding: isMobile ? "5px" : "7px",
                        background: "linear-gradient(135deg,#E91E63,#C2185B)",
                        color: "#fff", border: "none", borderRadius: "3px",
                        cursor: "pointer", fontWeight: "700", fontSize: "14px",
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      flex: 1, textAlign: "center",
                      fontSize: isMobile ? "12px" : "13px",
                      fontWeight: "700", color: "#C2185B",
                    }}>
                      {addedProducts[product.id]}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); handleIncreaseQuantity(product); }}
                      style={{
                        flex: 1, padding: isMobile ? "5px" : "7px",
                        background: "linear-gradient(135deg,#E91E63,#C2185B)",
                        color: "#fff", border: "none", borderRadius: "3px",
                        cursor: "pointer", fontWeight: "700", fontSize: "14px",
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); handleAddProduct(product); }}
                    style={{
                      width: "100%",
                      padding: isMobile ? "7px" : "9px",
                      fontSize: isMobile ? "11px" : "12px",
                      background: "linear-gradient(90deg, #E91E63, #C2185B)",
                      color: "#fff", border: "none", borderRadius: "3px",
                      cursor: "pointer", fontWeight: "700",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
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

      {/* Product Grid - 2 columns on mobile, 4 on desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "12px" : "16px",
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecreaseQuantity(product);
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncreaseQuantity(product);
                      }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddProduct(product);
                    }}
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