export default function Features() {
  const isMobile = window.innerWidth <= 768;

  const features = [
    { icon: "🚚", title: "Free Delivery", desc: "Free shipping on eligible orders across the globe" },
    { icon: "✂️", title: "Perfect Tailoring", desc: "Bespoke, made-to-measure, boutique-style stitching" },
    { icon: "⭐", title: "Premium Quality", desc: "Handpicked fabrics and exquisite craftsmanship" },
    { icon: "⚡", title: "Fast Delivery", desc: "Quick doorstep deliveries to your location" },
  ];

  return (
    <div style={{
      background: "#0a0f0d",
      backgroundImage: "radial-gradient(circle at 50% 0%, #1e3a29 0%, #0a0f0d 70%)",
      padding: isMobile ? "40px 20px" : "64px 40px",
      borderTop: "1px solid rgba(212,175,55,0.1)",
      borderBottom: "1px solid rgba(212,175,55,0.1)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
      }} />

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        textAlign: "center",
        marginBottom: isMobile ? "32px" : "54px",
        fontSize: isMobile ? "32px" : "42px",
        color: "#fff",
        position: "relative",
      }}>
        Why Choose{" "}
        <span style={{ color: "#D4AF37", fontStyle: "italic" }}>The Sringar House?</span>
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "12px" : "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        position: "relative",
      }}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              textAlign: "center",
              padding: isMobile ? "24px 16px" : "32px 24px",
              background: "rgba(20, 30, 25, 0.4)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              border: "1px solid rgba(212,175,55,0.1)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(212,175,55,0.05)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(20, 30, 25, 0.4)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: isMobile ? "28px" : "36px", marginBottom: "16px", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
              {feature.icon}
            </div>
            <h3 style={{
              marginBottom: "8px",
              color: "#D4AF37",
              fontWeight: "700",
              fontSize: isMobile ? "13px" : "15px",
            }}>
              {feature.title}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.65",
              margin: "0",
              fontSize: isMobile ? "11px" : "13px",
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}