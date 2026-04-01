import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import SizeChart from "../components/SizeChart";
import { products } from "../data/products.js";

export default function ProductDetail({ 
  cartOpen, setCartOpen, addToCart, removeFromCart, cartItems, cartCount,
  wishlistOpen, setWishlistOpen, wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist 
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    // Find product by ID from shared products list
    const found = products.find(p => p.id === parseInt(productId));
    
    if (found) {
      setProduct(found);
    } else {
      // Product not found
      console.warn(`Product with ID ${productId} not found`);
      setProduct(null);
    }
    setLoading(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product not loaded yet");
      return;
    }

    if (!addToCart) {
      console.error("Add to cart function not available");
      return;
    }

    // Get the quantity value
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    
    console.log("=== ADD TO CART ===");
    console.log("Product:", product.name);
    console.log("Quantity to add:", qty);
    console.log("Size:", selectedSize);

    // Add items to cart
    for (let i = 0; i < qty; i++) {
      addToCart({ 
        ...product, 
        size: selectedSize
      });
    }
    
    console.log(`✓ Called addToCart ${qty} times`);
    console.log("===================");

    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    
    // Reset quantity for next use
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!product) {
      console.error("Product not loaded yet");
      return;
    }

    if (!addToCart) {
      console.error("Add to cart function not available");
      return;
    }

    // Get the quantity value
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
    
    // Add items to cart
    for (let i = 0; i < qty; i++) {
      addToCart({ 
        ...product, 
        size: selectedSize
      });
    }
    
    // Reset quantity
    setQuantity(1);
    
    // Navigate to checkout immediately
    navigate("/checkout");
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
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setCartOpen(!cartOpen)}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setWishlistOpen(!wishlistOpen)}
      />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      {wishlistOpen && (
        <Wishlist 
          items={wishlistItems} 
          onRemove={removeFromWishlist} 
          onClose={() => setWishlistOpen(false)}
          onAddToCart={addToCart}
        />
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
            ⭐ 4.8 ★ <span style={{ color: "#999", fontSize: "13px" }}>(2,345 reviews)</span>
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
          </div>

          {/* Category & Info */}
          <div style={{ marginBottom: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Category</h4>
              <p style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>{product.category}</p>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "5px" }}>Price</h4>
              <p style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>₹{product.price}</p>
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", margin: "0" }}>Select Size</h3>
              <button
                onClick={() => setSizeChartOpen(true)}
                style={{
                  background: "none",
                  border: "1px solid #D4AF37",
                  color: "#D4AF37",
                  padding: "4px 12px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.target.style.background = "rgba(212,175,55,0.1)"}
                onMouseLeave={e => e.target.style.background = "none"}
              >
                📏 Size Guide
              </button>
            </div>
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
          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: "500", color: "#999", marginBottom: "5px", opacity: 0.8 }}>Quantity</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "auto" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "35px",
                  height: "35px",
                  background: "#f9f9f9",
                  border: "1px solid #e5e5e5",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  color: "#999"
                }}
                onMouseEnter={e => e.target.style.background = "#f0f0f0"}
                onMouseLeave={e => e.target.style.background = "#f9f9f9"}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  
                  // Allow empty field during typing
                  if (inputValue === "") {
                    return;
                  }
                  
                  const numValue = parseInt(inputValue, 10);
                  
                  // Only update if it's a valid positive number
                  if (!isNaN(numValue) && numValue > 0) {
                    setQuantity(Math.min(numValue, 99)); // Cap at 99
                  }
                }}
                onBlur={(e) => {
                  // Ensure value is valid when leaving the field
                  let val = parseInt(e.target.value, 10);
                  if (isNaN(val) || val < 1) {
                    val = 1;
                  } else if (val > 99) {
                    val = 99;
                  }
                  setQuantity(val);
                }}
                style={{
                  width: "50px",
                  height: "35px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "3px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#666",
                  background: "#fafafa",
                  padding: "0 6px"
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "35px",
                  height: "35px",
                  background: "#f9f9f9",
                  border: "1px solid #e5e5e5",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  color: "#999"
                }}
                onMouseEnter={e => e.target.style.background = "#f0f0f0"}
                onMouseLeave={e => e.target.style.background = "#f9f9f9"}
              >
                +
              </button>
            </div>
          </div>

          {/* Buy Now and Add to Cart Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <button
              onClick={handleBuyNow}
              style={{
                flex: 1,
                padding: "15px",
                background: "linear-gradient(135deg, #880E4F 0%, #6B0A3D 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(136,14,79,0.2)"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              🚀 Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: "15px",
                background: addedToCart ? "#27ae60" : "#F48FB1",
                color: addedToCart ? "#fff" : "#880E4F",
                border: "2px solid #880E4F",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                marginBottom: "0",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => {
                if (!addedToCart) {
                  e.target.style.background = "#880E4F";
                  e.target.style.color = "#fff";
                }
              }}
              onMouseLeave={e => {
                if (!addedToCart) {
                  e.target.style.background = "#F48FB1";
                  e.target.style.color = "#880E4F";
                }
              }}
            >
              {addedToCart ? "✓ Added to Cart!" : `🛍️ Add to Cart`}
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              if (isInWishlist && isInWishlist(product.id)) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            style={{
              width: "100%",
              padding: "15px",
              background: isInWishlist && isInWishlist(product.id) ? "#E91E63" : "#fff",
              color: isInWishlist && isInWishlist(product.id) ? "#fff" : "#E91E63",
              border: "2px solid #E91E63",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#E91E63";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={e => {
              if (isInWishlist && isInWishlist(product.id)) {
                e.target.style.background = "#E91E63";
                e.target.style.color = "#fff";
              } else {
                e.target.style.background = "#fff";
                e.target.style.color = "#E91E63";
              }
            }}
          >
            {isInWishlist && isInWishlist(product.id) ? "♡ Added to Wishlist" : "♡ Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Detailed Product Information */}
      {product && (product.fabricDetails || product.care || product.embroidery || product.deliveryDays) && (
        <div style={{
          background: "#f9f9f9",
          padding: isMobile ? "20px" : "40px",
          maxWidth: "1200px",
          margin: "40px auto",
          borderRadius: "8px"
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "30px", textAlign: "center" }}>
            Product Information
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "40px"
          }}>
            {/* Fabric & Care */}
            {(product.fabricDetails || product.care) && (
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#333", marginBottom: "15px" }}>
                  🧵 Fabric & Care
                </h3>
                {product.fabricDetails && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "13px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                      Fabric Details
                    </h4>
                    {product.fabricDetails.top && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Top:</strong> {product.fabricDetails.top}
                      </p>
                    )}
                    {product.fabricDetails.bottom && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Bottom:</strong> {product.fabricDetails.bottom}
                      </p>
                    )}
                    {product.fabricDetails.dupatta && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Dupatta:</strong> {product.fabricDetails.dupatta}
                      </p>
                    )}
                    {product.fabricDetails.blouse && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Blouse:</strong> {product.fabricDetails.blouse}
                      </p>
                    )}
                    {product.fabricDetails.saree && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Saree:</strong> {product.fabricDetails.saree}
                      </p>
                    )}
                  </div>
                )}
                {product.care && (
                  <div>
                    <h4 style={{ fontSize: "13px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                      Care Instructions
                    </h4>
                    <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                      {product.care}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Embroidery & Details */}
            {(product.embroidery || product.deliveryDays || product.deliveryType) && (
              <div>
                {product.embroidery && (
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#333", marginBottom: "15px" }}>
                      ✨ Embroidery & Details
                    </h3>
                    <h4 style={{ fontSize: "13px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                      Embellishments
                    </h4>
                    <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                      {product.embroidery}
                    </p>
                  </div>
                )}

                {(product.deliveryDays || product.deliveryType) && (
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#333", marginBottom: "15px" }}>
                      🚚 Delivery & Shipping
                    </h3>
                    {product.deliveryType && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Delivery Type:</strong> {product.deliveryType}
                      </p>
                    )}
                    {product.deliveryDays && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Delivery Time:</strong> {product.deliveryDays}
                      </p>
                    )}
                    {product.freeShipping && (
                      <p style={{ fontSize: "14px", color: "#27ae60", margin: "5px 0", fontWeight: "600" }}>
                        ✓ Free Shipping Available
                      </p>
                    )}
                    {product.maxBustSize && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                        <strong>Max Standard Size:</strong> {product.maxBustSize} bust
                      </p>
                    )}
                    {product.customFitAvailable && (
                      <p style={{ fontSize: "14px", color: "#D4AF37", margin: "5px 0", fontWeight: "600" }}>
                        ✓ Custom Fit Available
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {product.notes && (
            <div style={{
              background: "#fef3e6",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "30px",
              fontSize: "14px",
              color: "#333",
              lineHeight: "1.6"
            }}>
              <strong style={{ color: "#D4AF37" }}>💡 Note:</strong> {product.notes}
            </div>
          )}
        </div>
      )}

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

      <SizeChart isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />

      <Footer />
    </div>
  );
}
