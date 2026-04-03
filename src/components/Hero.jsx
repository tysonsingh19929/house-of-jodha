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

  // --- NEW WHATSAPP FUNCTION ---
  const handleWhatsAppInquiry = () => {
    const phoneNumber = "919876543210"; // Replace with your actual WhatsApp number
    const currentSlide = carouselSlides[current];
    const message = `Hello! I'm interested in the ${currentSlide.label} featured on your website. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
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
              objectPosition: "center 20%",
              display: "block",
            }}
          />

          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }} />

          <div style={{
            position: "absolute",
            bottom: isMobile ? "32px" : "50px", 
            left: isMobile ? "18px" : "52px",
            zIndex: 2,
            textAlign: "left",
            maxWidth: isMobile ? "240px" : "500px", // Width slightly increased to fit two buttons
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

            {/* BUTTON CONTAINER */}
            <div style={{ display: "flex", gap: isMobile ? "8px" : "12px", alignItems: "center" }}>
              <button
                onClick={scrollToOccasions}
                style={{
                  background: slideAccent[i],
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: isMobile ? "7px 14px" : "10px 24px",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `0 4px 15px ${slideAccent[i]}66`,
                  transition: "transform 0.2s",
                }}
              >
                Shop Now →
              </button>

              {/* WHATSAPP BUTTON */}
              <button
                onClick={handleWhatsAppInquiry}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "20px",
                  padding: isMobile ? "7px 14px" : "10px 24px",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
              >
                {/* Simple SVG WhatsApp Icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Inquire
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
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

      {/* Pagination Dots */}
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