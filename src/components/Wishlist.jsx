import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ items, onRemove, onClose, onAddToCart }) {
  const wishlistRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  // Close wishlist when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest("button")?.textContent?.includes("♡")) {
        return;
      }
      if (wishlistRef.current && !wishlistRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [onClose]);

  return (
    <div
      ref={wishlistRef}
      style={{
        position: "fixed",
        top: isMobile ? "100px" : "120px",
        right: "0",
        bottom: "0",
        width: isMobile ? "100%" : "400px",
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
        padding: isMobile ? "12px 15px" : "20px", 
        borderBottom: "2px solid #f0f0f0",
        background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
        flexShrink: 0,
        boxShadow: "0 2px 10px rgba(233,30,99,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <h3 style={{ margin: "0", color: "#fff", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", flex: 1, textAlign: "center" }}>
            ♡ My Wishlist ({items.length})
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
              color: "#fff",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.2)"}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Items List */}
      <div style={{
        flex: "1 1 auto",
        maxHeight: "calc(100% - 120px)",
        overflowY: "auto",
        padding: "15px",
        minHeight: "0",
        WebkitOverflowScrolling: "touch"
      }}>
        {items.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", color: "#666", margin: "0 0 10px 0" }}>Your wishlist is empty</p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0" }}>Add your favorite items here! ♡</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#FFF0F6",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #f8bbd9",
                transition: "all 0.2s",
                display: "flex",
                gap: "12px"
              }}
            >
              {/* Product Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    onClose();
                  }}
                />
              )}

              {/* Product Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    onClose();
                  }}
                  style={{
                    margin: "0 0 4px 0",
                    fontWeight: "700",
                    fontSize: "13px",
                    color: "#880E4F",
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.name}
                </p>
                <p style={{ margin: "0 0 8px 0", color: "#E91E63", fontWeight: "700", fontSize: "14px" }}>
                  ₹{item.price}
                </p>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => onAddToCart(item)}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      background: "#880E4F",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "600",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.background = "#6B0A3D"}
                    onMouseLeave={e => e.target.style.background = "#880E4F"}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      padding: "6px 8px",
                      background: "transparent",
                      color: "#E91E63",
                      border: "1.5px solid #f8bbd9",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = "#f8bbd9";
                      e.target.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#E91E63";
                    }}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
