import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import imageDatabase from "../data/imageDatabase.js";

function SearchBar({ onSearch, initialQuery }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "20px", width: "100%" }}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          flex: 1, padding: "12px 16px", fontSize: "14px",
          border: "2px solid #e0e0e0", borderRadius: "4px",
          outline: "none", transition: "border-color 0.2s", fontFamily: "inherit"
        }}
        onFocus={(e) => e.target.style.borderColor = "#880E4F"}
        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
      />
      <button
        type="submit"
        style={{
          padding: "12px 24px", background: "#880E4F", color: "#fff",
          border: "none", borderRadius: "4px", cursor: "pointer",
          fontWeight: "600", fontSize: "14px", transition: "background 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.background = "#6B0A3D"}
        onMouseLeave={(e) => e.target.style.background = "#880E4F"}
      >
        Search
      </button>
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

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleSearch = (searchTerm) => {
    setSearchParams({ q: searchTerm });
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
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    
    return allProducts
      .filter(product => {
        const name = product.name || "";
        const category = product.category || "";
        const material = product.material || "";
        const color = product.color || product.colors?.join(" ") || "";
        const description = product.description || "";
        const occasions = Array.isArray(product.occasions) ? product.occasions.map(o => o.toLowerCase()).join(" ") : "";
        
        return (
          name.toLowerCase().includes(searchTerm) ||
          category.toLowerCase().includes(searchTerm) ||
          material.toLowerCase().includes(searchTerm) ||
          color.toLowerCase().includes(searchTerm) ||
          description.toLowerCase().includes(searchTerm) ||
          occasions.includes(searchTerm)
        );
      })
      .map((product) => {
        const categoryProducts = allProducts.filter(p => p.category === product.category);
        const productIndex = categoryProducts.findIndex(p => (p._id || p.id) === (product._id || product.id));
        
        // Use database image if it's a URL, otherwise fallback to static mapping
        const hasValidDbImage = product.image && product.image.length > 10 && (product.image.includes('http') || product.image.includes('data:image'));
        const image = hasValidDbImage ? product.image : getImageForProduct(product.category, productIndex);
        
        return { ...product, id: product._id || product.id, image };
      });
  }, [query, allProducts]);

  return (
    <div style={{ background: "#fff", paddingTop: "64px", minHeight: "100vh" }}>
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
        <SearchBar onSearch={handleSearch} initialQuery={query} />

        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: isMobile ? "20px" : "28px", marginBottom: "6px", color: "#D4AF37" }}>
            Search Results
          </h1>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color: "#666", margin: 0 }}>
            {query ? `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${query}"` : "Enter a search term"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "12px", width: "100%"
          }}>
            {filteredProducts.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div
                  key={product.id}
                  style={{
                    background: "#fff", border: "1px solid #eee",
                    borderRadius: "8px", overflow: "hidden",
                    transition: "all 0.2s", position: "relative",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(194,24,91,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = "#E91E63";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#eee";
                  }}
                >
                  {/* Image — clickable */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{
                      position: "relative", width: "100%",
                      aspectRatio: "1", overflow: "hidden",
                      background: "#f5f5f5", cursor: "pointer",
                    }}
                  >
                    <img
                      src={product.image} alt={product.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {discount > 0 && (
                      <div style={{
                        position: "absolute", top: "8px", left: "8px",
                        background: "#C2185B", color: "#fff",
                        padding: "3px 8px", borderRadius: "3px",
                        fontSize: "10px", fontWeight: "700",
                      }}>
                        {discount}% OFF
                      </div>
                    )}
                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist && isInWishlist(product.id)) removeFromWishlist(product.id);
                        else addToWishlist(product);
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
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      {isInWishlist && isInWishlist(product.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  {/* Info */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ padding: isMobile ? "8px 8px 4px" : "12px 12px 6px", cursor: "pointer" }}
                  >
                    <h3 style={{
                      fontSize: isMobile ? "12px" : "13px", fontWeight: "600",
                      color: "#333", margin: "0 0 4px 0",
                      minHeight: isMobile ? "32px" : "35px",
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: isMobile ? "10px" : "11px", color: "#999", margin: "0 0 5px 0" }}>
                      {product.category} • {product.material}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: "700", color: "#880E4F" }}>
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: isMobile ? "10px" : "11px", color: "#bbb", textDecoration: "line-through" }}>
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: isMobile ? "10px" : "11px", color: "#666", marginBottom: "8px" }}>
                      ⭐ {product.rating} ({product.reviews} reviews)
                    </div>
                  </div>

                  {/* Add to Cart / Quantity Controls */}
                  <div style={{ padding: isMobile ? "0 8px 10px" : "0 12px 12px" }}>
                    {addedProducts[product.id] ? (
                      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDecrease(product); }}
                          style={{
                            flex: 1, padding: isMobile ? "5px" : "7px",
                            background: "linear-gradient(135deg, #E91E63, #C2185B)",
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
                          onClick={(e) => { e.stopPropagation(); handleIncrease(product); }}
                          style={{
                            flex: 1, padding: isMobile ? "5px" : "7px",
                            background: "linear-gradient(135deg, #E91E63, #C2185B)",
                            color: "#fff", border: "none", borderRadius: "3px",
                            cursor: "pointer", fontWeight: "700", fontSize: "14px",
                          }}
                        >+</button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddProduct(product); }}
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

                    <WhatsAppInquiryButton
                      message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
                      buttonStyle={{
                        width: "100%",
                        padding: isMobile ? "7px" : "9px",
                        fontSize: isMobile ? "11px" : "12px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : query ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>No products found for "{query}"</p>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "#D4AF37", color: "#fff", border: "none",
                padding: "10px 20px", borderRadius: "4px",
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
