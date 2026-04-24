import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import WhatsAppInquiryButton from "../components/WhatsAppInquiryButton.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import SizeChart from "../components/SizeChart";
import { products } from "../data/products.js";
import imageDatabase from "../data/imageDatabase.js";

// SVG Icons
const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const IconReturn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconZoomIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const IconZoomOut = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const IconRuler = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z" /><path d="m7.5 10.5 2 2" /><path d="m10.5 7.5 2 2" /><path d="m13.5 4.5 2 2" /><path d="m4.5 13.5 2 2" />
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#E91E63" : "none"} stroke={filled ? "#E91E63" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconTag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconStar = ({ filled, size = "13" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconThread = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" /><path d="M12 8v4l3 3" />
  </svg>
);
const IconSparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z" /><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" />
  </svg>
);
const IconDiamond = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    <path d="M2 9h20" />
    <path d="M12 21l-4-12" />
    <path d="M12 21l4-12" />
    <path d="M6 3l2 6" />
    <path d="M18 3l-2 6" />
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
    display: flex; gap: 8px; scrollbar-width: none;
  }
  .pd-thumbnails::-webkit-scrollbar { display: none; }
  .pd-thumb {
    flex: 0 0 calc(25% - 6px); aspect-ratio: 3/4;
    border-radius: 8px; overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer; position: relative;
    transition: all 0.2s;
    background: var(--bg);
  }
  .pd-thumb.active { border-color: var(--rose); }
  .pd-thumb:not(.active):hover { border-color: var(--border); transform: translateY(-2px); }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }
  
  .pd-swipe-gallery {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    border-radius: 12px;
    background: #000;
    scroll-behavior: smooth;
  }
  .pd-swipe-gallery::-webkit-scrollbar { display: none; }
  .pd-swipe-item {
    flex: 0 0 100%;
    min-width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    display: flex; align-items: center; justify-content: center;
    aspect-ratio: 0.75;
  }
  .pd-swipe-item img {
    width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;
  }
  .pd-swipe-item.zoomed img { transform: scale(1.35); cursor: zoom-out; }
  
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

  /* ── PREMIUM TRUST SECTION ── */
  .pd-trust {
    margin-top: 32px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
  }
  .pd-trust-item {
    display: flex; align-items: center; gap: 20px;
    padding: 18px 4px;
    border-bottom: 1px solid #f4f4f4;
  }
  .pd-trust-item:last-child { border-bottom: none; }
  .pd-trust-icon {
    width: 28px; height: 28px;
    color: #111;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pd-trust-icon svg { width: 22px; height: 22px; stroke-width: 1.2px; }
  .pd-trust-title { font-size: 13px; font-weight: 600; color: #111; letter-spacing: 0.5px; text-transform: uppercase; }
  .pd-trust-sub { font-size: 13px; color: #666; margin-top: 2px; }

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

  /* ── REVIEWS SECTION ── */
  .pd-reviews-section {
    background: #fff;
    padding: 80px 56px;
    border-top: 1px solid var(--border);
  }
  @media (max-width: 768px) { .pd-reviews-section { padding: 40px 20px; } }
  .pd-reviews-header {
    text-align: center;
    margin-bottom: 48px;
  }
  .pd-reviews-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 600;
    color: var(--dark); margin: 0 0 12px 0;
  }
  .pd-reviews-header p { color: var(--muted); font-size: 15px; margin: 0; }

  .pd-reviews-container {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 350px 1fr; gap: 60px;
    align-items: start;
  }
  @media (max-width: 900px) { .pd-reviews-container { grid-template-columns: 1fr; gap: 40px; } }

  .pd-review-form-wrap {
    background: var(--bg);
    padding: 32px;
    border-radius: 20px;
    border: 1px solid var(--border); position: sticky; top: 100px;
  }
  .pd-review-input {
    width: 100%; padding: 14px 16px; border: 1.5px solid transparent; background: #fff;
    border-radius: 12px; margin-bottom: 16px; font-family: inherit; font-size: 14px;
    outline: none; box-sizing: border-box; transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }
  .pd-review-input:focus { border-color: var(--gold); box-shadow: 0 4px 12px rgba(184, 134, 11, 0.1); }
  .pd-review-submit {
    width: 100%; background: var(--dark); color: #fff; border: none; padding: 16px;
    border-radius: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s; font-size: 13px; margin-top: 8px;
  }
  .pd-review-submit:hover { background: #2d0014; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(26,0,16,0.2); }
  .pd-interactive-stars { display: flex; gap: 6px; margin-bottom: 24px; cursor: pointer; }
  .pd-interactive-star { transition: transform 0.2s; }
  .pd-interactive-star:hover { transform: scale(1.15); }

  .pd-review-list { display: flex; flex-direction: column; gap: 24px; }
  .pd-review-card {
    padding: 32px; border: 1px solid var(--border); border-radius: 20px;
    background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: all 0.3s;
  }
  .pd-review-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.05); border-color: #e2d8c3; }
  .pd-review-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .pd-review-avatar-wrap { display: flex; align-items: center; gap: 16px; }
  .pd-review-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold-pale), #f4e8c1);
    color: var(--gold); display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700;
  }
  .pd-review-meta h4 { margin: 0 0 4px 0; font-size: 16px; color: var(--dark); font-weight: 700; }
  .pd-review-verified { font-size: 12px; color: #16a34a; display: flex; align-items: center; gap: 4px; font-weight: 600; }
  .pd-review-date { font-size: 13px; color: var(--muted); }
  .pd-review-text { font-size: 15px; color: #444; line-height: 1.8; margin: 16px 0 0 0; font-style: italic; }

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
  cartCount, onCartClick, wishlistCount, onWishlistClick,
  cartOpen, setCartOpen, cartItems, removeFromCart,
  wishlistOpen, setWishlistOpen, wishlistItems, removeFromWishlist, addToCart,
  addToWishlist, isInWishlist
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [playingVideo, setPlayingVideo] = useState({});
  const [activeThumb, setActiveThumb] = useState(0);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [viewingCount] = useState(() => Math.floor(Math.random() * 28) + 12);
  const [sellerPhone, setSellerPhone] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const staticProduct = useMemo(
    () => products.find(p => p.id === parseInt(productId, 10)),
    [productId]
  );

  const [dbProduct, setDbProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    // If it's a legacy static ID (e.g., small integer), allow the static product as a fallback
    // But still prioritize checking the DB.
    // We fetch the specific product to avoid downloading all products (especially base64 images).
    fetch(`${apiUrl}/products/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found in DB");
        return res.json();
      })
      .then(data => {
        if (data) setDbProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("DB fetch failed, relying on static data if available:", err);
        setLoading(false); // Finished checking DB
      });

  }, [productId, apiUrl]);


  const product = useMemo(() => {
    const baseRaw = dbProduct || staticProduct;
    if (!baseRaw) return null;

    const matchingStatic = products.find(p => p.name === baseRaw.name);
    const base = matchingStatic ? { ...baseRaw, price: matchingStatic.price, originalPrice: matchingStatic.originalPrice, image: matchingStatic.image, images: matchingStatic.images || [matchingStatic.image] } : baseRaw;

    const catKey = base.category?.toLowerCase() === "salwar kameez" ? "salwarKameez" : base.category?.toLowerCase() || "lehenga";
    const urls = imageDatabase?.[catKey] || imageDatabase?.lehenga || [];
    const numId = typeof (base.id || base._id) === 'number' ? (base.id || base._id) : parseInt(String(base.id || base._id).replace(/\D/g, ''), 10) || 0;

    let img = base.image;
    if (!img || img.length < 10 || (!img.startsWith("http") && !img.startsWith("data:") && !img.startsWith("/"))) {
      img = urls.length > 0 ? urls[numId % urls.length] : "";
    }

    let imgs = base.images && base.images.length > 0 ? base.images : [];
    imgs = imgs.map(src => (!src || src.length < 10 || (!src.startsWith("http") && !src.startsWith("data:") && !src.startsWith("/"))) ? img : src);

    if (imgs.length === 0) {
      imgs = [img];
    }

    let video = base.videoUrl;
    if (!video && !dbProduct) {
      video = "https://cdn.pixabay.com/video/2020/05/24/40058-424750106_tiny.mp4"; // Sample fashion video
    }

    return { ...base, image: img, images: imgs, videoUrl: video };
  }, [dbProduct, staticProduct]);

  useEffect(() => {
    if (product) {
      const title = `${product.name} | The Sringar House`;
      const description = product.description ? product.description.replace(/(<([^>]+)>)/gi, "") : `Buy ${product.name} online at The Sringar House. Explore our luxury collection.`;
      const imageUrl = product.image;

      document.title = title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
      metaDesc.content = description.length > 150 ? description.substring(0, 147) + '...' : description;

      // Open Graph / Social Media meta tags
      const ogTags = {
        "og:title": title,
        "og:description": description,
        "og:image": imageUrl,
        "og:url": window.location.href,
        "og:type": "product"
      };

      Object.keys(ogTags).forEach(property => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) { metaTag = document.createElement('meta'); metaTag.setAttribute('property', property); document.head.appendChild(metaTag); }
        metaTag.content = ogTags[property];
      });
    }
  }, [product]);

  const discount = product && product.originalPrice > product.price
  const sizes = product?.sizes?.length > 0
    ? product.sizes
    : (product ? ["XS", "S", "M", "L", "XL", "XXL"] : []);

  const colors = product?.colors || [];

  const inWishlist = product ? isInWishlist(product._id || product.id) : false;

  const handleAddToCart = () => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentCartQty = cartItems.filter(item => (item.id || item._id) === (product.id || product._id)).length;
    if (currentCartQty + quantity > stock) {
      alert(`Only ${stock} unit(s) available in stock. You already have ${currentCartQty} in your cart.`);
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, size: selectedSize, color: selectedColor });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const stock = product.stock !== undefined ? Number(product.stock) : 99;
    const currentCartQty = cartItems.filter(item => (item.id || item._id) === (product.id || product._id)).length;
    if (currentCartQty + quantity > stock) {
      alert(`Only ${stock} unit(s) available in stock. You already have ${currentCartQty} in your cart.`);
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, size: selectedSize, color: selectedColor });
    }
    navigate("/checkout");
  };

  const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  const media = useMemo(() => {
    if (!product) return [];
    const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);

    const mediaArray = images.map(src => {
      let cleanSrc = src;
      if (typeof src === 'string') {
        // Un-proxy if the user pasted a video URL into the image field by mistake
        if (src.includes('wsrv.nl') && src.includes('url=')) {
          try { cleanSrc = decodeURIComponent(src.split('url=')[1].split('&')[0]); } catch (e) { }
        }
        // Extract URL if user pasted an entire iframe tag
        if (cleanSrc.includes('<iframe') && cleanSrc.includes('src=')) {
          const match = cleanSrc.match(/src=["']([^"']+)["']/);
          if (match) cleanSrc = match[1];
        }
      }

      if (typeof cleanSrc === 'string' && (cleanSrc.includes("instagram.com") || cleanSrc.includes("youtube.com") || cleanSrc.includes("youtu.be") || cleanSrc.includes("vimeo.com") || cleanSrc.match(/\.(mp4|webm|ogg)$/i))) {
        return { type: 'video', src: cleanSrc };
      }
      return { type: 'image', src };
    });

    if (product.videoUrl) {
      let cleanVid = product.videoUrl;
      if (cleanVid.includes('wsrv.nl') && cleanVid.includes('url=')) {
        try { cleanVid = decodeURIComponent(cleanVid.split('url=')[1].split('&')[0]); } catch (e) { }
      }
      if (cleanVid.includes('<iframe') && cleanVid.includes('src=')) {
        const match = cleanVid.match(/src=["']([^"']+)["']/);
        if (match) cleanVid = match[1];
      }
      if (!mediaArray.some(m => m.src === cleanVid)) {
        if (mediaArray.length > 0) {
          mediaArray.splice(1, 0, { type: 'video', src: cleanVid });
        } else {
          mediaArray.push({ type: 'video', src: cleanVid });
        }
      }
    }
    return mediaArray;
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setZoom(false);
    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: galleryRef.current.clientWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handleGalleryScroll = (e) => {
    if (!galleryRef.current) return;
    const scrollPos = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const newIndex = Math.round(scrollPos / width);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < media.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setSubmittedReviews([newReview, ...submittedReviews]);
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  useEffect(() => {
    if (product) {
      if (product.sizes?.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      } else if (!selectedSize) {
        setSelectedSize("M");
      }

      if (product.colors?.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }

      if (product.sellerId) {
        fetch(`${apiUrl}/sellers/${product.sellerId}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.phone) setSellerPhone(data.phone);
          })
          .catch(err => console.error("Error fetching seller:", err));
      }
    }
  }, [product]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
        <Navbar cartCount={0} wishlistCount={0} />
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px" }}>
          {/* Outer rotating ring */}
          <div style={{ position: "relative", width: "64px", height: "64px" }}>
            <div style={{ position: "absolute", inset: 0, border: "3px solid #fdf8ee", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", inset: 0, border: "3px solid transparent", borderTopColor: "#B8860B", borderRightColor: "#B8860B", borderRadius: "50%", animation: "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}></div>
            {/* Inner pulsing jewel */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "24px", height: "24px", backgroundColor: "var(--rose)", borderRadius: "50%", animation: "pulse 1.5s ease-in-out infinite", opacity: 0.8, boxShadow: "0 0 16px rgba(136, 14, 79, 0.4)" }}></div>
          </div>

          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease-out" }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--dark)", letterSpacing: "1px" }}>Curating Your Style</h3>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Loading exquisite details...</p>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; } 50% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.4; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </div>
    );
  }

  if (!product) return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "16px" }}>Product Not Found</h2>
      <button onClick={() => navigate("/")} style={{ padding: "10px 22px", cursor: "pointer" }}>← Back to Home</button>
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

        {/* ── LEFT: Image Gallery ── */}
        <div style={{ minWidth: 0, width: "100%", maxWidth: "100%", position: "relative" }}>

          <div
            className="pd-swipe-gallery"
            ref={galleryRef}
            onScroll={handleGalleryScroll}
          >
            {media.map((item, i) => (
              <div
                key={i}
                className={`pd-swipe-item${zoom && item.type === 'image' && i === activeIndex ? " zoomed" : ""}`}
                onClick={() => { if (item.type === 'image') setZoom(!zoom); }}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt={`${product.name} - View ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", backgroundColor: "#000" }}>

                    {/* Custom Player Smart Routing */}
                    {item.src.includes("instagram.com") ? (
                      <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <iframe src={item.src.split('?')[0].replace(/\/$/, '') + (item.src.includes('/embed') ? "" : "/embed")} width="100%" height="100%" frameBorder="0" scrolling="no" allowTransparency="true" allow="encrypted-media" loading="lazy" style={{ display: "block", minHeight: "480px" }}></iframe>
                      </div>
                    ) : item.src.includes("youtube.com") || item.src.includes("youtu.be") ? (
                      <iframe src={item.src.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/") + "?autoplay=0&rel=0"} width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ minHeight: "400px", display: "block" }}></iframe>
                    ) : item.src.includes("vimeo.com") ? (
                      <iframe src={item.src.replace("vimeo.com/", "player.vimeo.com/video/")} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" style={{ minHeight: "400px", display: "block" }}></iframe>
                    ) : (
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <video src={item.src} poster={product.image} controls autoPlay={false} preload="none" playsInline style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", cursor: "pointer" }}
                          onClick={(e) => { e.target.paused ? e.target.play() : e.target.pause(); }}
                          onPlay={() => setPlayingVideo(prev => ({ ...prev, [i]: true }))}
                          onPause={() => setPlayingVideo(prev => ({ ...prev, [i]: false }))}
                        />
                        {!playingVideo[i] && (
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '72px', height: '72px', backgroundColor: 'rgba(212,175,55,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', pointerEvents: 'none', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {discount > 0 && <div className="pd-discount-badge" style={{ zIndex: 20 }}>−{discount}% OFF</div>}
          <button className="pd-zoom-btn" style={{ zIndex: 20 }} onClick={() => setZoom(!zoom)}>{zoom ? <IconZoomOut /> : <IconZoomIn />}</button>

          {media.length > 1 && (
            <div
              className="pd-thumbnails"
              style={{
                padding: "12px 0", minHeight: "80px", WebkitOverflowScrolling: "touch"
              }}
            >
              {media.map((item, i) => {
                const isVid = item.type === 'video';
                const thumbSrc = isVid
                  ? (product.image && !product.image.includes('instagram.com') && !product.image.match(/\.(mp4|webm|ogg)$/i) ? product.image : "https://images.pexels.com/photos/15344877/pexels-photo-15344877.jpeg?auto=compress&w=200")
                  : item.src;
                return (
                  <div
                    key={i}
                    className={`pd-thumb ${i === activeIndex ? "active" : ""}`}
                    onClick={() => handleThumbnailClick(i)}
                  >
                    <img src={thumbSrc} alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" style={{ opacity: isVid ? 0.7 : 1 }} />
                    {isVid && (
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
              {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= 5} />)}
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#F59E0B" }}>4.8</span>
            <span className="pd-review-count">({product.reviews || 324} reviews)</span>
          </div>

          {/* Price */}
          <div className="pd-price-section">
            <div className="pd-price-row">
              <span className="pd-price-current">₹{product.price?.toLocaleString() || "N/A"}</span>
              <span className="pd-price-original">₹{product.originalPrice?.toLocaleString()}</span>
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

          {/* Color */}
          {colors.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="pd-section-label">Select Color</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: selectedColor === color ? "2px solid #0f172a" : "1px solid #cbd5e1",
                      backgroundColor: selectedColor === color ? "#0f172a" : "#fff",
                      color: selectedColor === color ? "#fff" : "#475569",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

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
                const stock = product?.stock !== undefined ? Number(product.stock) : 99;
                if (!isNaN(n) && n > 0) setQuantity(Math.min(n, stock));
              }}
              onBlur={e => {
                let v = parseInt(e.target.value, 10);
                const stock = product?.stock !== undefined ? Number(product.stock) : 99;
                if (isNaN(v) || v < 1) v = 1;
                else if (v > stock) v = stock;
                setQuantity(v);
              }}
            />
            <button className="pd-qty-btn" onClick={() => {
              const stock = product?.stock !== undefined ? Number(product.stock) : 99;
              setQuantity(Math.min(stock, quantity + 1));
            }}>+</button>
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
            phoneNumber={sellerPhone || "9967670497"}
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

              {(product.metalType || product.gemstones || product.plating || product.weight) && (
                <div className="pd-info-card">
                  <div className="pd-info-card-header">
                    <IconDiamond />
                    <span className="pd-info-card-title">Jewellery Specifications</span>
                  </div>
                  {product.metalType && <p className="pd-info-row"><strong>Metal Type:</strong> {product.metalType}</p>}
                  {product.plating && <p className="pd-info-row"><strong>Plating:</strong> {product.plating}</p>}
                  {product.gemstones && <p className="pd-info-row"><strong>Gemstones:</strong> {product.gemstones}</p>}
                  {product.weight && <p className="pd-info-row"><strong>Weight:</strong> {product.weight}</p>}
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

      {/* Reviews Section */}
      {product && (
        <div className="pd-reviews-section">
          <div className="pd-reviews-header">
            <h2>Customer Reviews</h2>
            <p>Real feedback from our beautiful clients</p>
          </div>

          <div className="pd-reviews-container">
            {/* Left Column: Form */}
            <div className="pd-review-form-wrap">
              <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>Share Your Experience</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "24px" }}>Your review helps us maintain our quality.</p>

              <form onSubmit={handleReviewSubmit}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "12px", color: "var(--dark)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Rating</label>
                <div className="pd-interactive-stars" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <div
                      key={star}
                      className="pd-interactive-star"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    >
                      <IconStar filled={star <= (hoverRating || reviewForm.rating)} size="28" />
                    </div>
                  ))}
                </div>

                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "8px", color: "var(--dark)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Name</label>
                <input type="text" className="pd-review-input" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} required placeholder="Enter your full name" />

                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "8px", color: "var(--dark)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Review</label>
                <textarea className="pd-review-input" rows="4" value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} required placeholder="Tell us what you loved about this piece..."></textarea>

                <button type="submit" className="pd-review-submit">Submit Review</button>
              </form>
            </div>

            {/* Right Column: List */}
            <div className="pd-review-list">
              {submittedReviews.map(review => (
                <div key={review.id} className="pd-review-card">
                  <div className="pd-review-card-header">
                    <div className="pd-review-avatar-wrap">
                      <div className="pd-review-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="pd-review-meta">
                        <h4>{review.name}</h4>
                        <span className="pd-review-verified">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%" }}>
                            <circle cx="12" cy="12" r="10" fill="#16a34a" stroke="none" />
                            <path d="M9 12l2 2 4-4" stroke="#fff" />
                          </svg>
                          Verified Buyer
                        </span>
                      </div>
                    </div>
                    <span className="pd-review-date">{review.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= review.rating} size="16" />)}
                  </div>
                  <p className="pd-review-text">"{review.comment}"</p>
                </div>
              ))}

              <div className="pd-review-card">
                <div className="pd-review-card-header">
                  <div className="pd-review-avatar-wrap">
                    <div className="pd-review-avatar">A</div>
                    <div className="pd-review-meta">
                      <h4>Aisha K.</h4>
                      <span className="pd-review-verified">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%" }}>
                          <circle cx="12" cy="12" r="10" fill="#16a34a" stroke="none" />
                          <path d="M9 12l2 2 4-4" stroke="#fff" />
                        </svg>
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                  <span className="pd-review-date">12 Oct 2023</span>
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= 5} size="16" />)}
                </div>
                <p className="pd-review-text">"Beautiful outfit! The quality is amazing and it looks exactly as shown in the pictures. The fabric feels very premium and luxurious. Highly recommended!"</p>
              </div>

              <div className="pd-review-card">
                <div className="pd-review-card-header">
                  <div className="pd-review-avatar-wrap">
                    <div className="pd-review-avatar">P</div>
                    <div className="pd-review-meta">
                      <h4>Priya S.</h4>
                      <span className="pd-review-verified">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%" }}>
                          <circle cx="12" cy="12" r="10" fill="#16a34a" stroke="none" />
                          <path d="M9 12l2 2 4-4" stroke="#fff" />
                        </svg>
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                  <span className="pd-review-date">05 Nov 2023</span>
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= 4} size="16" />)}
                </div>
                <p className="pd-review-text">"Very satisfied with my purchase. The stitching is perfect and it fits me like a glove. Delivery took a bit longer than expected but the dress is worth the wait."</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <SizeChart isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
      <Footer />
    </div>
  );
}