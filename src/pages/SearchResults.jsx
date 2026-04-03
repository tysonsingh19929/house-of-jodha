import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
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

const allProducts = [
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, description: "Elegant beige and gold tissue silk lehenga with intricate embroidery work.", category: "Lehenga", material: "Tissue Silk", color: "Beige & Gold", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 2200, stock: 5 },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, description: "Luxurious red silk bridal lehenga with hand embroidered details and mirror work.", category: "Lehenga", material: "Silk", color: "Red", occasions: ["Wedding", "Bridal"], rating: 4.5, reviews: 1800, stock: 3 },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", price: 27000, originalPrice: 32900, description: "Soft blush pink bridal lehenga with tissue silk and embroidered choli.", category: "Lehenga", material: "Tissue Silk", color: "Blush Pink", occasions: ["Wedding", "Bridal"], rating: 4.4, reviews: 1950, stock: 4 },
  { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, description: "Deep maroon bridal lehenga with ornate embroidery and matching choli.", category: "Lehenga", material: "Tissue Silk", color: "Maroon", occasions: ["Wedding", "Bridal"], rating: 4.3, reviews: 1700, stock: 3 },
  { id: 14, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, description: "Vibrant parrot green lehenga with floral prints and light embroidery.", category: "Lehenga", material: "Cotton Silk", color: "Parrot Green", occasions: ["Festival", "Celebration"], rating: 4.2, reviews: 2100, stock: 6 },
  { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, description: "Beautiful pre-draped saree in royal purple satin, perfect for any celebration.", category: "Saree", material: "Satin", color: "Royal Purple", occasions: ["Festival", "Party"], rating: 4.1, reviews: 1600, stock: 7 },
  { id: 22, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, description: "Luxurious gold sequined silk saree with blouse.", category: "Saree", material: "Silk", color: "Gold", occasions: ["Wedding", "Bridal"], rating: 4.6, reviews: 2300, stock: 4 },
  { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, description: "Elegant ivory saree with gold embroidery and beadwork.", category: "Saree", material: "Silk", color: "Ivory & Gold", occasions: ["Wedding", "Bridal"], rating: 4.5, reviews: 2050, stock: 3 },
  { id: 4, name: "Designer Anarkali Suit - Midnight Blue", price: 16800, originalPrice: 19800, description: "Beautiful midnight blue anarkali suit with embroidered yoke and hem.", category: "Anarkali", material: "Georgette", color: "Midnight Blue", occasions: ["Wedding", "Festival"], rating: 4.4, reviews: 1900, stock: 7 },
  { id: 31, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", price: 14000, originalPrice: 16900, description: "Stunning indigo blue anarkali with traditional embroidery and matching dupatta.", category: "Anarkali", material: "Georgette", color: "Indigo Blue", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 1750, stock: 5 },
  { id: 5, name: "Salwar Kameez - Emerald Green", price: 7500, originalPrice: 9000, description: "Classic emerald green salwar kameez with traditional embroidery.", category: "Salwar Kameez", material: "Cotton Silk", color: "Emerald Green", occasions: ["Daily", "Festival"], rating: 4.0, reviews: 1500, stock: 10 },
  { id: 40, name: "Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set", price: 9000, originalPrice: 11100, description: "Contemporary indowestern top with palazzo pants.", category: "Salwar Kameez", material: "Crepe Silk", color: "Navy Blue", occasions: ["Party", "Celebration"], rating: 4.2, reviews: 1650, stock: 8 },
  { id: 2, name: "Ivory Chinon Silk Gharara Set", price: 11500, originalPrice: 13500, description: "Sophisticated ivory chinon silk gharara with intricate embroidery.", category: "Gharara", material: "Chinon Silk", color: "Ivory", occasions: ["Wedding", "Bridal"], rating: 4.4, reviews: 1850, stock: 3 },
  { id: 49, name: "Pink Purple Georgette Embroidered Gharara Set", price: 9500, originalPrice: 12000, description: "Beautiful pink purple gharara with stunning embroidery work.", category: "Gharara", material: "Georgette", color: "Pink Purple", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 1700, stock: 5 },
  { id: 6, name: "Sharara Suit - Wine Red", price: 12500, originalPrice: 15000, description: "Glamorous wine red sharara suit with embroidered details.", category: "Sharara", material: "Silk", color: "Wine Red", occasions: ["Wedding", "Festival"], rating: 4.5, reviews: 2000, stock: 5 },
  { id: 56, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, description: "Elegant pink purple sharara with beautiful embroidery and matching dupatta.", category: "Sharara", material: "Georgette", color: "Pink Purple", occasions: ["Festival", "Party"], rating: 4.2, reviews: 1600, stock: 6 }
];

const getImageForProduct = (category, index) => {
  const categoryKey = category === "Salwar Kameez" ? "salwarKameez" : category.toLowerCase();
  const urls = imageDatabase[categoryKey] || imageDatabase.lehenga;
  return urls[index % urls.length];
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

  const handleSearch = (searchTerm) => {
    setSearchParams({ q: searchTerm });
  };

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    addToCart(product);
  };

  const handleIncrease = (product) => {
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    addToCart(product);
  };

  const handleDecrease = (product) => {
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[product.id] || 0) - 1);
      if (newQty === 0) {
        const updated = { ...prev };
        delete updated[product.id];
        removeFromCart(cartItems.findIndex(i => i.id === product.id));
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return allProducts
      .filter(product => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.material.toLowerCase().includes(searchTerm) ||
          product.color.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.occasions.map(o => o.toLowerCase()).join(" ").includes(searchTerm)
        );
      })
      .map((product) => {
        const categoryProducts = allProducts.filter(p => p.category === product.category);
        const productIndex = categoryProducts.findIndex(p => p.id === product.id);
        const image = getImageForProduct(product.category, productIndex);
        return { ...product, image };
      });
  }, [query]);

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
