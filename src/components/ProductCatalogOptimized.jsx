import { useState, useEffect, useMemo, memo } from "react";
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

        {/* Inquire this button with WhatsApp icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const message = `Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
          style={{
            width: "100%",
            padding: isMobile ? "6px" : "8px",
            fontSize: isMobile ? "12px" : "13px",
            background: "rgba(37, 211, 102, 0.25)", // Darker greenish semi-transparent background
            backdropFilter: "blur(8px)", // Blur effect
            color: "#000",
            border: "1px solid rgba(0, 102, 51, 0.9)", // Dark green border
            borderRadius: "20px", // Rounded corners
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            marginTop: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(37, 211, 102, 0.2)"; // Slightly more opaque on hover
            e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.9)"; // Even darker border on hover
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.7)";
          }}
          title="Inquire via WhatsApp"
        >
          {/* Official WhatsApp Green #25D366 */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Inquire this
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default function ProductCatalogOptimized({ onAddToCart, onRemoveProduct }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProducts, setAddedProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 12; // Show 12 products per page
  const isMobile = window.innerWidth <= 768;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const category = selectedCategory === "All" ? null : selectedCategory;
        const data = await api.getProducts(category);
        setProducts(data);
        setCurrentPage(1); // Reset to page 1 on category change
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
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
