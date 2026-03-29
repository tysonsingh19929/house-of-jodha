import { useState } from "react";

const products = [
  // LEHENGA (12 products)
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, image: "👗", category: "Lehenga" },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, image: "👗", category: "Lehenga" },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", price: 27000, originalPrice: 32900, image: "👗", category: "Lehenga" },
  { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, image: "👗", category: "Lehenga" },
  { id: 14, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, image: "👗", category: "Lehenga" },
  { id: 15, name: "Magenta Silk Printed & Embroidered Lehenga Set", price: 8300, originalPrice: 14800, image: "👗", category: "Lehenga" },
  { id: 16, name: "Yellow Silk Hand Worked & Printed Lehenga Set", price: 18000, originalPrice: 21600, image: "👗", category: "Lehenga" },
  { id: 17, name: "Mint Green Printed & Embroidered Silk Lehenga Set", price: 10000, originalPrice: 12300, image: "👗", category: "Lehenga" },
  { id: 18, name: "Lemon Green & Pink Silk Embroidered Lehenga Set", price: 29000, originalPrice: 34900, image: "👗", category: "Lehenga" },
  { id: 19, name: "Orange Tissue Silk Embroidered Lehenga Set", price: 16200, originalPrice: 19400, image: "👗", category: "Lehenga" },
  { id: 20, name: "Pink Georgette Embroidered Lehenga Set", price: 6100, originalPrice: 8000, image: "👗", category: "Lehenga" },
  { id: 21, name: "Mustard Georgette Embroidered Kurti Lehenga Set", price: 6800, originalPrice: 11000, image: "👗", category: "Lehenga" },

  // SAREE (10 products)
  { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, image: "🧥", category: "Saree" },
  { id: 22, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, image: "🧥", category: "Saree" },
  { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, image: "🧥", category: "Saree" },
  { id: 24, name: "Green Luxe Fabric Embroidered Saree", price: 9800, originalPrice: 12900, image: "🧥", category: "Saree" },
  { id: 25, name: "Bronze Maroon Silk Embroidered Designer Saree", price: 6100, originalPrice: 8200, image: "🧥", category: "Saree" },
  { id: 26, name: "Plum Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: "🧥", category: "Saree" },
  { id: 27, name: "Mustard Yellow Tissue Silk Embroidered Saree", price: 13500, originalPrice: 15900, image: "🧥", category: "Saree" },
  { id: 28, name: "Magenta Pink Silk Embroidered Saree", price: 6100, originalPrice: 7700, image: "🧥", category: "Saree" },
  { id: 29, name: "Dark Green Embroidered Silk Saree", price: 4800, originalPrice: 6000, image: "🧥", category: "Saree" },
  { id: 30, name: "Navy Blue Crepe Silk Printed Saree", price: 11000, originalPrice: 14000, image: "🧥", category: "Saree" },

  // ANARKALI (10 products)
  { id: 4, name: "Designer Anarkali Suit - Midnight Blue", price: 16800, originalPrice: 19800, image: "👗", category: "Anarkali" },
  { id: 31, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", price: 14000, originalPrice: 16900, image: "👗", category: "Anarkali" },
  { id: 32, name: "Ivory Georgette Embroidered Anarkali Dress With Dupatta", price: 14000, originalPrice: 16900, image: "👗", category: "Anarkali" },
  { id: 33, name: "Plum Georgette Embroidered Anarkali Dress With Dupatta", price: 7000, originalPrice: 8300, image: "👗", category: "Anarkali" },
  { id: 34, name: "Plum Jacquard Silk Embroidered Anarkali Dress With Dupatta", price: 6840, originalPrice: 11700, image: "👗", category: "Anarkali" },
  { id: 35, name: "Lavender Silk Embroidered Anarkali Dress", price: 11000, originalPrice: 14500, image: "👗", category: "Anarkali" },
  { id: 36, name: "Deep Red Silk Embroidered Bridal Anarkali", price: 25000, originalPrice: 31000, image: "👗", category: "Anarkali" },
  { id: 37, name: "Ivory Georgette Embroidered Anarkali Suit", price: 16000, originalPrice: 20000, image: "👗", category: "Anarkali" },
  { id: 38, name: "Ruby Red Tissue Silk Anarkali", price: 15000, originalPrice: 19500, image: "👗", category: "Anarkali" },
  { id: 39, name: "Midnight Blue Georgette Anarkali Dress", price: 9500, originalPrice: 13000, image: "👗", category: "Anarkali" },

  // SALWAR KAMEEZ (10 products)
  { id: 5, name: "Salwar Kameez - Emerald Green", price: 7500, originalPrice: 9000, image: "👚", category: "Salwar Kameez" },
  { id: 40, name: "Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set", price: 9000, originalPrice: 11100, image: "👚", category: "Salwar Kameez" },
  { id: 41, name: "Ivory & Pink Ombre Sparkling Crystal Detailed Georgette Top & Palazzo", price: 10000, originalPrice: 12300, image: "👚", category: "Salwar Kameez" },
  { id: 42, name: "Beautiful Lavender Kota Doriya Cotton Silk Embroidered Kurta Set", price: 5200, originalPrice: 7700, image: "👚", category: "Salwar Kameez" },
  { id: 43, name: "Beautiful Black Kota Doriya Cotton Silk Embroidered Kurta Set", price: 5200, originalPrice: 7100, image: "👚", category: "Salwar Kameez" },
  { id: 44, name: "Yellow Georgette Embroidered Indowestern Top & Palazzo Set With Dupatta", price: 10500, originalPrice: 12700, image: "👚", category: "Salwar Kameez" },
  { id: 45, name: "Black & Gold Crepe Silk Indowestern Top & Palazzo", price: 9000, originalPrice: 12000, image: "👚", category: "Salwar Kameez" },
  { id: 46, name: "Champagne Gold Silk Embroidered Saree-Style Kurta Set", price: 9000, originalPrice: 12000, image: "👚", category: "Salwar Kameez" },
  { id: 47, name: "Emerald Green Kota Silk Sharara Set", price: 9800, originalPrice: 12800, image: "👚", category: "Salwar Kameez" },
  { id: 48, name: "Teal Georgette Embroidered Salwar Kameez Set", price: 8500, originalPrice: 11200, image: "👚", category: "Salwar Kameez" },

  // GHARARA (8 products)
  { id: 2, name: "Ivory Chinon Silk Gharara Set", price: 11500, originalPrice: 13500, image: "👚", category: "Gharara" },
  { id: 49, name: "Pink Purple Georgette Embroidered Gharara Set", price: 9500, originalPrice: 12000, image: "👚", category: "Gharara" },
  { id: 50, name: "Blush Pink Georgette Embroidered Gharara Suit", price: 11000, originalPrice: 14000, image: "👚", category: "Gharara" },
  { id: 51, name: "Peach Silk Embroidered Gharara Set", price: 10200, originalPrice: 13500, image: "👚", category: "Gharara" },
  { id: 52, name: "Maroon Chinon Silk Gharara with Gold Work", price: 13800, originalPrice: 17200, image: "👚", category: "Gharara" },
  { id: 53, name: "Lavender Georgette Embroidered Gharara Suit", price: 9800, originalPrice: 12500, image: "👚", category: "Gharara" },
  { id: 54, name: "Cream & Gold Silk Gharara Set", price: 14500, originalPrice: 18000, image: "👚", category: "Gharara" },
  { id: 55, name: "Navy Blue Chinon Silk Gharara Suit", price: 12300, originalPrice: 15500, image: "👚", category: "Gharara" },

  // SHARARA (10 products)
  { id: 6, name: "Sharara Suit - Wine Red", price: 12500, originalPrice: 15000, image: "👗", category: "Sharara" },
  { id: 56, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, image: "👚", category: "Sharara" },
  { id: 57, name: "Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug", price: 14500, originalPrice: 16300, image: "👗", category: "Sharara" },
  { id: 58, name: "Forest Green Georgette Embroidered Sharara Suit Set", price: 5000, originalPrice: 8600, image: "👚", category: "Sharara" },
  { id: 59, name: "Dusty Rose Georgette Sharara Suit", price: 9800, originalPrice: 12800, image: "👚", category: "Sharara" },
  { id: 60, name: "Mustard Yellow Sharara Suit with Embroidery", price: 11200, originalPrice: 14500, image: "👗", category: "Sharara" },
  { id: 61, name: "Maroon Silk Embroidered Sharara Set", price: 13500, originalPrice: 17000, image: "👗", category: "Sharara" },
  { id: 62, name: "Mint Green Georgette Sharara Suit", price: 10500, originalPrice: 13200, image: "👚", category: "Sharara" },
  { id: 63, name: "Coral Pink Shararaa with Mirror Work", price: 12800, originalPrice: 16000, image: "👗", category: "Sharara" },
  { id: 64, name: "Indigo Blue Sharara Suit Set", price: 11000, originalPrice: 14000, image: "👗", category: "Sharara" }
];
];

