import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import SizeChart from "../components/SizeChart";
import { products } from "../data/products.js";

/* ─── SVG ICONS ─────────────────────────────────────────────── */
const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconReturn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUsers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconRuler = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#C0186C" : "none"} stroke={filled ? "#C0186C" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconStar = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#D4A017" : "none"} stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconTag = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

/* ─── STYLES ─────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pd2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .pd2 {
    --gold:        #B8860B;
    --gold-light:  #D4A017;
    --gold-pale:   #fdf8ee;
    --rose:        #8B0E4A;
    --rose-mid:    #C0186C;
    --rose-pale:   #fef0f6;
    --dark:        #160010;
    --text:        #1e1414;
    --sub:         #5c4d4d;
    --muted:       #9a8a8a;
    --border:      #ede8e0;
    --surface:     #fafaf8;
    --white:       #ffffff;
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text);
    padding-top: 64px;
  }

  /* ── BREADCRUMB ── */
  .pd2-crumb {
    max-width: 1320px; margin: 0 auto;
    padding: 12px 40px;
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: var(--muted);
    letter-spacing: 0.2px;
    border-bottom: 1px solid var(--border);
  }
  .pd2-crumb a {
    color: var(--rose); font-weight: 600;
    cursor: pointer; text-decoration: none;
    transition: opacity 0.2s;
  }
  .pd2-crumb a:hover { opacity: 0.65; }
  .pd2-crumb-sep { color: var(--muted); opacity: 0.5; font-size: 10px; }
  @media (max-width: 768px) { .pd2-crumb { padding: 10px 16px; } }

  /* ── MAIN LAYOUT ── */
  .pd2-layout {
    max-width: 1320px; margin: 0 auto;
    display: grid;
    grid-template-columns: 52% 1fr;
    gap: 0;
    align-items: start;
    min-height: 80vh;
  }
  @media (max-width: 900px) {
    .pd2-layout { grid-template-columns: 1fr; }
  }

  /* ── IMAGE PANEL ── */
  .pd2-gallery {
    position: sticky; top: 64px;
    padding: 32px 40px 32px 40px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    min-height: calc(100vh - 64px);
    display: flex; flex-direction: column; gap: 10px;
  }
  @media (max-width: 900px) {
    .pd2-gallery { position: static; min-height: unset; border-right: none; border-bottom: 1px solid var(--border); padding: 20px 16px; }
  }

  .pd2-main-img {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 3/4;
    background: var(--border);
    cursor: zoom-in;
    flex-shrink: 0;
  }
  .pd2-main-img.zoomed { cursor: zoom-out; }
  .pd2-main-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }
  .pd2-main-img.zoomed img { transform: scale(1.4); }

  .pd2-badge-row {
    position: absolute; top: 14px; left: 14px;
    display: flex; gap: 7px; align-items: center;
  }
  .pd2-badge-discount {
    background: var(--rose-mid);
    color: #fff; font-size: 10px; font-weight: 700;
    padding: 4px 9px; border-radius: 20px;
    letter-spacing: 0.4px;
  }
  .pd2-badge-new {
    background: var(--dark);
    color: #fff; font-size: 10px; font-weight: 700;
    padding: 4px 9px; border-radius: 20px;
    letter-spacing: 0.4px;
  }

  .pd2-thumbs {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  .pd2-thumb {
    aspect-ratio: 3/4; border-radius: 8px; overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer; background: var(--border);
    transition: all 0.18s;
  }
  .pd2-thumb.active { border-color: var(--rose); }
  .pd2-thumb:not(.active):hover { border-color: var(--gold); transform: translateY(-2px); }
  .pd2-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── INFO PANEL ── */
  .pd2-info {
    padding: 36px 44px 56px;
    display: flex; flex-direction: column; gap: 0;
  }
  @media (max-width: 768px) { .pd2-info { padding: 24px 16px 40px; } }

  /* ── CATEGORY + NAME ── */
  .pd2-cat {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 10px;
  }
  .pd2-cat-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--gold); }

  .pd2-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3.5vw, 36px);
    font-weight: 600; color: var(--dark);
    line-height: 1.18; margin-bottom: 14px;
    letter-spacing: -0.3px;
  }

  /* Rating row */
  .pd2-rating {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 22px; padding-bottom: 22px;
    border-bottom: 1px solid var(--border);
  }
  .pd2-stars { display: flex; gap: 2px; }
  .pd2-rating-score { font-size: 13px; font-weight: 700; color: var(--gold-light); }
  .pd2-rating-count { font-size: 12px; color: var(--muted); }
  .pd2-rating-divider { width: 1px; height: 12px; background: var(--border); }

  /* ── PRICE ── */
  .pd2-price-block { margin-bottom: 22px; }
  .pd2-price-row {
    display: flex; align-items: baseline; gap: 10px;
    flex-wrap: wrap; margin-bottom: 4px;
  }
  .pd2-price { font-size: 36px; font-weight: 700; color: var(--dark); letter-spacing: -1px; }
  .pd2-price-orig { font-size: 16px; color: #c0b0b0; text-decoration: line-through; }
  .pd2-price-save {
    font-size: 10px; font-weight: 700; color: var(--rose-mid);
    background: var(--rose-pale); border: 1px solid #f4c6df;
    padding: 3px 8px; border-radius: 20px; letter-spacing: 0.3px;
  }
  .pd2-price-note { font-size: 11px; color: var(--muted); }

  /* ── SOCIAL PROOF PILL ── */
  .pd2-proof {
    display: flex; align-items: center; gap: 8px;
    background: var(--rose-pale);
    border: 1px solid #f4c6df;
    border-radius: 10px; padding: 10px 14px;
    margin-bottom: 26px;
  }
  .pd2-proof-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--rose-mid); flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(192,24,108,0.15);
    animation: pulse-dot 2s infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 3px rgba(192,24,108,0.15); }
    50% { box-shadow: 0 0 0 6px rgba(192,24,108,0.07); }
  }
  .pd2-proof-text { font-size: 12px; font-weight: 600; color: var(--rose); }
  .pd2-proof-sub { font-size: 11px; color: var(--muted); margin-left: auto; }

  /* ── DIVIDER LABEL ── */
  .pd2-label {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 10px;
  }
  .pd2-label-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 10px;
  }
  .pd2-label-row .pd2-label { margin-bottom: 0; }

  /* ── SIZE GUIDE BTN ── */
  .pd2-size-guide {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
    text-transform: uppercase; color: var(--rose);
    border: 1px solid currentColor; border-radius: 6px;
    padding: 4px 9px; background: transparent; cursor: pointer;
    transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .pd2-size-guide:hover { background: var(--rose); color: #fff; border-color: var(--rose); }

  /* ── SIZES ── */
  .pd2-sizes {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-bottom: 26px;
  }
  .pd2-size {
    min-width: 46px; height: 42px; padding: 0 8px;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid var(--border);
    border-radius: 8px; cursor: pointer;
    font-weight: 600; font-size: 12px; letter-spacing: 0.3px;
    color: var(--text); background: var(--white);
    transition: all 0.16s; font-family: 'DM Sans', sans-serif;
  }
  .pd2-size:hover:not(.active) { border-color: var(--rose-mid); color: var(--rose-mid); background: var(--rose-pale); }
  .pd2-size.active {
    background: var(--dark); color: #fff;
    border-color: var(--dark);
    box-shadow: 0 3px 10px rgba(22,0,16,0.22);
  }

  /* ── QTY + CTA ROW ── */
  .pd2-action-row {
    display: grid; grid-template-columns: auto 1fr 1fr;
    gap: 10px; margin-bottom: 12px; align-items: stretch;
  }
  @media (max-width: 480px) {
    .pd2-action-row { grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; }
    .pd2-qty-wrap { grid-column: 1 / -1; }
  }

  /* Qty */
  .pd2-qty-wrap {
    display: flex; align-items: center;
    border: 1.5px solid var(--border); border-radius: 10px;
    overflow: hidden; background: var(--white);
  }
  .pd2-qty-btn {
    width: 40px; height: 48px; border: none; background: transparent;
    cursor: pointer; font-size: 17px; font-weight: 500;
    color: var(--rose); display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .pd2-qty-btn:hover { background: var(--rose-pale); }
  .pd2-qty-val {
    width: 44px; text-align: center; border: none; outline: none;
    font-size: 14px; font-weight: 600; color: var(--text);
    background: transparent; font-family: 'DM Sans', sans-serif;
    border-left: 1.5px solid var(--border);
    border-right: 1.5px solid var(--border);
  }

  /* Buttons */
  .pd2-btn {
    height: 48px; padding: 0 16px;
    border-radius: 10px; cursor: pointer;
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; border: 2px solid transparent;
    font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: all 0.22s; white-space: nowrap;
  }
  .pd2-btn-outline {
    background: var(--white); color: var(--rose);
    border-color: var(--rose);
  }
  .pd2-btn-outline:hover {
    background: var(--rose); color: #fff;
    box-shadow: 0 6px 18px rgba(139,14,74,0.22);
    transform: translateY(-1px);
  }
  .pd2-btn-solid {
    background: var(--dark); color: #fff;
    border-color: var(--dark);
  }
  .pd2-btn-solid:hover {
    background: #2a0018;
    box-shadow: 0 6px 20px rgba(22,0,16,0.3);
    transform: translateY(-1px);
  }
  .pd2-btn-solid.added { background: #15803d; border-color: #15803d; }

  /* Secondary actions row */
  .pd2-secondary-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 22px;
  }
  .pd2-btn-wish {
    background: var(--white); color: var(--rose-mid);
    border-color: #f4c6df;
  }
  .pd2-btn-wish:hover, .pd2-btn-wish.active {
    background: var(--rose-mid); color: #fff; border-color: var(--rose-mid);
    box-shadow: 0 6px 18px rgba(192,24,108,0.2);
    transform: translateY(-1px);
  }
  .pd2-btn-whatsapp {
    background: var(--white); color: #1a7a3a;
    border: 2px solid #c5e8cc;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
  }
  .pd2-btn-whatsapp:hover {
    background: #1a7a3a; color: #fff; border-color: #1a7a3a;
    transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,122,58,0.2);
  }

  /* ── TRUST STRIP ── */
  .pd2-trust {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 10px; margin-top: 4px;
    padding-top: 20px; border-top: 1px solid var(--border);
  }
  .pd2-trust-item {
    display: flex; flex-direction: column; align-items: center;
    gap: 6px; padding: 14px 8px;
    background: var(--surface); border-radius: 10px;
    border: 1px solid var(--border); text-align: center;
  }
  .pd2-trust-icon {
    color: var(--gold);
    width: 32px; height: 32px;
    background: var(--gold-pale); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .pd2-trust-title { font-size: 11px; font-weight: 700; color: var(--text); line-height: 1.3; }
  .pd2-trust-sub { font-size: 10px; color: var(--muted); line-height: 1.3; }

  /* ── PRODUCT DETAILS SECTION ── */
  .pd2-details {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 52px 40px 60px;
  }
  .pd2-details-inner { max-width: 1320px; margin: 0 auto; }
  .pd2-details-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 600; color: var(--dark);
    margin-bottom: 32px; letter-spacing: -0.2px;
  }
  @media (max-width: 768px) { .pd2-details { padding: 32px 16px 40px; } }

  .pd2-desc {
    font-size: 14.5px; color: var(--sub);
    line-height: 1.75; margin-bottom: 32px;
    max-width: 720px;
  }

  .pd2-detail-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  @media (max-width: 640px) { .pd2-detail-grid { grid-template-columns: 1fr; } }

  .pd2-detail-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
  }
  .pd2-detail-card-head {
    padding: 14px 18px;
    background: var(--gold-pale); border-bottom: 1px solid #e8d89a;
    display: flex; align-items: center; gap: 8px;
  }
  .pd2-detail-card-icon { color: var(--gold); }
  .pd2-detail-card-ttl {
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--text);
  }
  .pd2-detail-card-body { padding: 18px; }
  .pd2-detail-row { font-size: 13px; color: var(--sub); margin: 5px 0; line-height: 1.6; }
  .pd2-detail-row strong { color: var(--text); font-weight: 600; }

  .pd2-note {
    margin-top: 20px; padding: 16px 18px;
    background: var(--gold-pale); border: 1px solid #e8d89a;
    border-radius: 10px; font-size: 13px; color: #5a4a00; line-height: 1.65;
  }

  /* ── BOTTOM FEATURE BAND ── */
  .pd2-feat-band {
    background: var(--dark);
    display: grid; grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  @media (max-width: 640px) { .pd2-feat-band { grid-template-columns: 1fr; } }
  .pd2-feat {
    padding: 28px 24px; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .pd2-feat:last-child { border-right: none; }
  .pd2-feat-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(184,134,11,0.15);
    display: flex; align-items: center; justify-content: center; color: var(--gold-light);
  }
  .pd2-feat-ttl { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.9); letter-spacing: 0.3px; }
  .pd2-feat-sub { font-size: 11px; color: rgba(255,255,255,0.4); }
