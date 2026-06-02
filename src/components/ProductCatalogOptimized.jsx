import { useState, useEffect, useMemo, memo } from "react";
import WhatsAppInquiryButton from "./WhatsAppInquiryButton.jsx";
import { api } from "../services/api.js";

// Memoized product card to prevent unnecessary re-renders
const ProductCard = memo(({ product, onAddToCart, onRemoveProduct, addedProducts, handleAddProduct, handleIncreaseQuantity, handleDecreaseQuantity, isMobile }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        position: "relative"
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)"}
    >
      {/* Image Container with Lazy Loading */}
      <div style={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        )}
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
        <div style={{ fontSize: "10px", color: "#999", marginBottom: "3px", textTransform: "uppercase", fontWeight: "600" }}>
          {product.category}
        </div>

        <h3 style={{
          fontSize: isMobile ? "11px" : "13px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "4px",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {product.name}
        </h3>

        <div style={{ fontSize: isMobile ? "11px" : "12px", marginBottom: "4px", color: "#ff6b6b" }}>
          ⭐ 4.3 ★ <span style={{ color: "#999", fontSize: "10px" }}>(2.2k)</span>
        </div>

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

        {addedProducts[product.id] ? (
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
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
            Buy Now
          </button>
        )}

        <WhatsAppInquiryButton
          message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
          buttonStyle={{
            width: "100%",
            padding: isMobile ? "6px" : "8px",
            fontSize: isMobile ? "12px" : "13px",
            marginTop: "6px",
          }}
        />
      </div>
    </div>
  );
});

export default function ProductCatalogOptimized({ onAddToCart, onRemoveProduct }) {
  const isMobile = window.innerWidth <= 768;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedProducts, setAddedProducts] = useState({});
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProducts();
        if (selectedCategory === "All") {
          setProducts(data);
        } else {
          setProducts(data.filter(p => p.category === selectedCategory));
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];

  // Pagination
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddProduct = (product) => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentQty = addedProducts[product.id] || addedProducts[product._id] || 0;
    if (currentQty >= stock) {
      alert(`Only ${stock} unit(s) available in stock.`);
      return;
    }
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentQty = addedProducts[product.id] || addedProducts[product._id] || 0;
    if (currentQty >= stock) {
      alert(`Only ${stock} unit(s) available in stock.`);
      return;
    }
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
        const updated = { ...prev };
        delete updated[product.id];
        onRemoveProduct?.(product.id);
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };

  const gridCols = isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  if (error) {
    return <div style={{ padding: "30px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "30px 20px", width: "100%", background: "#f5f5f5" }}>
      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
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

      <div style={{ padding: "15px", background: "#fff3cd", borderRadius: "4px", marginBottom: "30px", fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
        ✨ {products.length} {selectedCategory} products
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#999" }}>
          Loading products... ⏳
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: "12px",
            width: "100%",
            marginBottom: "30px"
          }}>
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={onAddToCart}
                onRemoveProduct={onRemoveProduct}
                addedProducts={addedProducts}
                handleAddProduct={handleAddProduct}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "30px",
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "10px 15px",
                  background: currentPage === 1 ? "#ddd" : "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontWeight: "600"
                }}
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: "10px 15px",
                    background: currentPage === page ? "var(--accent)" : "#fff",
                    color: currentPage === page ? "#fff" : "#666",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: currentPage === page ? "600" : "400"
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "10px 15px",
                  background: currentPage === totalPages ? "#ddd" : "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontWeight: "600"
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
