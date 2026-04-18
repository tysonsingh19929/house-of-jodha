import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const normalizeApiBase = (base) => base.replace(/\/+$/, '');
const buildApiUrl = (path) => {
  const normalizedBase = normalizeApiBase(API_BASE_URL);
  return `${normalizedBase}${path.startsWith('/') ? '' : '/'}${path}`;
};

const EyeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(buildApiUrl('/sellers/login'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store seller info in localStorage
      localStorage.setItem("seller_authenticated", "true");
      localStorage.setItem("seller_id", data.seller.id);
      localStorage.setItem("seller_name", data.seller.name);
      localStorage.setItem("seller_email", data.seller.email);
      localStorage.setItem("seller_role", data.seller.role);
      localStorage.setItem("is_super_admin", String(data.isSuperAdmin));

      setEmail("");
      setPassword("");
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Connection error. Make sure the server is running.");
      console.error("Login error:", error);
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
      background: "#0a0f0d", // Dark luxury background
      backgroundImage: "radial-gradient(circle at 50% 0%, #1e3a29 0%, #0a0f0d 60%)",
      padding: "20px",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Blur Backgrounds */}
      <div style={{ position: "absolute", top: "-150px", left: "-100px", width: "400px", height: "400px", background: "#D4AF37", filter: "blur(150px)", opacity: "0.15", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-200px", right: "-100px", width: "500px", height: "500px", background: "#2C4F3E", filter: "blur(200px)", opacity: "0.4", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{
        background: "rgba(20, 30, 25, 0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "24px",
        padding: "48px 40px",
        boxShadow: "0 24px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.08)",
        maxWidth: "420px",
        width: "100%",
        position: "relative",
        zIndex: 1,
        animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          .auth-input { width: 100%; padding: 16px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 15px; color: #fff; outline: none; transition: all 0.3s ease; box-sizing: border-box; }
          .auth-input:focus { border-color: #D4AF37; background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1); }
          .auth-input::placeholder { color: rgba(255,255,255,0.4); }
          .auth-label { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 8px; letter-spacing: 0.5px; text-transform: uppercase; }
          .auth-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
          .auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4); }
          .auth-btn:active:not(:disabled) { transform: translateY(1px); }
          .auth-btn:disabled { opacity: 0.7; cursor: not-allowed; }
          .auth-link { color: #D4AF37; text-decoration: none; font-weight: 600; transition: color 0.2s; }
          .auth-link:hover { color: #fed053; }
        `}</style>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #D4AF37, #AA8A2A)", borderRadius: "16px", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
            Seller Portal
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", margin: "0" }}>
            Login to manage your luxury boutique
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: "rgba(255, 59, 48, 0.1)", border: "1px solid rgba(255, 59, 48, 0.3)", color: "#ff4d4d", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: "500", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: boutique@jodha.com"
              required
              className="auth-input"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label className="auth-label" style={{ marginBottom: 0 }}>Password</label>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your secure password"
                required
                className="auth-input"
                style={{ paddingRight: "40px" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Link to="/forgot-password?type=seller" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: "600", letterSpacing: "0.5px", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fed053"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Forgot Password?</Link>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "32px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
          New to House of Jodha?{" "}
          <Link to="/seller-signup" className="auth-link">Apply to Sell</Link>
        </div>

        <div style={{ marginTop: "40px" }}>
          <button
            onClick={() => navigate("/")}
            style={{ width: "100%", padding: "14px", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
          >
            ← Return to Main Store
          </button>
        </div>
      </div>
    </div>
  );
}
