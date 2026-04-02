import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85&fit=crop",
    label: "Bridal Lehenga Collection",
    sub: "Crafted for your special day",
  },
  {
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&q=85&fit=crop",
    label: "Festive Saree Looks",
    sub: "Timeless elegance, modern drape",
  },
  {
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85&fit=crop",
    label: "Anarkali & Gharara Sets",
    sub: "Handpicked for every occasion",
  },
  {
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=1200&q=85&fit=crop",
    label: "Sangeet & Mehendi Wear",
    sub: "Dance, celebrate, shine",
  },
  {
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85&fit=crop",
    label: "Wedding Season Specials",
    sub: "Exclusive collections now live",
  },
];

const slideAccent = ["#C2185B", "#E65100", "#1565C0", "#2E7D32", "#6A1B9A"];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const total = carouselSlides.length;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3500);
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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    stopAutoPlay();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) setCurrent(p => (p + 1) % total);
      else setCurrent(p => (p - 1 + total) % total);
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
        height: isMobile ? "320px" : "540px",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "pan-y",
        background: "#111",
      }}
    >
      {/* Slides */}
      {carouselSlides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          {/* Full-bleed background image */}
          <img
            src={s.image}
            alt={s.label}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />

          {/* Dark gradient overlay for text legibility */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.08) 100%)",
          }} />

          {/* Text overlay — bottom-left */}
          <div style={{
            position: "absolute",
            bottom: isMobile ? "38px" : "60px",
            left: isMobile ? "18px" : "52px",
            zIndex: 2,
            textAlign: "left",
            maxWidth: isMobile ? "220px" : "420px",
          }}>
            <div style={{
              fontSize: isMobile ? "9px" : "11px",
              fontWeight: 700,
              letterSpacing: "3.5px",
              color: slideAccent[i],
              textTransform: "uppercase",
              marginBottom: isMobile ? "6px" : "10px",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}>
              New Collection
            </div>
            <div style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: isMobile ? "20px" : "38px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: isMobile ? "6px" : "12px",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}>
              {s.label}
            </div>
            <div style={{
              fontSize: isMobile ? "11px" : "14px",
              color: "rgba(255,255,255,0.82)",
              fontStyle: "italic",
              marginBottom: isMobile ? "14px" : "24px",
              textShadow: "0 1px 6px rgba(0,0,0,0.4)",
            }}>
              {s.sub}
            </div>
            <button
              onClick={() => navigate("/collection/all")}
              style={{
                background: slideAccent[i],
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: isMobile ? "8px 18px" : "11px 28px",
                fontSize: isMobile ? "11px" : "13px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 4px 18px ${slideAccent[i]}88`,
                letterSpacing: "0.4px",
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              Shop Now →
            </button>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute", left: "10px", top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          width: isMobile ? "28px" : "38px",
          height: isMobile ? "28px" : "38px",
          cursor: "pointer",
          fontSize: isMobile ? "16px" : "22px",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.32)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute", right: "10px", top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          width: isMobile ? "28px" : "38px",
          height: isMobile ? "28px" : "38px",
          cursor: "pointer",
          fontSize: isMobile ? "16px" : "22px",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.32)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
      >
        ›
      </button>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "12px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "6px", zIndex: 10,
      }}>
        {carouselSlides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "22px" : "7px",
              height: "7px",
              borderRadius: "4px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute", top: "12px", right: "14px",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        color: "#fff",
        fontSize: "11px",
        padding: "3px 9px",
        borderRadius: "10px",
        zIndex: 10,
        letterSpacing: "0.5px",
      }}>
        {current + 1} / {total}
      </div>
    </div>
  );
}
