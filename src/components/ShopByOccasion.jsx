export default function ShopByOccasion() {
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
      padding: "60px 30px",
      background: "#f8f8f8",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "36px", color: "#08060d" }}>
        Shop by Occasion
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        maxWidth: "1126px",
        margin: "0 auto"
      }}>
        {occasions.map((occ, idx) => (
          <div
            key={idx}
            style={{
              textAlign: "center",
              padding: "30px 20px",
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
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>{occ.icon}</div>
            <p style={{ fontWeight: "600", color: occ.color, fontSize: "16px", margin: "0" }}>{occ.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}