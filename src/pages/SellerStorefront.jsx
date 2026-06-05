import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function SellerStorefront({ subdomain, cartCount, onCartClick }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = seller?.branding?.bannerUrls && seller.branding.bannerUrls.length > 0
    ? seller.branding.bannerUrls
    : (seller?.branding?.bannerUrl ? [seller.branding.bannerUrl] : []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // 1. Fetch Seller by slug
        const storeData = await api.getSellerStore(subdomain);
        setSeller(storeData);

        // 2. Fetch Products for this seller
        const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
        const prodRes = await fetch(`${API_BASE_URL}/products/seller/${storeData._id}`);
        const prodData = await prodRes.json();
        setProducts(prodData);
      } catch (err) {
        setError("This boutique is currently unavailable or does not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [subdomain]);

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading boutique...</div>;
  }

  if (error || !seller) {
    return (
      <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "32px", color: "#D4AF37", marginBottom: "16px" }}>Store Not Found</h1>
        <p style={{ color: "#666" }}>{error}</p>
        <a href={window.location.protocol + "//" + window.location.hostname.split('.').slice(1).join('.')} style={{ color: "#1a1a1a", textDecoration: "underline", marginTop: "24px", display: "inline-block" }}>Return to Main Marketplace</a>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAFA", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />

      <div style={{ flex: 1, padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* Storefront Hero Banner Carousel */}
        {banners.length > 0 ? (
          <div style={{ position: "relative", height: isMobile ? "240px" : "360px", borderRadius: "24px", overflow: "hidden", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            {banners.map((url, idx) => (
              <div 
                key={idx}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: idx === currentSlide ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                  zIndex: idx === currentSlide ? 1 : 0
                }}
              >
                <img 
                  src={url} 
                  alt={`${seller.businessName} Banner ${idx + 1}`} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
            ))}
            
            {/* Dark Premium Gradient Overlay with Content */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.3) 60%, rgba(15, 23, 42, 0.4) 100%)",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
              padding: "20px"
            }}>
              {seller.branding?.logoUrl && (
                <img src={seller.branding.logoUrl} alt="Logo" style={{ height: isMobile ? "40px" : "60px", marginBottom: "16px", objectFit: "contain", borderRadius: "8px" }} />
              )}
              <h1 style={{ fontSize: isMobile ? "32px" : "48px", margin: "0 0 8px 0", fontWeight: "700", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                {seller.businessName}
              </h1>
              <p style={{ fontSize: isMobile ? "14px" : "18px", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                Curated by {seller.name}
              </p>
            </div>
            
            {/* Indicator Dots */}
            {banners.length > 1 && (
              <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
                {banners.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: idx === currentSlide ? "#fff" : "rgba(255,255,255,0.4)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Default Gradient Banner */
          <div style={{ background: "#0a0f0d", backgroundImage: "radial-gradient(circle at 50% 0%, #1e3a29 0%, #0a0f0d 60%)", borderRadius: "24px", padding: "60px 40px", textAlign: "center", color: "#fff", marginBottom: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-100px", left: "-50px", width: "300px", height: "300px", background: "#D4AF37", filter: "blur(100px)", opacity: "0.2", borderRadius: "50%" }} />
            <h1 style={{ fontSize: "42px", margin: "0 0 12px 0", position: "relative", zIndex: 1 }}>{seller.businessName}</h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, position: "relative", zIndex: 1 }}>Curated by {seller.name}</p>
          </div>
        )}

        {/* Products Grid */}
        <h2 style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "24px" }}>Exclusive Collection</h2>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px", border: "1px solid #eaeaea" }}>
            <p style={{ color: "#666" }}>This boutique is currently preparing their new collection.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? "12px 8px" : "30px" }}>
            {products.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{ background: "#fff", borderRadius: isMobile ? "8px" : "16px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", transition: "transform 0.3s, box-shadow 0.3s", border: "1px solid #eaeaea", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)"; }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "3/4" }}>
                  <img src={product.image} alt={product.name} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: isMobile ? "12px 10px" : "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: isMobile ? "13px" : "16px", color: "#1a1a1a", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", whiteSpace: "normal", lineHeight: 1.4, flex: 1 }}>{product.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                    <span style={{ fontSize: isMobile ? "15px" : "16px", fontWeight: "700", color: "#D4AF37" }}>₹{product.price?.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", color: "#888", background: "#f5f5f5", padding: "4px 10px", borderRadius: "20px" }}>{product.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}