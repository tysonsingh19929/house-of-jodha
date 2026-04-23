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
  const [showMobileSort, setShowMobileSort] = useState(false);

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
    },
    jewellery: {
      name: "FINE JEWELLERY", tagline: "Handcrafted Luxury",
      bgGradient: "linear-gradient(135deg, #E6E6FA 0%, #F4F0FC 40%, #FFFFFF 100%)",
      accentColor: "#4B0082", accentMid: "#8A2BE2",
      btnBg: "linear-gradient(135deg, #4B0082, #8A2BE2)",
      qtyBg: "linear-gradient(135deg, #4B0082, #8A2BE2)",
      cardBorder: "#D8BFD8", priceBg: "#F8F4FF", priceColor: "#4B0082",
      badgeBg: "rgba(75,0,130,0.1)", badgeColor: "#4B0082", wishlistActive: "#8A2BE2",
      description: "Exquisite gemstones and intricate designs.",
      tips: "Pair with minimalistic outfits.", icon: "💎",
      pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L22 15 L32 15 L24 21 L27 31 L20 25 L13 31 L16 21 L8 15 L18 15Z' fill='%234B0082' fill-opacity='0.05'/%3E%3C/svg%3E")`
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
          const isJewelleryCat = ['necklaces', 'earrings', 'rings', 'bracelets', 'bridal sets', 'jewellery'].includes(p.category?.toLowerCase());
          const jewelMatch = occasionKey === 'jewellery' && isJewelleryCat;
          return occasionMatch || categoryMatch || jewelMatch;
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

  const displayedProducts = useMemo(() => {
    let res = [...products];
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
        .myntra-filter-clear { font-size: 12px; color: #ff3f6c; font-weight: 700; cursor: pointer; border: none; background: none; text-transform: uppercase; }
        .myntra-filter-sec { padding: 20px 0; border-bottom: 1px solid #eaeaec; }
        .myntra-filter-title { font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        .myntra-radio-label { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #282c3f; margin-bottom: 12px; cursor: pointer; }
        .myntra-radio-label:hover { background: #f4f4f5; }
        .myntra-radio { appearance: none; width: 16px; height: 16px; border: 1px solid #c3c4c6; border-radius: 4px; cursor: pointer; position: relative; margin: 0; }
        .myntra-radio:checked { background-color: #ff3f6c; border-color: #ff3f6c; }
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
        .m-wish:hover { background: #ff3f6c; color: #fff; border-color: #ff3f6c; }
        .m-wish.active { color: #ff3f6c; opacity: 1; border-color: #ff3f6c; background: #fff; }
        .m-wish.active:hover { background: #ff3f6c; color: #fff; }
        
        .m-info { padding: 12px; background: #fff; min-width: 0; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; flex: 1; }
        .m-brand { font-size: 14px; font-weight: 700; margin: 0 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1a1a1a; }
        .m-title { font-size: 13px; color: #666; margin: 0 0 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; flex: 1; white-space: normal; }
        .m-price-row { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; margin-top: auto; }
        .m-price { font-size: 15px; font-weight: 700; color: #1a1a1a; }
        .m-orig { font-size: 12px; color: #999; text-decoration: line-through; }
        .m-disc { font-size: 11px; font-weight: 700; color: #ff3f6c; padding: 2px 6px; background: #fff0f6; border-radius: 4px; }
        
        .m-actions { display: none; background: #fff; padding: 0 12px 12px; min-width: 0; box-sizing: border-box; margin-top: auto; }
        .m-card:hover .m-actions { display: block; }
        .m-btn { width: 100%; padding: 10px; background: #fff; color: #ff3f6c; border: 1px solid #eaeaea; border-radius: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; gap: 6px; margin-bottom: 8px; }
        .m-btn:hover { border-color: #ff3f6c; background: #fff0f6; }
        .m-qty-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .m-qty-btn { flex: 1; padding: 8px; background: #f5f5f6; border: none; font-size: 16px; font-weight: 700; cursor: pointer; border-radius: 6px; color: #1a1a1a; }
        .m-qty-num { flex: 1; text-align: center; font-size: 14px; font-weight: 700; color: #282c3f; }
        
        .m-mobile-action-bar { display: none; }
        .m-mobile-modal-header { display: none; }
        
        @media (max-width: 1024px) { .myntra-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .myntra-layout { padding: 16px 0; flex-direction: column; overflow-x: hidden; }
          .myntra-sidebar { display: none; }
          .myntra-sidebar.mobile-open { display: flex; flex-direction: column; justify-content: flex-end; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; padding: 0; height: 100vh; margin: 0; border: none; overflow: hidden; animation: fadeIn 0.2s ease; }
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
          .m-disc { font-size: 10px; padding: 1px 4px; background: #fff0f6; border-radius: 4px; display: inline-block; }
          
          .m-btn { font-size: 11px; padding: 8px; border-radius: 6px; margin-bottom: 6px; border: 1px solid #eaeaea; }
          .m-qty-row { margin-bottom: 6px; gap: 4px; }
          .m-qty-btn { padding: 6px; font-size: 14px; border-radius: 6px; }
          .m-qty-num { font-size: 13px; }
          
          .m-mobile-action-bar { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10001; height: 50px; border-top: 1px solid #eaeaec; }
          .m-mobile-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: none; border-right: 1px solid #eaeaec; font-size: 14px; font-weight: 700; color: #282c3f; text-transform: uppercase; cursor: pointer; }
          .m-mobile-action-btn:last-child { border-right: none; }
        }
        @keyframes slideUpModal { from { transform: translateY(100%); } to { transform: translateY(0); } }
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
                  <input type="radio" className="myntra-radio" checked={sortBy === option.value} onChange={() => { setSortBy(option.value); setShowMobileSort(false); }} />
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
                        {discount > 0 && (
                          <div className="m-rating">
                            4.{Math.floor(Math.random() * 6) + 3} <svg width="12" height="12" viewBox="0 0 24 24" fill="#00897b" stroke="#00897b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> | {Math.floor(Math.random() * 300) + 20}
                          </div>
                        )}
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
                          buttonStyle={{ width: "100%", padding: isMobile ? "8px" : "10px", borderRadius: "6px", fontSize: isMobile ? "11px" : "13px", background: "#fff", color: "#282c3f", border: "1px solid #eaeaea", fontWeight: "700", boxShadow: "none", marginTop: isMobile ? "4px" : "0" }}
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
