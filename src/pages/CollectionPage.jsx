import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const isMobile = window.innerWidth <= 768;
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState({});
  const [sellersMap, setSellersMap] = useState({});

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    // Fetch products that match this occasion or category from our new optimized endpoint
    fetch(`${apiUrl}/products/search?q=${encodeURIComponent(occasionKey)}`)
      .then(res => res.json())
      .then(data => {
        const fetchedProducts = Array.isArray(data) ? data : [];

        // Map database products to the required UI component interface 
        const mappedProducts = fetchedProducts.map(p => {
          // Fallback to static master if image is somehow missing
          const master = masterProducts.find(mp => mp.id === p.id);
          return {
            ...p,
            id: p._id || p.id,
            image: p.image || master?.image || masterProducts[0].image
          };
        });

        // Also merge any local static products that aren't in the DB yet, for robustness
        const localStatic = enhancedProductDatabase.filter(p => {
          const occasionMatch = p.occasion?.toLowerCase() === occasionKey ||
            (Array.isArray(p.occasions) && p.occasions.some(o => o.toLowerCase() === occasionKey));
          const categoryMatch = p.category?.toLowerCase() === occasionKey;
          return occasionMatch || categoryMatch;
        });

        // Filter out duplicates (DB products overwrite static ones)
        const combined = [...mappedProducts];
        localStatic.forEach(sp => {
          if (!combined.some(cp => cp.id === sp.id || cp.name === sp.name)) {
            combined.push(sp);
          }
        });

        // Clean up emoji images so they actually load
        const sanitized = combined.map(p => {
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
        setLoading(false);
      })
      .catch(err => {
        console.error("Collection fetch error:", err);
        setLoading(false);
      });
  }, [occasionKey]);

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

        /* CARD */
        .occ-card {
          background: #fff; border: 1px solid ${d.cardBorder};
          border-radius: 12px; overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
          cursor: pointer;
        }
        .occ-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          border-color: ${d.accentMid};
        }

        /* IMAGE */
        .occ-img-wrap { position: relative; overflow: hidden; flex-shrink: 0; }
        .occ-img {
          width: 100%; height: 185px; object-fit: cover;
          display: block; transition: transform 0.4s ease;
        }
        .occ-card:hover .occ-img { transform: scale(1.04); }

        /* DISCOUNT BADGE */
        .occ-discount {
          position: absolute; top: 7px; left: 7px;
          background: ${d.accentColor}; color: #fff;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 800;
          letter-spacing: 0.5px; padding: 3px 7px; border-radius: 3px;
        }

        /* WISHLIST */
        .occ-wish {
          position: absolute; top: 7px; right: 7px;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.9); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; z-index: 5;
          box-shadow: 0 1px 6px rgba(0,0,0,0.15);
          font-size: 14px; padding: 0; color: #ccc;
        }
        .occ-wish:hover { transform: scale(1.18); background: #fff; color: ${d.wishlistActive}; }
        .occ-wish.on { color: ${d.wishlistActive}; }

        /* INFO */
        .occ-info {
          padding: 9px 10px 5px; flex: 1;
          text-decoration: none; display: block; color: inherit;
        }
        .occ-cat {
          font-family: 'Jost', sans-serif; font-size: 9px;
          color: ${d.accentMid}; text-transform: uppercase;
          font-weight: 700; letter-spacing: 1px; margin: 0 0 3px;
        }
        .occ-name-text {
          font-family: 'Jost', sans-serif; font-size: 11px;
          color: #222; margin: 0 0 6px; font-weight: 600;
          line-height: 1.35;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        /* PRICE ROW — clean, single line */
        .occ-price-row {
          display: flex; align-items: baseline; gap: 5px; margin-bottom: 0; flex-wrap: nowrap;
        }
        .occ-price {
          font-family: 'Jost', sans-serif; font-weight: 700;
          font-size: 14px; color: #880E4F;
          margin: 0; line-height: 1; white-space: nowrap;
        }
        .occ-original {
          font-family: 'Jost', sans-serif; font-size: 12px;
          color: #bbb; text-decoration: line-through; margin: 0; white-space: nowrap;
        }
        .occ-off {
          font-family: 'Jost', sans-serif; font-size: 9px;
          color: ${d.accentMid}; font-weight: 700; margin: 0; white-space: nowrap;
        }

        /* CART CONTROLS */
        .occ-cart-wrap { padding: 6px 10px 11px; }

        .occ-add-btn {
          width: 100%; padding: 9px 8px;
          background: ${d.btnBg}; color: #fff;
          border: none; border-radius: 6px;
          font-family: 'Jost', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          display: block;
        }
        .occ-add-btn:hover { opacity: 0.86; }
        .occ-add-btn:active { transform: scale(0.97); }

        /* +/- quantity row — same style as CollectionPage */
        .occ-qty-row {
          display: flex; align-items: center; gap: 4px;
        }
        .occ-qty-btn {
          flex: 1; padding: 8px 4px;
          background: ${d.qtyBg}; color: #fff;
          border: none; border-radius: 5px;
          cursor: pointer; font-weight: 700; font-size: 15px;
          transition: opacity 0.2s; line-height: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .occ-qty-btn:hover { opacity: 0.82; }
        .occ-qty-num {
          flex: 1; text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 13px; font-weight: 800;
          color: ${d.priceColor};
        }

        .occ-empty {
          text-align: center; padding: 60px 20px;
          font-family: 'Jost', sans-serif; color: ${d.accentMid};
        }
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
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "24px 16px 40px" }}>
        {products.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span className="occ-count">{products.length} Styles Available</span>
          </div>
        )}

        {products.length === 0 ? (
          <div className="occ-empty">
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>{d.icon}</div>
            <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "6px" }}>No styles yet</p>
            <p style={{ fontSize: "13px", opacity: 0.7 }}>Check back soon for new arrivals</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {products.map(product => {
              const qty = addedProducts[product.id] || 0;
              const wishlisted = isInWishlist(product.id);
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div key={product.id} className="occ-card" onClick={() => navigate(`/product/${product.id}`)}>

                  {/* IMAGE */}
                  <div className="occ-img-wrap">
                    <img src={product.image} alt={product.name} className="occ-img" loading="lazy" decoding="async" />
                    {discount > 0 && (
                      <span className="occ-discount">{discount}% OFF</span>
                    )}
                    <button
                      className={`occ-wish${wishlisted ? " on" : ""}`}
                      onClick={(e) => handleWishlistToggle(e, product)}
                      title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wishlisted ? "♥" : "♡"}
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="occ-info" onClick={e => e.stopPropagation()}>
                    <p className="occ-cat">{product.category}</p>
                    <p className="occ-name-text">{product.name}</p>
                    <div className="occ-price-row">
                      <p className="occ-price">₹{product.price?.toLocaleString("en-IN")}</p>
                      {product.originalPrice && (
                        <p className="occ-original">₹{product.originalPrice?.toLocaleString("en-IN")}</p>
                      )}
                      {discount > 0 && (
                        <p className="occ-off">({discount}%)</p>
                      )}
                    </div>
                  </div>

                  {/* CART CONTROLS */}
                  <div className="occ-cart-wrap" onClick={e => e.stopPropagation()}>
                    {qty > 0 ? (
                      <div className="occ-qty-row">
                        <button className="occ-qty-btn" onClick={(e) => handleDecrease(e, product)}>−</button>
                        <span className="occ-qty-num">{qty}</span>
                        <button className="occ-qty-btn" onClick={(e) => handleIncrease(e, product)}>+</button>
                      </div>
                    ) : (
                      <button className="occ-add-btn" onClick={(e) => handleAddProduct(e, product)}>
                        + Add to Cart
                      </button>
                    )}
                  </div>

                  <div className="occ-cart-wrap" onClick={e => e.stopPropagation()}>
                    <WhatsAppInquiryButton
                      message={`Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details?`}
                      phoneNumber={sellersMap[product.sellerId] || "9967670497"}
                      buttonStyle={{
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "11px",
                        marginTop: "6px",
                      }}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
