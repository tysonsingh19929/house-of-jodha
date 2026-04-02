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
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #E91E63, #C2185B);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #C2185B, #A01848);
        }
      `}</style>

      {/* Header */}
      <div style={{ 
        padding: isMobile ? "8px 15px" : "12px 20px", 
        borderBottom: "1px solid #e0e0e0",
        background: "#fff",
        flexShrink: 0,
        boxShadow: "none"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: isMobile ? "14px" : "16px", fontWeight: "600" }}>
              ♡ My Wishlist
            </h3>
            <p style={{ margin: "2px 0 0 0", color: "#999", fontSize: "11px" }}>
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "0",
              color: "#333",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.opacity = "0.7"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Items List */}
      <div style={{
        flex: "1 1 auto",
        maxHeight: isMobile ? "calc(100% - 180px)" : "calc(100% - 160px)",
        overflowY: "auto",
        padding: "15px",
        minHeight: "0",
        WebkitOverflowScrolling: "touch"
      }}>
        {items.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.8 }}>♡</div>
            <p style={{ fontSize: "18px", color: "#333", margin: "0 0 8px 0", fontWeight: "600" }}>
              Your wishlist is empty
            </p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0 0 20px 0", lineHeight: "1.5" }}>
              Save your favorite pieces to view them anytime
            </p>
            <button
              onClick={() => {
                onClose();
                navigate("/");
              }}
              style={{
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(233,30,99,0.3)"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              Explore Collection
            </button>
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "14px",
                marginBottom: "14px",
                border: "1.5px solid #f5f5f5",
                transition: "all 0.3s",
                display: "flex",
                gap: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(233,30,99,0.12)";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#f5f5f5";
              }}
            >
              {/* Product Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    onClose();
                  }}
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    transition: "transform 0.3s",
                    flexShrink: 0
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              )}

              {/* Product Info */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      onClose();
                    }}
                    style={{
                      margin: "0 0 5px 0",
                      fontWeight: "700",
                      fontSize: "13px",
                      color: "#1a0010",
                      cursor: "pointer",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.color = "#E91E63"}
                    onMouseLeave={e => e.target.style.color = "#1a0010"}
                  >
                    {item.name}
                  </p>
                  <p style={{ margin: "0 0 3px 0", fontSize: "11px", color: "#999" }}>
                    {item.category}
                  </p>
                  <p style={{ margin: "0 0 8px 0", color: "#E91E63", fontWeight: "700", fontSize: "15px" }}>
                    ₹{item.price}
                  </p>
                  {item.originalPrice && (
                    <p style={{ margin: "0", color: "#bbb", fontSize: "12px", textDecoration: "line-through" }}>
                      ₹{item.originalPrice}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <button
                    onClick={() => onAddToCart(item)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      background: "linear-gradient(135deg, #E91E63, #C2185B)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s",
                      boxShadow: "0 2px 6px rgba(233, 30, 99, 0.2)"
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.4)";
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 6px rgba(233, 30, 99, 0.2)";
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      padding: "8px 12px",
                      background: "rgba(233, 30, 99, 0.1)",
                      color: "#E91E63",
                      border: "1.5px solid #f8bbd9",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = "#E91E63";
                      e.target.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = "rgba(233, 30, 99, 0.1)";
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
