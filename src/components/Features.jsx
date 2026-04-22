export default function Features() {
  const isMobile = window.innerWidth <= 768;

  const features = [
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
      title: "Global Shipping", desc: "Complimentary delivery on premium orders worldwide"
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>,
      title: "Bespoke Tailoring", desc: "Made-to-measure boutique stitching for a flawless fit"
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      title: "Exquisite Quality", desc: "Handpicked luxury fabrics and artisanal craftsmanship"
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
      title: "Secure Checkout", desc: "100% encrypted and trusted payment gateways"
    },
  ];

  return (
    <div style={{
      background: "#0a0f0d",
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, #0a0f0d 70%)",
      padding: isMobile ? "60px 20px" : "100px 40px",
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
        marginBottom: isMobile ? "40px" : "60px",
        fontSize: isMobile ? "32px" : "46px",
        color: "#fff",
        fontWeight: "600",
        position: "relative",
      }}>
        The Sringar <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Standard</span>
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "16px" : "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: isMobile ? "30px 20px" : "40px 30px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              border: "1px solid rgba(212,175,55,0.08)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(212,175,55,0.04)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              color: "#D4AF37",
              marginBottom: "20px",
              width: "60px", height: "60px",
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.1)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              marginBottom: "10px",
              color: "#fff",
              fontWeight: "700",
              fontSize: isMobile ? "15px" : "18px",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.5px"
            }}>
              {feature.title}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: "1.65",
              margin: "0",
              fontSize: isMobile ? "12px" : "14px",
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}