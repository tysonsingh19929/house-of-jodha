import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SELLER_PASSWORD = "seller123"; // Simple password - change this to something secure

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === SELLER_PASSWORD) {
      // Clear all old keys and set new one
      localStorage.clear();
      localStorage.setItem("seller_authenticated", "true");
      setPassword("");
      setError("");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #2C4F3E 0%, #3d6b52 100%)",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        maxWidth: "400px",
        width: "100%"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#2C4F3E", fontSize: "28px", margin: "0 0 10px 0" }}>
            🔐 Seller Login
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
            Access the product management dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: "#ffe0e0",
            border: "1px solid #ff6b6b",
            color: "#d32f2f",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#333",
              fontSize: "14px"
            }}>
              Seller Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter seller password"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
              autoFocus
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#c9860f"}
            onMouseLeave={e => e.target.style.background = "var(--accent)"}
          >
            🔓 Login as Seller
          </button>
        </form>

        {/* Divider */}
        <div style={{
          textAlign: "center",
          margin: "25px 0",
          color: "#999",
          fontSize: "13px"
        }}>
          or
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "15px",
            fontWeight: "600",
            background: "#f5f5f5",
            color: "#333",
            border: "1px solid #ddd",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#eee";
            e.target.style.borderColor = "#ccc";
          }}
          onMouseLeave={e => {
            e.target.style.background = "#f5f5f5";
            e.target.style.borderColor = "#ddd";
          }}
        >
          ← Back to Home
        </button>

        {/* Info Box */}
        <div style={{
          background: "#f0f8ff",
          border: "1px solid #cce5ff",
          padding: "12px",
          borderRadius: "6px",
          marginTop: "20px",
          fontSize: "12px",
          color: "#0066cc",
          textAlign: "center"
        }}>
          <strong>Demo Password:</strong> <code style={{ background: "#fff", padding: "2px 6px", borderRadius: "3px" }}>seller123</code>
        </div>
      </div>
    </div>
  );
}
