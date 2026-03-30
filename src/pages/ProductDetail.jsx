import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import imageDatabase from "../data/imageDatabase.js";

// Hardcoded products (same as ProductCatalog)
const allProducts = [
  // LEHENGA
  { id: 1, name: "Beige Gold Tissue Silk Embroidered Lehenga Set", price: 25600, originalPrice: 30800, description: "Elegant beige and gold tissue silk lehenga with intricate embroidery work. Perfect for weddings and festive occasions.", category: "Lehenga", material: "Tissue Silk", color: "Beige & Gold", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 2200, stock: 5 },
  { id: 11, name: "Red Silk Hand Embroidered Bridal Lehenga", price: 32000, originalPrice: 40000, description: "Luxurious red silk bridal lehenga with hand embroidered details and mirror work. Ideal for weddings.", category: "Lehenga", material: "Silk", color: "Red", occasions: ["Wedding", "Bridal"], rating: 4.5, reviews: 1800, stock: 3 },
  { id: 12, name: "Blush Pink Tissue Silk Embroidered Bridal Lehenga", price: 27000, originalPrice: 32900, description: "Soft blush pink bridal lehenga with tissue silk and embroidered choli. Stunning for wedding ceremonies.", category: "Lehenga", material: "Tissue Silk", color: "Blush Pink", occasions: ["Wedding", "Bridal"], rating: 4.4, reviews: 1950, stock: 4 },
  { id: 13, name: "Maroon Tissue Silk Bridal Lehenga Choli Set", price: 29000, originalPrice: 36000, description: "Deep maroon bridal lehenga with ornate embroidery and matching choli. Complete bridal ensemble.", category: "Lehenga", material: "Tissue Silk", color: "Maroon", occasions: ["Wedding", "Bridal"], rating: 4.3, reviews: 1700, stock: 3 },
  { id: 14, name: "Parrot Green Floral Printed Lehenga Set", price: 7700, originalPrice: 10500, description: "Vibrant parrot green lehenga with floral prints and light embroidery. Perfect for celebrations.", category: "Lehenga", material: "Cotton Silk", color: "Parrot Green", occasions: ["Festival", "Celebration"], rating: 4.2, reviews: 2100, stock: 6 },
  
  // SAREE
  { id: 3, name: "Pre-draped Royal Purple Satin Saree", price: 8900, originalPrice: 10500, description: "Beautiful pre-draped saree in royal purple satin, perfect for any celebration. Easy to wear.", category: "Saree", material: "Satin", color: "Royal Purple", occasions: ["Festival", "Party"], rating: 4.1, reviews: 1600, stock: 7 },
  { id: 22, name: "Gold Sequined Silk Bridal Saree", price: 21000, originalPrice: 27000, description: "Luxurious gold sequined silk saree with blouse. Perfect for bridal and festive occasions.", category: "Saree", material: "Silk", color: "Gold", occasions: ["Wedding", "Bridal"], rating: 4.6, reviews: 2300, stock: 4 },
  { id: 23, name: "Ivory & Gold Embroidered Bridal Saree", price: 18000, originalPrice: 23000, description: "Elegant ivory saree with gold embroidery and beadwork. Traditional bridal attire.", category: "Saree", material: "Silk", color: "Ivory & Gold", occasions: ["Wedding", "Bridal"], rating: 4.5, reviews: 2050, stock: 3 },
  
  // ANARKALI
  { id: 4, name: "Designer Anarkali Suit - Midnight Blue", price: 16800, originalPrice: 19800, description: "Beautiful midnight blue anarkali suit with embroidered yoke and hem. Comfortable and stylish.", category: "Anarkali", material: "Georgette", color: "Midnight Blue", occasions: ["Wedding", "Festival"], rating: 4.4, reviews: 1900, stock: 7 },
  { id: 31, name: "Indigo Blue Georgette Embroidered Anarkali With Dupatta", price: 14000, originalPrice: 16900, description: "Stunning indigo blue anarkali with traditional embroidery and matching dupatta.", category: "Anarkali", material: "Georgette", color: "Indigo Blue", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 1750, stock: 5 },
  
  // SALWAR KAMEEZ
  { id: 5, name: "Salwar Kameez - Emerald Green", price: 7500, originalPrice: 9000, description: "Classic emerald green salwar kameez with traditional embroidery. Timeless ethnic wear.", category: "Salwar Kameez", material: "Cotton Silk", color: "Emerald Green", occasions: ["Daily", "Festival"], rating: 4.0, reviews: 1500, stock: 10 },
  { id: 40, name: "Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set", price: 9000, originalPrice: 11100, description: "Contemporary indowestern top with palazzo pants. Perfect for modern occasions.", category: "Salwar Kameez", material: "Crepe Silk", color: "Navy Blue", occasions: ["Party", "Celebration"], rating: 4.2, reviews: 1650, stock: 8 },
  
  // GHARARA
  { id: 2, name: "Ivory Chinon Silk Gharara Set", price: 11500, originalPrice: 13500, description: "Sophisticated ivory chinon silk gharara with intricate embroidery. Elegant bridal option.", category: "Gharara", material: "Chinon Silk", color: "Ivory", occasions: ["Wedding", "Bridal"], rating: 4.4, reviews: 1850, stock: 3 },
  { id: 49, name: "Pink Purple Georgette Embroidered Gharara Set", price: 9500, originalPrice: 12000, description: "Beautiful pink purple gharara with stunning embroidery work. Perfect for celebrations.", category: "Gharara", material: "Georgette", color: "Pink Purple", occasions: ["Wedding", "Festival"], rating: 4.3, reviews: 1700, stock: 5 },
  
  // SHARARA
  { id: 6, name: "Sharara Suit - Wine Red", price: 12500, originalPrice: 15000, description: "Glamorous wine red sharara suit with embroidered details. Perfect for festive celebrations.", category: "Sharara", material: "Silk", color: "Wine Red", occasions: ["Wedding", "Festival"], rating: 4.5, reviews: 2000, stock: 5 },
  { id: 56, name: "Pink Purple Georgette Embroidered Sharara Suit Set", price: 6100, originalPrice: 10000, description: "Elegant pink purple sharara with beautiful embroidery and matching dupatta.", category: "Sharara", material: "Georgette", color: "Pink Purple", occasions: ["Festival", "Party"], rating: 4.2, reviews: 1600, stock: 6 }
];

