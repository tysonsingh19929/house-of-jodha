import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} style={{
      padding: "15px 30px"
    }}>
      <div style={{
        display: "flex",
        gap: "10px",
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
            padding: "10px 15px",
            border: "1px solid #B8448D",
            borderRadius: "4px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#B8448D",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          🔍
        </button>
      </div>
    </form>
  );
}