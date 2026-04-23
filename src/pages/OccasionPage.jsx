import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products as masterProducts } from "../data/products.js";
import { enhancedProductDatabase } from "../data/enhancedProductDatabase.js";
import imageDatabase from "../data/imageDatabase.js";

export default function OccasionPage({
  cartCount, onCartClick, onAddToCart, onRemoveProduct, cartItems = [],
  wishlistItems, setWishlistOpen, addToWishlist, removeFromWishlist, isInWishlist
}) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
  const isMobile = window.innerWidth <= 768;
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState({});
  const [sellersMap, setSellersMap] = useState({});
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const occasionDetails = {
    mehendi: {
      name: "MEHENDI", tagline: "Ceremony Collection",
      bgGradient: "linear-gradient(135deg, #A8D5A2 0%, #D4F1D4 40%, #F0FAF0 100%)",
      accentColor: "#1B4332", accentMid: "#4A9E6B",
      btnBg: "linear-gradient(135deg, #1B4332, #2D6A4F)",
      qtyBg: "linear-gradient(135deg, #1B4332, #2D6A4F)",
      cardBorder: "#A8D5A2", priceBg: "#E8F7E8", priceColor: "#1B4332",
      badgeBg: "rgba(27,67,50,0.12)", badgeColor: "#1B4332", wishlistActive: "#1B4332",
      description: "Vibrant & colorful styles for your Mehendi ceremony.",
      tips: "Bright colors look best!", icon: "🌿",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231B4332' fill-opacity='0.06'%3E%3Cpath d='M30 0 C30 0 20 10 30 20 C40 10 30 0 30 0Z'/%3E%3C/g%3E%3C/svg%3E")`
    },
    sangeet: {
      name: "SANGEET", tagline: "Music & Dance Collection",
      bgGradient: "linear-gradient(135deg, #F5C842 0%, #FFF4D6 40%, #FFFDF5 100%)",
      accentColor: "#744A00", accentMid: "#D4911A",
      btnBg: "linear-gradient(135deg, #744A00, #B87333)",
      qtyBg: "linear-gradient(135deg, #744A00, #B87333)",
      cardBorder: "#F5D878", priceBg: "#FFF8E0", priceColor: "#744A00",
      badgeBg: "rgba(116,74,0,0.1)", badgeColor: "#744A00", wishlistActive: "#B87333",
      description: "Elegant, dance-ready outfits for a night of celebration.",
      tips: "Choose comfortable fabrics.", icon: "✨",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23744A00' fill-opacity='0.08'/%3E%3C/svg%3E")`
    },
    wedding: {
      name: "WEDDING", tagline: "Bridal Couture Collection",
      bgGradient: "linear-gradient(135deg, #E8A0B0 0%, #F8D7E0 40%, #FFF5F7 100%)",
      accentColor: "#590D22", accentMid: "#C9374A",
      btnBg: "linear-gradient(135deg, #590D22, #9A1534)",
      qtyBg: "linear-gradient(135deg, #590D22, #9A1534)",
      cardBorder: "#F0A0B5", priceBg: "#FEF0F3", priceColor: "#590D22",
      badgeBg: "rgba(89,13,34,0.1)", badgeColor: "#590D22", wishlistActive: "#9A1534",
      description: "Exquisite bridal wear for the most special day.",
      tips: "Go for heavy embroidery.", icon: "💍",
      pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L22 15 L32 15 L24 21 L27 31 L20 25 L13 31 L16 21 L8 15 L18 15Z' fill='%23590D22' fill-opacity='0.05'/%3E%3C/svg%3E")`
    },
    engagement: {
      name: "ENGAGEMENT", tagline: "Promise & Love Collection",
      bgGradient: "linear-gradient(135deg, #C39BD3 0%, #E9D7F5 40%, #F8F4FF 100%)",
      accentColor: "#3C096C", accentMid: "#7B2FBE",
      btnBg: "linear-gradient(135deg, #3C096C, #7B2FBE)",
      qtyBg: "linear-gradient(135deg, #3C096C, #7B2FBE)",
      cardBorder: "#C8A0E8", priceBg: "#F4EEFF", priceColor: "#3C096C",
      badgeBg: "rgba(60,9,108,0.1)", badgeColor: "#3C096C", wishlistActive: "#7B2FBE",
      description: "Sophisticated looks for your special announcement.",
      tips: "Pastels are trending!", icon: "💜",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='3' fill='%233C096C' fill-opacity='0.06'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%233C096C' fill-opacity='0.06'/%3E%3Ccircle cx='50' cy='10' r='3' fill='%233C096C' fill-opacity='0.06'/%3E%3C/svg%3E")`
    },
    reception: {
      name: "RECEPTION", tagline: "Evening Glamour Collection",
      bgGradient: "linear-gradient(135deg, #B8860B 0%, #F5E6C8 40%, #FFFDF5 100%)",
      accentColor: "#5C3D00", accentMid: "#C9921A",
      btnBg: "linear-gradient(135deg, #5C3D00, #C9921A)",
      qtyBg: "linear-gradient(135deg, #5C3D00, #C9921A)",
      cardBorder: "#E8C97A", priceBg: "#FDF6E3", priceColor: "#5C3D00",
      badgeBg: "rgba(92,61,0,0.1)", badgeColor: "#5C3D00", wishlistActive: "#C9921A",
      description: "Dazzling glamour for your reception night.",
      tips: "Go for bold & sparkly!", icon: "🥂",
      pattern: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='25,5 27,18 40,18 30,26 33,39 25,31 17,39 20,26 10,18 23,18' fill='%235C3D00' fill-opacity='0.06'/%3E%3C/svg%3E")`
    },
    cocktail: {
      name: "COCKTAIL", tagline: "Party & Soirée Collection",
      bgGradient: "linear-gradient(135deg, #7B4FA6 0%, #D8B4FE 40%, #F5F0FF 100%)",
      accentColor: "#3B0764", accentMid: "#8B5CF6",
      btnBg: "linear-gradient(135deg, #3B0764, #7C3AED)",
      qtyBg: "linear-gradient(135deg, #3B0764, #7C3AED)",
      cardBorder: "#C4B5FD", priceBg: "#F3EEFF", priceColor: "#3B0764",
      badgeBg: "rgba(59,7,100,0.1)", badgeColor: "#3B0764", wishlistActive: "#7C3AED",
      description: "Chic & contemporary styles for cocktail evenings.",
      tips: "Minis & midis are in!", icon: "🍸",
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='4' fill='%233B0764' fill-opacity='0.06'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%233B0764' fill-opacity='0.06'/%3E%3C/svg%3E")`
    }
  };

  const occasionKey = occasion?.toLowerCase().trim();
  const d = occasionDetails[occasionKey] || {
    name: occasionKey?.toUpperCase() || "OCCASION", tagline: "Special Collection",
    bgGradient: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
    accentColor: "#333", accentMid: "#888",
    btnBg: "linear-gradient(135deg, #333, #666)", qtyBg: "linear-gradient(135deg, #333, #666)",
    cardBorder: "#ddd", priceBg: "#f5f5f5", priceColor: "#333",
    badgeBg: "rgba(0,0,0,0.08)", badgeColor: "#333", wishlistActive: "#333",
    description: "Curated styles for your special occasion.",
    tips: "Dress to impress!", icon: "👗", pattern: ""
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let dbProducts = [];
      let dbFetched = false;
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (res.ok) {
          dbProducts = await res.json();
          dbFetched = true;
        }
      } catch (e) {
        console.error("Could not fetch DB products", e);
      }

      // Use DB as source of truth if reached, otherwise fallback to static
      const baseList = dbFetched ? dbProducts : [...masterProducts, ...enhancedProductDatabase];

      const filtered = baseList
        .filter(p => {
          const occasionMatch =
            p.occasion?.toLowerCase() === occasionKey ||
            (Array.isArray(p.occasions) && p.occasions.some(o => o.toLowerCase() === occasionKey));
          const categoryMatch = p.category?.toLowerCase() === occasionKey;
          return occasionMatch || categoryMatch;
        })
        .map(p => {
          const master = masterProducts.find(mp => mp.name === p.name) || enhancedProductDatabase.find(mp => mp.name === p.name);
          return {
            ...p,
            image: master?.image || p.image,
            price: master?.price || p.price,
            originalPrice: master?.originalPrice || p.originalPrice,
            // Prioritize id, fallback to _id
            id: p.id || p._id
          };
        });

      // Simple deduplication based on name
      const unique = filtered.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

      // Clean up emoji images so they actually load
      const sanitized = unique.map(p => {
        let img = p.image;
        if (!img || img.length < 10 || (!img.startsWith("http") && !img.startsWith("data:") && !img.startsWith("/"))) {
          const catKey = p.category?.toLowerCase() === "salwar kameez" ? "salwarKameez" : p.category?.toLowerCase();
          const urls = imageDatabase?.[catKey] || imageDatabase?.lehenga || [];
          const numId = typeof p.id === 'number' ? p.id : parseInt(String(p.id).replace(/\D/g, ''), 10) || 0;
          img = urls.length > 0 ? urls[numId % urls.length] : "";
        }
        return { ...p, image: img };
      });

      setProducts(sanitized);
    };

    fetchProducts();
  }, [occasionKey]);

  const displayedProducts = useMemo(() => {
    let res = [...products];
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
  }, [products, priceFilter, colorFilter, sortBy]);

  const handleAddProduct = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    onAddToCart(product);
  };

  const handleIncrease = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedProducts(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    onAddToCart(product);
  };

  const handleDecrease = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div style={{ paddingTop: "64px", minHeight: "100vh", background: "#FAFAFA" }}>
      <Navbar
        cartCount={cartCount}
        onCartClick={onCartClick}
        wishlistCount={wishlistItems.length}
        onWishlistClick={() => setWishlistOpen(true)}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600;700;800&display=swap');

        .occ-header { position: relative; overflow: hidden; background: ${d.bgGradient}; }
        .occ-header::before {
          content: ''; position: absolute; inset: 0;
          background-image: ${d.pattern}; pointer-events: none;
        }
        .occ-back {
          background: rgba(255,255,255,0.5); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.6); color: ${d.accentColor};
          padding: 6px 16px; border-radius: 20px; cursor: pointer;
          font-size: 11px; font-weight: 700; font-family: 'Jost', sans-serif;
          letter-spacing: 1.5px; text-transform: uppercase;
          transition: all 0.2s; display: inline-flex; align-items: center; gap: 5px;
        }
        .occ-back:hover { background: rgba(255,255,255,0.85); transform: translateX(-2px); }
        .occ-name {
          font-family: 'Cormorant Garamond', serif; font-weight: 700;
          color: ${d.accentColor}; font-size: ${isMobile ? "46px" : "72px"};
          line-height: 1; margin: 0; letter-spacing: -1px;
        }
        .occ-tagline {
          font-family: 'Jost', sans-serif; font-weight: 400; font-size: 11px;
          letter-spacing: 4px; text-transform: uppercase; color: ${d.accentMid}; margin: 0;
        }
        .occ-desc {
          font-family: 'Jost', sans-serif; font-size: 14px;
          color: ${d.accentColor}; opacity: 0.8; margin: 0 auto;
          max-width: 280px; line-height: 1.6;
        }
        .occ-tip {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.65); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.8); border-radius: 30px;
          padding: 6px 16px; font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 600; color: ${d.accentColor};
        }
        .occ-divider {
          width: 48px; height: 2px; background: ${d.accentMid};
          opacity: 0.5; margin: 10px auto; border-radius: 2px;
        }
        .occ-count {
          background: ${d.badgeBg}; color: ${d.badgeColor};
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 4px 14px; border-radius: 20px; display: inline-block; margin-bottom: 16px;
        }

        .occ-empty {
          text-align: center; padding: 60px 20px;
          font-family: 'Jost', sans-serif; color: ${d.accentMid};
        }

        /* MYNTRA LAYOUT */
        .myntra-layout { display: flex; max-width: 1400px; margin: 0 auto; gap: 30px; padding: 24px 16px; align-items: flex-start; font-family: 'Inter', sans-serif; }
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
          .myntra-sidebar.show { display: block; border-bottom: 1px solid #eaeaec; padding-bottom: 20px; margin-bottom: 10px; padding: 0 16px; }
          .m-mobile-filter-btn { display: flex; align-items: center; justify-content: center; width: calc(100% - 32px); padding: 12px; background: #fff; border: 1px solid #d4d5d9; font-weight: 700; font-size: 14px; color: #282c3f; margin: 0 16px; cursor: pointer; border-radius: 4px; }
          .myntra-grid { grid-template-columns: repeat(2, 1fr); gap: 16px 12px; padding: 0 16px; }
          .m-card { position: relative; height: 100%; display: flex; flex-direction: column; border-color: #eaeaec; }
          .m-actions { display: flex; position: static; padding: 0 10px 12px; margin-top: auto; box-shadow: none !important; border: none; }
          .m-card:hover { transform: none; box-shadow: none; }
          .m-card:hover .m-actions { position: static; box-shadow: none; }
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HEADER */}
      <div className="occ-header" style={{ padding: "0 0 32px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px 20px 0", textAlign: "center" }}>
          <button className="occ-back" onClick={() => navigate("/")}>← BACK</button>
          <div style={{ marginTop: "20px" }}>
            <p className="occ-tagline">{d.tagline}</p>
            <div className="occ-divider" />
            <h1 className="occ-name">{d.icon} {d.name}</h1>
            <div className="occ-divider" style={{ margin: "12px auto" }} />
            <p className="occ-desc">{d.description}</p>
          </div>
          <div style={{ marginTop: "18px" }}>
            <span className="occ-tip">💡 TIP: {d.tips}</span>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="myntra-layout">
        <button className="m-mobile-filter-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          {showMobileFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
        </button>

        <aside className={`myntra-sidebar ${showMobileFilters ? 'show' : ''}`}>
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
                <input type="radio" className="myntra-radio" checked={priceFilter === price.value} onChange={() => { setPriceFilter(price.value); }} />
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
                <input type="radio" className="myntra-radio" checked={colorFilter === col.value} onChange={() => { setColorFilter(col.value); }} />
                {col.label}
              </label>
            ))}
          </div>
        </aside>

        <main className="myntra-main">
          <div className="myntra-topbar">
            <div className="myntra-count">
              <strong>{d.name}</strong> - {displayedProducts.length} items
            </div>
            <div className="myntra-sort">
              Sort by:
              <select className="myntra-sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); }}>
                <option value="featured">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="occ-empty">
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>{d.icon}</div>
              <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "6px" }}>{products.length > 0 ? "No styles match your filters" : "No styles yet"}</p>
              <p style={{ fontSize: "13px", opacity: 0.7 }}>{products.length > 0 ? "Try adjusting your price range" : "Check back soon for new arrivals"}</p>
              {products.length > 0 && (
                <button onClick={() => { setPriceFilter('all'); setSortBy('featured'); setColorFilter('all'); }} style={{ marginTop: "16px", padding: "8px 16px", background: d.btnBg, color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Clear Filters</button>
              )}
            </div>
          ) : (
            <div className="myntra-grid">
              {displayedProducts.map(product => {
                const qty = addedProducts[product.id] || 0;
                const wishlisted = isInWishlist(product.id);
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div key={product.id} className="m-card-wrapper">
                    <div className="m-card">
                      <div className="m-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
                        <img src={product.image} alt={product.name} className="m-img" loading="lazy" />
                        {discount > 0 && <div className="m-badge">{discount}% OFF</div>}
                        <button className={`m-wish ${wishlisted ? 'active' : ''}`} onClick={(e) => handleWishlistToggle(e, product)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            <button className="m-qty-btn" onClick={(e) => handleDecrease(e, product)}>−</button>
                            <span className="m-qty-num">{qty}</span>
                            <button className="m-qty-btn" onClick={(e) => handleIncrease(e, product)}>+</button>
                          </div>
                        ) : (
                          <button className="m-btn" onClick={(e) => handleAddProduct(e, product)}>
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
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
