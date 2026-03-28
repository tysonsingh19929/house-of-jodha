export default function ShopByOccasion() {
  const isMobile = window.innerWidth <= 768;

  const occasions = [
    { name: "Mehendi", icon: "💚", color: "#22C55E" },
    { name: "Sangeet", icon: "🎵", color: "#F59E0B" },
    { name: "Wedding", icon: "💍", color: "#EC4899" },
    { name: "Engagement", icon: "✨", color: "#8B5CF6" },
    { name: "Reception", icon: "🎉", color: "#06B6D4" },
    { name: "Cocktail", icon: "🍾", color: "#EF4444" }
  ];

  return (
    <div style={{
      padding: isMobile ? "40px 15px" : "60px 30px",
      background: "#f8f8f8",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: isMobile ? "30px" : "50px", fontSize: isMobile ? "28px" : "36px", color: "#08060d" }}>
        Shop by Occasion
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(150px, 1fr))",
        gap: isMobile ? "12px" : "20px",
        maxWidth: "1126px",
        margin: "0 auto"
      }}>
        {occasions.map((occ, idx) => (
          <div
            key={idx}
            style={{
              textAlign: "center",
              padding: isMobile ? "20px 15px" : "30px 20px",
              background: "#fff",
              borderRadius: "8px",
              border: `2px solid ${occ.color}`,
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: isMobile ? "32px" : "40px", marginBottom: "10px" }}>{occ.icon}</div>
            <p style={{ fontWeight: "600", color: occ.color, fontSize: isMobile ? "14px" : "16px", margin: "0" }}>{occ.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}