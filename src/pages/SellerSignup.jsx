import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const normalizeApiBase = (base) => base.replace(/\/+$/, '');
const buildApiUrl = (path) => {
  const normalizedBase = normalizeApiBase(API_BASE_URL);
  return `${normalizedBase}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default function SellerSignup() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password)) {
      setError("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please enter the same password twice.");
      setLoading(false);
      return;
    }

    try {
      const fullPhone = `${countryCode}${phone}`;
      const response = await fetch(buildApiUrl('/sellers/register'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, businessName, phone: fullPhone, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Redirect to login after successful registration
      navigate("/seller-login", { replace: true });
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
      background: "#0a0f0d", // Dark luxury background
      backgroundImage: "radial-gradient(circle at 50% 0%, #1e3a29 0%, #0a0f0d 60%)",
      padding: "30px 20px",
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
        maxWidth: "480px",
        width: "100%",
        position: "relative",
        zIndex: 1,
        animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          .auth-input { width: 100%; padding: 14px 16px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 14px; color: #fff; outline: none; transition: all 0.3s ease; box-sizing: border-box; }
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
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #D4AF37, #AA8A2A)", borderRadius: "16px", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
            Become a Partner
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0" }}>
            Join our exclusive luxury boutique network
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: "rgba(255, 59, 48, 0.1)", border: "1px solid rgba(255, 59, 48, 0.3)", color: "#ff4d4d", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: "500", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex. Jane Doe"
                required
                className="auth-input"
                autoFocus
              />
            </div>

            <div>
              <label className="auth-label">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex. Sringar Apparel"
                required
                className="auth-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="auth-label">WhatsApp / Phone</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="auth-input"
                style={{ width: "110px", padding: "14px 8px", cursor: "pointer" }}
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+971">+971 (AE)</option>
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex. 90000 00000"
                required
                className="auth-input"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: boutique@sringarhouse.com"
              required
              className="auth-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
            <div>
              <label className="auth-label">Create Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label className="auth-label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className="auth-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Registering..." : "Submit Application"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "32px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
          Already a partner?{" "}
          <Link to="/seller-login" className="auth-link">Login here</Link>
        </div>

        <div style={{ marginTop: "40px" }}>
          <button
            onClick={() => window.history.length > 2 ? navigate(-1) : navigate("/")}
            style={{ width: "100%", padding: "14px", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
