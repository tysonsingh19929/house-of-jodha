import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SellerSignup() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/sellers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, businessName, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Redirect to login after successful registration
      navigate("/seller-login");
    } catch (error) {
      setError("Connection error. Make sure the server is running.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
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
            🛍️ Seller Registration
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
            Create an account to start selling
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

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#333",
              fontSize: "14px"
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
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

          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#333",
              fontSize: "14px"
            }}>
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
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
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#333",
              fontSize: "14px"
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#333",
              fontSize: "14px"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
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
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              background: loading ? "#ccc" : "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => !loading && (e.target.style.background = "#c9860f")}
            onMouseLeave={e => !loading && (e.target.style.background = "var(--accent)")}
          >
            {loading ? "⏳ Registering..." : "📝 Register as Seller"}
          </button>
        </form>

        {/* Links */}
        <div style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "14px"
        }}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            Already have a seller account?{" "}
            <Link to="/seller-login" style={{ color: "#2C4F3E", fontWeight: "600", textDecoration: "none" }}>
              Login here
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div style={{
          textAlign: "center",
          margin: "20px 0",
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
      </div>
    </div>
  );
}
