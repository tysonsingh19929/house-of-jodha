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
      background: "#880E4F",
      padding: isMobile ? "40px 20px" : "64px 40px",
      borderTop: "3px solid transparent",
      borderImage: "linear-gradient(90deg,#FFD54F,#E91E63,#F9A825,#F48FB1,#FFD54F) 1",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 0%, rgba(233,30,99,0.3) 0%, transparent 60%)",
      }} />

      <h2 style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        textAlign: "center",
        marginBottom: isMobile ? "28px" : "44px",
        fontSize: isMobile ? "26px" : "34px",
        color: "#fff",
        position: "relative",
      }}>
        Why Choose{" "}
        <span style={{ color: "#FFD54F", fontStyle: "italic" }}>The Sringar House?</span>
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
              padding: isMobile ? "20px 14px" : "28px 20px",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "8px",
              border: "1px solid rgba(255,213,79,0.2)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.borderColor = "rgba(255,213,79,0.5)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,213,79,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: isMobile ? "28px" : "36px", marginBottom: "12px" }}>
              {feature.icon}
            </div>
            <h3 style={{
              marginBottom: "8px",
              color: "#FFD54F",
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