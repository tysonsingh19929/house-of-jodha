import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import SizeChart from "../components/SizeChart";
import { products } from "../data/products.js";

// SVG Icons
const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconReturn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconZoomIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconZoomOut = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconRuler = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#E91E63" : "none"} stroke={filled ? "#E91E63" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconTag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconStar = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconThread = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 8v4l3 3"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/>
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pd-root * { box-sizing: border-box; }

  .pd-root {
    --gold: #B8860B;
    --gold-light: #DAA520;
    --gold-pale: #fdf8ee;
    --rose: #880E4F;
    --rose-light: #E91E63;
    --rose-pale: #fff0f6;
    --dark: #1a0010;
    --text: #2d2020;
    --muted: #7a6a6a;
    --border: #ede8e0;
    --bg: #fafaf8;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    padding-top: 64px;
    color: var(--text);
  }

  /* ── BREADCRUMB ── */
  .pd-breadcrumb {
    padding: 14px 28px;
    font-size: 12px;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.3px;
    max-width: 1400px;
    margin: 0 auto;
  }
  .pd-breadcrumb a {
    color: var(--rose);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .pd-breadcrumb a:hover { opacity: 0.7; }
  .pd-breadcrumb-sep { color: var(--border); font-size: 16px; }

  /* ── MAIN LAYOUT ── */
  .pd-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    padding: 40px 56px;
    max-width: 1400px;
    margin: 0 auto;
    align-items: start;
  }
  @media (max-width: 768px) {
    .pd-main { grid-template-columns: 1fr; gap: 24px; padding: 20px 16px; }
    .pd-breadcrumb { padding: 12px 16px; }
  }

  /* ── IMAGE COLUMN ── */
  .pd-image-main {
    position: relative;
    background: var(--bg);
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 3/4;
    cursor: zoom-in;
    margin-bottom: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .pd-image-main.zoomed { cursor: zoom-out; }
  .pd-image-main img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .pd-image-main.zoomed img { transform: scale(1.35); }
  .pd-zoom-btn {
    position: absolute; bottom: 14px; right: 14px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    border: none; border-radius: 10px;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text);
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    transition: all 0.2s;
  }
  .pd-zoom-btn:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(0,0,0,0.18); }

  /* Discount badge on image */
  .pd-discount-badge {
    position: absolute; top: 14px; left: 14px;
    background: linear-gradient(135deg, #E91E63, #880E4F);
    color: #fff; font-size: 11px; font-weight: 700;
    padding: 5px 10px; border-radius: 8px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(233,30,99,0.35);
  }

  .pd-thumbnails {
    display: flex; gap: 8px;
  }
  .pd-thumb {
    flex: 1; aspect-ratio: 3/4;
    border-radius: 8px; overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--bg);
  }
  .pd-thumb.active { border-color: var(--rose); }
  .pd-thumb:not(.active):hover { border-color: var(--border); transform: translateY(-2px); }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

  /* ── INFO COLUMN ── */
  .pd-category-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    background: var(--gold-pale); border: 1px solid #e8d89a;
    padding: 5px 10px; border-radius: 20px;
    margin-bottom: 14px;
  }
  .pd-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 600; color: var(--dark);
    line-height: 1.2; margin: 0 0 10px 0;
  }
  .pd-rating {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 20px;
  }
  .pd-stars { display: flex; gap: 2px; }
  .pd-review-count { font-size: 12px; color: var(--muted); }

  /* Price */
  .pd-price-section {
    padding: 18px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }
  .pd-price-row {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .pd-price-current {
    font-size: 34px; font-weight: 700; color: var(--dark);
  }
  .pd-price-original {
    font-size: 16px; color: #bbb;
    text-decoration: line-through;
  }
  .pd-price-save {
    font-size: 11px; font-weight: 700; color: #E91E63;
    background: #fff0f6; padding: 3px 8px; border-radius: 6px;
  }
  .pd-price-note { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* Social proof */
  .pd-social-proof {
    display: flex; align-items: center; gap: 10px;
    background: var(--rose-pale);
    border: 1px solid #f8bbd9;
    border-radius: 10px; padding: 11px 14px;
    margin-bottom: 20px;
    color: var(--rose);
  }
  .pd-social-proof-icon {
    width: 32px; height: 32px;
    background: rgba(233,30,99,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pd-social-title { font-size: 13px; font-weight: 600; }
  .pd-social-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }

  /* Size */
  .pd-section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;
  }
  .pd-size-guide-btn {
    display: inline-flex; align-items: center; gap: 5px;
    background: transparent; border: 1px solid var(--rose);
    color: var(--rose); padding: 4px 10px; font-size: 10px;
    font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
    border-radius: 6px; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .pd-size-guide-btn:hover { background: var(--rose); color: #fff; }

  .pd-sizes {
    display: grid; grid-template-columns: repeat(6, 1fr);
    gap: 7px; margin-bottom: 20px;
  }
  .pd-size-btn {
    padding: 10px 0; text-align: center;
    background: #f7f5f2; color: var(--text);
    border: 1.5px solid var(--border);
    border-radius: 8px; cursor: pointer;
    font-weight: 600; font-size: 12px;
    transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .pd-size-btn:hover:not(.selected) {
    border-color: var(--rose); background: #fff; color: var(--rose);
  }
  .pd-size-btn.selected {
    background: var(--dark); color: #fff;
    border-color: var(--dark);
    box-shadow: 0 2px 8px rgba(26,0,16,0.25);
  }

  /* Quantity */
  .pd-qty-row {
    display: flex; align-items: center; gap: 0;
    border: 1.5px solid var(--border); border-radius: 10px;
    width: fit-content; overflow: hidden; margin-bottom: 22px;
  }
  .pd-qty-btn {
    width: 40px; height: 40px;
    background: #f7f5f2; border: none;
    cursor: pointer; font-size: 18px; font-weight: 600;
    color: var(--rose); display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .pd-qty-btn:hover { background: var(--rose-pale); }
  .pd-qty-input {
    width: 52px; height: 40px; border: none;
    border-left: 1.5px solid var(--border);
    border-right: 1.5px solid var(--border);
    text-align: center; font-size: 15px;
    font-weight: 600; color: var(--text);
    background: #fff; outline: none;
    font-family: 'DM Sans', sans-serif;
  }

  /* CTA Buttons */
  .pd-btn-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .pd-btn {
    flex: 1; padding: 14px 20px;
    font-size: 12px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    border-radius: 10px; cursor: pointer;
    transition: all 0.25s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .pd-btn-outline {
    background: #fff; color: var(--rose);
    border: 2px solid var(--rose);
  }
  .pd-btn-outline:hover {
    background: var(--rose); color: #fff;
    box-shadow: 0 6px 20px rgba(136,14,79,0.2);
    transform: translateY(-1px);
  }
  .pd-btn-solid {
    background: var(--dark); color: #fff;
    border: 2px solid var(--dark);
  }
  .pd-btn-solid:hover {
    background: #2d0014;
    box-shadow: 0 6px 20px rgba(26,0,16,0.3);
    transform: translateY(-1px);
  }
  .pd-btn-solid.success {
    background: #16a34a; border-color: #16a34a;
  }
  .pd-btn-wishlist {
    width: 100%; background: #fff;
    color: #E91E63; border: 2px solid #E91E63;
    margin-bottom: 10px;
  }
  .pd-btn-wishlist:hover, .pd-btn-wishlist.active {
    background: #E91E63; color: #fff;
    box-shadow: 0 6px 20px rgba(233,30,99,0.2);
    transform: translateY(-1px);
  }

  /* Trust badges */
  .pd-trust {
    margin-top: 20px; padding-top: 18px;
    border-top: 1px solid var(--border);
    display: flex; flex-direction: column; gap: 12px;
  }
  .pd-trust-item {
    display: flex; align-items: center; gap: 12px;
  }
  .pd-trust-icon {
    width: 36px; height: 36px;
    background: var(--gold-pale);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
  }
  .pd-trust-title { font-size: 13px; font-weight: 600; color: var(--text); }
  .pd-trust-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }

  /* ── PRODUCT INFO SECTION ── */
  .pd-info-section {
    background: var(--bg);
    padding: 40px 56px;
    margin: 0;
    border-top: 1px solid var(--border);
  }
  @media (max-width: 768px) { .pd-info-section { padding: 24px 16px; } }
  .pd-info-section h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 600;
    color: var(--dark); margin: 0 0 28px 0;
    max-width: 1400px; margin: 0 auto 28px;
  }
  .pd-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    max-width: 1400px; margin: 0 auto;
  }
  @media (max-width: 768px) { .pd-info-grid { grid-template-columns: 1fr; } }
  .pd-info-card {
    background: #fff;
    border-radius: 14px;
    padding: 22px 24px;
    border: 1px solid var(--border);
  }
  .pd-info-card-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px; padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    color: var(--gold);
  }
  .pd-info-card-title {
    font-size: 13px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--text);
  }
  .pd-info-row { font-size: 13px; color: #555; margin: 6px 0; line-height: 1.6; }
  .pd-info-row strong { color: var(--text); font-weight: 600; }
  .pd-info-note {
    background: var(--gold-pale); border: 1px solid #e8d89a;
    border-radius: 10px; padding: 14px 16px;
    font-size: 13px; color: #5a4a00; line-height: 1.6;
    margin-top: 20px; max-width: 1400px; margin: 20px auto 0;
  }

  /* ── BOTTOM FEATURES STRIP ── */
  .pd-features-strip {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    max-width: 100%;
  }
  @media (max-width: 768px) { .pd-features-strip { grid-template-columns: 1fr; } }
  .pd-feature-item {
    text-align: center; padding: 28px 20px;
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
  }
  .pd-feature-item:last-child { border-right: none; }
  .pd-feature-icon {
    width: 44px; height: 44px;
    background: var(--gold-pale); border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin: 0 auto 4px;
  }
  .pd-feature-title { font-size: 13px; font-weight: 700; color: var(--dark); }
  .pd-feature-sub { font-size: 11px; color: var(--muted); }
`;

export default function ProductDetail({
  cartOpen, setCartOpen, addToCart, removeFromCart, cartItems, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist,
  onCartClick, onWishlistClick
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [viewingCount] = useState(Math.floor(Math.random() * 30) + 10);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = window.innerWidth <= 768;

  const media = product ? [
    { type: 'image', src: product.image },
    ...(product.videoUrl ? [{ type: 'video', src: product.videoUrl }] : [{ type: 'image', src: product.image }]),
    { type: 'image', src: product.image },
    { type: 'image', src: product.image }
  ] : [];

  useEffect(() => {
    const fetchLiveProduct = async () => {
      const fallback = products.find(p => p.id === parseInt(productId) || p.id === productId);
      
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://house-of-jodha-backend.onrender.com/api'}/products`);
        if (res.ok) {
           const liveDb = await res.json();
           // Try to find by Mongo ID or identically match the name from the local database
           const liveMatch = liveDb.find(p => p._id === productId || (fallback && p.name === fallback.name));
           
           if (liveMatch) {
              setProduct({ ...fallback, ...liveMatch, id: fallback?.id || liveMatch._id });
              setLoading(false);
              return;
           }
        }
      } catch (e) {
        console.error('Failed to sync live DB, using local fallback', e);
      }
      
      setProduct(fallback || null);
      setLoading(false);
    };

    fetchLiveProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !addToCart) return;
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    for (let i = 0; i < qty; i++) addToCart({ ...product, size: selectedSize });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!product || !addToCart) return;
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    for (let i = 0; i < qty; i++) addToCart({ ...product, size: selectedSize });
    setQuantity(1);
    navigate("/checkout");
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const inWishlist = isInWishlist && product && isInWishlist(product.id);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "15px", color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
      Loading…
    </div>
  );

  if (!product) return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h2>Product Not Found</h2>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );

  return (
    <div className="pd-root">
      <style>{styles}</style>

      <Navbar
        cartCount={cartCount}
        onCartClick={onCartClick || (() => setCartOpen(!cartOpen))}
        wishlistCount={wishlistCount}
        onWishlistClick={onWishlistClick || (() => setWishlistOpen(!wishlistOpen))}
      />

      {cartOpen && <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />}
      {wishlistOpen && (
        <Wishlist items={wishlistItems} onRemove={removeFromWishlist} onClose={() => setWishlistOpen(false)} onAddToCart={addToCart} />
      )}

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <a onClick={() => navigate("/")}>Home</a>
        <span className="pd-breadcrumb-sep">/</span>
        <a onClick={() => navigate(`/collection/${product.category.toLowerCase()}`)}>{product.category}</a>
        <span className="pd-breadcrumb-sep">/</span>
        <span>{product.name.substring(0, 38)}{product.name.length > 38 ? "…" : ""}</span>
      </div>

      {/* Main Grid */}
      <div className="pd-main">

        {/* ── LEFT: Image ── */}
        <div>
          {media.length > 0 && media[activeIndex].type === 'image' ? (
            <div className={`pd-image-main${zoom ? " zoomed" : ""}`} onClick={() => setZoom(!zoom)}>
              <img src={media[activeIndex].src} alt={product.name} loading="lazy" />
              {discount > 0 && <div className="pd-discount-badge">−{discount}% OFF</div>}
              <button className="pd-zoom-btn">{zoom ? <IconZoomOut /> : <IconZoomIn />}</button>
            </div>
          ) : (
            media.length > 0 && (
              <div className="pd-media-embed" style={{ width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", backgroundColor: "#000", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                {media[activeIndex].src.includes("instagram.com") ? (
                  <iframe src={media[activeIndex].src.split('?')[0].replace(/\/$/, '') + "/embed"} width="100%" height="800" frameBorder="0" scrolling="no" allowTransparency="true" style={{ display: "block" }}></iframe>
                ) : media[activeIndex].src.includes("youtube.com") || media[activeIndex].src.includes("youtu.be") ? (
                   <iframe src={media[activeIndex].src.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} width="100%" height="100%" style={{ minHeight: "400px" }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ display: "block" }}></iframe>
                ) : (
                  <video src={media[activeIndex].src} controls style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                )}
              </div>
            )
          )}

          <div className="pd-thumbnails">
            {media.map((item, i) => (
              <div 
                key={i} 
                className={`pd-thumb${activeIndex === i ? " active" : ""}`}
                onClick={() => { setActiveIndex(i); setZoom(false); }}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <img src={product.image} alt={`View ${i + 1}`} loading="lazy" style={{ opacity: item.type === 'video' ? 0.7 : 1 }} />
                {item.type === 'video' && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Info ── */}
        <div>
          {/* Category tag */}
          <div className="pd-category-tag">
            <IconTag /> {product.category}
          </div>

          {/* Name */}
          <h1 className="pd-name">{product.name}</h1>

          {/* Rating */}
          <div className="pd-rating">
            <div className="pd-stars">
              {[1,2,3,4,5].map(i => <IconStar key={i} filled={i <= 5} />)}
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#F59E0B" }}>4.8</span>
            <span className="pd-review-count">({product.reviews || 324} reviews)</span>
          </div>

          {/* Price */}
          <div className="pd-price-section">
            <div className="pd-price-row">
              <span className="pd-price-current">₹{product.price.toLocaleString()}</span>
              <span className="pd-price-original">₹{product.originalPrice.toLocaleString()}</span>
              {discount > 0 && <span className="pd-price-save">Save {discount}%</span>}
            </div>
            <p className="pd-price-note">Inclusive of all taxes • Free shipping above ₹5000</p>
          </div>

          {/* Social proof */}
          <div className="pd-social-proof">
            <div className="pd-social-proof-icon"><IconUsers /></div>
            <div>
              <p className="pd-social-title">{viewingCount} people are viewing this right now</p>
              <p className="pd-social-sub">Don't miss out — limited stock available</p>
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="pd-section-label">
              Select Size
              <button className="pd-size-guide-btn" onClick={() => setSizeChartOpen(true)}>
                <IconRuler /> Size Guide
              </button>
            </div>
            <div className="pd-sizes">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`pd-size-btn${selectedSize === size ? " selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pd-section-label" style={{ marginBottom: "10px" }}>Quantity</div>
          <div className="pd-qty-row">
            <button className="pd-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <input
              type="number" min="1" max="99"
              value={quantity}
              className="pd-qty-input"
              onChange={e => {
                const v = e.target.value;
                if (v === "") return;
                const n = parseInt(v, 10);
                if (!isNaN(n) && n > 0) setQuantity(Math.min(n, 99));
              }}
              onBlur={e => {
                let v = parseInt(e.target.value, 10);
                if (isNaN(v) || v < 1) v = 1;
                else if (v > 99) v = 99;
                setQuantity(v);
              }}
            />
            <button className="pd-qty-btn" onClick={() => setQuantity(Math.min(99, quantity + 1))}>+</button>
          </div>

          {/* CTA Buttons */}
          <div className="pd-btn-row">
            <button className="pd-btn pd-btn-outline" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className={`pd-btn pd-btn-solid${addedToCart ? " success" : ""}`} onClick={handleAddToCart}>
              {addedToCart ? <><IconCheck /> Added!</> : "Add to Cart"}
            </button>
          </div>

          <button
            className={`pd-btn pd-btn-wishlist${inWishlist ? " active" : ""}`}
            onClick={() => {
              if (inWishlist) removeFromWishlist(product.id);
              else addToWishlist(product);
            }}
          >
            <IconHeart filled={inWishlist} />
            {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>


          <WhatsAppInquiryButton
            message={`Hi! I'm interested in: ${product.name} — ₹${product.price}. Size: ${selectedSize}`}
            buttonStyle={{ width: "100%", padding: "12px 24px", marginTop: "0" }}
          />

          {/* Trust badges */}
          <div className="pd-trust">
            <div className="pd-trust-item">
              <div className="pd-trust-icon"><IconTruck /></div>
              <div>
                <p className="pd-trust-title">Free Shipping in India</p>
                <p className="pd-trust-sub">On all orders above ₹5000</p>
              </div>
            </div>
            <div className="pd-trust-item">
              <div className="pd-trust-icon"><IconReturn /></div>
              <div>
                <p className="pd-trust-title">30-Day Easy Returns</p>
                <p className="pd-trust-sub">No questions asked</p>
              </div>
            </div>
            <div className="pd-trust-item">
              <div className="pd-trust-icon"><IconLock /></div>
              <div>
                <p className="pd-trust-title">Secure Checkout</p>
                <p className="pd-trust-sub">100% encrypted payment gateway</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      {product && (
        <div className="pd-info-section">
          <h2>Product Details</h2>
          
          {product.description && (
            <p style={{ fontSize: "15px", color: "var(--text)", lineHeight: "1.6", marginBottom: "24px" }}>
              {product.description}
            </p>
          )}

          {(product.fabricDetails || product.care || product.embroidery || product.deliveryDays || product.material) && (
            <div className="pd-info-grid">
              {(product.fabricDetails || product.care || product.material) && (
                <div className="pd-info-card">
                  <div className="pd-info-card-header">
                    <IconThread />
                    <span className="pd-info-card-title">Fabric & Care</span>
                  </div>
                  {product.material && <p className="pd-info-row"><strong>Material:</strong> {product.material}</p>}
                  {product.fabricDetails?.top && <p className="pd-info-row"><strong>Top:</strong> {product.fabricDetails.top}</p>}
                  {product.fabricDetails?.bottom && <p className="pd-info-row"><strong>Bottom:</strong> {product.fabricDetails.bottom}</p>}
                  {product.fabricDetails?.dupatta && <p className="pd-info-row"><strong>Dupatta:</strong> {product.fabricDetails.dupatta}</p>}
                  {product.fabricDetails?.blouse && <p className="pd-info-row"><strong>Blouse:</strong> {product.fabricDetails.blouse}</p>}
                  {product.fabricDetails?.saree && <p className="pd-info-row"><strong>Saree:</strong> {product.fabricDetails.saree}</p>}
                  {product.care && <p className="pd-info-row" style={{ marginTop: "12px" }}><strong>Care:</strong> {product.care}</p>}
                </div>
              )}
              
              {(product.embroidery || product.deliveryDays) && (
                <div className="pd-info-card">
                  <div className="pd-info-card-header">
                    <IconSparkle />
                    <span className="pd-info-card-title">Embroidery & Delivery</span>
                  </div>
                  {product.embroidery && <p className="pd-info-row"><strong>Embellishments:</strong> {product.embroidery}</p>}
                  {product.deliveryType && <p className="pd-info-row"><strong>Delivery Type:</strong> {product.deliveryType}</p>}
                  {product.deliveryDays && <p className="pd-info-row"><strong>Delivery Time:</strong> {product.deliveryDays}</p>}
                  {product.freeShipping && <p className="pd-info-row" style={{ color: "#16a34a", fontWeight: "600" }}><IconCheck /> Free Shipping Available</p>}
                  {product.maxBustSize && <p className="pd-info-row"><strong>Max Standard Size:</strong> {product.maxBustSize} bust</p>}
                  {product.customFitAvailable && <p className="pd-info-row" style={{ color: "#B8860B", fontWeight: "600" }}>✦ Custom Fit Available</p>}
                </div>
              )}
            </div>
          )}
          {product.notes && (
            <div className="pd-info-note">
              <strong>Note:</strong> {product.notes}
            </div>
          )}
        </div>
      )}



      <SizeChart isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
      <Footer />
    </div>
  );
}