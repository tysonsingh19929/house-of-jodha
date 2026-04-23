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
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

    const cachedData = localStorage.getItem("diva_catalog_cache");
    if (cachedData) {
      try { setDbProducts(JSON.parse(cachedData)); } catch (e) { }
    }

    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setDbProducts(arr);
        try {
          const lightweightCache = arr.map(p => ({
            _id: p._id, id: p.id, name: p.name, category: p.category,
            image: p.image && p.image.length > 100000 ? null : p.image
          }));
          localStorage.setItem("diva_catalog_cache", JSON.stringify(lightweightCache));
        } catch (e) { }
      })
      .catch(console.error);

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
      const dynamicKeywords = Array.from(new Set(dbProducts.flatMap(p => [p.name, p.category])));
      const filtered = dynamicKeywords.filter(kw => kw && kw.toLowerCase().includes(value.toLowerCase())).slice(0, 10);
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
      width: "100%",
      boxSizing: "border-box"
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
  const [sellersMap, setSellersMap] = useState({});
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    setLoading(true);

    const fetchQuery = query.trim() ? query : "Lehenga";

    fetch(`${apiUrl}/products/search?q=${encodeURIComponent(fetchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching matching products:", err);
        setLoading(false);
      });

    fetch(`${apiUrl}/sellers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map = {};
          data.forEach(s => map[s._id] = s.phone);
          setSellersMap(map);
        }
      })
      .catch(console.error);
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
    let res = allProducts.map((product) => {
      // Just ensure backward compatibility with old hardcoded logic
      const idToUse = product._id || product.id;
      return { ...product, id: idToUse, image: product.image || imageDatabase.lehenga[0] };
    });

    if (priceFilter === 'under-5000') res = res.filter(p => p.price < 5000);
    else if (priceFilter === '5000-10000') res = res.filter(p => p.price >= 5000 && p.price <= 10000);
    else if (priceFilter === 'over-10000') res = res.filter(p => p.price > 10000);

    if (colorFilter !== 'all') {
      const colorMatch = colorFilter.toLowerCase().split(' / ');
      res = res.filter(p => {
        const targetStr = (p.colors && Array.isArray(p.colors) ? p.colors.join(' ') : (p.colors || p.name || "")).toLowerCase();
        return colorMatch.some(c => targetStr.includes(c.trim()));
      });
    }

    if (sortBy === 'price-low') res.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') res.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') res.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return res;
  }, [allProducts, priceFilter, colorFilter, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div style={{ background: "#FAFAFA", paddingTop: "64px", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Cormorant+Garamond:wght@600;700&display=swap');
        .myntra-layout { display: flex; max-width: 1400px; margin: 0 auto; padding: 0 24px; align-items: flex-start; font-family: 'Assistant', sans-serif; color: #282c3f; }
        .myntra-sidebar { width: 250px; flex-shrink: 0; position: sticky; top: 80px; border-right: 1px solid #eaeaec; padding-right: 20px; margin-right: 24px; height: calc(100vh - 80px); overflow-y: auto; }
        .myntra-sidebar::-webkit-scrollbar { display: none; }
        .myntra-main { flex: 1; min-width: 0; padding-top: 10px; }
        .myntra-topbar { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; margin-bottom: 24px; }
        .myntra-count { font-size: 16px; font-weight: 700; }
        .myntra-count span { font-weight: 400; color: #535766; }
        .myntra-sort { display: flex; align-items: center; padding: 10px 14px; border: 1px solid #d4d5d9; border-radius: 2px; font-size: 14px; cursor: pointer; background: #fff; }
        .myntra-sort-select { border: none; outline: none; font-weight: 700; color: #282c3f; background: transparent; cursor: pointer; margin-left: 6px; font-family: 'Assistant', sans-serif; }
        .myntra-filter-header { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; text-transform: uppercase; }
        .myntra-filter-clear { font-size: 12px; color: #ff3f6c; font-weight: 700; cursor: pointer; border: none; background: none; text-transform: uppercase; }
        .myntra-filter-sec { padding: 20px 0; border-bottom: 1px solid #eaeaec; }
        .myntra-filter-title { font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        .myntra-radio-label { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #282c3f; margin-bottom: 12px; cursor: pointer; }
        .myntra-radio-label:hover { background: #f4f4f5; }
        .myntra-radio { appearance: none; width: 16px; height: 16px; border: 1px solid #c3c4c6; border-radius: 2px; cursor: pointer; position: relative; margin: 0; }
        .myntra-radio:checked { background-color: #ff3f6c; border-color: #ff3f6c; }
        .myntra-radio:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .myntra-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 20px; }
        .m-card-wrapper { position: relative; }
        .m-card { position: relative; background: #fff; transition: box-shadow 0.2s ease, transform 0.2s ease; cursor: pointer; display: flex; flex-direction: column; height: 100%; }
        .m-card:hover { box-shadow: 0 2px 16px 4px rgba(40,44,63,0.07); transform: translateY(-2px); z-index: 10; }
        .m-img-wrap { position: relative; width: 100%; aspect-ratio: 3/4; background: #f5f5f6; overflow: hidden; }
        .m-img { width: 100%; height: 100%; object-fit: cover; }
        .m-rating { position: absolute; bottom: 12px; left: 12px; background: rgba(255,255,255,0.8); backdrop-filter: blur(4px); font-size: 12px; font-weight: 700; padding: 4px 6px; border-radius: 2px; display: flex; align-items: center; gap: 4px; z-index: 2; pointer-events: none; }
        .m-wish { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: #fff; border: 1px solid #d4d5d9; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #282c3f; opacity: 0; transition: all 0.2s ease; z-index: 3; }
        .m-card:hover .m-wish { opacity: 1; }
        .m-wish:hover { background: #ff3f6c; color: #fff; border-color: #ff3f6c; }
        .m-wish.active { color: #ff3f6c; opacity: 1; border-color: #ff3f6c; background: #fff; }
        .m-wish.active:hover { background: #ff3f6c; color: #fff; }
        .m-info { padding: 12px 10px 0; background: #fff; }
        .m-brand { font-size: 16px; font-weight: 700; margin: 0 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .m-title { font-size: 14px; color: #535766; margin: 0 0 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 400; }
        .m-price-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .m-price { font-size: 14px; font-weight: 700; }
        .m-orig { font-size: 12px; color: #7e818c; text-decoration: line-through; }
        .m-disc { font-size: 12px; font-weight: 700; color: #ff905a; }
        .m-actions { display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; padding: 10px; box-shadow: 0 10px 16px 4px rgba(40,44,63,0.07); border-top: 1px solid #eaeaec; z-index: 10; }
        .m-card:hover .m-actions { display: block; }
        .m-btn { width: 100%; padding: 10px; background: #fff; color: #ff3f6c; border: 1px solid #d4d5d9; border-radius: 2px; font-size: 14px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s; display: flex; justify-content: center; align-items: center; gap: 6px; margin-bottom: 8px; }
        .m-btn:hover { border-color: #ff3f6c; }
        .m-qty-row { display: flex; align-items: center; gap: 4px; margin-bottom: 8px; }
        .m-qty-btn { flex: 1; padding: 8px; background: #f5f5f6; border: none; font-size: 16px; font-weight: 700; cursor: pointer; border-radius: 2px; }
        .m-qty-num { flex: 1; text-align: center; font-size: 14px; font-weight: 700; color: #282c3f; }
        
        .m-mobile-action-bar { display: none; }
        .m-mobile-modal-header { display: none; }
        
        @media (max-width: 1024px) { .myntra-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .myntra-layout { padding: 16px 0; flex-direction: column; overflow-x: hidden; }
          .myntra-sidebar { display: none; }
          .myntra-sidebar.mobile-open { display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #fff; z-index: 10000; padding: 0; height: 100vh; margin: 0; border: none; overflow-y: auto; }
          .m-mobile-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #eaeaec; position: sticky; top: 0; background: #fff; z-index: 10; }
          .m-mobile-modal-header h3 { margin: 0; font-size: 16px; text-transform: uppercase; color: #282c3f; font-weight: 700; }
          .myntra-filter-header { display: none; }
          .myntra-filter-sec { padding: 16px; }
          
          .myntra-main { padding-left: 0; padding-top: 0; width: 100%; }
          .myntra-topbar { padding: 0 16px 16px; flex-direction: column; align-items: flex-start; gap: 12px; display: none; }
          .myntra-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; padding: 0 16px 60px; width: 100%; box-sizing: border-box; }
          .m-card:hover { transform: none; box-shadow: none; }
          .m-actions { display: block; position: static; box-shadow: none; padding: 0; margin-top: 10px; border-top: none; }
          .m-wish { opacity: 1; border: none; background: rgba(255,255,255,0.8); }
          
          .m-brand { font-size: 13px; margin-bottom: 2px; }
          .m-title { font-size: 12px; margin-bottom: 6px; }
          .m-price-row { gap: 4px; }
          .m-price { font-size: 14px; }
          .m-orig { font-size: 11px; }
          .m-disc { font-size: 10px; padding: 1px 4px; background: #fff0f6; border-radius: 4px; }
          .m-btn { font-size: 12px; padding: 8px; }
          .m-qty-btn { padding: 6px; font-size: 14px; }
          .m-rating { font-size: 10px; padding: 3px 5px; bottom: 8px; left: 8px; }
          .m-wish { width: 28px; height: 28px; top: 8px; right: 8px; }
          .m-wish svg { width: 14px; height: 14px; }
          .m-info { padding: 10px 8px 0; }
          
          .m-mobile-action-bar { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10001; height: 50px; border-top: 1px solid #eaeaec; }
          .m-mobile-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: none; border-right: 1px solid #eaeaec; font-size: 14px; font-weight: 700; color: #282c3f; text-transform: uppercase; cursor: pointer; }
          .m-mobile-action-btn:last-child { border-right: none; }
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
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
      </div>

      {!query ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#999", minHeight: "40vh" }}>
          <p style={{ fontSize: "16px" }}>Enter a product name, category, color, or material to search</p>
        </div>
      ) : (
        <>
          {/* MOBILE ACTION BAR */}
          <div className="m-mobile-action-bar">
            <button className="m-mobile-action-btn" onClick={() => { setShowMobileSort(!showMobileSort); setShowMobileFilters(false); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              SORT
            </button>
            <button className="m-mobile-action-btn" onClick={() => { setShowMobileFilters(!showMobileFilters); setShowMobileSort(false); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
              FILTER
            </button>
          </div>

          {/* MOBILE SORT MODAL */}
          {showMobileSort && (
            <div className="myntra-sidebar mobile-open">
              <div className="m-mobile-modal-header">
                <h3>Sort By</h3>
                <button className="myntra-filter-clear" onClick={() => setShowMobileSort(false)}>✕</button>
              </div>
              <div className="myntra-filter-sec" style={{ padding: "0" }}>
                {[
                  { value: "featured", label: "Recommended" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "name-asc", label: "Name: A to Z" }
                ].map(option => (
                  <label key={option.value} className="myntra-radio-label" style={{ padding: "16px", borderBottom: "1px solid #eaeaec", margin: 0, display: "flex", justifyContent: "space-between" }}>
                    {option.label}
                    <input type="radio" className="myntra-radio" checked={sortBy === option.value} onChange={() => { setSortBy(option.value); setCurrentPage(1); setShowMobileSort(false); }} />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="myntra-layout">
            <aside className={`myntra-sidebar ${showMobileFilters ? 'mobile-open' : ''}`}>
              <div className="m-mobile-modal-header">
                <h3>Filters</h3>
                <button className="myntra-filter-clear" onClick={() => setShowMobileFilters(false)}>✕</button>
              </div>
              <div className="myntra-filter-header">
                FILTERS
                <button className="myntra-filter-clear" onClick={() => { setPriceFilter("all"); setColorFilter("all"); }}>CLEAR ALL</button>
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
                  <strong>{query ? `Search: "${query}"` : "All Products"}</strong> - {filteredProducts.length} items
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

              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <div style={{ position: "relative", width: "40px", height: "40px", margin: "0 auto" }}>
                    <div style={{ position: "absolute", inset: 0, border: "3px solid #fdf8ee", borderRadius: "50%" }}></div>
                    <div style={{ position: "absolute", inset: 0, border: "3px solid transparent", borderTopColor: "#D4AF37", borderRightColor: "#D4AF37", borderRadius: "50%", animation: "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}></div>
                  </div>
                  <p style={{ marginTop: "16px", color: "#666", fontSize: "14px" }}>Loading collections...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="myntra-grid">
                    {paginatedProducts.map(product => {
                      const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                      const qty = addedProducts[product.id] || 0;
                      return (
                        <div key={product.id} className="m-card-wrapper">
                          <div className="m-card">
                            <div className="m-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
                              <img src={product.image} alt={product.name} className="m-img" loading="lazy" />
                              {discount > 0 && (
                                <div className="m-rating">
                                  4.{Math.floor(Math.random() * 6) + 3} <svg width="12" height="12" viewBox="0 0 24 24" fill="#00897b" stroke="#00897b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> | {Math.floor(Math.random() * 300) + 20}
                                </div>
                              )}
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
                                <span className="m-price">Rs. {product.price?.toLocaleString('en-IN')}</span>
                                {product.originalPrice > product.price && <span className="m-orig">Rs. {product.originalPrice?.toLocaleString('en-IN')}</span>}
                                {discount > 0 && <span className="m-disc">({discount}% OFF)</span>}
                              </div>
                            </div>
                            <div className="m-actions">
                              {qty > 0 ? (
                                <div className="m-qty-row">
                                  <button className="m-qty-btn" onClick={(e) => { e.stopPropagation(); handleDecrease(product); }}>−</button>
                                  <span className="m-qty-num">{qty}</span>
                                  <button className="m-qty-btn" onClick={(e) => { e.stopPropagation(); handleIncrease(product); }}>+</button>
                                </div>
                              ) : (
                                <button className="m-btn" onClick={(e) => { e.stopPropagation(); handleAddProduct(product); }}>
                                  ADD TO BAG
                                </button>
                              )}
                              <WhatsAppInquiryButton
                                message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
                                phoneNumber={sellersMap[product.sellerId] || "9967670497"}
                                buttonStyle={{ width: "100%", padding: isMobile ? "8px" : "10px", borderRadius: "4px", fontSize: isMobile ? "11px" : "13px", background: "#fff", color: "#282c3f", border: "1px solid #d4d5d9", fontWeight: "700", boxShadow: "none", marginTop: isMobile ? "4px" : "0" }}
                              />
                            </div>
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
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>
                  <p style={{ fontSize: "16px", marginBottom: "20px" }}>No products found for "{query}"</p>
                  <button onClick={() => navigate("/")} style={{ background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                    Back to Home
                  </button>
                </div>
              )}
            </main>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
