import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setDbProducts(Array.isArray(data) ? data : []))
      .catch(console.error);

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      const dynamicKeywords = Array.from(new Set(dbProducts.flatMap(p => [p.name, p.category])));
      const filtered = dynamicKeywords.filter(kw => kw && kw.toLowerCase().includes(value.toLowerCase())).slice(0, 10);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e, query = searchQuery) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", padding: isMobile ? "8px 12px" : "15px 30px" }}>
      <form onSubmit={(e) => handleSearch(e)} style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "8px" : "10px",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for dresses, categories, fabrics..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
          autoComplete="off"
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
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: "absolute", top: isMobile ? "calc(100% - 8px)" : "calc(100% - 15px)",
          left: 0, right: 0, maxWidth: "500px", margin: "0 auto",
          background: "#fff", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          border: "1px solid #eaeaea", listStyle: "none", padding: "8px 0", zIndex: 1000,
          maxHeight: "200px", overflowY: "auto", textAlign: "left"
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => { setSearchQuery(s); handleSearch(null, s); }}
              style={{ padding: "10px 15px", cursor: "pointer", fontSize: "14px", color: "#333", borderBottom: i < suggestions.length - 1 ? "1px solid #f5f5f5" : "none", transition: "background 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f9f9f9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}