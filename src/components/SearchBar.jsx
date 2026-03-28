import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = window.innerWidth <= 768;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} style={{
      padding: isMobile ? "12px 15px" : "15px 30px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "8px" : "10px",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        <input
          type="text"
          placeholder="Search for dresses, categories, fabrics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1",
            padding: isMobile ? "8px 12px" : "10px 15px",
            border: "1px solid #D4AF37",
            borderRadius: "4px",
            fontSize: isMobile ? "13px" : "14px",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#D4AF37",
            color: "#fff",
            border: "none",
            padding: isMobile ? "8px 16px" : "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: isMobile ? "14px" : "16px"
          }}
        >
          🔍
        </button>
      </div>
    </form>
  );
}