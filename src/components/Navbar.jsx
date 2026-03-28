export default function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <h2 style={{ margin: 0, color: "#B8448D" }}>House of Jodha</h2>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <a href="#" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600" }}>Home</a>
        <a href="#products" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600" }}>Shop</a>
        <a href="#reviews" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600" }}>Reviews</a>
        <a href="#about" style={{ textDecoration: "none", color: "#08060d", fontWeight: "600" }}>About</a>
        <button 
          onClick={onCartClick}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          🛍️ Cart ({cartCount})
        </button>
      </div>
    </div>
  );
}