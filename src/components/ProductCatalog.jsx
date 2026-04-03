import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products.js";

const PRODUCTS_PER_PAGE = 12;

export default function ProductCatalog({ onAddToCart, onRemoveProduct, addToWishlist, removeFromWishlist, isInWishlist }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedProducts, setAddedProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
  const allProducts = [...products, ...customProducts];
  const isMobile = window.innerWidth <= 768;

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];

  const filteredProducts = (selectedCategory === "All"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory));

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="products" style={{ padding: isMobile ? "24px 12px" : "48px 28px", background: "#FFF0F6" }}>

      {/* Search Bar — navigates to /search */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: isMobile ? "24px" : "32px" }}>
        <div style={{
          display: "flex", alignItems: "center",
          background: "#fff", borderRadius: "20px",
          padding: "10px 16px", border: "1px solid #e0e0e0",
          gap: "8px",
        }}>
          <span style={{ fontSize: "14px", color: "#999" }}>🔍</span>
          <input
            type="text"
            placeholder="Search for brands and products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, border: "none", background: "transparent",
              fontSize: isMobile ? "13px" : "14px",
              outline: "none", color: "#666", fontFamily: "inherit",
            }}
          />
          {searchQuery.trim() && (
            <button
              type="submit"
              style={{
                background: "#E91E63", color: "#fff",
                border: "none", borderRadius: "12px",
                padding: "4px 12px", fontSize: "12px",
                fontWeight: "600", cursor: "pointer",
              }}
            >
              Go
            </button>
          )}
        </div>
      </form>

      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "32px" }}>
        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: isMobile ? "26px" : "36px",
          fontWeight: "700", color: "#880E4F", margin: "0 0 6px",
        }}>
          Our Collections
        </h2>
        <p style={{ color: "#9C4070", fontSize: isMobile ? "13px" : "14px", margin: 0 }}>
          Handpicked pieces for every occasion
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: "flex", gap: "8px",
        marginBottom: isMobile ? "16px" : "28px",
        justifyContent: "center", flexWrap: "wrap",
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: isMobile ? "7px 14px" : "9px 20px",
              fontSize: isMobile ? "11px" : "13px",
              background: selectedCategory === cat
                ? "linear-gradient(135deg, #E91E63, #C2185B)" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#C2185B",
              border: selectedCategory === cat ? "none" : "1.5px solid #F48FB1",
              borderRadius: "20px", cursor: "pointer", fontWeight: "600",
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
        background: "#FCE4EC", border: "1px solid #F48FB1",
        borderRadius: "4px", padding: isMobile ? "8px 12px" : "10px 16px",
        marginBottom: isMobile ? "16px" : "24px",
        fontSize: isMobile ? "12px" : "13px",
        fontWeight: "600", textAlign: "center", color: "#880E4F",
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
        {paginatedProducts.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                background: "#fff", borderRadius: "8px",
                overflow: "hidden", cursor: "pointer",
                border: "1px solid rgba(244,143,177,0.25)",
                transition: "all 0.25s", position: "relative",
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
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
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
                    background: "#C2185B", color: "#fff",
                    fontSize: "10px", fontWeight: "700",
                    padding: "3px 8px", borderRadius: "3px",
                  }}>
                    {discount}% OFF
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist && isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  style={{
                    position: "absolute", top: "8px", right: "8px",
                    background: isInWishlist && isInWishlist(product.id) ? "#E91E63" : "#fff",
                    border: "none", width: "32px", height: "32px",
                    borderRadius: "50%", cursor: "pointer", fontSize: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "all 0.2s",
                    color: isInWishlist && isInWishlist(product.id) ? "#fff" : "#E91E63",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  title={isInWishlist && isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  {isInWishlist && isInWishlist(product.id) ? "♥" : "♡"}
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
                    >−</button>
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
                    >+</button>
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); handleAddProduct(product); }}
                    style={{
                      width: "100%", padding: isMobile ? "7px" : "9px",
                      fontSize: isMobile ? "11px" : "12px",
                      background: "linear-gradient(90deg, #E91E63, #C2185B)",
                      color: "#fff", border: "none", borderRadius: "3px",
                      cursor: "pointer", fontWeight: "700", transition: "opacity 0.2s",
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", gap: "8px",
          marginTop: isMobile ? "24px" : "36px",
          flexWrap: "wrap",
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? "7px 14px" : "9px 18px",
              fontSize: isMobile ? "12px" : "13px",
              background: currentPage === 1 ? "#f5f5f5" : "linear-gradient(135deg, #E91E63, #C2185B)",
              color: currentPage === 1 ? "#bbb" : "#fff",
              border: "none", borderRadius: "20px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontWeight: "600", transition: "all 0.2s",
            }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                width: isMobile ? "32px" : "38px",
                height: isMobile ? "32px" : "38px",
                borderRadius: "50%",
                border: page === currentPage ? "none" : "1.5px solid #F48FB1",
                background: page === currentPage
                  ? "linear-gradient(135deg, #E91E63, #C2185B)" : "#fff",
                color: page === currentPage ? "#fff" : "#C2185B",
                cursor: "pointer", fontWeight: "700",
                fontSize: isMobile ? "12px" : "13px",
                transition: "all 0.2s",
                boxShadow: page === currentPage ? "0 2px 10px rgba(233,30,99,0.35)" : "none",
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: isMobile ? "7px 14px" : "9px 18px",
              fontSize: isMobile ? "12px" : "13px",
              background: currentPage === totalPages ? "#f5f5f5" : "linear-gradient(135deg, #E91E63, #C2185B)",
              color: currentPage === totalPages ? "#bbb" : "#fff",
              border: "none", borderRadius: "20px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontWeight: "600", transition: "all 0.2s",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{
          textAlign: "center", marginTop: "12px",
          fontSize: isMobile ? "11px" : "12px", color: "#9C4070",
        }}>
          Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
        </div>
      )}
    </div>
  );
}
