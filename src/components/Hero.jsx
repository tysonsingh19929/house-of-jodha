import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const carouselSlides = [
  {
    image: "https://images.pexels.com/photos/13124449/pexels-photo-13124449.jpeg",
    label: "Bridal Lehenga Collection",
    sub: "Crafted for your special day",
    route: "/collection/lehenga",
  },
  {
    image: "https://images.pexels.com/photos/27575174/pexels-photo-27575174.jpeg",
    label: "Festive Saree Looks",
    sub: "Timeless elegance, modern drape",
    route: "/collection/saree",
  },
  {
    image: "https://images.pexels.com/photos/9418537/pexels-photo-9418537.jpeg",
    label: "Anarkali & Gharara Sets",
    sub: "Handpicked for every occasion",
    route: "/collection/anarkali",
  },
  {
    image: "https://images.pexels.com/photos/35327940/pexels-photo-35327940.jpeg",
    label: "Sangeet & Mehendi Wear",
    sub: "Dance, celebrate, shine",
    route: "/occasion/sangeet",
  },
  {
    image: "https://images.pexels.com/photos/29370686/pexels-photo-29370686.jpeg",
    label: "Wedding Season Specials",
    sub: "Exclusive collections now live",
    route: "/occasion/wedding",
  },
];

const slideAccent = ["#C2185B", "#E65100", "#1565C0", "#2E7D32", "#6A1B9A"];
const INTERVAL_MS = 3000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const total = carouselSlides.length;

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, INTERVAL_MS);
  }, [total]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    resetInterval();
    return () => stopAutoPlay();
  }, [resetInterval, stopAutoPlay]);

  useEffect(() => {
    if (isHovered) {
      stopAutoPlay();
    } else {
      resetInterval();
    }
  }, [isHovered, resetInterval, stopAutoPlay]);

  const goTo = (i) => {
    setCurrent(i);
    resetInterval();
  };

  const prev = () => {
    setCurrent(p => (p - 1 + total) % total);
    resetInterval();
  };

  const next = () => {
    setCurrent(p => (p + 1) % total);
    resetInterval();
  };

  const scrollToOccasions = () => {
    const section = document.getElementById("shop-by-occasion");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    stopAutoPlay();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
      if (deltaX < 0) {
        setCurrent((p) => (p + 1) % total);
      } else {
        setCurrent((p) => (p - 1 + total) % total);
      }
    }

    // reset after immediate manual update
    touchStartX.current = null;
    touchStartY.current = null;
    resetInterval();
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
        // HEIGHT REDUCED HERE
        height: isMobile ? "260px" : "420px", 
        overflow: "hidden",
        userSelect: "none",
        touchAction: "pan-y",
        background: "#111",
      }}
    >
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
          <img
            src={s.image}
            alt={s.label}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%", // Slightly adjusted to keep faces in frame
              display: "block",
            }}
          />

          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }} />

          {/* TEXT POSITIONING ADJUSTED FOR SLIMMER HEIGHT */}
          <div style={{
            position: "absolute",
            bottom: isMobile ? "32px" : "50px", 
            left: isMobile ? "18px" : "52px",
            zIndex: 2,
            textAlign: "left",
            maxWidth: isMobile ? "220px" : "420px",
          }}>
            <div style={{
              fontSize: isMobile ? "8px" : "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: slideAccent[i],
              textTransform: "uppercase",
              marginBottom: isMobile ? "4px" : "8px",
            }}>
              New Collection
            </div>
            <div style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: isMobile ? "18px" : "32px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: isMobile ? "4px" : "10px",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}>
              {s.label}
            </div>
            <div style={{
              fontSize: isMobile ? "10px" : "14px",
              color: "rgba(255,255,255,0.85)",
              fontStyle: "italic",
              marginBottom: isMobile ? "12px" : "20px",
            }}>
              {s.sub}
            </div>
            <button
              onClick={scrollToOccasions}
              style={{
                background: slideAccent[i],
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: isMobile ? "7px 16px" : "10px 24px",
                fontSize: isMobile ? "10px" : "12px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 4px 15px ${slideAccent[i]}66`,
                transition: "transform 0.2s",
              }}
            >
              Shop Now →
            </button>
          </div>
        </div>
      ))}

      {/* Navigation and Indicators remain mostly the same */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "none",
          borderRadius: "50%", width: isMobile ? "24px" : "34px", height: isMobile ? "24px" : "34px",
          cursor: "pointer", color: "#fff", zIndex: 10,
        }}
      >‹</button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "none",
          borderRadius: "50%", width: isMobile ? "24px" : "34px", height: isMobile ? "24px" : "34px",
          cursor: "pointer", color: "#fff", zIndex: 10,
        }}
      >›</button>

      <div style={{
        position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "5px", zIndex: 10,
      }}>
        {carouselSlides.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "18px" : "6px", height: "6px", borderRadius: "3px",
            background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
            cursor: "pointer", transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}