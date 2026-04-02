import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 🔁 REPLACE these with your actual image URLs later
const carouselSlides = [
  {
    image: null, // replace with: "/images/slide1.jpg" or a URL
    label: "Bridal Lehenga Collection",
    sub: "Crafted for your special day",
    bg: "#f7d6e0",
  },
  {
    image: null,
    label: "Festive Saree Looks",
    sub: "Timeless elegance, modern drape",
    bg: "#fde8c8",
  },
  {
    image: null,
    label: "Anarkali & Gharara Sets",
    sub: "Handpicked for every occasion",
    bg: "#dceeff",
  },
  {
    image: null,
    label: "Sangeet & Mehendi Wear",
    sub: "Dance, celebrate, shine",
    bg: "#e8f5e9",
  },
  {
    image: null,
    label: "Wedding Season Specials",
    sub: "Exclusive collections now live",
    bg: "#f3e5f5",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const total = carouselSlides.length;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 2000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  useEffect(() => {
    if (isHovered) stopAutoPlay();
    else startAutoPlay();
    return () => stopAutoPlay();
  }, [isHovered]);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent(prev => (prev - 1 + total) % total);
  const next = () => setCurrent(prev => (prev + 1) % total);

  const slide = carouselSlides[current];

  return (
    <div
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "220px" : "380px",
        overflow: "hidden",
        background: slide.bg,
        transition: "background 0.5s ease",
        cursor: "pointer",
      }}
    >
      {/* Slide Content */}
      {carouselSlides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.03)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          {s.image ? (
            <img
              src={s.image}
              alt={s.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
          ) : (
            /* Placeholder when no image */
            <div style={{
              width: "100%",
              height: "100%",
              background: s.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              padding: "20px",
            }}>
              {/* Decorative placeholder icon */}
              <div style={{
                fontSize: isMobile ? "48px" : "80px",
                opacity: 0.35,
              }}>
                👗
              </div>
              <div style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
                padding: isMobile ? "10px 16px" : "16px 28px",
              }}>
                <div style={{
                  fontFamily: "Georgia, serif",
                  fontSize: isMobile ? "16px" : "26px",
                  fontWeight: "bold",
                  color: "#880E4F",
                  marginBottom: "4px",
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontSize: isMobile ? "11px" : "14px",
                  color: "#666",
                }}>
                  {s.sub}
                </div>
              </div>
            </div>
          )}

          {/* Overlay text when image exists */}
          {s.image && (
            <div style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              background: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              padding: isMobile ? "8px 16px" : "12px 28px",
              whiteSpace: "nowrap",
            }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: isMobile ? "16px" : "24px",
                fontWeight: "bold",
                color: "#FFD54F",
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: isMobile ? "11px" : "13px", color: "rgba(255,255,255,0.85)" }}>
                {s.sub}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.85)",
          border: "none",
          borderRadius: "50%",
          width: isMobile ? "28px" : "36px",
          height: isMobile ? "28px" : "36px",
          cursor: "pointer",
          fontSize: isMobile ? "14px" : "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.85)",
          border: "none",
          borderRadius: "50%",
          width: isMobile ? "28px" : "36px",
          height: isMobile ? "28px" : "36px",
          cursor: "pointer",
          fontSize: isMobile ? "14px" : "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "6px",
        zIndex: 10,
      }}>
        {carouselSlides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "20px" : "7px",
              height: "7px",
              borderRadius: "4px",
              background: i === current ? "#C2185B" : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "14px",
        background: "rgba(0,0,0,0.3)",
        color: "#fff",
        fontSize: "11px",
        padding: "3px 8px",
        borderRadius: "10px",
        zIndex: 10,
      }}>
        {current + 1} / {total}
      </div>
    </div>
  );
}