const getImageForProduct = (category, index) => {
  const categoryKey = category === "Salwar Kameez" ? "salwarKameez" : category.toLowerCase();
  const urls = imageDatabase[categoryKey] || imageDatabase.lehenga;
  return urls[index % urls.length];
};

export default function ProductDetail({ cartOpen, setCartOpen, addToCart, removeFromCart, cartItems, cartCount }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    // Find product from hardcoded list
    const found = allProducts.find(p => p.id === parseInt(productId));
    if (found) {
      // Assign image based on category and ID
      const categoryProducts = allProducts.filter(p => p.category === found.category);
      const index = categoryProducts.findIndex(p => p.id === found.id);
      const image = getImageForProduct(found.category, index);
      setProduct({ ...found, image });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product && addToCart) {
      // Add product with quantity and size info
      const itemToAdd = {
        ...product,
        size: selectedSize,
        quantity: quantity,
        addedAt: Date.now()
      };
      
      // Add to cart once with all items
      for (let i = 0; i < quantity; i++) {
        addToCart({ ...product, size: selectedSize });
      }
      
      // Show success feedback
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      setQuantity(1);
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  if (loading) {
    return <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#999" }}>Loading product... ⏳</div>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")} style={{
          padding: "10px 20px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px"
        }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", paddingTop: isMobile ? "100px" : "120px" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}

      {/* Breadcrumb */}
      <div style={{ padding: "20px", fontSize: "14px", color: "#666", borderBottom: "1px solid #eee" }}>
        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "var(--accent)" }}>Home</span> &gt; 
        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "var(--accent)", marginLeft: "10px" }}>{product.category}</span> &gt; 
        <span style={{ marginLeft: "10px", color: "#999" }}>{product.name.substring(0, 50)}...</span>
      </div>

      {/* Product Details Container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "40px",
        padding: isMobile ? "20px" : "40px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Product Images */}
        <div>
          <div style={{
            background: "#f5f5f5",
            aspectRatio: "1",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <img src={product.image} alt={product.name} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }} />
          </div>
          
          {/* Image Thumbnails (Placeholder) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                background: "#f5f5f5",
                aspectRatio: "1",
                borderRadius: "4px",
                cursor: "pointer",
                border: i === 1 ? "2px solid var(--accent)" : "1px solid #ddd",
                overflow: "hidden"
              }}>
                <img src={product.image} alt={`View ${i}`} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category & Stock */}
          <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "10px" }}>
            {product.category}
          </div>

          {/* Product Name */}
          <h1 style={{
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "10px",
            lineHeight: "1.3"
          }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ fontSize: "14px", marginBottom: "20px", color: "#ff6b6b" }}>
            ⭐ {product.rating} ★ <span style={{ color: "#999", fontSize: "13px" }}>({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price Section */}
          <div style={{
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "32px", fontWeight: "700", color: "#333" }}>₹{product.price}</span>
              <span style={{ fontSize: "18px", color: "#999", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff", background: "#ff6b6b", padding: "4px 8px", borderRadius: "4px" }}>
                {discount}% OFF
              </span>
            </div>
            {product.stock <= 3 && (
              <div style={{ color: "#ff6b6b", fontSize: "13px", fontWeight: "600" }}>
                ⚠️ Only {product.stock} left in stock!
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>Description</h3>
            <p style={{ color: "#666", lineHeight: "1.6", fontSize: "14px" }}>{product.description}</p>
          </div>

          {/* Product Details */}
          <div style={{ marginBottom: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Material</h4>
              <p style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>{product.material}</p>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Color</h4>
              <p style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>{product.color}</p>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Occasions</h4>
              <p style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>{product.occasions.join(", ")}</p>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Stock Available</h4>
              <p style={{ fontSize: "14px", color: product.stock > 5 ? "#27ae60" : "#ff6b6b", fontWeight: "500" }}>{product.stock} units</p>
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>Select Size</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "10px",
                    background: selectedSize === size ? "var(--accent)" : "#f5f5f5",
                    color: selectedSize === size ? "#fff" : "#333",
                    border: selectedSize === size ? "none" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px"
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>Quantity</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "auto" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "700",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.target.style.background = "#e0e0e0"}
                onMouseLeave={e => e.target.style.background = "#f5f5f5"}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1) {
                    setQuantity(val);
                  }
                }}
                style={{
                  width: "80px",
                  height: "50px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                  background: "#fff",
                  padding: "0 10px"
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "700",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.target.style.background = "#e0e0e0"}
                onMouseLeave={e => e.target.style.background = "#f5f5f5"}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: "15px",
              background: addedToCart ? "#27ae60" : "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "10px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={e => !addedToCart && (e.target.style.background = "#c9860f")}
            onMouseLeave={e => !addedToCart && (e.target.style.background = "var(--accent)")}
          >
            {addedToCart ? "✓ Added to Cart!" : `Add ${quantity} to Cart`}
          </button>

          {/* Wishlist Button */}
          <button
            style={{
              width: "100%",
              padding: "15px",
              background: "#fff",
              color: "#666",
              border: "2px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            ♡ Add to Wishlist
          </button>
        </div>
      </div>

      {/* Additional Info Sections */}
      <div style={{
        background: "#f9f9f9",
        padding: isMobile ? "20px" : "40px",
        margin: "40px 0",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: "20px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "10px" }}>🚚 Free Shipping</h3>
          <p style={{ color: "#666", fontSize: "13px" }}>On orders above ₹500</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "10px" }}>🔄 Easy Returns</h3>
          <p style={{ color: "#666", fontSize: "13px" }}>30-day return policy</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "10px" }}>✅ Authentic</h3>
          <p style={{ color: "#666", fontSize: "13px" }}>100% original products</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
