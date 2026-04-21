import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppInquiryButton from "./WhatsAppInquiryButton.jsx";
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
    <div id="products" style={{ padding: isMobile ? "40px 16px" : "80px 40px", background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .pc-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(212, 175, 55, 0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          display: flex; flex-direction: column; height: 100%;
        }
        .pc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(212, 175, 55, 0.3);
        }
        .pc-img-wrap {
          position: relative; width: 100%; aspect-ratio: 3/4;
          overflow: hidden; background: #f8f8f8; cursor: pointer;
        }
        .pc-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pc-card:hover .pc-img { transform: scale(1.07); }
        .pc-btn {
          width: 100%; padding: 12px; background: #1a1a1a; color: #fff;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease; display: flex;
          align-items: center; justify-content: center; gap: 6px;
        }
        .pc-btn:hover { background: #333; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .pc-qty-btn {
          flex: 1; padding: 10px; background: #f5f5f5; color: #1a1a1a;
          border: none; border-radius: 8px; cursor: pointer; font-weight: 600;
          font-size: 16px; transition: all 0.2s ease;
        }
        .pc-qty-btn:hover { background: #eaeaea; }
        .pc-badge {
          position: absolute; top: 12px; left: 12px; background: #1a1a1a; color: #D4AF37;
          padding: 6px 12px; border-radius: 30px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(212,175,55,0.3); z-index: 2;
        }
        .pc-wish {
          position: absolute; top: 12px; right: 12px; width: 36px; height: 36px;
          border-radius: 50%; background: rgba(255,255,255,0.9); border: none;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); color: #ccc; backdrop-filter: blur(4px);
        }
        .pc-wish:hover { transform: scale(1.1); background: #fff; color: #e03131; }
        .pc-wish.active { color: #e03131; }
        @media (max-width: 768px) {
          .pc-card { border-radius: 12px; }
          .pc-btn { padding: 8px; font-size: 11px; border-radius: 8px; gap: 4px; }
          .pc-qty-btn { padding: 6px; font-size: 14px; }
          .pc-badge { padding: 4px 8px; font-size: 9px; top: 8px; left: 8px; }
          .pc-wish { width: 30px; height: 30px; top: 8px; right: 8px; }
        }
      `}</style>

      {/* Search Bar — navigates to /search */}
      <form onSubmit={handleSearchSubmit} style={{ maxWidth: "600px", margin: isMobile ? "0 auto 32px auto" : "0 auto 40px auto" }}>
        <div style={{
          display: "flex", alignItems: "center",
          background: "#fff", borderRadius: "20px",
          padding: "8px 8px 8px 20px", border: "1px solid #eaeaea",
          gap: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            name="productSearch"
            id="productSearch"
            placeholder="Discover collections, styles, or colors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, border: "none", background: "transparent",
              fontSize: isMobile ? "14px" : "15px",
              outline: "none", color: "#666", fontFamily: "inherit",
            }}
          />
          {searchQuery.trim() && (
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff",
                border: "none", borderRadius: "12px",
                padding: "8px 20px", fontSize: "13px",
                fontWeight: "600", cursor: "pointer", transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Search
            </button>
          )}
        </div>
      </form>

      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "32px" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isMobile ? "32px" : "42px",
          fontWeight: "700", color: "#1a1a1a", margin: "0 0 8px",
        }}>
          Our Collections
        </h2>
        <p style={{ color: "#666", fontSize: isMobile ? "14px" : "16px", margin: 0 }}>
          Handpicked pieces for every occasion
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: "flex", gap: "10px",
        marginBottom: isMobile ? "24px" : "40px",
        justifyContent: "center", flexWrap: "wrap",
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: isMobile ? "8px 16px" : "10px 24px",
              fontSize: isMobile ? "12px" : "14px",
              background: selectedCategory === cat
                ? "#1a1a1a" : "#fff",
              color: selectedCategory === cat ? "#D4AF37" : "#666",
              border: selectedCategory === cat ? "1px solid #1a1a1a" : "1px solid #eaeaea",
              borderRadius: "30px", cursor: "pointer", fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: selectedCategory === cat ? "0 4px 15px rgba(0,0,0,0.1)" : "none",
            }}
            onMouseEnter={e => { if (selectedCategory !== cat) e.currentTarget.style.borderColor = "#D4AF37"; }}
            onMouseLeave={e => { if (selectedCategory !== cat) e.currentTarget.style.borderColor = "#eaeaea"; }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "12px" : "24px", width: "100%", maxWidth: "1200px", margin: "0 auto"
      }}>
        {paginatedProducts.map((product) => {
          const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
          return (
            <div key={product.id} className="pc-card">
              {/* Image Container */}
              <div className="pc-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
                {typeof product.image === "string" && (product.image.startsWith("http") || product.image.startsWith("data:") || product.image.startsWith("/")) ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="pc-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span style={{ fontSize: isMobile ? "48px" : "60px" }}>{product.image}</span>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="pc-badge">
                    {discount}% OFF
                  </div>
                )}

                {/* Wishlist */}
                <button
                  className={`pc-wish ${isInWishlist && isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist && isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  title={isInWishlist && isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div onClick={() => navigate(`/product/${product.id}`)} style={{ padding: isMobile ? "12px" : "16px", cursor: "pointer", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontSize: isMobile ? "13px" : "15px", fontWeight: "600",
                  color: "#1a1a1a", margin: "0 0 4px 0",
                  overflow: "hidden", display: "-webkit-box",
                  WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  lineHeight: "1.4"
                }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: isMobile ? "11px" : "12px", color: "#888", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "500" }}>
                  {product.category}
                </p>

                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                  <span style={{ fontSize: isMobile ? "15px" : "16px", fontWeight: "700", color: "#D4AF37" }}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span style={{ fontSize: isMobile ? "12px" : "13px", color: "#aaa", textDecoration: "line-through", fontWeight: "500" }}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart / Quantity Controls */}
                {addedProducts[product.id] ? (
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <button
                      onClick={e => { e.stopPropagation(); handleDecreaseQuantity(product); }}
                      className="pc-qty-btn"
                    >−</button>
                    <span style={{
                      flex: 1, textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "700", color: "#1a1a1a",
                    }}>
                      {addedProducts[product.id]}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); handleIncreaseQuantity(product); }}
                      className="pc-qty-btn"
                    >+</button>
                  </div>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); handleAddProduct(product); }}
                    className="pc-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Add to Cart
                  </button>
                )}

                <WhatsAppInquiryButton
                  message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
                  buttonStyle={{
                    width: "100%",
                    padding: isMobile ? "8px" : "10px",
                    fontSize: isMobile ? "11px" : "12px",
                    marginTop: isMobile ? "6px" : "8px",
                    background: "#fff",
                    border: "1px solid #eaeaea",
                    color: "#1a1a1a",
                    borderRadius: "10px",
                    boxShadow: "none"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center",
          gap: isMobile ? "8px" : "12px",
          marginTop: "40px",
          alignItems: "center",
        }}>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #eaeaea",
              background: currentPage === 1 ? "#f9f9f9" : "#fff", color: currentPage === 1 ? "#aaa" : "#1a1a1a",
              cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "600", transition: "all 0.2s"
            }}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                width: isMobile ? "36px" : "42px", height: isMobile ? "36px" : "42px",
                borderRadius: "8px", border: "none",
                background: page === currentPage ? "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)" : "transparent",
                color: page === currentPage ? "#fff" : "#666",
                cursor: "pointer", fontWeight: "700",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (page !== currentPage) e.currentTarget.style.background = "#eaeaea"; }}
              onMouseLeave={e => { if (page !== currentPage) e.currentTarget.style.background = "transparent"; }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #eaeaea",
              background: currentPage === totalPages ? "#f9f9f9" : "#fff", color: currentPage === totalPages ? "#aaa" : "#1a1a1a",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "600", transition: "all 0.2s"
            }}
          >
            Next
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
