import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WhatsAppInquiryButton from "./WhatsAppInquiryButton.jsx";
import { products } from "../data/products.js";

const PRODUCTS_PER_PAGE = 12;

const ProductCard = ({ product, onAddToCart, onRemoveProduct, addedProducts, handleAddProduct, handleIncreaseQuantity, handleDecreaseQuantity, isMobile, navigate }) => {
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const qty = addedProducts[product.id] || addedProducts[product._id] || 0;

  return (
    <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #eaeaea", transition: "transform 0.2s", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: "#f5f5f6", cursor: "pointer" }} onClick={() => navigate(`/product/${product._id || product.id}`)}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        {discount > 0 && (
          <div style={{ position: "absolute", top: "10px", left: "10px", background: "#D4AF37", color: "#fff", fontSize: "10px", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
            {discount}% OFF
          </div>
        )}
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "11px", color: "#888", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>{product.sellerName || "The Sringar House"}</h3>
        <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "600", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer" }} onClick={() => navigate(`/product/${product._id || product.id}`)}>{product.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{ fontWeight: "700", color: "#1a1a1a", fontSize: "16px" }}>₹{product.price?.toLocaleString()}</span>
          {product.originalPrice > product.price && <span style={{ fontSize: "12px", color: "#999", textDecoration: "line-through" }}>₹{product.originalPrice?.toLocaleString()}</span>}
        </div>
        <div style={{ marginTop: "auto" }}>
          {qty > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
              <button onClick={(e) => { e.stopPropagation(); handleDecreaseQuantity(product); }} style={{ flex: 1, padding: "8px", background: "#f5f5f5", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>-</button>
              <span style={{ flex: 1, textAlign: "center", fontSize: "14px", fontWeight: "600" }}>{qty}</span>
              <button onClick={(e) => { e.stopPropagation(); handleIncreaseQuantity(product); }} style={{ flex: 1, padding: "8px", background: "#f5f5f5", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>+</button>
            </div>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); handleAddProduct(product); }} style={{ width: "100%", padding: "10px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "13px", marginBottom: "8px" }}>Add to Bag</button>
          )}
          <WhatsAppInquiryButton
            message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}.`}
            buttonStyle={{ width: "100%", padding: "8px", borderRadius: "6px", fontSize: "12px", background: "#fff", color: "#1a1a1a", border: "1px solid #eaeaea", fontWeight: "700", boxShadow: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProductCatalog({ onAddToCart, onRemoveProduct, addToWishlist, removeFromWishlist, isInWishlist }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery || "All");
  const [expandedFilterMenu, setExpandedFilterMenu] = useState("Women's Ethnic Wear");
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
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [dbFetched, setDbFetched] = useState(false);
  const [sellersMap, setSellersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
      if (["Necklaces", "Earrings", "Rings", "Bracelets", "Bridal Sets"].includes(categoryQuery)) {
        setExpandedFilterMenu("Fine Jewellery");
      } else {
        setExpandedFilterMenu("Women's Ethnic Wear");
      }
    } else {
      setSelectedCategory("All");
    }
  }, [categoryQuery]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

    // 1. Check local cache first for an instant load
    const cachedData = localStorage.getItem("diva_catalog_cache");
    if (cachedData) {
      try {
        setDbProducts(JSON.parse(cachedData));
        setDbFetched(true);
        setLoading(false);
      } catch (e) { console.error("Cache read error", e); }
    }

    // 2. Fetch fresh data in the background
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setDbProducts(arr);
        setDbFetched(true);
        setLoading(false);
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
      .catch(err => {
        console.error(err);
        setDbFetched(true);
        setLoading(false);
      });

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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest('.m-mobile-action-btn')) return;
      if (e.target.closest('.myntra-sidebar-inner')) return;
      setShowMobileSort(false);
      setShowMobileFilters(false);
    };
    if (showMobileSort || showMobileFilters) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showMobileSort, showMobileFilters]);

  const handleAddProduct = (product) => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentQty = addedProducts[product.id] || addedProducts[product._id] || 0;
    if (currentQty >= stock) {
      alert(`Only ${stock} unit(s) available in stock.`);
      return;
    }
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentQty = addedProducts[product.id] || addedProducts[product._id] || 0;
    if (currentQty >= stock) {
      alert(`Only ${stock} unit(s) available in stock.`);
      return;
    }
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

  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Jewellery", "Gharara", "Sharara"];
  const isJewelleryCat = (cat) => ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Bridal Sets', 'Jewellery'].includes(cat);

  const filteredProducts = useMemo(() => {
    let res = selectedCategory === "All"
      ? [...allProducts].sort((a, b) => {
        const aIsLehenga = a.category?.toLowerCase() === "lehenga";
        const bIsLehenga = b.category?.toLowerCase() === "lehenga";
        if (aIsLehenga && !bIsLehenga) return -1;
        if (!aIsLehenga && bIsLehenga) return 1;
        return 0;
      })
      : selectedCategory === "Jewellery"
        ? allProducts.filter(p => isJewelleryCat(p.category))
        : allProducts.filter(p => p.category === selectedCategory);

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
    <div id="products" style={{ padding: isMobile ? "20px 0" : "60px 0", background: "#fff", fontFamily: "'Assistant', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Cormorant+Garamond:wght@600;700&display=swap');
        .myntra-layout { display: flex; max-width: 1400px; margin: 0 auto; padding: 0 24px; align-items: flex-start; font-family: 'Assistant', sans-serif; color: #282c3f; box-sizing: border-box; width: 100%; }
        .myntra-sidebar { width: 250px; flex-shrink: 0; position: sticky; top: 80px; border-right: 1px solid #eaeaec; padding-right: 20px; margin-right: 24px; height: calc(100vh - 80px); overflow-y: auto; }
        .myntra-sidebar::-webkit-scrollbar { display: none; }
        .myntra-main { flex: 1; min-width: 0; padding-top: 10px; width: 100%; box-sizing: border-box; }
        .myntra-topbar { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; margin-bottom: 24px; }
        .myntra-count { font-size: 16px; font-weight: 700; }
        .myntra-count span { font-weight: 400; color: #535766; }
        .myntra-sort { display: flex; align-items: center; padding: 10px 14px; border: 1px solid #d4d5d9; border-radius: 6px; font-size: 14px; cursor: pointer; background: #fff; }
        .myntra-sort-select { border: none; outline: none; font-weight: 700; color: #282c3f; background: transparent; cursor: pointer; margin-left: 6px; font-family: 'Assistant', sans-serif; }
        .myntra-filter-header { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700; padding-bottom: 16px; border-bottom: 1px solid #eaeaec; text-transform: uppercase; }
        .myntra-filter-clear { font-size: 12px; color: #B8860B; font-weight: 700; cursor: pointer; border: none; background: none; text-transform: uppercase; }
        .myntra-filter-sec { padding: 20px 0; border-bottom: 1px solid #eaeaec; }
        .myntra-filter-title { font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        .myntra-radio-label { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #282c3f; margin-bottom: 12px; cursor: pointer; }
        .myntra-radio-label:hover { background: #fdf8ee; color: #B8860B; }
        .myntra-radio { appearance: none; width: 16px; height: 16px; border: 1px solid #c3c4c6; border-radius: 4px; cursor: pointer; position: relative; margin: 0; }
        .myntra-radio:checked { background-color: #B8860B; border-color: #B8860B; }
        .myntra-radio:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        
        .myntra-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 20px; width: 100%; box-sizing: border-box; }
        .m-card-wrapper { position: relative; min-width: 0; width: 100%; display: flex; }
        .m-card { position: relative; background: #fff; transition: box-shadow 0.2s ease, transform 0.2s ease; cursor: pointer; display: flex; flex-direction: column; height: 100%; min-width: 0; width: 100%; overflow: hidden; border-radius: 12px; border: 1px solid #f0f0f0; }
        .m-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: translateY(-4px); z-index: 10; }
        .m-img-wrap { position: relative; width: 100%; aspect-ratio: 3/4; background: #f5f5f6; overflow: hidden; }
        .m-img { width: 100%; height: 100%; object-fit: cover; }
        .m-rating { position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); font-size: 11px; font-weight: 700; padding: 4px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px; z-index: 2; pointer-events: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .m-wish { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; background: #fff; border: 1px solid #eaeaea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666; opacity: 0; transition: all 0.2s ease; z-index: 3; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .m-card:hover .m-wish { opacity: 1; }
        .m-wish:hover { background: #E91E63; color: #fff; border-color: #E91E63; }
        .m-wish.active { color: #E91E63; opacity: 1; border-color: #E91E63; background: #fff; }
        .m-wish.active:hover { background: #E91E63; color: #fff; }
        
        .m-info { padding: 12px; background: #fff; min-width: 0; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; flex: 1; }
        .m-brand { font-size: 14px; font-weight: 700; margin: 0 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1a1a1a; }
        .m-title { font-size: 13px; color: #666; margin: 0 0 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; flex: 1; white-space: normal; }
        .m-price-row { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; margin-top: auto; }
        .m-price { font-size: 15px; font-weight: 700; color: #1a1a1a; }
        .m-orig { font-size: 12px; color: #999; text-decoration: line-through; }
        .m-disc { font-size: 11px; font-weight: 700; color: #B8860B; padding: 2px 6px; background: #fdf8ee; border-radius: 4px; }
        
        .m-actions { display: none; background: #fff; padding: 0 12px 12px; min-width: 0; box-sizing: border-box; margin-top: auto; }
        .m-card:hover .m-actions { display: block; }
        .m-btn { width: 100%; padding: 10px; background: #fff; color: #1a1a1a; border: 1px solid #1a1a1a; border-radius: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; gap: 6px; margin-bottom: 8px; }
        .m-btn:hover { border-color: #B8860B; background: #B8860B; color: #fff; }
        .m-qty-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .m-qty-btn { flex: 1; padding: 8px; background: #f5f5f6; border: none; font-size: 16px; font-weight: 700; cursor: pointer; border-radius: 6px; color: #1a1a1a; }
        .m-qty-num { flex: 1; text-align: center; font-size: 14px; font-weight: 700; color: #282c3f; }
        
        .m-mobile-action-bar { display: none; }
        .m-mobile-modal-header { display: none; }
        
        @media (max-width: 1024px) { .myntra-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .myntra-layout { padding: 16px 0; flex-direction: column; overflow-x: hidden; }
          .myntra-sidebar { display: none; }
      .myntra-sidebar.mobile-open { display: flex; flex-direction: column; justify-content: flex-end; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: transparent; z-index: 10000; padding: 0; height: 100vh; margin: 0; border: none; overflow: hidden; animation: fadeIn 0.2s ease; }
          .myntra-sidebar-inner { background: #fff; width: 100%; max-height: 85vh; overflow-y: auto; border-radius: 20px 20px 0 0; padding-bottom: 70px; animation: slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .m-mobile-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #eaeaec; position: sticky; top: 0; background: #fff; z-index: 10; }
          .m-mobile-modal-header h3 { margin: 0; font-size: 16px; text-transform: uppercase; color: #282c3f; font-weight: 700; }
          .myntra-filter-header { display: none; }
          .myntra-filter-sec { padding: 16px; }
          
          .myntra-main { padding-left: 0; padding-top: 0; width: 100%; }
          .myntra-topbar { padding: 0 16px 12px; flex-direction: column; align-items: flex-start; gap: 10px; display: none; }
          .myntra-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 8px; padding: 0 12px 70px; width: 100%; box-sizing: border-box; }
          
          .m-card { border-radius: 8px; border: 1px solid #f0f0f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: none; }
          .m-card:hover { transform: none; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
          .m-actions { display: block; padding: 0 10px 10px; margin-top: 0; border: none; box-shadow: none; position: static; }
          .m-wish { opacity: 1; border: none; background: rgba(255,255,255,0.85); width: 28px; height: 28px; top: 8px; right: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
          .m-wish svg { width: 14px; height: 14px; }
          .m-rating { font-size: 10px; padding: 3px 5px; bottom: 8px; left: 8px; }
          
          .m-info { padding: 10px 10px 8px; flex: 1; display: flex; flex-direction: column; }
          .m-brand { font-size: 12px; margin-bottom: 2px; }
          .m-title { font-size: 11px; margin-bottom: 8px; line-height: 1.3; }
          .m-price-row { gap: 4px; margin-top: auto; }
          .m-price { font-size: 13px; }
          .m-orig { font-size: 11px; }
          .m-disc { font-size: 10px; padding: 1px 4px; background: #fdf8ee; color: #B8860B; border-radius: 4px; display: inline-block; }
          
          .m-btn { font-size: 11px; padding: 8px; border-radius: 6px; margin-bottom: 6px; border: 1px solid #eaeaea; }
          .m-qty-row { margin-bottom: 6px; gap: 4px; }
          .m-qty-btn { padding: 6px; font-size: 14px; border-radius: 6px; }
          .m-qty-num { font-size: 13px; }
          
          .m-mobile-action-bar { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10001; height: 50px; border-top: 1px solid #eaeaec; }
          .m-mobile-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: none; border-right: 1px solid #eaeaec; font-size: 14px; font-weight: 700; color: #282c3f; text-transform: uppercase; cursor: pointer; }
          .m-mobile-action-btn:last-child { border-right: none; }
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes slideUpModal { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* LUX PASS Ticker */}
      <div className="lux-marquee-wrapper" style={{
        position: "relative",
        maxWidth: "600px",
        margin: "0 auto 16px auto",
        height: "38px",
        background: "linear-gradient(90deg, #fff0f6, #fff, #fff0f6)",
        borderRadius: "8px",
        border: "1px solid rgba(233, 30, 99, 0.2)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(233, 30, 99, 0.05)",
        cursor: "pointer"
      }}>
        <style>{`
          @keyframes luxMarquee {
            0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
          }
          .lux-marquee-content {
                    display: flex;
                    width: max-content;
                    animation: luxMarquee 15s linear infinite;
            will-change: transform;
          }
          .lux-marquee-wrapper:hover .lux-marquee-content {
            animation-play-state: paused;
          }
                  .lux-marquee-item {
                    padding-right: 40px;
                    white-space: nowrap;
                    font-size: 12px;
                    font-weight: 600;
                    color: #555;
                    letter-spacing: 0.5px;
                  }
        `}</style>
        <div className="lux-marquee-content">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="lux-marquee-item">
              <span style={{ color: "#E91E63", fontSize: "14px", verticalAlign: "middle", marginRight: "6px" }}>✦</span>
              GET <span style={{ color: "#1a1a1a", fontWeight: "800" }}>LUX PASS</span> FOR JUST ₹1 — ENJOY <span style={{ color: "#E91E63", fontWeight: "800" }}>10% OFF</span> EVERY ORDER & EARLY UPDATES ON NEW ARRIVALS
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar — navigates to /search */}
      <form ref={searchWrapperRef} onSubmit={(e) => handleSearchSubmit(e)} style={{ position: "relative", maxWidth: "600px", margin: isMobile ? "0 auto 16px auto" : "0 auto 32px auto" }}>
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
      <div style={{ textAlign: "center", marginBottom: isMobile ? "12px" : "32px" }}>
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
        <div className="myntra-sidebar mobile-open" onClick={() => setShowMobileSort(false)}>
          <div className="myntra-sidebar-inner" onClick={e => e.stopPropagation()}>
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
        </div>
      )}

      <div className="myntra-layout">
        <aside className={`myntra-sidebar ${showMobileFilters ? 'mobile-open' : ''}`} onClick={() => showMobileFilters && setShowMobileFilters(false)}>
          <div className={showMobileFilters ? "myntra-sidebar-inner" : ""} onClick={e => showMobileFilters && e.stopPropagation()}>
            <div className="m-mobile-modal-header">
              <h3>Filters</h3>
              <button className="myntra-filter-clear" onClick={() => setShowMobileFilters(false)}>✕</button>
            </div>
            <div className="myntra-filter-header">
              FILTERS
              <button className="myntra-filter-clear" onClick={() => { setSelectedCategory("All"); setPriceFilter("all"); setColorFilter("all"); setSearchParams({}); }}>CLEAR ALL</button>
            </div>

            <div className="myntra-filter-sec" style={{ padding: "16px 0" }}>
              <div className="myntra-filter-title" style={{ padding: "0 20px" }}>Categories</div>

              {[
                {
                  label: "Women's Ethnic Wear",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6L12 2z" />
                    </svg>
                  ),
                  options: ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"]
                },
                {
                  label: "Fine Jewellery",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                      <path d="M2 9h20" />
                      <path d="M12 21l-4-12" />
                      <path d="M12 21l4-12" />
                      <path d="M6 3l2 6" />
                      <path d="M18 3l-2 6" />
                    </svg>
                  ),
                  options: ["Necklaces", "Earrings", "Rings", "Bracelets", "Bridal Sets"]
                }
              ].map(group => {
                const isExpanded = expandedFilterMenu === group.label;
                return (
                  <div key={group.label} style={{ marginBottom: "4px", padding: "0 12px" }}>
                    <div
                      onClick={() => setExpandedFilterMenu(isExpanded ? null : group.label)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 12px", background: isExpanded ? "#fdf8ee" : "transparent",
                        color: isExpanded ? "#B8860B" : "#282c3f",
                        borderRadius: "8px", cursor: "pointer",
                        fontWeight: "600", fontSize: "14px", transition: "all 0.2s"
                      }}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = "#f8f9fa"; }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {group.icon}
                        {group.label}
                      </div>
                      <svg style={{ transform: isExpanded ? "rotate(-180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    <div style={{
                      maxHeight: isExpanded ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease-in-out",
                      paddingLeft: "34px"
                    }}>
                      <div style={{ padding: "8px 0" }}>
                        {group.options.map(cat => (
                          <label key={cat} style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "6px 0", cursor: "pointer", fontSize: "13px",
                            color: selectedCategory === cat ? "#B8860B" : "#555",
                            fontWeight: selectedCategory === cat ? "600" : "500",
                            transition: "all 0.2s"
                          }}
                            onMouseEnter={e => { if (selectedCategory !== cat) e.currentTarget.style.color = "#B8860B"; e.currentTarget.style.transform = "translateX(4px)"; }}
                            onMouseLeave={e => { if (selectedCategory !== cat) e.currentTarget.style.color = "#555"; e.currentTarget.style.transform = "translateX(0)"; }}
                          >
                            <input
                              type="radio"
                              name="category_filter"
                              checked={selectedCategory === cat}
                              onChange={() => {
                                setSelectedCategory(cat);
                                setSearchParams(cat === "All" ? {} : { category: cat });
                                if (typeof setCurrentPage !== "undefined") { setCurrentPage(1); }
                              }}
                              style={{
                                appearance: "none", width: "14px", height: "14px",
                                border: selectedCategory === cat ? "4px solid #B8860B" : "1px solid #cbd5e1",
                                borderRadius: "50%", cursor: "pointer", transition: "all 0.2s",
                                margin: 0, flexShrink: 0
                              }}
                            />
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                            buttonStyle={{ width: "100%", padding: isMobile ? "8px" : "10px", borderRadius: "6px", fontSize: isMobile ? "11px" : "13px", background: "#fff", color: "#282c3f", border: "1px solid #eaeaea", fontWeight: "700", boxShadow: "none", marginTop: isMobile ? "4px" : "0" }}
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
