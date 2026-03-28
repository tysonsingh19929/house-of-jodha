export default function Features() {
  const isMobile = window.innerWidth <= 768;

  const features = [
    {
      icon: "🚚",
      title: "Free Delivery",
      desc: "Free shipping on eligible orders across the globe"
    },
    {
      icon: "✂️",
      title: "Perfect Tailoring",
      desc: "Bespoke, made-to-measure, boutique-style stitching"
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      desc: "Handpicked fabrics and exquisite craftsmanship"
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "Quick doorstep deliveries to your location"
    }
  ];

  return (
    <div style={{
      background: "#fff",
      padding: isMobile ? "40px 15px" : "60px 30px",
      borderTop: "1px solid #e5e4e7",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: isMobile ? "30px" : "50px", fontSize: isMobile ? "28px" : "36px", color: "#2C4F3E" }}>
        Why Choose House of Jodha?
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
        gap: isMobile ? "15px" : "30px",
        maxWidth: "1126px",
        margin: "0 auto"
      }}>
        {features.map((feature, idx) => (
          <div key={idx} style={{
            textAlign: "center",
            padding: isMobile ? "20px" : "30px",
            background: "rgba(212, 175, 55, 0.08)",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <div style={{ fontSize: isMobile ? "32px" : "40px", marginBottom: "15px" }}>{feature.icon}</div>
            <h3 style={{ marginBottom: "10px", color: "#08060d", fontWeight: "600", fontSize: isMobile ? "16px" : "18px" }}>{feature.title}</h3>
            <p style={{ color: "#333", lineHeight: "1.6", margin: "0", fontSize: isMobile ? "13px" : "14px" }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}