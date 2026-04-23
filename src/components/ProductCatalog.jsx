import { useState, useEffect, useRef, useMemo } from "react";
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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null);

  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [dbFetched, setDbFetched] = useState(false);
  const [sellersMap, setSellersMap] = useState({});

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

    // 1. Check local cache first for an instant load
    const cachedData = localStorage.getItem("diva_catalog_cache");
    if (cachedData) {
      try {
        setDbProducts(JSON.parse(cachedData));
        setDbFetched(true);
      } catch (e) { console.error("Cache read error", e); }
    }

    // 2. Fetch fresh data in the background
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setDbProducts(arr);
        setDbFetched(true);
        try {
          // Strip heavy Base64 images and unneeded arrays to prevent QuotaExceededError
          const lightweightCache = arr.map(p => ({
            _id: p._id, id: p.id, name: p.name, category: p.category,
            price: p.price, originalPrice: p.originalPrice,
            image: p.image && p.image.length > 100000 ? null : p.image
          }));
          localStorage.setItem("diva_catalog_cache", JSON.stringify(lightweightCache));
        } catch (e) { console.warn("Cache write failed, ignoring to prevent crash", e); }
      })
      .catch(err => { console.error(err); setDbFetched(true); });

    fetch(`${API_BASE_URL}/sellers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map = {};
          data.forEach(s => map[s._id] = s.phone);
          setSellersMap(map);
        }
      })
      .catch(console.error);
  }, []);

  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");

  const allProducts = useMemo(() => {
    if (!dbFetched) return []; // Wait for DB to prevent flicker
    if (dbFetched && dbProducts.length === 0) return [...customProducts]; // Empty DB means products were deleted

    const patchedDb = dbProducts.map(p => {
      const match = products.find(sp => sp.name === p.name);
      if (match) return { ...p, price: match.price, originalPrice: match.originalPrice, image: match.image, id: p._id || p.id };
      return { ...p, id: p._id || p.id };
    });
    return [...patchedDb, ...customProducts];
  }, [dbProducts, customProducts, dbFetched]);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      const dynamicKeywords = Array.from(new Set(allProducts.flatMap(p => [p.name, p.category])));
      const filtered = dynamicKeywords.filter(kw => kw && kw.toLowerCase().includes(value.toLowerCase())).slice(0, 10);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e, query = searchQuery) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];

  const filteredProducts = useMemo(() => {
    let res = selectedCategory === "All"
      ? [...allProducts].sort((a, b) => {
        const aIsLehenga = a.category?.toLowerCase() === "lehenga";
        const bIsLehenga = b.category?.toLowerCase() === "lehenga";
        if (aIsLehenga && !bIsLehenga) return -1;
        if (!aIsLehenga && bIsLehenga) return 1;
        return 0;
      })
      : allProducts.filter(p => p.category === selectedCategory);

    if (priceFilter === 'under-5000') res = res.filter(p => p.price < 5000);
    else if (priceFilter === '5000-10000') res = res.filter(p => p.price >= 5000 && p.price <= 10000);
    else if (priceFilter === 'over-10000') res = res.filter(p => p.price > 10000);

    if (colorFilter !== 'all') {
      const colorMatch = colorFilter.toLowerCase().split(' / ');
      res = res.filter(p => {
        const targetStr = (p.colors && Array.isArray(p.colors) ? p.colors.join(' ') : (p.colors || p.name)).toLowerCase();
        return colorMatch.some(c => targetStr.includes(c.trim()));
      });
    }

    if (sortBy === 'price-low') res.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') res.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') res.sort((a, b) => a.name.localeCompare(b.name));

    return res;
  }, [allProducts, selectedCategory, priceFilter, colorFilter, sortBy]);

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
        .myntra-layout { display: flex; max-width: 1400px; margin: 0 auto; gap: 30px; padding: 24px 0; align-items: flex-start; font-family: 'Inter', sans-serif; }
        .myntra-sidebar { width: 250px; flex-shrink: 0; position: sticky; top: 100px; }
        .myntra-main { flex: 1; min-width: 0; }
        .myntra-topbar { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; margin-bottom: 24px; }
        .myntra-count { font-size: 16px; color: #282c3f; }
        .myntra-count strong { font-weight: 700; }
        .myntra-sort { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #282c3f; }
        .myntra-sort-select { padding: 8px 12px; border: 1px solid #d4d5d9; border-radius: 4px; font-size: 14px; color: #282c3f; cursor: pointer; outline: none; background: #fff; font-weight: 500; }
        
        .myntra-filter-header { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700; color: #282c3f; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; text-transform: uppercase; }
        .myntra-filter-clear { font-size: 12px; color: #ff3f6c; font-weight: 700; cursor: pointer; border: none; background: none; text-transform: uppercase; }
        
        .myntra-filter-sec { padding: 20px 0; border-bottom: 1px solid #eaeaec; }
        .myntra-filter-title { font-size: 14px; font-weight: 700; color: #282c3f; text-transform: uppercase; margin-bottom: 16px; }
        .myntra-radio-label { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #282c3f; margin-bottom: 12px; cursor: pointer; font-weight: 400; }
        .myntra-radio { accent-color: #ff3f6c; width: 16px; height: 16px; cursor: pointer; margin: 0; }
        
        .myntra-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px 16px; }
        
        .m-card-wrapper { position: relative; } 
        .m-card { position: relative; background: #fff; transition: all 0.2s ease; z-index: 1; border-radius: 4px; height: 100%; display: flex; flex-direction: column; border: 1px solid transparent; }
        .m-card:hover { z-index: 10; box-shadow: 0 -2px 16px rgba(0,0,0,0.08); border-color: #eaeaec; }
        .m-img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f5f5f6; cursor: pointer; border-radius: 4px 4px 0 0; }
        .m-img { width: 100%; height: 100%; object-fit: cover; }
        .m-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(255,255,255,0.9); color: #282c3f; font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 2px; }
        .m-wish { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #ccc; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .m-wish:hover { background: #fff; color: #ff3f6c; transform: scale(1.1); }
        .m-wish.active { color: #ff3f6c; }
        
        .m-info { padding: 12px 10px; cursor: pointer; background: #fff; border-radius: 0 0 4px 4px; flex: 1; display: flex; flex-direction: column; }
        .m-brand { font-size: 16px; font-weight: 700; color: #282c3f; margin: 0 0 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .m-title { font-size: 14px; color: #535766; margin: 0 0 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .m-price-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-top: auto; }
        .m-price { font-size: 14px; font-weight: 700; color: #282c3f; }
        .m-orig { font-size: 12px; color: #7e818c; text-decoration: line-through; }
        .m-disc { font-size: 12px; font-weight: 700; color: #ff905a; }
        
        .m-actions { display: none; position: absolute; top: 100%; left: -1px; right: -1px; background: #fff; padding: 0 10px 12px; box-shadow: 0 12px 16px rgba(0,0,0,0.08); border-radius: 0 0 4px 4px; z-index: 10; border: 1px solid #eaeaec; border-top: none; }
        .m-card:hover .m-actions { display: flex; flex-direction: column; gap: 8px; }
        
        .m-btn { width: 100%; padding: 10px; background: #ff3f6c; color: #fff; border: 1px solid #ff3f6c; border-radius: 4px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .m-btn:hover { background: #e0355f; }
        
        .m-qty-row { display: flex; align-items: center; gap: 4px; }
        .m-qty-btn { flex: 1; padding: 8px; background: #f5f5f6; border: none; font-size: 16px; font-weight: 700; cursor: pointer; border-radius: 4px; }
        .m-qty-num { flex: 1; text-align: center; font-size: 14px; font-weight: 700; color: #282c3f; }
        
        .m-mobile-filter-btn { display: none; }
        
        @media (max-width: 1024px) { .myntra-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .myntra-layout { flex-direction: column; padding: 16px 0; gap: 16px; }
          .myntra-topbar { flex-direction: column; align-items: flex-start; gap: 12px; border-bottom: none; padding-bottom: 0; margin-bottom: 16px; }
          .myntra-sidebar { display: none; width: 100%; position: static; border-right: none; }
          .myntra-sidebar.show { display: block; border-bottom: 1px solid #eaeaec; padding-bottom: 20px; margin-bottom: 10px; }
          .m-mobile-filter-btn { display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px; background: #fff; border: 1px solid #d4d5d9; font-weight: 700; font-size: 14px; color: #282c3f; margin-bottom: 0; cursor: pointer; border-radius: 4px; }
          
          .myntra-grid { grid-template-columns: repeat(2, 1fr); gap: 16px 12px; }
          .m-card { position: relative; height: 100%; display: flex; flex-direction: column; border-color: #eaeaec; }
          .m-actions { display: flex; position: static; padding: 0 10px 12px; margin-top: auto; box-shadow: none !important; border: none; }
          .m-card:hover { transform: none; box-shadow: none; }
          .m-card:hover .m-actions { position: static; box-shadow: none; }
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Search Bar — navigates to /search */}
      <form ref={searchWrapperRef} onSubmit={(e) => handleSearchSubmit(e)} style={{ position: "relative", maxWidth: "600px", margin: isMobile ? "0 auto 32px auto" : "0 auto 40px auto" }}>
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
            onChange={handleSearchChange}
            onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
            autoComplete="off"
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
                onClick={() => { setSearchQuery(s); handleSearchSubmit(null, s); }}
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

      <div className="myntra-layout">
        <button className="m-mobile-filter-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          {showMobileFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
        </button>

        <aside className={`myntra-sidebar ${showMobileFilters ? 'show' : ''}`}>
          <div className="myntra-filter-header">
            FILTERS
            <button className="myntra-filter-clear" onClick={() => { setSelectedCategory("All"); setPriceFilter("all"); setColorFilter("all"); }}>CLEAR ALL</button>
          </div>

          <div className="myntra-filter-sec">
            <div className="myntra-filter-title">Categories</div>
            {categories.map(cat => (
              <label key={cat} className="myntra-radio-label">
                <input type="radio" className="myntra-radio" checked={selectedCategory === cat} onChange={() => { setSelectedCategory(cat); setCurrentPage(1); }} />
                {cat}
              </label>
            ))}
          </div>

          <div className="myntra-filter-sec">
            <div className="myntra-filter-title">Price</div>
            {[
              { label: "All Prices", value: "all" },
              { label: "Under ₹5,000", value: "under-5000" },
              { label: "₹5,000 - ₹10,000", value: "5000-10000" },
              { label: "Over ₹10,000", value: "over-10000" }
            ].map(price => (
              <label key={price.value} className="myntra-radio-label">
                <input type="radio" className="myntra-radio" checked={priceFilter === price.value} onChange={() => { setPriceFilter(price.value); setCurrentPage(1); }} />
                {price.label}
              </label>
            ))}
          </div>

          <div className="myntra-filter-sec">
            <div className="myntra-filter-title">Color</div>
            {[
              { label: "All Colors", value: "all" },
              { label: "Red / Maroon", value: "red" },
              { label: "Pink / Blush", value: "pink" },
              { label: "Green / Emerald", value: "green" },
              { label: "Blue / Navy", value: "blue" },
              { label: "Gold / Yellow", value: "gold" },
              { label: "Ivory / White", value: "ivory" },
              { label: "Black", value: "black" },
              { label: "Purple / Lavender", value: "purple" }
            ].map(col => (
              <label key={col.value} className="myntra-radio-label">
                <input type="radio" className="myntra-radio" checked={colorFilter === col.value} onChange={() => { setColorFilter(col.value); setCurrentPage(1); }} />
                {col.label}
              </label>
            ))}
          </div>
        </aside>

        <main className="myntra-main">
          <div className="myntra-topbar">
            <div className="myntra-count">
              <strong>{selectedCategory === "All" ? "All Products" : selectedCategory}</strong> - {filteredProducts.length} items
            </div>
            <div className="myntra-sort">
              Sort by:
              <select className="myntra-sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}>
                <option value="featured">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {!dbFetched ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ position: "relative", width: "40px", height: "40px", margin: "0 auto" }}>
                <div style={{ position: "absolute", inset: 0, border: "3px solid #fdf8ee", borderRadius: "50%" }}></div>
                <div style={{ position: "absolute", inset: 0, border: "3px solid transparent", borderTopColor: "#D4AF37", borderRightColor: "#D4AF37", borderRadius: "50%", animation: "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}></div>
              </div>
              <p style={{ marginTop: "16px", color: "#666", fontSize: "14px" }}>Loading collections...</p>
            </div>
          ) : (
            <>
              <div className="myntra-grid">
                {paginatedProducts.map(product => {
                  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                  return (
                    <div key={product.id} className="m-card-wrapper">
                      <div className="m-card">
                        <div className="m-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
                          <img src={product.image} alt={product.name} className="m-img" loading="lazy" />
                          {discount > 0 && <div className="m-badge">{discount}% OFF</div>}
                          <button className={`m-wish ${isInWishlist && isInWishlist(product.id) ? 'active' : ''}`} onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist && isInWishlist(product.id)) removeFromWishlist(product.id);
                            else addToWishlist(product);
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                        </div>
                        <div className="m-info" onClick={() => navigate(`/product/${product.id}`)}>
                          <h3 className="m-brand">{product.sellerName || "The Sringar House"}</h3>
                          <p className="m-title">{product.name}</p>
                          <div className="m-price-row">
                            <span className="m-price">Rs. {product.price.toLocaleString('en-IN')}</span>
                            {product.originalPrice > product.price && <span className="m-orig">Rs. {product.originalPrice.toLocaleString('en-IN')}</span>}
                            {discount > 0 && <span className="m-disc">({discount}% OFF)</span>}
                          </div>
                        </div>
                        <div className="m-actions">
                          {addedProducts[product.id] ? (
                            <div className="m-qty-row">
                              <button className="m-qty-btn" onClick={(e) => { e.stopPropagation(); handleDecreaseQuantity(product); }}>−</button>
                              <span className="m-qty-num">{addedProducts[product.id]}</span>
                              <button className="m-qty-btn" onClick={(e) => { e.stopPropagation(); handleIncreaseQuantity(product); }}>+</button>
                            </div>
                          ) : (
                            <button className="m-btn" onClick={(e) => { e.stopPropagation(); handleAddProduct(product); }}>
                              ADD TO BAG
                            </button>
                          )}
                          <WhatsAppInquiryButton
                            message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
                            phoneNumber={sellersMap[product.sellerId] || "9967670497"}
                            buttonStyle={{ width: "100%", padding: "10px", borderRadius: "4px", fontSize: "13px", background: "#fff", color: "#282c3f", border: "1px solid #d4d5d9", fontWeight: "700", boxShadow: "none" }}
                          />
                        </div>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}
