import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup({ cartOpen, setCartOpen, cartCount }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.phone.length < 10) {
      setError("Phone number should be at least 10 digits");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      if (users.find(u => u.email === formData.email)) {
        setError("Email already registered. Please login instead.");
        setLoading(false);
        return;
      }

      // Save new user (without confirmPassword)
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      setSuccess("Account created successfully! Redirecting to home...");
      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1000);
  };

  return (
    <div style={{ background: "#fff", paddingTop: isMobile ? "100px" : "120px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />

      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "20px" : "40px" }}>
        <div style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "600px",
          background: "#fff",
          padding: isMobile ? "30px 20px" : "50px 40px",
          borderRadius: "8px",
          border: "1px solid #eee",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <h1 style={{ fontSize: isMobile ? "24px" : "32px", marginBottom: "10px", color: "#333", textAlign: "center" }}>
            Create Account
          </h1>
          <p style={{ fontSize: "14px", color: "#666", textAlign: "center", marginBottom: "30px" }}>
            Join House of Jodha and explore exclusive collections
          </p>

          {error && (
            <div style={{
              background: "#f8d7da",
              border: "1px solid #f5c6cb",
              color: "#721c24",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: "#d4edda",
              border: "1px solid #c3e6cb",
              color: "#155724",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
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

            {/* Email */}
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

            {/* Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your 10-digit phone number"
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

            {/* Password and Confirm Password in 2 columns on desktop */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Min 6 characters"
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
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter password"
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
            </div>

            {/* Address */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
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

            {/* City, State, ZIP in 3 columns on desktop */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
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
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
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
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#333" }}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="PIN code"
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
                transition: "all 0.3s",
                marginTop: "10px"
              }}
              onMouseEnter={e => !loading && (e.target.style.background = "#c49a27")}
              onMouseLeave={e => !loading && (e.target.style.background = "#D4AF37")}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 10px 0" }}>
              Already have an account?
            </p>
            <Link
              to="/login"
              style={{
                display: "inline-block",
                color: "#D4AF37",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Login here
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
