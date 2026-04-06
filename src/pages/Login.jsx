import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login } from "../services/api";

export default function Login({ cartOpen, setCartOpen, cartCount }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await login(formData.email, formData.password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />

      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "20px" : "40px" }}>
        <div style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          padding: isMobile ? "30px 20px" : "50px 40px",
          borderRadius: "8px",
          border: "1px solid #eee",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <h1 style={{ fontSize: isMobile ? "24px" : "32px", marginBottom: "10px", color: "#333", textAlign: "center" }}>
            Login
          </h1>
          <p style={{ fontSize: "14px", color: "#666", textAlign: "center", marginBottom: "30px" }}>
            Welcome back to House of Jodha
          </p>

          {error && (
            <div style={{
              background: "#fff3cd",
              border: "1px solid #ffc107",
              color: "#856404",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  transition: "all 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#D4AF37"}
                onBlur={e => e.target.style.borderColor = "#ddd"}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  transition: "all 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#D4AF37"}
                onBlur={e => e.target.style.borderColor = "#ddd"}
              />
            </div>

            <div style={{ marginBottom: "30px", textAlign: "right" }}>
              <Link to="/signup" style={{ fontSize: "13px", color: "#D4AF37", textDecoration: "none", fontWeight: "500" }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? "#ccc" : "#D4AF37",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => !loading && (e.target.style.background = "#c49a27")}
              onMouseLeave={e => !loading && (e.target.style.background = "#D4AF37")}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 10px 0" }}>
              Don't have an account?
            </p>
            <Link
              to="/signup"
              style={{
                display: "inline-block",
                color: "#D4AF37",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
