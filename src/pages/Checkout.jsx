import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function Checkout({ cartOpen, setCartOpen, cartItems, removeFromCart, cartCount }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Group items by id
  const groupedItems = cartItems.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const subtotal = groupedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.cardNumber) {
      alert("Please fill all required fields");
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div style={{ background: "#fff", paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>✓</div>
          <h1 style={{ fontSize: "32px", color: "#27ae60", marginBottom: "10px" }}>Order Placed Successfully!</h1>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>Thank you for your purchase. Redirecting to home...</p>
          <button onClick={() => navigate("/")} style={{
            background: "#D4AF37",
            color: "#fff",
            border: "none",
            padding: "12px 30px",
            fontSize: "16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", paddingTop: "64px", minHeight: "100vh" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}

      <div style={{ padding: isMobile ? "20px" : "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: isMobile ? "24px" : "32px", marginBottom: "30px", color: "#333" }}>Checkout</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "40px"
        }}>
          {/* Shipping & Payment Form */}
          <div>
            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Information */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>Shipping Information</h2>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apt 4B"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "15px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="10001"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>Payment Information</h2>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "15px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "5px", color: "#666" }}>CVV</label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      placeholder="123"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "#D4AF37",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => e.target.style.background = "#c9860f"}
                onMouseLeave={e => e.target.style.background = "#D4AF37"}
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              background: "#f9f9f9",
              padding: isMobile ? "20px" : "30px",
              borderRadius: "8px",
              border: "1px solid #eee"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#333" }}>Order Summary</h2>

              {/* Cart Items */}
              <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
                {groupedItems.length > 0 ? (
                  groupedItems.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
                      <div>
                        <p style={{ margin: "0 0 4px 0", fontWeight: "500", color: "#333" }}>{item.name.substring(0, 30)}...</p>
                        <p style={{ margin: "0", color: "#999", fontSize: "12px" }}>Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      </div>
                      <p style={{ margin: "0", fontWeight: "600", color: "#D4AF37" }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#999" }}>Your cart is empty</p>
                )}
              </div>

              {/* Pricing Details */}
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Subtotal</span>
                  <span style={{ fontWeight: "600", color: "#333" }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Shipping {shipping === 0 ? "(FREE)" : ""}</span>
                  <span style={{ fontWeight: "600", color: shipping === 0 ? "#27ae60" : "#333" }}>₹{shipping.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Tax (5%)</span>
                  <span style={{ fontWeight: "600", color: "#333" }}>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 0",
                borderTop: "2px solid #ddd",
                fontSize: "18px",
                fontWeight: "700"
              }}>
                <span style={{ color: "#333" }}>Total</span>
                <span style={{ color: "#D4AF37" }}>₹{total.toLocaleString()}</span>
              </div>

              {subtotal > 5000 && (
                <div style={{
                  background: "#e8f5e9",
                  color: "#27ae60",
                  padding: "10px 12px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  marginTop: "15px",
                  fontWeight: "500"
                }}>
                  ✓ Free shipping available on orders above ₹5000!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
