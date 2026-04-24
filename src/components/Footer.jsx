import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const handleShoppingClick = (item) => {
    navigate("/");
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handlePolicyClick = (policyName) => {
    const policyMap = {
      "Privacy Policy": "privacy",
      "Shipping Info": "shipping",
      "Returns": "returns",
      "Terms & Conditions": "terms"
    };
    navigate(`/policy/${policyMap[policyName]}`);
  };

  const handleCollectionClick = (collection) => {
    const collectionMap = {
      "Lehenga": "lehenga",
      "Saree": "saree",
      "Anarkali": "anarkali",
      "Salwar Kameez": "salwarkameez"
    };
    navigate(`/collection/${collectionMap[collection]}`);
  };

  const handleSocialClick = (platform) => {
    const urls = {
      "Facebook": "https://facebook.com/thesringarhouse",
      "Instagram": "https://www.instagram.com/thesringaarhouse?igsh=MW5hc3RmdDR5d3p6cw==",
      "Twitter": "https://twitter.com/thesringarhouse"
    };
    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  return (
    <div style={{
      background: "#0a0f0d",
      color: "#fff",
      padding: isMobile ? "40px 20px 20px" : "80px 40px 30px",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
        gap: isMobile ? "20px" : "40px",
        marginBottom: isMobile ? "25px" : "40px"
      }}>
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: isMobile ? "16px" : "24px", fontSize: isMobile ? "24px" : "28px", fontWeight: "700", color: "#D4AF37", letterSpacing: "1px" }}>
            The Sringar House
          </h4>
          <p style={{ fontSize: isMobile ? "13px" : "14px", lineHeight: "1.8", color: "rgba(255,255,255,0.7)", margin: "0" }}>
            Exquisite Indian ethnic wear designed for the modern woman. Handpicked, carefully curated, and tailored to perfection.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "24px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>Shopping</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("New Arrivals")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>New Arrivals</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("Best Sellers")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Best Sellers</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("View All")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>View All</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handleShoppingClick("Sale")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "24px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>Collection</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Lehenga")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Lehenga</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Saree")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Saree</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Anarkali")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Anarkali</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handleCollectionClick("Salwar Kameez")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Salwar Kameez</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "24px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>Policies</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Privacy Policy")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Privacy Policy</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Shipping Info")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Shipping Info</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Returns")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Returns</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handlePolicyClick("Terms & Conditions")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "24px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px", color: "rgba(255,255,255,0.7)" }}>📧 support@thesringarhouse.com</li>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px", color: "rgba(255,255,255,0.7)" }}>📞 +91 9967670497</li>
            <li style={{ fontSize: isMobile ? "13px" : "14px", marginTop: isMobile ? "16px" : "24px", color: "#fff" }}>Follow us:</li>
            <li style={{ marginTop: "8px", fontSize: isMobile ? "14px" : "18px" }}>
              <a onClick={() => handleSocialClick("Facebook")} style={{ color: "#D4AF37", marginRight: isMobile ? "12px" : "16px", textDecoration: "none", cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 1}>f</a>
              <a onClick={() => handleSocialClick("Instagram")} style={{ color: "#D4AF37", marginRight: isMobile ? "12px" : "16px", textDecoration: "none", cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 1}>📷</a>
              <a onClick={() => handleSocialClick("Twitter")} style={{ color: "#D4AF37", textDecoration: "none", cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 1}>𝕏</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(212,175,55,0.1)",
        paddingTop: isMobile ? "20px" : "30px",
        textAlign: "center",
        fontSize: isMobile ? "11px" : "13px",
        color: "rgba(255,255,255,0.5)"
      }}>
        <p style={{ margin: "0 0 8px 0", color: "#D4AF37", letterSpacing: "1px" }}>✨ SALE UP TO 50% OFF EVERYTHING | PLUS 5% OFF | USE CODE SRINGAR5 ✨</p>
        <p style={{ margin: "0" }}>
          © 2026 The Sringar House. All rights reserved. | Perfect Tailoring, Delivered at Doorsteps
        </p>
      </div>
    </div>
  );
}