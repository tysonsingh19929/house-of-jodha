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
  const [zoom, setZoom] = useState(false);
  const [viewingCount] = useState(Math.floor(Math.random() * 30) + 10); // 10-40 people
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
    <div style={{ background: "#fff", paddingTop: "64px" }}>
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
      <div style={{ padding: "12px 20px", fontSize: "13px", color: "#999", borderBottom: "1px solid #f0f0f0", maxWidth: "1400px", margin: "0 auto" }}>
        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#880E4F", fontWeight: "500" }}>Home</span>
        <span style={{ margin: "0 8px", color: "#ddd" }}>/</span>
        <span onClick={() => navigate(`/collection/${product.category.toLowerCase()}`)} style={{ cursor: "pointer", color: "#880E4F", fontWeight: "500" }}>{product.category}</span>
        <span style={{ margin: "0 8px", color: "#ddd" }}>/</span>
        <span style={{ color: "#999" }}>{product.name.substring(0, 40)}</span>
      </div>

      {/* Product Details Container - Modern 2-Column Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "20px" : "60px",
        padding: isMobile ? "20px" : "40px 60px",
        maxWidth: "1400px",
        margin: "0 auto",
        alignItems: "start"
      }}>
        {/* LEFT COLUMN - Product Image with Zoom */}
        <div style={{ position: "relative" }}>
          {/* Main Product Image */}
          <div style={{
            background: "#f9f9f9",
            aspectRatio: isMobile ? "9/12" : "3/4",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: zoom ? "zoom-out" : "zoom-in"
          }}
          onClick={() => setZoom(!zoom)}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: zoom ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.3s ease"
              }} 
            />
            {/* Zoom Icon */}
            <div style={{
              position: "absolute",
              bottom: "15px",
              right: "15px",
              background: "#fff",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontSize: "20px",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"}
            onMouseLeave={e => e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)"}
            >
              🔍
            </div>
          </div>

          {/* Product View Controls */}
          <div style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center"
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} 
              style={{
                width: isMobile ? "50px" : "60px",
                aspectRatio: "3/4",
                background: "#f5f5f5",
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                border: i === 1 ? "2px solid #880E4F" : "1px solid #e0e0e0",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                if (i !== 1) e.currentTarget.style.borderColor = "#880E4F";
              }}
              onMouseLeave={e => {
                if (i !== 1) e.currentTarget.style.borderColor = "#e0e0e0";
              }}
              >
                <img src={product.image} alt={`View ${i}`} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - Product Info */}
        <div>
          {/* Category Badge */}
          <div style={{ 
            fontSize: "11px", 
            color: "#888",
            textTransform: "uppercase",
            fontWeight: "700",
            letterSpacing: "1.5px",
            marginBottom: "12px"
          }}>
            {product.category}
          </div>

          {/* Product Name */}
          <h1 style={{
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: "700",
            color: "#1a0010",
            marginBottom: "8px",
            lineHeight: "1.3",
            maxWidth: "100%"
          }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ 
            fontSize: "13px", 
            marginBottom: "20px", 
            color: "#E91E63",
            fontWeight: "600"
          }}>
            ⭐ 4.8/5 <span style={{ color: "#999", marginLeft: "6px", fontWeight: "400" }}>({product.reviews || 324} reviews)</span>
          </div>

          {/* Price Section */}
          <div style={{
            marginBottom: "24px",
            paddingBottom: "24px",
            borderBottom: "1px solid #f0f0f0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: "700", color: "#1a0010" }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span style={{ fontSize: "16px", color: "#999", textDecoration: "line-through" }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span style={{ 
                fontSize: "13px", 
                fontWeight: "700", 
                color: "#fff", 
                background: "#E91E63", 
                padding: "4px 10px", 
                borderRadius: "4px",
                marginLeft: "6px"
              }}>
                -{discount}% OFF
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
              Inclusive of all taxes
            </p>
          </div>

          {/* Social Proof */}
          <div style={{
            background: "#FFF0F6",
            border: "1px solid #f8bbd9",
            borderRadius: "8px",
            padding: "12px 14px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "16px" }}>👥</span>
            <div>
              <p style={{ margin: "0", fontSize: "13px", color: "#880E4F", fontWeight: "600" }}>
                {viewingCount} people viewing this item
              </p>
              <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#999" }}>
                Don't wait! Stock is limited
              </p>
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "12px" 
            }}>
              <h3 style={{ 
                fontSize: "13px", 
                fontWeight: "700", 
                color: "#333", 
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Select Size
              </h3>
              <button
                onClick={() => setSizeChartOpen(true)}
                style={{
                  background: "transparent",
                  border: "1px solid #880E4F",
                  color: "#880E4F",
                  padding: "4px 10px",
                  fontSize: "11px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                  letterSpacing: "0.3px"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#880E4F";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#880E4F";
                }}
              >
                📏 Size Guide
              </button>
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(6, 1fr)", 
              gap: "8px"
            }}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "11px 0",
                    background: selectedSize === size ? "#880E4F" : "#f5f5f5",
                    color: selectedSize === size ? "#fff" : "#333",
                    border: "1px solid " + (selectedSize === size ? "#880E4F" : "#e0e0e0"),
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "12px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    if (selectedSize !== size) {
                      e.target.style.borderColor = "#880E4F";
                      e.target.style.background = "#fff8fc";
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedSize !== size) {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.background = "#f5f5f5";
                    }
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ 
              fontSize: "13px", 
              fontWeight: "700", 
              color: "#333", 
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Quantity
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "fit-content" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#f5f5f5",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#880E4F",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#fff0f6";
                  e.target.style.borderColor = "#880E4F";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#f5f5f5";
                  e.target.style.borderColor = "#e0e0e0";
                }}
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
                  if (inputValue === "") return;
                  const numValue = parseInt(inputValue, 10);
                  if (!isNaN(numValue) && numValue > 0) {
                    setQuantity(Math.min(numValue, 99));
                  }
                }}
                onBlur={(e) => {
                  let val = parseInt(e.target.value, 10);
                  if (isNaN(val) || val < 1) val = 1;
                  else if (val > 99) val = 99;
                  setQuantity(val);
                }}
                style={{
                  width: "60px",
                  height: "40px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#333",
                  background: "#fff",
                  padding: "0"
                }}
              />
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#f5f5f5",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#880E4F",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#fff0f6";
                  e.target.style.borderColor = "#880E4F";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#f5f5f5";
                  e.target.style.borderColor = "#e0e0e0";
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              style={{
                flex: 1,
                padding: "14px 24px",
                background: "#fff",
                color: "#880E4F",
                border: "2px solid #880E4F",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
              onMouseEnter={e => {
                e.target.style.background = "#880E4F";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "0 4px 16px rgba(136,14,79,0.2)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#fff";
                e.target.style.color = "#880E4F";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              BUY IT NOW
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: "14px 24px",
                background: "#1a0010",
                color: "#fff",
                border: "2px solid #1a0010",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
              onMouseEnter={e => {
                if (!addedToCart) {
                  e.target.style.background = "#2d0014";
                  e.target.style.boxShadow = "0 4px 16px rgba(26,0,16,0.3)";
                }
              }}
              onMouseLeave={e => {
                if (!addedToCart) {
                  e.target.style.background = "#1a0010";
                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                }
              }}
            >
              {addedToCart ? "✓ ADDED TO CART" : "ADD TO CART"}
            </button>
          </div>

          {/* Add to Wishlist Button */}
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
              padding: "12px 24px",
              background: isInWishlist && isInWishlist(product.id) ? "#E91E63" : "#fff",
              color: isInWishlist && isInWishlist(product.id) ? "#fff" : "#E91E63",
              border: "2px solid #E91E63",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#E91E63";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={e => {
              if (isInWishlist && isInWishlist(product.id)) {
                e.target.style.background = "#E91E63";
              } else {
                e.target.style.background = "#fff";
              }
            }}
          >
            {isInWishlist && isInWishlist(product.id) ? "♥ ADDED TO WISHLIST" : "♡ ADD TO WISHLIST"}
          </button>

          {/* Inquire this button with WhatsApp icon */}
          <button
            onClick={() => {
              const message = `Hi! I'm interested in this product: ${product.name} - ₹${product.price}. Can you provide more details about size ${selectedSize}?`;
              const whatsappUrl = `https://wa.me/9967670497?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            style={{
              width: "100%",
              padding: "12px 24px",
              background: "rgba(37, 211, 102, 0.25)", // Darker greenish semi-transparent background
              backdropFilter: "blur(8px)", // Blur effect
              color: "#000",
              border: "1px solid rgba(0, 102, 51, 0.9)", // Dark green border
              borderRadius: "20px", // Rounded corners
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(37, 211, 102, 0.2)"; // Slightly more opaque on hover
              e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.9)"; // Even darker border on hover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.7)";
            }}
            title="Inquire via WhatsApp"
          >
            {/* Official WhatsApp Green #25D366 */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Inquire this
          </button>

          {/* Trust Badges */}
          <div style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "20px" }}>🚚</span>
              <div>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#333" }}>
                  Free Shipping
                </p>
                <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#999" }}>
                  Within India on orders above ₹500
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "20px" }}>↩️</span>
              <div>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#333" }}>
                  Easy Returns
                </p>
                <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#999" }}>
                  30-day return policy, no questions asked
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "20px" }}>🔒</span>
              <div>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", color: "#333" }}>
                  Secure Checkout
                </p>
                <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#999" }}>
                  100% secure payment gateway
                </p>
              </div>
            </div>
          </div>
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
