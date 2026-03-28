export default function Cart({ items, onRemove, onClose }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      position: "fixed",
      top: "60px",
      right: "0",
      width: "100%",
      maxWidth: "400px",
      height: "calc(100vh - 60px)",
      background: "#fff",
      boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
      zIndex: "99",
      overflow: "auto",
      animation: "slideIn 0.3s ease-out"
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <div style={{ padding: "20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: "0" }}>Shopping Cart</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <p style={{ fontSize: "18px", color: "var(--text)" }}>Your cart is empty</p>
          <p style={{ fontSize: "14px", color: "var(--text)" }}>Add items to start shopping! 🛍️</p>
        </div>
      ) : (
        <>
          <div style={{ padding: "20px" }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "15px",
                  marginBottom: "15px",
                  borderBottom: "1px solid var(--border)"
                }}
              >
                <div style={{ flex: "1" }}>
                  <p style={{ margin: "0 0 5px 0", fontWeight: "600", fontSize: "14px" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: "0", color: "var(--accent)", fontWeight: "600" }}>
                    ₹{item.price}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(idx)}
                  style={{
                    background: "#ff6b6b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            background: "#fff",
            borderTop: "1px solid var(--border)",
            padding: "20px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "600"
            }}>
              <span>Total:</span>
              <span style={{ color: "var(--accent)" }}>₹{total}</span>
            </div>
            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "10px"
              }}
            >
              Checkout
            </button>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "10px",
                background: "var(--border)",
                color: "var(--text-h)",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}