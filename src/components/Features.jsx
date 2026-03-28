export default function Features() {
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
      padding: "60px 30px",
      borderTop: "1px solid #e5e4e7",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "36px", color: "#08060d" }}>
        Why Choose House of Jodha?
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        maxWidth: "1126px",
        margin: "0 auto"
      }}>
        {features.map((feature, idx) => (
          <div key={idx} style={{
            textAlign: "center",
            padding: "30px",
            background: "rgba(184, 68, 141, 0.08)",
            borderRadius: "8px",
            border: "1px solid rgba(184, 68, 141, 0.3)"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>{feature.icon}</div>
            <h3 style={{ marginBottom: "10px", color: "#08060d", fontWeight: "600" }}>{feature.title}</h3>
            <p style={{ color: "#333", lineHeight: "1.6", margin: "0" }}>{feature.desc}</p>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>{feature.icon}</div>
            <h3 style={{ marginBottom: "10px", color: "#08060d" }}>{feature.title}</h3>
            <p style={{ color: "#333", lineHeight: "1.6" }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}