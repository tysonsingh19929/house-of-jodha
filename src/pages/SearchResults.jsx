import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import imageDatabase from "../data/imageDatabase.js";

function SearchBar({ onSearch, initialQuery }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const commonKeywords = [
    "Lehenga", "Bridal Lehenga", "Saree", "Silk Saree", "Anarkali",
    "Salwar Kameez", "Gharara", "Sharara", "Embroidered", "Tissue Silk",
    "Floral Printed", "Midnight Blue", "Emerald Green", "Rose Pink", "Wine Red"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = commonKeywords.filter(kw => kw.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e, query = searchTerm) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <form ref={wrapperRef} onSubmit={(e) => handleSubmit(e)} style={{
      position: "relative",
      maxWidth: "640px",
      margin: "0 auto 40px auto",
      width: "100%"
    }}>
      <div style={{
        display: "flex", alignItems: "center", background: "#fff",
        borderRadius: "50px", padding: isMobile ? "4px 4px 4px 16px" : "6px 6px 6px 24px",
        boxShadow: isFocused ? "0 12px 32px rgba(212, 175, 55, 0.15)" : "0 8px 24px rgba(0,0,0,0.06)",
        border: `1px solid ${isFocused ? "#D4AF37" : "#eaeaea"}`,
        transition: "all 0.3s ease"
      }}>
        <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Discover your next outfit..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => { setIsFocused(true); if (searchTerm.trim()) setShowSuggestions(true); }}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          style={{
            flex: 1, padding: isMobile ? "10px 12px" : "12px 16px", fontSize: isMobile ? "14px" : "16px",
            border: "none", outline: "none", background: "transparent",
            fontFamily: "'Inter', sans-serif", color: "#1a1a1a"
          }}
        />
        <button
          type="submit"
          style={{
            padding: isMobile ? "10px 20px" : "12px 32px", background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff",
            border: "none", borderRadius: "40px", cursor: "pointer",
            fontWeight: "600", fontSize: isMobile ? "13px" : "15px", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.3)"; }}
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
          background: "#fff", borderRadius: "16px", boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          border: "1px solid #eaeaea", listStyle: "none", padding: "8px 0", margin: 0,
          zIndex: 1000, maxHeight: "240px", overflowY: "auto", textAlign: "left"
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => { setSearchTerm(s); handleSubmit(null, s); }}
              style={{ padding: "12px 20px", cursor: "pointer", fontSize: "14px", color: "#333", borderBottom: i < suggestions.length - 1 ? "1px solid #f5f5f5" : "none", transition: "background 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f9f9f9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

const getImageForProduct = (category, index) => {
  if (!category) return imageDatabase.lehenga[0];
  const categoryKey = category === "Salwar Kameez" ? "salwarKameez" : category.toLowerCase();
  const urls = imageDatabase[categoryKey] || imageDatabase.lehenga;
  return urls ? urls[index % urls.length] : imageDatabase.lehenga[0];
};

export default function SearchResults({
  cartOpen, setCartOpen, addToCart, removeFromCart, cartItems, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const query = searchParams.get("q") || "";
  const [addedProducts, setAddedProducts] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    setLoading(true);

    if (!query.trim()) {
      setAllProducts([]);
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/products/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching matching products:", err);
        setLoading(false);
      });
  }, [apiUrl, query]);

  const handleSearch = (searchTerm) => {
    setSearchParams({ q: searchTerm });
    setCurrentPage(1);
  };

  const handleAddProduct = (product) => {
    const idToUse = product._id || product.id;
    setAddedProducts(prev => ({ ...prev, [idToUse]: (prev[idToUse] || 0) + 1 }));
    addToCart(product);
  };

  const handleIncrease = (product) => {
    const idToUse = product._id || product.id;
    setAddedProducts(prev => ({ ...prev, [idToUse]: (prev[idToUse] || 0) + 1 }));
    addToCart(product);
  };

  const handleDecrease = (product) => {
    const idToUse = product._id || product.id;
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[idToUse] || 0) - 1);
      if (newQty === 0) {
        const updated = { ...prev };
        delete updated[idToUse];
        removeFromCart(cartItems.findIndex(i => (i._id || i.id) === idToUse));
        return updated;
      }
      return { ...prev, [idToUse]: newQty };
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.map((product) => {
      // Just ensure backward compatibility with old hardcoded logic
      const idToUse = product._id || product.id;
      return { ...product, id: idToUse, image: product.image || imageDatabase.lehenga[0] };
    });
  }, [allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div style={{ background: "#FAFAFA", paddingTop: "64px", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .sr-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(212, 175, 55, 0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .sr-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(212, 175, 55, 0.3);
        }
        .sr-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #f8f8f8;
          cursor: pointer;
        }
        .sr-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sr-card:hover .sr-img {
          transform: scale(1.07);
        }
        .sr-btn {
          width: 100%; padding: 12px; background: #1a1a1a; color: #fff;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease; display: flex;
          align-items: center; justify-content: center; gap: 6px;
        }
        .sr-btn:hover { background: #333; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .sr-qty-btn {
          flex: 1; padding: 10px; background: #f5f5f5; color: #1a1a1a;
          border: none; border-radius: 8px; cursor: pointer; font-weight: 600;
          font-size: 16px; transition: all 0.2s ease;
        }
        .sr-qty-btn:hover { background: #eaeaea; }
        .sr-badge {
          position: absolute; top: 12px; left: 12px; background: #1a1a1a; color: #D4AF37;
          padding: 6px 12px; border-radius: 30px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(212,175,55,0.3); z-index: 2;
        }
        .sr-wish {
          position: absolute; top: 12px; right: 12px; width: 36px; height: 36px;
          border-radius: 50%; background: rgba(255,255,255,0.9); border: none;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); color: #ccc; backdrop-filter: blur(4px);
        }
        .sr-wish:hover { transform: scale(1.1); background: #fff; color: #e03131; }
        .sr-wish.active { color: #e03131; }
        
        @media (max-width: 768px) {
          .sr-card { border-radius: 12px; }
          .sr-btn { padding: 8px; font-size: 11px; border-radius: 8px; gap: 4px; }
          .sr-btn svg { width: 14px; height: 14px; }
          .sr-qty-btn { padding: 6px; font-size: 14px; }
          .sr-badge { padding: 4px 8px; font-size: 9px; top: 8px; left: 8px; }
          .sr-wish { width: 30px; height: 30px; top: 8px; right: 8px; }
          .sr-wish svg { width: 15px; height: 15px; }
        }
      `}</style>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(!cartOpen)}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setWishlistOpen(!wishlistOpen)}
      />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      {wishlistOpen && (
        <Wishlist
          items={wishlistItems} onRemove={removeFromWishlist}
          onClose={() => setWishlistOpen(false)} onAddToCart={addToCart}
        />
      )}

      <div style={{ padding: isMobile ? "15px 12px" : "30px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px", animation: "fadeIn 0.5s ease-out" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", color: "#1a1a1a", margin: "0 0 12px 0", fontWeight: "700" }}>
            Discover Your Style
          </h1>
          <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#666", margin: 0 }}>
            {loading ? "Curating the finest collections..." : (query ? `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${query}"` : "Find your perfect luxury outfit")}
          </p>
        </div>

        <SearchBar onSearch={handleSearch} initialQuery={query} />

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ position: "relative", width: "60px", height: "60px", margin: "0 auto" }}>
              <div style={{ position: "absolute", inset: 0, border: "3px solid #fdf8ee", borderRadius: "50%" }}></div>
              <div style={{ position: "absolute", inset: 0, border: "3px solid transparent", borderTopColor: "#D4AF37", borderRightColor: "#D4AF37", borderRadius: "50%", animation: "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}></div>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "20px", height: "20px", backgroundColor: "#1a1a1a", borderRadius: "50%", animation: "pulse 1.5s ease-in-out infinite" }}></div>
            </div>
            <p style={{ marginTop: "20px", color: "#666", fontSize: "15px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Finding the perfect pieces...</p>
            <style dangerouslySetInnerHTML={{ __html: "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; } 50% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.4; } }" }} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "12px" : "24px", width: "100%"
            }}>
              {paginatedProducts.map((product) => {
                const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                return (
                  <div key={product.id} className="sr-card">
                    <div className="sr-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
                      <img
                        src={product.image} alt={product.name} className="sr-img" loading="lazy" decoding="async"
                      />
                      {discount > 0 && (
                        <div className="sr-badge">
                          {discount}% OFF
                        </div>
                      )}
                      <button
                        className={`sr-wish ${isInWishlist && isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist && isInWishlist(product.id)) removeFromWishlist(product.id);
                          else addToWishlist(product);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    <div
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ padding: isMobile ? "10px" : "16px", cursor: "pointer", flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <h3 style={{
                        fontSize: isMobile ? "12px" : "15px", fontWeight: "600",
                        color: "#1a1a1a", margin: "0 0 4px 0",
                        overflow: "hidden", display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                        lineHeight: "1.4"
                      }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: isMobile ? "10px" : "12px", color: "#888", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "500" }}>
                        {product.category}
                      </p>

                      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                        <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "700", color: "#D4AF37" }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span style={{ fontSize: isMobile ? "12px" : "13px", color: "#aaa", textDecoration: "line-through", fontWeight: "500" }}>
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {addedProducts[product.id] ? (
                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDecrease(product); }}
                            className="sr-qty-btn"
                          >−</button>
                          <span style={{
                            flex: 1, textAlign: "center",
                            fontSize: "14px",
                            fontWeight: "700", color: "#1a1a1a",
                          }}>
                            {addedProducts[product.id]}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleIncrease(product); }}
                            className="sr-qty-btn"
                          >+</button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddProduct(product); }}
                          className="sr-btn"
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
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px", width: "100%" }}>
                <button
                  onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #eaeaea", background: currentPage === 1 ? "#f9f9f9" : "#fff", color: currentPage === 1 ? "#aaa" : "#1a1a1a", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "600", transition: "all 0.2s" }}
                >
                  Previous
                </button>
                <span style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#666", fontWeight: "500" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #eaeaea", background: currentPage === totalPages ? "#f9f9f9" : "#fff", color: currentPage === totalPages ? "#aaa" : "#1a1a1a", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "600", transition: "all 0.2s" }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : query ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>No products found for "{query}"</p>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff", border: "none",
                padding: "12px 24px", borderRadius: "8px",
                cursor: "pointer", fontWeight: "600"
              }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>
            <p style={{ fontSize: "16px" }}>Enter a product name, category, color, or material to search</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
