import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ items, onRemove, onClose, onUpdateQuantity }) {
  const cartRef = useRef(null);
  const navigate = useNavigate();
  
  // Group items by id AND size - different sizes are separate line items
  const groupedItems = items.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id && i.size === item.size);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const total = groupedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle browser back button to close cart instead of navigating
  useEffect(() => {
    // Push a history state when cart opens
    window.history.pushState({ cartOpen: true }, "");
    
    const handlePopState = (e) => {
      // Close the cart instead of navigating back
      onClose();
      // Push state again to prevent actual navigation
      window.history.pushState({ cartOpen: true }, "");
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onClose]);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Exclude clicks on the cart button itself
      if (e.target.closest("button")?.textContent?.includes("Cart")) {
        return;
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    // Use capture phase to detect clicks
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [onClose]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item
      const firstIndex = items.findIndex(i => i.id === itemId);
      if (firstIndex !== -1) onRemove(firstIndex);
    } else if (newQuantity > groupedItems.find(i => i.id === itemId)?.quantity) {
      // Increase quantity - add item
      // This is handled by the parent component
    } else {
      // Decrease quantity
      const firstIndex = items.findIndex(i => i.id === itemId);
      if (firstIndex !== -1) onRemove(firstIndex);
    }
  };

  return (
    <div
      ref={cartRef}
      style={{
        position: "fixed",
        top: window.innerWidth <= 768 ? "100px" : "120px",
        right: window.innerWidth <= 768 ? "0" : "0",
        bottom: "0",
        left: window.innerWidth <= 768 ? "0" : "auto",
        width: window.innerWidth <= 768 ? "100%" : "450px",
        background: "#fff",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
        zIndex: "9997",
        display: "flex",
        flexDirection: "column",
        animation: "slideIn 0.3s ease-out",
        overflowY: "hidden"
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ 
        padding: window.innerWidth <= 768 ? "12px 15px" : "20px", 
        borderBottom: "2px solid #f0f0f0",
        background: "linear-gradient(135deg, #D4AF37 0%, rgba(212, 175, 55, 0.8) 100%)",
        flexShrink: 0
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: "0", color: "#fff", fontSize: window.innerWidth <= 768 ? "16px" : "20px", fontWeight: "700" }}>
            🛍️ My Cart ({groupedItems.length} items)
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.3)",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
              color: "#fff",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.5)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.3)"}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Items List */}
      <div style={{
        flex: "1 1 auto",
        maxHeight: window.innerWidth <= 768 ? "calc(100% - 200px)" : "calc(100% - 180px)",
        overflowY: "auto",
        padding: "15px",
        paddingBottom: "10px",
        minHeight: "0",
        WebkitOverflowScrolling: "touch"
      }}>
        {groupedItems.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", color: "#666", margin: "0 0 10px 0" }}>Your cart is empty</p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0" }}>Add items to start shopping! 🛍️</p>
          </div>
        ) : (
          groupedItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#f9f9f9",
                borderRadius: "8px",
                padding: window.innerWidth <= 768 ? "12px" : "15px",
                marginBottom: "12px",
                border: "1px solid #e0e0e0",
                transition: "all 0.2s"
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <p style={{ margin: "0 0 5px 0", fontWeight: "700", fontSize: window.innerWidth <= 768 ? "13px" : "15px", color: "#08060d" }}>
                  {item.name}
                </p>
                {item.size && (
                  <p style={{ margin: "0 0 3px 0", fontSize: "12px", color: "#999" }}>
                    Size: <span style={{ fontWeight: "600", color: "#666" }}>{item.size}</span>
                  </p>
                )}
                <p style={{ margin: "0", color: "#D4AF37", fontWeight: "700", fontSize: window.innerWidth <= 768 ? "14px" : "16px" }}>
                  ₹{item.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                <button
                  onClick={() => {
                    // Decrease quantity - remove only the item that matches both id and size
                    const itemIndex = items.findIndex(i => i.id === item.id && i.size === item.size);
                    if (itemIndex !== -1) onRemove(itemIndex);
                  }}
                  style={{
                    background: "#f0f0f0",
                    border: "1px solid #ddd",
                    width: "32px",
                    height: "32px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.background = "#e0e0e0"}
                  onMouseLeave={e => e.target.style.background = "#f0f0f0"}
                >
                  −
                </button>
                <span style={{
                  flex: "1",
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#333"
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => {
                    // Note: + button is disabled as quantity should be managed by adding items to cart
                    // Users should use the product page to add more quantity
                  }}
                  disabled={true}
                  style={{
                    background: "#ccc",
                    border: "none",
                    width: "32px",
                    height: "32px",
                    borderRadius: "4px",
                    cursor: "not-allowed",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#999",
                    transition: "all 0.2s",
                    opacity: 0.6
                  }}
                  title="Add more quantities from the product page"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: window.innerWidth <= 768 ? "12px" : "13px",
                color: "#666",
                borderTop: "1px solid #e0e0e0",
                paddingTop: "8px"
              }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: "700", color: "#333" }}>₹{item.price * item.quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer - Always Visible */}
      <div style={{
        background: "#fff",
        borderTop: "2px solid #f0f0f0",
        padding: window.innerWidth <= 768 ? "12px 15px" : "20px",
        boxSizing: "border-box",
        flexShrink: 0,
        minHeight: "auto",
        marginTop: "auto"
      }}>
        {groupedItems.length > 0 && (
          <>
            <div style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
              padding: window.innerWidth <= 768 ? "10px" : "15px",
              borderRadius: "8px",
              marginBottom: "12px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: window.innerWidth <= 768 ? "15px" : "18px",
                fontWeight: "700",
                color: "#08060d"
              }}>
                <span>Total:</span>
                <span style={{ color: "#D4AF37", fontSize: window.innerWidth <= 768 ? "18px" : "24px" }}>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
              style={{
                width: "100%",
                padding: window.innerWidth <= 768 ? "14px 12px" : "16px",
                background: "linear-gradient(135deg, #D4AF37 0%, #c49a27 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: window.innerWidth <= 768 ? "14px" : "15px",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                minHeight: window.innerWidth <= 768 ? "44px" : "auto",
                marginBottom: "12px"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              Proceed to Checkout
            </button>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: window.innerWidth <= 768 ? "14px 12px" : "15px",
                background: "#2C4F3E",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: window.innerWidth <= 768 ? "14px" : "14px",
                transition: "all 0.3s",
                minHeight: window.innerWidth <= 768 ? "44px" : "auto",
                marginBottom: "12px"
              }}
              onMouseEnter={e => e.target.style.background = "#1f3a2c"}
              onMouseLeave={e => e.target.style.background = "#2C4F3E"}
            >
              Continue Shopping
            </button>
          </>
        )}

        <div style={{ display: "flex", gap: window.innerWidth <= 768 ? "10px" : "12px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? "12px 10px" : "12px",
              background: "#666",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: window.innerWidth <= 768 ? "13px" : "13px",
              transition: "all 0.3s",
              minHeight: window.innerWidth <= 768 ? "40px" : "auto"
            }}
            onMouseEnter={e => e.target.style.background = "#555"}
            onMouseLeave={e => e.target.style.background = "#666"}
          >
            ← Back
          </button>

          <button
            onClick={() => {
              navigate("/");
              onClose();
            }}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? "12px 10px" : "12px",
              background: "#08060d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: window.innerWidth <= 768 ? "13px" : "13px",
              transition: "all 0.3s",
              minHeight: window.innerWidth <= 768 ? "40px" : "auto"
            }}
            onMouseEnter={e => e.target.style.background = "#1a1618"}
            onMouseLeave={e => e.target.style.background = "#08060d"}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}