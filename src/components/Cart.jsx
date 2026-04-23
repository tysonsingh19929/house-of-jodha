import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppInquiryButton from "./WhatsAppInquiryButton.jsx";

export default function Cart({ items, onRemove, onClose }) {
  const cartRef = useRef(null);
  const navigate = useNavigate();

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
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #E91E63, #C2185B); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #C2185B, #A01848); }
      `}</style>

      {/* Header */}
      <div style={{
        padding: window.innerWidth <= 768 ? "8px 15px" : "12px 20px",
        borderBottom: "1px solid #e0e0e0",
        background: "#fff", flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "none",
                fontSize: window.innerWidth <= 768 ? "18px" : "16px",
                cursor: "pointer", padding: "4px 8px",
                color: "#333", transition: "all 0.2s",
                minWidth: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
              onMouseEnter={e => e.target.style.opacity = "0.7"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >←</button>
          </div>

          <div style={{ flex: 1, textAlign: "center" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: window.innerWidth <= 768 ? "14px" : "16px", fontWeight: "600" }}>
              🛍️ My Cart
            </h3>
            <p style={{ margin: "2px 0 0 0", color: "#999", fontSize: "11px" }}>
              {groupedItems.length} {groupedItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", fontSize: "24px",
              cursor: "pointer", padding: "4px 8px", color: "#333", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.opacity = "0.7"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >✕</button>
        </div>
      </div>

      {/* Items List */}
      <div style={{
        flex: "1 1 auto",
        maxHeight: window.innerWidth <= 768 ? "calc(100% - 220px)" : "calc(100% - 200px)",
        overflowY: "auto", padding: "15px", paddingBottom: "10px",
        minHeight: "0", WebkitOverflowScrolling: "touch"
      }}>
        {groupedItems.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.8 }}>🛍️</div>
            <p style={{ fontSize: "18px", color: "#333", margin: "0 0 8px 0", fontWeight: "600" }}>
              Your cart is empty
            </p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0 0 20px 0", lineHeight: "1.5" }}>
              Explore our stunning collection and add your favorite pieces to get started
            </p>
            <button
              onClick={() => { onClose(); navigate("/"); }}
              style={{
                background: "linear-gradient(135deg, #880E4F 0%, #6B0A3D 100%)",
                color: "#fff", border: "none", padding: "10px 24px",
                borderRadius: "6px", cursor: "pointer", fontWeight: "600",
                fontSize: "14px", transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(136,14,79,0.3)"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >Continue Shopping</button>
          </div>
        ) : (
          groupedItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff", borderRadius: "10px",
                padding: window.innerWidth <= 768 ? "14px" : "16px",
                marginBottom: "14px", border: "1.5px solid #f5f5f5",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex", gap: "12px"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(136,14,79,0.12)";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#f5f5f5";
              }}
            >
              {item.image && (
                <div style={{
                  width: "80px", height: "80px", borderRadius: "8px",
                  overflow: "hidden", backgroundColor: "#f5f5f5",
                  flexShrink: 0, border: "1px solid #f0f0f0"
                }}>
                  <img src={item.image} alt={item.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <p style={{
                  margin: "0 0 6px 0", fontWeight: "700",
                  fontSize: window.innerWidth <= 768 ? "13px" : "15px",
                  color: "#1a0010", overflow: "hidden",
                  textOverflow: "ellipsis", whiteSpace: "nowrap"
                }}>
                  {item.name}
                </p>
                {item.size && (
                  <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#999" }}>
                    Size: <span style={{ fontWeight: "600", color: "#666" }}>{item.size}</span>
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <p style={{ margin: "0", color: "#880E4F", fontWeight: "700", fontSize: window.innerWidth <= 768 ? "14px" : "16px" }}>
                    ₹{item.price}
                  </p>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", background: "#f5f5f5", padding: "4px 6px", borderRadius: "6px" }}>
                    <button
                      onClick={() => {
                        const itemIndex = items.findIndex(i => i.id === item.id && i.size === item.size);
                        if (itemIndex !== -1) onRemove(itemIndex);
                      }}
                      style={{
                        background: "transparent", border: "none",
                        width: "24px", height: "24px", borderRadius: "3px",
                        cursor: "pointer", fontSize: "14px", fontWeight: "600",
                        color: "#880E4F", transition: "all 0.2s"
                      }}
                      onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.color = "#6B0A3D"; }}
                      onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#880E4F"; }}
                    >−</button>
                    <span style={{ textAlign: "center", fontWeight: "700", fontSize: "13px", color: "#333", minWidth: "20px" }}>
                      {item.quantity}
                    </span>
                    <button
                      disabled={true}
                      style={{
                        background: "transparent", border: "none",
                        width: "24px", height: "24px", borderRadius: "3px",
                        cursor: "not-allowed", fontSize: "14px",
                        fontWeight: "600", color: "#880E4F", opacity: 0.4
                      }}
                      title="Add more from product page"
                    >+</button>
                  </div>
                </div>
                <WhatsAppInquiryButton
                  message={`Hi! I'm interested in this product from my cart: ${item.name} - ₹${item.price}${item.size ? ` (Size: ${item.size})` : ''}. Can you provide more details?`}
                  buttonStyle={{
                    width: "100%",
                    padding: window.innerWidth <= 768 ? "8px" : "10px",
                    marginTop: "10px",
                  }}
                />
              </div>

              <button
                onClick={() => {
                  const itemIndex = items.findIndex(i => i.id === item.id && i.size === item.size);
                  if (itemIndex !== -1) onRemove(itemIndex);
                }}
                style={{
                  background: "rgba(233, 30, 99, 0.1)", border: "none",
                  width: "32px", height: "32px", borderRadius: "6px",
                  cursor: "pointer", fontSize: "16px", color: "#E91E63",
                  transition: "all 0.2s", flexShrink: 0
                }}
                onMouseEnter={e => { e.target.style.background = "#E91E63"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(233, 30, 99, 0.1)"; e.target.style.color = "#E91E63"; }}
              >✕</button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: "#fff", borderTop: "2px solid #f5f5f5",
        padding: window.innerWidth <= 768 ? "14px 15px" : "20px",
        boxSizing: "border-box", flexShrink: 0, marginTop: "auto"
      }}>
        {groupedItems.length > 0 && (
          <>
            <div style={{
              background: "linear-gradient(135deg, #FFF0F6 0%, #FCE4EC 100%)",
              padding: window.innerWidth <= 768 ? "12px 14px" : "16px",
              borderRadius: "8px", marginBottom: "14px",
              border: "1.5px solid #f8bbd9"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", color: "#999", fontWeight: "600" }}>TOTAL AMOUNT</p>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: window.innerWidth <= 768 ? "18px" : "24px",
                    fontWeight: "700", color: "#880E4F", marginTop: "4px"
                  }}>
                    ₹<span>{total}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => { navigate("/checkout"); onClose(); }}
              style={{
                width: "100%",
                padding: window.innerWidth <= 768 ? "14px 12px" : "16px",
                background: "linear-gradient(135deg, #880E4F 0%, #6B0A3D 100%)",
                color: "#fff", border: "none", borderRadius: "8px",
                cursor: "pointer", fontWeight: "700",
                fontSize: window.innerWidth <= 768 ? "14px" : "15px",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(136,14,79,0.3)",
                minHeight: window.innerWidth <= 768 ? "44px" : "auto",
                marginBottom: "10px", letterSpacing: "0.5px"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >PROCEED TO CHECKOUT</button>
          </>
        )}
      </div>
    </div>
  );
}
