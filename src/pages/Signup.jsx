import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signup } from "../services/api";

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

export default function Signup({ cartOpen, setCartOpen, cartCount }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", address: "", city: "", state: "", zipCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handlePendingAuth = (provider) => {
    alert(`${provider} login will be enabled once your API keys are provided to the server. Check your console for details.`);
    console.log(`[AUTH REQUIRED] To enable ${provider}, please register for the API (e.g. OTPless or Firebase) and deploy the Client ID in your .env variables.`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return setError("Full name is required"), false;
    if (!formData.email.trim()) return setError("Email is required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError("Please enter a valid email"), false;
    if (!formData.phone.trim()) return setError("Phone number is required"), false;
    if (!formData.password) return setError("Password is required"), false;
    if (formData.password.length < 6) return setError("Password must be at least 6 characters"), false;
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match"), false;
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    if (!validateForm()) { setLoading(false); return; }

    try {
      const response = await signup(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fcfaf8", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />

      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "20px" : "40px" }}>
        <div style={{
          width: "100%", maxWidth: "480px", background: "#fff", padding: isMobile ? "30px 20px" : "40px",
          borderRadius: "16px", border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden"
        }}>
          {/* Subtle gold glow behind header */}
          <div style={{ position: "absolute", top: "-50px", left: "50%", transform: "translateX(-50%)", width: "100px", height: "100px", background: "#D4AF37", filter: "blur(70px)", opacity: "0.2", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ fontSize: isMobile ? "28px" : "32px", marginBottom: "8px", color: "#1a1a1a", textAlign: "center", fontWeight: "700", letterSpacing: "-0.5px" }}>
              Join the House
            </h1>
            <p style={{ fontSize: "15px", color: "#666", textAlign: "center", marginBottom: "32px", lineHeight: "1.5" }}>
              Unlock exclusive collections, personalized styling, and fast checkouts.
            </p>

            {error && <div style={{ background: "#f8d7da", border: "1px solid #f5c6cb", color: "#721c24", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>{error}</div>}
            {success && <div style={{ background: "#d4edda", border: "1px solid #c3e6cb", color: "#155724", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>{success}</div>}

            {/* Omnichannel Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <button 
                onClick={() => handlePendingAuth('WhatsApp')}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", width: "100%", padding: "14px", background: "#25D366", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <WhatsAppIcon /> Continue with WhatsApp
              </button>

              <button 
                onClick={() => handlePendingAuth('Instagram')}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", width: "100%", padding: "14px", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 14px rgba(220, 39, 67, 0.3)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <InstagramIcon /> Continue with Instagram
              </button>

              <button 
                onClick={() => handlePendingAuth('Mobile OTP')}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 14px rgba(26, 26, 26, 0.2)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <PhoneIcon /> Sign up with Mobile OTP
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", margin: "24px 0", color: "#999" }}>
              <div style={{ flex: 1, height: "1px", background: "#eee" }}></div>
              <span style={{ padding: "0 15px", fontSize: "14px", fontWeight: "500" }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "#eee" }}></div>
            </div>

            {!showEmailForm ? (
              <button 
                onClick={() => setShowEmailForm(true)}
                style={{ width: "100%", padding: "14px", background: "#fff", color: "#333", border: "1px solid #ddd", borderRadius: "12px", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                Sign up with Email
              </button>
            ) : (
              <form onSubmit={handleSignup} style={{ animation: "fadeIn 0.3s ease" }}>
                <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confirm</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "16px", marginBottom: "24px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
                  <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>Shipping Information (Optional)</p>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444", textTransform: "uppercase", letterSpacing: "0.5px" }}>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px" }}>
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    <input type="text" name="zipCode" placeholder="ZIP" value={formData.zipCode} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#D4AF37"} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  style={{ width: "100%", padding: "16px", background: loading ? "#ccc" : "#D4AF37", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s" }}
                  onMouseEnter={e => !loading && (e.target.style.background = "#c49a27")}
                  onMouseLeave={e => !loading && (e.target.style.background = "#D4AF37")}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}

            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
                Already have an account? <Link to="/login" style={{ color: "#D4AF37", textDecoration: "none", fontWeight: "600" }}>Log in here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <Footer />
    </div>
  );
}
