import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppInquiryButton from "./WhatsAppInquiryButton.jsx";

export default function Cart({ items, onRemove, onClose }) {
  const [bespokeItems, setBespokeItems] = useState({});
  const cartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If any items are loaded (e.g., from the shared session link) that have bespoke requested,
    // initialize them in the bespokeItems state.
    const initialBespoke = {};
    items.forEach(item => {
      if (item.isBespoke) {
        initialBespoke[`${item.id || item._id}-${item.size || ''}`] = true;
      }
    });
    if (Object.keys(initialBespoke).length > 0) {
      setBespokeItems(prev => ({ ...prev, ...initialBespoke }));
    }
  }, [items]);

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

  const PREMIUM_THRESHOLD = 40000;
  const hasBespokeRequested = Object.keys(bespokeItems).some(key => bespokeItems[key]);
  const isPremiumOrder = total >= PREMIUM_THRESHOLD || hasBespokeRequested;

  const handleWhatsAppCheckout = () => {
    const itemsList = groupedItems.map(item => {
      const isBespoke = bespokeItems[`${item.id || item._id}-${item.size || ''}`];
      return `   - *${item.name}* ${item.size ? `(Size: ${item.size})` : ''}${item.color ? ` (Color: ${item.color})` : ''} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}${isBespoke ? ' [👑 Bespoke Customization Requested]' : ''}`;
    }).join('\n');
    
    // Construct cart query parameter containing minimal info for linking back
    const minimalItems = items.map(item => ({
      id: item.id || item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size || "",
      color: item.color || "",
      isBespoke: !!bespokeItems[`${item.id || item._id}-${item.size || ''}`]
    }));
    
    const cartUrlParam = encodeURIComponent(JSON.stringify(minimalItems));
    const cartLink = `${window.location.origin}${window.location.pathname}?cart=${cartUrlParam}`;

    const message = `*✨ THE SRINGAR HOUSE - PRIVATE CONSULTATION & HANDOVER ✨*\n\nHello! I would like to coordinate a private styling consultation and white-glove handover. Here are my order details:\n\n📦 *Items in Cart:*\n${itemsList}\n\n💰 *Total Order Value:* ₹${total.toLocaleString('en-IN')}\n\n🔗 *Cart Session Link:* ${cartLink}\n\nPlease connect me with a luxury concierge consultant.`;

    const phoneNumber = "9967670497"; // Consultant WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

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
        zIndex: "10005",
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
                
                {(item.price >= 10000 || item.customFitAvailable) && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    padding: "8px",
                    background: "#fdf8ee",
                    borderRadius: "6px",
                    border: "1px dashed #D4AF37",
                    boxSizing: "border-box"
                  }}>
                    <input
                      type="checkbox"
                      id={`bespokeCheck-${item.id || item._id}-${item.size || ''}`}
                      checked={!!bespokeItems[`${item.id || item._id}-${item.size || ''}`]}
                      onChange={(e) => setBespokeItems({
                        ...bespokeItems,
                        [`${item.id || item._id}-${item.size || ''}`]: e.target.checked
                      })}
                      style={{ accentColor: "#D4AF37", cursor: "pointer" }}
                    />
                    <label
                      htmlFor={`bespokeCheck-${item.id || item._id}-${item.size || ''}`}
                      style={{ fontSize: "11px", color: "#AA8A2A", cursor: "pointer", fontWeight: "700", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      👑 Request Custom Tailoring & Bespoke Styling
                    </label>
                  </div>
                )}
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
              background: isPremiumOrder ? "linear-gradient(135deg, #fdf8ee 0%, #faecd1 100%)" : "linear-gradient(135deg, #FFF0F6 0%, #FCE4EC 100%)",
              padding: window.innerWidth <= 768 ? "12px 14px" : "16px",
              borderRadius: "8px", marginBottom: "14px",
              border: isPremiumOrder ? "1.5px solid #e1b858" : "1.5px solid #f8bbd9"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", color: isPremiumOrder ? "#AA8A2A" : "#999", fontWeight: "700", letterSpacing: "0.5px" }}>
                    {isPremiumOrder ? "👑 LUXURY PRIVATE ORDER" : "TOTAL AMOUNT"}
                  </p>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: window.innerWidth <= 768 ? "18px" : "24px",
                    fontWeight: "700", color: isPremiumOrder ? "#AA8A2A" : "#880E4F", marginTop: "4px"
                  }}>
                    ₹<span>{total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Tailoring / Bespoke Styling Toggle replacement */}
            {isPremiumOrder && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginBottom: "14px",
                padding: "12px",
                background: "#fdf8ee",
                borderRadius: "8px",
                border: "1px solid #D4AF37",
                boxSizing: "border-box"
              }}>
                <span style={{ fontSize: "12px", color: "#AA8A2A", fontWeight: "700", fontFamily: "'DM Sans', sans-serif" }}>
                  👑 PREMIUM CONCIERGE ORDER ACTIVE
                </span>
                <span style={{ fontSize: "11px", color: "#666", lineHeight: "1.4", fontFamily: "'DM Sans', sans-serif" }}>
                  Standard checkout is bypassed for this high-touch order. You will be routed to a luxury stylist on WhatsApp.
                </span>
              </div>
            )}

            {isPremiumOrder ? (
              <button
                onClick={handleWhatsAppCheckout}
                style={{
                  width: "100%",
                  padding: window.innerWidth <= 768 ? "14px 12px" : "16px",
                  background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)",
                  color: "#fff", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "700",
                  fontSize: window.innerWidth <= 768 ? "13px" : "14px",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.4)",
                  minHeight: window.innerWidth <= 768 ? "44px" : "auto",
                  marginBottom: "10px", letterSpacing: "0.5px"
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >REQUEST PRIVATE CONSULTATION & HANDOVER</button>
            ) : (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
