import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const defaultSlides = [
  {
    image: "https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&w=1200&format=webp",
    label: "Wedding Collection",
    sub: "Exquisite bridal wear for the most special day",
    route: "/occasion/wedding",
  },
  {
    image: "https://images.pexels.com/photos/32081722/pexels-photo-32081722.jpeg?auto=compress&w=1200&format=webp",
    label: "Reception Glamour",
    sub: "Dazzling glamour for your reception night",
    route: "/occasion/reception",
  },
  {
    image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&w=1200&format=webp",
    label: "Fine Jewellery",
    sub: "Handcrafted luxury pieces for your special moments",
    route: "/occasion/jewellery",
  },
  {
    image: "https://images.pexels.com/photos/29494642/pexels-photo-29494642.jpeg?auto=compress&w=1200&format=webp",
    label: "Engagement Elegance",
    sub: "Sophisticated looks for your special announcement",
    route: "/occasion/engagement",
  },
  {
    image: "https://images.pexels.com/photos/34833771/pexels-photo-34833771.jpeg?auto=compress&w=1200&format=webp",
    label: "Mehendi Ceremony",
    sub: "Vibrant & colorful styles for your Mehendi",
    route: "/occasion/mehendi",
  },
  {
    image: "https://images.pexels.com/photos/33411709/pexels-photo-33411709.jpeg?auto=compress&w=1200&format=webp",
    label: "Sangeet Night",
    sub: "Elegant, dance-ready outfits for celebration",
    route: "/occasion/sangeet",
  },
  {
    image: "https://images.pexels.com/photos/30184613/pexels-photo-30184613.jpeg?auto=compress&w=1200&format=webp",
    label: "Cocktail Party",
    sub: "Chic & contemporary styles for cocktail evenings",
    route: "/occasion/cocktail",
  },
];

const slideAccent = ["#C2185B", "#E65100", "#1565C0", "#2E7D32", "#F5B041", "#6A1B9A"];
const INTERVAL_MS = 3000;

export default function Hero() {
  const [carouselSlides, setCarouselSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const total = carouselSlides.length;

  useEffect(() => {
    const loadHeroSlides = async () => {
      const cached = localStorage.getItem("hero_slides_cache");
      if (cached) { try { setCarouselSlides(JSON.parse(cached)); } catch (e) { } }
      try {
        const settings = await api.getSettings();
        if (settings.hero_slides && settings.hero_slides.length > 0) {
          setCarouselSlides(settings.hero_slides);
          localStorage.setItem("hero_slides_cache", JSON.stringify(settings.hero_slides));
        }
      } catch (e) { console.error("Failed to load hero slides from DB", e); }
    };
    loadHeroSlides();
  }, []);

  // Hide tooltip after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "9967670497";
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
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
        height: isMobile ? "264px" : "504px",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "pan-y",
        background: "#111",
      }}
    >
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes tooltipFadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .inquire-pulse-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #25D366;
          z-index: 10;
        }
        .inquire-pulse-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25D366;
          animation: pulseRing 1.5s ease-out infinite;
        }
        .inquire-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.85);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          padding: 6px 12px;
          border-radius: 6px;
          pointer-events: none;
          animation: tooltipFadeIn 0.4s ease forwards;
          border: 1px solid rgba(37,211,102,0.4);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .inquire-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: rgba(0,0,0,0.85);
        }
      `}</style>

      {/* Sleek Promotional Badge */}
      <div style={{
        position: "absolute",
        top: isMobile ? "16px" : "32px",
        left: isMobile ? "16px" : "40px",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        borderRadius: "30px",
        padding: isMobile ? "6px 12px" : "8px 16px",
        color: "#fff",
        fontSize: isMobile ? "10px" : "12px",
        fontWeight: "600",
        letterSpacing: "1.5px",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        textTransform: "uppercase"
      }}>
        <span style={{ color: "#D4AF37", fontSize: isMobile ? "14px" : "16px", lineHeight: 1 }}>✦</span>
        Flat 50% Off
      </div>

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
            maxWidth: isMobile ? "240px" : "500px",
          }}>
            <div style={{
              fontSize: isMobile ? "8px" : "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: slideAccent[i % slideAccent.length],
              textTransform: "uppercase",
              marginBottom: isMobile ? "4px" : "8px",
            }}>
              Shop By Occasion
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

            <div style={{ display: "flex", gap: isMobile ? "8px" : "12px", alignItems: "center" }}>
              <button
                onClick={() => navigate(s.route)}
                style={{
                  background: slideAccent[i % slideAccent.length],
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: isMobile ? "7px 14px" : "10px 24px",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `0 4px 15px ${slideAccent[i % slideAccent.length]}66`,
                  transition: "transform 0.2s",
                }}
              >
                Shop Now →
              </button>

              <div style={{ position: "relative" }}>
                <span className="inquire-pulse-dot" />
                {showTooltip && (
                  <div className="inquire-tooltip">
                    Tap for full product info
                  </div>
                )}

                <button
                  onClick={handleWhatsAppInquiry}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    border: "1px solid rgba(37, 211, 102, 0.5)",
                    borderRadius: "20px",
                    padding: isMobile ? "7px 14px" : "10px 24px",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37, 211, 102, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.5)";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Inquire this
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "none",
          borderRadius: "50%", width: isMobile ? "24px" : "34px", height: isMobile ? "24px" : "34px",
          cursor: "pointer", color: "#fff", zIndex: 10,
        }}
      >{"<"}</button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "none",
          borderRadius: "50%", width: isMobile ? "24px" : "34px", height: isMobile ? "24px" : "34px",
          cursor: "pointer", color: "#fff", zIndex: 10,
        }}
      >{">"}</button>

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