`;

/* ─── COMPONENT ─────────────────────────────────────────────── */
export default function ProductDetail({
  cartOpen, setCartOpen, addToCart, removeFromCart, cartItems, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount,
  addToWishlist, removeFromWishlist, isInWishlist,
  onCartClick, onWishlistClick
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [viewingCount] = useState(() => Math.floor(Math.random() * 28) + 12);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(productId));
    setProduct(found || null);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !addToCart) return;
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    for (let i = 0; i < qty; i++) addToCart({ ...product, size: selectedSize });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!product || !addToCart) return;
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    for (let i = 0; i < qty; i++) addToCart({ ...product, size: selectedSize });
    navigate("/checkout");
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const inWishlist = isInWishlist && product && isInWishlist(product.id);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#9a8a8a" }}>
      Loading…
    </div>
  );
  if (!product) return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "16px" }}>Product Not Found</h2>
      <button onClick={() => navigate("/")} style={{ padding: "10px 22px", cursor: "pointer" }}>← Back to Home</button>
    </div>
  );

  const ThreadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 8v4l3 3"/>
    </svg>
  );
  const SparkleIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
    </svg>
  );

  return (
    <div className="pd2">
      <style>{styles}</style>

      <Navbar
        cartCount={cartCount}
        onCartClick={onCartClick || (() => setCartOpen(!cartOpen))}
        wishlistCount={wishlistCount}
        onWishlistClick={onWishlistClick || (() => setWishlistOpen(!wishlistOpen))}
      />

      {cartOpen && <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />}
      {wishlistOpen && <Wishlist items={wishlistItems} onRemove={removeFromWishlist} onClose={() => setWishlistOpen(false)} onAddToCart={addToCart} />}

      {/* Breadcrumb */}
      <nav className="pd2-crumb">
        <a onClick={() => navigate("/")}>Home</a>
        <span className="pd2-crumb-sep"><IconChevron /></span>
        <a onClick={() => navigate(`/collection/${product.category.toLowerCase()}`)}>{product.category}</a>
        <span className="pd2-crumb-sep"><IconChevron /></span>
        <span style={{ color: "#5c4d4d" }}>{product.name.length > 40 ? product.name.substring(0, 40) + "…" : product.name}</span>
      </nav>

      {/* Main Layout */}
      <div className="pd2-layout">

        {/* ── LEFT: Gallery ── */}
        <div className="pd2-gallery">
          <div className={`pd2-main-img${zoom ? " zoomed" : ""}`} onClick={() => setZoom(!zoom)}>
            <img src={product.image} alt={product.name} loading="eager" />
            <div className="pd2-badge-row">
              {discount > 0 && <span className="pd2-badge-discount">−{discount}%</span>}
            </div>
          </div>

          <div className="pd2-thumbs">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`pd2-thumb${activeThumb === i ? " active" : ""}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={product.image} alt={`View ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="pd2-info">

          {/* Category + Name */}
          <div className="pd2-cat">
            <IconTag /> {product.category} <span className="pd2-cat-dot" />
          </div>
          <h1 className="pd2-name">{product.name}</h1>

          {/* Rating */}
          <div className="pd2-rating">
            <div className="pd2-stars">
              {[1,2,3,4,5].map(i => <IconStar key={i} filled={i <= 5} />)}
            </div>
            <span className="pd2-rating-score">4.8</span>
            <span className="pd2-rating-divider" />
            <span className="pd2-rating-count">{product.reviews || 324} reviews</span>
          </div>

          {/* Price */}
          <div className="pd2-price-block">
            <div className="pd2-price-row">
              <span className="pd2-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="pd2-price-orig">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {discount > 0 && <span className="pd2-price-save">Save {discount}%</span>}
            </div>
            <p className="pd2-price-note">Inclusive of taxes · Free shipping on orders above ₹5000</p>
          </div>

          {/* Social proof */}
          <div className="pd2-proof">
            <div className="pd2-proof-dot" />
            <span className="pd2-proof-text">{viewingCount} people viewing right now</span>
            <span className="pd2-proof-sub">Limited stock</span>
          </div>

          {/* Size */}
          <div className="pd2-label-row">
            <span className="pd2-label">Select Size</span>
            <button className="pd2-size-guide" onClick={() => setSizeChartOpen(true)}>
              <IconRuler /> Size Guide
            </button>
          </div>
          <div className="pd2-sizes">
            {sizes.map(s => (
              <button
                key={s}
                className={`pd2-size${selectedSize === s ? " active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Qty + CTAs */}
          <div className="pd2-label" style={{ marginBottom: "10px" }}>Quantity &amp; Add to Cart</div>
          <div className="pd2-action-row">
            <div className="pd2-qty-wrap">
              <button className="pd2-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <input
                type="number" min="1" max="99"
                value={quantity}
                className="pd2-qty-val"
                onChange={e => { const n = parseInt(e.target.value); if (!isNaN(n) && n > 0) setQuantity(Math.min(n, 99)); }}
                onBlur={e => { let v = parseInt(e.target.value); if (isNaN(v) || v < 1) setQuantity(1); }}
              />
              <button className="pd2-qty-btn" onClick={() => setQuantity(q => Math.min(99, q + 1))}>+</button>
            </div>

            <button className="pd2-btn pd2-btn-outline" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className={`pd2-btn pd2-btn-solid${addedToCart ? " added" : ""}`} onClick={handleAddToCart}>
              {addedToCart ? <><IconCheck /> Added!</> : "Add to Cart"}
            </button>
          </div>

          {/* Wishlist + WhatsApp */}
          <div className="pd2-secondary-row">
            <button
              className={`pd2-btn pd2-btn-wish${inWishlist ? " active" : ""}`}
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
            >
              <IconHeart filled={inWishlist} />
              {inWishlist ? "Saved" : "Wishlist"}
            </button>

            <WhatsAppInquiryButton
              message={`Hi! I'm interested in: ${product.name} — ₹${product.price}. Size: ${selectedSize}`}
              buttonStyle={{ height: "48px", width: "100%", borderRadius: "10px", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}
            />
          </div>

          {/* Trust badges */}
          <div className="pd2-trust">
            <div className="pd2-trust-item">
              <div className="pd2-trust-icon"><IconTruck /></div>
              <span className="pd2-trust-title">Free Shipping</span>
              <span className="pd2-trust-sub">Orders above ₹5000</span>
            </div>
            <div className="pd2-trust-item">
              <div className="pd2-trust-icon"><IconReturn /></div>
              <span className="pd2-trust-title">30-Day Returns</span>
              <span className="pd2-trust-sub">No questions asked</span>
            </div>
            <div className="pd2-trust-item">
              <div className="pd2-trust-icon"><IconLock /></div>
              <span className="pd2-trust-title">Secure Pay</span>
              <span className="pd2-trust-sub">Encrypted gateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      {product && (
        <div className="pd2-details">
          <div className="pd2-details-inner">
            <h2 className="pd2-details-title">Product Details</h2>

            {product.description && (
              <p className="pd2-desc">{product.description}</p>
            )}

            {(product.fabricDetails || product.care || product.embroidery || product.deliveryDays || product.material) && (
              <div className="pd2-detail-grid">
                {(product.fabricDetails || product.care || product.material) && (
                  <div className="pd2-detail-card">
                    <div className="pd2-detail-card-head">
                      <span className="pd2-detail-card-icon"><ThreadIcon /></span>
                      <span className="pd2-detail-card-ttl">Fabric &amp; Care</span>
                    </div>
                    <div className="pd2-detail-card-body">
                      {product.material && <p className="pd2-detail-row"><strong>Material:</strong> {product.material}</p>}
                      {product.fabricDetails?.top && <p className="pd2-detail-row"><strong>Top:</strong> {product.fabricDetails.top}</p>}
                      {product.fabricDetails?.bottom && <p className="pd2-detail-row"><strong>Bottom:</strong> {product.fabricDetails.bottom}</p>}
                      {product.fabricDetails?.dupatta && <p className="pd2-detail-row"><strong>Dupatta:</strong> {product.fabricDetails.dupatta}</p>}
                      {product.fabricDetails?.blouse && <p className="pd2-detail-row"><strong>Blouse:</strong> {product.fabricDetails.blouse}</p>}
                      {product.fabricDetails?.saree && <p className="pd2-detail-row"><strong>Saree:</strong> {product.fabricDetails.saree}</p>}
                      {product.care && <p className="pd2-detail-row" style={{ marginTop: "10px" }}><strong>Care:</strong> {product.care}</p>}
                    </div>
                  </div>
                )}

                {(product.embroidery || product.deliveryDays) && (
                  <div className="pd2-detail-card">
                    <div className="pd2-detail-card-head">
                      <span className="pd2-detail-card-icon"><SparkleIcon /></span>
                      <span className="pd2-detail-card-ttl">Embroidery &amp; Delivery</span>
                    </div>
                    <div className="pd2-detail-card-body">
                      {product.embroidery && <p className="pd2-detail-row"><strong>Embellishments:</strong> {product.embroidery}</p>}
                      {product.deliveryType && <p className="pd2-detail-row"><strong>Delivery Type:</strong> {product.deliveryType}</p>}
                      {product.deliveryDays && <p className="pd2-detail-row"><strong>Delivery Time:</strong> {product.deliveryDays}</p>}
                      {product.freeShipping && <p className="pd2-detail-row" style={{ color: "#15803d", fontWeight: "600", marginTop: "10px" }}>✓ Free Shipping Available</p>}
                      {product.maxBustSize && <p className="pd2-detail-row"><strong>Max Standard Size:</strong> {product.maxBustSize} bust</p>}
                      {product.customFitAvailable && <p className="pd2-detail-row" style={{ color: "#B8860B", fontWeight: "600" }}>✦ Custom Fit Available</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {product.notes && (
              <div className="pd2-note">
                <strong>Note:</strong> {product.notes}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Feature Band */}
      <div className="pd2-feat-band">
        <div className="pd2-feat">
          <div className="pd2-feat-icon"><IconTruck /></div>
          <span className="pd2-feat-ttl">Pan-India Delivery</span>
          <span className="pd2-feat-sub">All major cities covered</span>
        </div>
        <div className="pd2-feat">
          <div className="pd2-feat-icon"><IconReturn /></div>
          <span className="pd2-feat-ttl">Hassle-Free Returns</span>
          <span className="pd2-feat-sub">Within 30 days of delivery</span>
        </div>
        <div className="pd2-feat">
          <div className="pd2-feat-icon"><IconLock /></div>
          <span className="pd2-feat-ttl">Trusted Checkout</span>
          <span className="pd2-feat-sub">SSL encrypted & secure</span>
        </div>
      </div>

      <SizeChart isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
      <Footer />
    </div>
  );
}