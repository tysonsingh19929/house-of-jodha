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
      "Facebook": "https://facebook.com/houseofjodha",
      "Instagram": "https://instagram.com/houseofjodha",
      "Twitter": "https://twitter.com/houseofjodha"
    };
    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  return (
    <div style={{
      background: "#08060d",
      color: "#fff",
      padding: isMobile ? "30px 15px 20px" : "50px 30px 30px"
    }}>
      <div style={{
        maxWidth: "1126px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
        gap: isMobile ? "20px" : "40px",
        marginBottom: isMobile ? "25px" : "40px"
      }}>
        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: "#D4AF37" }}>
            House of Jodha
          </h4>
          <p style={{ fontSize: isMobile ? "13px" : "14px", lineHeight: "1.6", opacity: "0.9", margin: "0" }}>
            Exquisite Indian ethnic wear designed for the modern woman. Handpicked, carefully curated, and tailored to perfection.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Shopping</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("New Arrivals")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>New Arrivals</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("Best Sellers")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Best Sellers</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleShoppingClick("View All")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>View All</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handleShoppingClick("Sale")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Collection</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Lehenga")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Lehenga</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Saree")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Saree</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handleCollectionClick("Anarkali")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Anarkali</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handleCollectionClick("Salwar Kameez")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Salwar Kameez</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Policies</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Privacy Policy")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Privacy Policy</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Shipping Info")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Shipping Info</a></li>
            <li style={{ marginBottom: "8px", cursor: "pointer" }}><a onClick={() => handlePolicyClick("Returns")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Returns</a></li>
            <li style={{ cursor: "pointer" }}><a onClick={() => handlePolicyClick("Terms & Conditions")} style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px", cursor: "pointer" }}>Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px" }}>📧 support@houseofjodha.com</li>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px" }}>📞 +1 (555) 123-4567</li>
            <li style={{ fontSize: isMobile ? "13px" : "14px", marginTop: isMobile ? "10px" : "15px" }}>Follow us:</li>
            <li style={{ marginTop: "8px", fontSize: isMobile ? "14px" : "18px" }}>
              <a onClick={() => handleSocialClick("Facebook")} style={{ color: "#D4AF37", marginRight: isMobile ? "10px" : "15px", textDecoration: "none", cursor: "pointer" }}>f</a>
              <a onClick={() => handleSocialClick("Instagram")} style={{ color: "#D4AF37", marginRight: isMobile ? "10px" : "15px", textDecoration: "none", cursor: "pointer" }}>📷</a>
              <a onClick={() => handleSocialClick("Twitter")} style={{ color: "#D4AF37", textDecoration: "none", cursor: "pointer" }}>𝕏</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: isMobile ? "15px" : "20px",
        textAlign: "center",
        fontSize: isMobile ? "11px" : "13px",
        opacity: "0.8"
      }}>
        <p style={{ margin: "0 0 8px 0" }}>✨ SALE UPTO 50% OFF EVERYTHING | PLUS 5% OFF | USE CODE JODHA5 ✨</p>
        <p style={{ margin: "0" }}>
          © 2026 House of Jodha. All rights reserved. | Perfect Tailoring, Delivered at Doorsteps
        </p>
      </div>
    </div>
  );
}