export default function ProductCatalog({ onAddToCart, onRemoveProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProducts, setAddedProducts] = useState({});
  const isMobile = window.innerWidth <= 768;

  const handleAddProduct = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    onAddToCart(product);
  };

  const handleDecreaseQuantity = (product) => {
    setAddedProducts(prev => {
      const newQty = Math.max(0, (prev[product.id] || 0) - 1);
      if (newQty === 0) {
        const updated = {...prev};
        delete updated[product.id];
        onRemoveProduct?.(product.id);
        return updated;
      }
      return { ...prev, [product.id]: newQty };
    });
  };
  
  const categories = ["All", "Lehenga", "Saree", "Anarkali", "Salwar Kameez", "Gharara", "Sharara"];
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div id="products" style={{ padding: isMobile ? "40px 15px" : "60px 30px", maxWidth: "1126px", margin: "0 auto" }}>
      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: isMobile ? "6px" : "10px",
        marginBottom: isMobile ? "25px" : "40px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: isMobile ? "6px 12px" : "8px 16px",
              fontSize: isMobile ? "12px" : "14px",
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
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? "15px" : "30px"
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
              fontSize: isMobile ? "50px" : "60px",
              textAlign: "center",
              padding: isMobile ? "30px" : "40px",
              background: "var(--accent-bg)"
            }}>
              {product.image}
            </div>
            <div style={{ padding: isMobile ? "15px" : "20px" }}>
              <h3 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "10px", color: "#08060d", fontWeight: "600" }}>
                {product.name}
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <span style={{ fontSize: "12px", color: "var(--text)", textDecoration: "line-through" }}>
                  ₹{product.originalPrice}
                </span>
                <span style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: "var(--accent)", marginLeft: "10px" }}>
                  ₹{product.price}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {addedProducts[product.id] ? (
                  <>
                    <button
                      onClick={() => handleDecreaseQuantity(product)}
                      style={{
                        width: "35px",
                        height: "35px",
                        padding: "0",
                        fontSize: "18px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--accent)"
                    }}>
                      ✓ Added ({addedProducts[product.id]})
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      style={{
                        width: "35px",
                        height: "35px",
                        padding: "0",
                        fontSize: "18px",
                        background: "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAddProduct(product)}
                    style={{
                      width: "100%",
                      padding: isMobile ? "8px" : "10px",
                      fontSize: isMobile ? "13px" : "14px",
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
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}