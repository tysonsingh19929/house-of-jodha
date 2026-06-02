import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import { resetPassword, api } from "../services/api";

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

export default function ResetPassword({
  cartOpen, setCartOpen, cartCount, onCartClick,
  wishlistOpen, setWishlistOpen, wishlistCount, onWishlistClick,
  cartItems, removeFromCart, wishlistItems, removeFromWishlist, addToCart
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const isSeller = type === "seller";
  const isMobile = window.innerWidth <= 768;

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError("New password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(formData.newPassword)) {
      setError("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (type === "seller") {
        await api.sellerResetPassword(token, formData.newPassword);
      } else {
        await resetPassword(token, formData.newPassword);
      }
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate(type === "seller" ? "/seller-login" : "/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSeller) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0a0f0d", backgroundImage: "radial-gradient(circle at 50% 0%, #1e3a29 0%, #0a0f0d 60%)",
        padding: "20px", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-150px", left: "-100px", width: "400px", height: "400px", background: "#D4AF37", filter: "blur(150px)", opacity: "0.15", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-200px", right: "-100px", width: "500px", height: "500px", background: "#2C4F3E", filter: "blur(200px)", opacity: "0.4", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{
          background: "rgba(20, 30, 25, 0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          borderRadius: "24px", padding: "48px 40px", boxShadow: "0 24px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.08)", maxWidth: "420px", width: "100%", position: "relative", zIndex: 1
        }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>Reset Password</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", margin: "0" }}>Enter your new secure password</p>
          </div>

          {error && <div style={{ background: "rgba(255, 59, 48, 0.1)", color: "#ff4d4d", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px" }}>{error}</div>}
          {success && <div style={{ background: "rgba(52, 199, 89, 0.1)", color: "#34d399", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px" }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: "8px", textTransform: "uppercase" }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleInputChange} placeholder="••••••••" required style={{ width: "100%", padding: "16px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "15px", color: "#fff", outline: "none", boxSizing: "border-box", paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: "8px", textTransform: "uppercase" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" required style={{ width: "100%", padding: "16px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "15px", color: "#fff", outline: "none", boxSizing: "border-box", paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || !token} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div style={{ marginTop: "40px" }}>
            <button onClick={() => navigate("/seller-login")} style={{ width: "100%", padding: "14px", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>← Back to Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAFA", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <Navbar
        cartCount={cartCount}
        onCartClick={onCartClick || (() => setCartOpen(!cartOpen))}
        wishlistCount={wishlistCount}
        onWishlistClick={onWishlistClick || (() => setWishlistOpen(!wishlistOpen))}
      />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />
      )}
      {wishlistOpen && (
        <Wishlist items={wishlistItems} onRemove={removeFromWishlist} onClose={() => setWishlistOpen(false)} onAddToCart={addToCart} />
      )}
      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "20px" : "40px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: "440px", background: "#ffffff", padding: isMobile ? "30px 24px" : "48px", borderRadius: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.04)", border: "1px solid rgba(212,175,55,0.1)", position: "relative", zIndex: 1 }}>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: isMobile ? "28px" : "32px", marginBottom: "8px", color: "#1a1a1a", fontWeight: "700" }}>Reset Password</h1>
            <p style={{ fontSize: "15px", color: "#666", margin: 0 }}>Create a new password for your account.</p>
          </div>

          {error && <div style={{ background: "#fff5f5", color: "#e03131", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px" }}>{error}</div>}
          {success && <div style={{ background: "#f4fdf8", color: "#099268", padding: "14px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px" }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#666", marginBottom: "8px", textTransform: "uppercase" }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleInputChange} placeholder="••••••••" required style={{ width: "100%", padding: "14px 16px", background: "#fafafa", border: "1px solid #eaeaea", borderRadius: "12px", fontSize: "15px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#666", marginBottom: "8px", textTransform: "uppercase" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" required style={{ width: "100%", padding: "14px 16px", background: "#fafafa", border: "1px solid #eaeaea", borderRadius: "12px", fontSize: "15px", color: "#1a1a1a", outline: "none", boxSizing: "border-box", paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || !token} style={{ width: "100%", padding: "16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div style={{ marginTop: "24px" }}>
            <button onClick={() => navigate("/login")} style={{ width: "100%", padding: "14px", background: "transparent", color: "#666", border: "1px solid #eaeaea", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>← Back to Login</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}