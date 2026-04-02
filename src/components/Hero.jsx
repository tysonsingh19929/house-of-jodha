import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fit=crop",
    label: "Bridal Lehenga Collection",
    sub: "Crafted for your special day",
  },
  {
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80&fit=crop",
    label: "Festive Saree Looks",
    sub: "Timeless elegance, modern drape",
  },
  {
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&fit=crop",
    label: "Anarkali & Gharara Sets",
    sub: "Handpicked for every occasion",
  },
  {
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&q=80&fit=crop",
    label: "Sangeet & Mehendi Wear",
    sub: "Dance, celebrate, shine",
  },
  {
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&fit=crop",
    label: "Wedding Season Specials",
    sub: "Exclusive collections now live",
  },
];

const slideBg = ["#f7d6e0", "#fde8c8", "#dceeff", "#e8f5e9", "#f3e5f5"];
const slideAccent = ["#C2185B", "#E65100", "#1565C0", "#2E7D32", "#6A1B9A"];
const slideEmojis = ["👰🏻", "🥻", "👗", "💃🏻", "💍"];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState({});
  const [imgError, setImgError] = useState({});
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const total = carouselSlides.length;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => { startAutoPlay(); return () => stopAutoPlay(); }, []);
  useEffect(() => {
    if (isHovered) stopAutoPlay(); else startAutoPlay();
    return () => stopAutoPlay();
  }, [isHovered]);

  const goTo = (i) => setCurrent(i);
  const prev = () => { stopAutoPlay(); setCurrent(p => (p - 1 + total) % total); startAutoPlay(); };
  const next = () => { stopAutoPlay(); setCurrent(p => (p + 1) % total); startAutoPlay(); };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    stopAutoPlay();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setCurrent(p => (p + 1) % total); // swipe left → next
      } else {
        setCurrent(p => (p - 1 + total) % total); // swipe right → prev
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    startAutoPlay();
  };

  return (
    <div
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "240px" : "420px",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "pan-y", // allow vertical scroll, intercept horizontal
      }}
    >
      {carouselSlides.map((s, i) => {
        const accent = slideAccent[i];
        const loaded = imgLoaded[i];
        const error = imgError[i];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              background: slideBg[i],
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.7s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Decorative blobs */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `radial-gradient(ellipse at 15% 50%, ${accent}20 0%, transparent 55%),
                                radial-gradient(ellipse at 85% 20%, ${accent}15 0%, transparent 45%)`,
            }} />

            {/* Layout */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "16px 16px 30px" : "40px 60px 50px",
              gap: isMobile ? "10px" : "30px",
            }}>

              {/* Left: Text */}
              <div style={{ flex: 1, textAlign: "left", zIndex: 2 }}>
                <div style={{
                  fontSize: isMobile ? "9px" : "12px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  color: accent,
                  textTransform: "uppercase",
                  marginBottom: isMobile ? "5px" : "10px",
                }}>
                  New Collection
                </div>
                <div style={{
                  fontFamily: "Georgia, serif",
                  fontSize: isMobile ? "16px" : "32px",
                  fontWeight: 700,
                  color: "#2c1a1a",
                  lineHeight: 1.2,
                  marginBottom: isMobile ? "5px" : "10px",
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontSize: isMobile ? "10px" : "14px",
                  color: "#777",
                  fontStyle: "italic",
                  marginBottom: isMobile ? "12px" : "22px",
                }}>
                  {s.sub}
                </div>
                <button
                  onClick={() => navigate("/collection/all")}
                  style={{
                    background: accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: "25px",
                    padding: isMobile ? "7px 15px" : "10px 24px",
                    fontSize: isMobile ? "10px" : "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: `0 4px 14px ${accent}44`,
                    letterSpacing: "0.3px",
                  }}
                >
                  Shop Now →
                </button>
              </div>

              {/* Right: Image card */}
              <div style={{
                flex: isMobile ? "0 0 120px" : "0 0 280px",
                height: isMobile ? "170px" : "330px",
                borderRadius: isMobile ? "14px" : "20px",
                overflow: "hidden",
                boxShadow: `0 8px 30px ${accent}40`,
                background: `${accent}18`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {!error ? (
                  <img
                    src={s.image}
                    alt={s.label}
                    onLoad={() => setImgLoaded(p => ({ ...p, [i]: true }))}
                    onError={() => setImgError(p => ({ ...p, [i]: true }))}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: loaded ? "block" : "none",
                    }}
                  />
                ) : null}

                {(!loaded || error) && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${accent}18, ${accent}35)`,
                  }}>
                    <div style={{ fontSize: isMobile ? "42px" : "80px" }}>
                      {slideEmojis[i]}
                    </div>
                    <div style={{
                      fontSize: isMobile ? "9px" : "12px",
                      color: accent,
                      fontWeight: 600,
                      textAlign: "center",
                      padding: "0 6px",
                    }}>
                      {s.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Arrow */}
      <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
        position: "absolute", left: "8px", top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.9)", border: "none",
        borderRadius: "50%",
        width: isMobile ? "26px" : "36px", height: isMobile ? "26px" : "36px",
        cursor: "pointer", fontSize: isMobile ? "15px" : "20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>‹</button>

      {/* Right Arrow */}
      <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
        position: "absolute", right: "8px", top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.9)", border: "none",
        borderRadius: "50%",
        width: isMobile ? "26px" : "36px", height: isMobile ? "26px" : "36px",
        cursor: "pointer", fontSize: isMobile ? "15px" : "20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>›</button>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "10px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "6px", zIndex: 10,
      }}>
        {carouselSlides.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "20px" : "7px", height: "7px",
            borderRadius: "4px",
            background: i === current ? slideAccent[current] : "rgba(0,0,0,0.2)",
            cursor: "pointer", transition: "all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute", top: "10px", right: "14px",
        background: "rgba(0,0,0,0.25)", color: "#fff",
        fontSize: "11px", padding: "3px 8px", borderRadius: "10px", zIndex: 10,
      }}>
        {current + 1} / {total}
      </div>
    </div>
  );
}
