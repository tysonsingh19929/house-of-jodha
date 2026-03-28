import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Beige Gold Tissue Silk Embroidered Lehenga Set",
    price: 25600,
    originalPrice: 30800,
    image: "👗",
    category: "Lehenga"
  },
  {
    id: 2,
    name: "Ivory Chinon Silk Gharara Set",
    price: 11500,
    originalPrice: 13500,
    image: "👚",
    category: "Gharara"
  },
  {
    id: 3,
    name: "Pre-draped Royal Purple Satin Saree",
    price: 8900,
    originalPrice: 10500,
    image: "🧥",
    category: "Saree"
  },
  {
    id: 4,
    name: "Designer Anarkali Suit - Midnight Blue",
    price: 16800,
    originalPrice: 19800,
    image: "👗",
    category: "Anarkali"
  },
  {
    id: 5,
    name: "Salwar Kameez - Emerald Green",
    price: 7500,
    originalPrice: 9000,
    image: "👚",
    category: "Salwar Kameez"
  },
  {
    id: 6,
    name: "Sharara Suit - Wine Red",
    price: 12500,
    originalPrice: 15000,
    image: "👗",
    category: "Sharara"
  }
];

export default function ProductCatalog({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div id="products" style={{ padding: "60px 30px", maxWidth: "1126px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "36px" }}>
        Shop Our Collection
      </h2>

      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "40px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              background: selectedCategory === cat ? "var(--accent)" : "var(--border)",
              color: selectedCategory === cat ? "#fff" : "var(--text-h)",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.3s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "30px"
      }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "all 0.3s",
              cursor: "pointer",
              background: "#fff"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "var(--shadow)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              fontSize: "60px",
              textAlign: "center",
              padding: "40px",
              background: "var(--accent-bg)"
            }}>
              {product.image}
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "#08060d", fontWeight: "600" }}>
                {product.name}
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <span style={{ fontSize: "14px", color: "var(--text)", textDecoration: "line-through" }}>
                  ₹{product.originalPrice}
                </span>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--accent)", marginLeft: "10px" }}>
                  ₹{product.price}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}