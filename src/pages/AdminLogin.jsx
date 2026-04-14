import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // For demo: Simple hardcoded admin credentials
      // In production, this should be a backend call
      if (email === "admin@jodha.com" && password === "admin123") {
        localStorage.setItem("admin_token", "admin_" + Date.now());
        localStorage.setItem("admin_email", email);
        navigate("/admin");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px"
  };

  const cardStyle = {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center"
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "30px",
    textAlign: "center"
  };

  const formStyle = {
    display: "grid",
    gap: "15px"
  };

  const inputStyle = {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.3s",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "12px 15px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    transition: "all 0.3s"
  };

  const errorStyle = {
    padding: "12px",
    background: "#fee",
    color: "#c33",
    border: "1px solid #fcc",
    borderRadius: "6px",
    fontSize: "13px",
    marginBottom: "15px"
  };



  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🔐 Admin Login</h1>
        <p style={subtitleStyle}>House of Jodha Admin Panel</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>



        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
              fontWeight: "500"
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
