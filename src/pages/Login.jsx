import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login } from "../services/api";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

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

export default function Login({ cartOpen, setCartOpen, cartCount }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  useEffect(() => {
    // Intercept mobile hardware back button to navigate to home instead of closing the app
    window.history.pushState(null, null, window.location.pathname);
    const handleBackButton = () => {
      navigate("/");
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);

  const handlePendingAuth = (provider) => {
    showToast(`${provider} login will be enabled once API keys are provided.`);
    console.log(`[AUTH REQUIRED] To enable ${provider}, please register for the API (e.g. OTPless or Firebase) and deploy the Client ID in your .env variables.`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields"); setLoading(false); return;
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
    <div style={{ background: "#FAFAFA", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />

      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: "fixed", top: "100px", right: "20px", zIndex: 9999,
          background: "#333", color: "#fff", padding: "14px 24px",
          borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          animation: "slideInRight 0.3s ease", fontWeight: "500", fontSize: "14px",
          borderLeft: "4px solid #D4AF37"
        }}>
          {toast.message}
        </div>
      )}

      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", padding: isMobile ? "20px" : "40px", position: "relative", overflow: "hidden" }}>
        {/* Soft floating background orbs */}
        <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(250,250,250,0) 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(250,250,250,0) 70%)" }} />
        </div>

        <div style={{
          width: "100%", maxWidth: "440px", background: "#ffffff", padding: isMobile ? "30px 24px" : "48px",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
          position: "relative", zIndex: 1, border: "1px solid rgba(212,175,55,0.1)",
          animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <style>{`
            @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
            .user-input { width: 100%; padding: 14px 16px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; font-size: 15px; color: #1a1a1a; outline: none; transition: all 0.3s ease; box-sizing: border-box; }
            .user-input:focus { border-color: #D4AF37; background: #fff; box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1); }
            .user-input::placeholder { color: #aaa; }
            .user-label { display: block; font-size: 13px; font-weight: 600; color: #666; margin-bottom: 8px; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; text-transform: uppercase; }
            .user-btn { width: 100%; padding: 16px; background: #1a1a1a; color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 12px rgba(26,26,26,0.15); display: flex; align-items: center; justify-content: center; gap: 10px; }
            .user-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,26,26,0.25); background: #333; }
            .user-btn:active:not(:disabled) { transform: translateY(1px); }
            .user-btn:disabled { opacity: 0.7; cursor: not-allowed; }
            .provider-btn { width: 100%; padding: 14px; background: #fff; color: #1a1a1a; border: 1px solid #eaeaea; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: flex; alignItems: center; justifyContent: center; gap: 12px; }
            .provider-btn:hover { background: #fafafa; border-color: #ddd; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
          `}</style>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: isMobile ? "28px" : "32px", marginBottom: "8px", color: "#1a1a1a", fontWeight: "700", letterSpacing: "-0.5px" }}>Welcome Back</h1>
            <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.5", margin: 0 }}>Discover exclusive collections and personalized high-end fashion.</p>
          </div>

          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #ffe3e3", color: "#e03131", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: "500", display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ animation: "slideUp 0.4s ease" }}>
            <div style={{ marginBottom: "20px" }}>
              <label className="user-label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="user-input" placeholder="hello@example.com" autoFocus />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label className="user-label" style={{ marginBottom: 0 }}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className="user-input" placeholder="••••••••" style={{ paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="user-btn">
              {loading ? "Authenticating..." : "Sign In to Account"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Link to="/forgot-password" style={{ fontSize: "14px", color: "#666", textDecoration: "none", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#D4AF37"} onMouseLeave={e => e.target.style.color = "#666"}>Forgot Password?</Link>
            </div>
          </form>

          <div style={{ display: "flex", alignItems: "center", margin: "24px 0", color: "#aaa" }}>
            <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
            <span style={{ padding: "0 16px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "slideUp 0.4s ease" }}>
            <button onClick={() => handlePendingAuth('WhatsApp')} className="provider-btn" style={{ color: "#25D366" }}>
              <WhatsAppIcon /> Continue with WhatsApp
            </button>
            <button onClick={() => handlePendingAuth('Instagram')} className="provider-btn" style={{ color: "#E1306C" }}>
              <InstagramIcon /> Continue with Instagram
            </button>
            <button onClick={() => handlePendingAuth('Mobile OTP')} className="provider-btn">
              <PhoneIcon /> Login with Mobile OTP
            </button>
          </div>

          <div style={{ marginTop: "32px", textAlign: "center", paddingTop: "24px", borderTop: "1px solid #f0f0f0" }}>
            <p style={{ fontSize: "14px", color: "#666", margin: "0", fontWeight: "500" }}>
              New to House of Jodha? <Link to="/signup" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "700", borderBottom: "2px solid #D4AF37", paddingBottom: "2px", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#D4AF37"} onMouseLeave={e => e.target.style.color = "#1a1a1a"}>Create account</Link>
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <button
              onClick={() => navigate("/")}
              style={{ width: "100%", padding: "14px", background: "transparent", color: "#666", border: "1px solid #eaeaea", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "#fafafa"; e.target.style.color = "#333"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#666"; }}
            >
              ← Return to Main Store
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
