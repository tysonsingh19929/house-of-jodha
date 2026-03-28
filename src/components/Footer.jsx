export default function Footer() {
  const isMobile = window.innerWidth <= 768;

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
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>New Arrivals</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Best Sellers</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>View All</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Collection</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Lehenga</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Saree</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Anarkali</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Salwar Kameez</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Policies</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Privacy Policy</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Shipping Info</a></li>
            <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Returns</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none", fontSize: isMobile ? "13px" : "14px" }}>Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "15px" : "16px", fontWeight: "600" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px" }}>📧 support@houseofjodha.com</li>
            <li style={{ marginBottom: "8px", fontSize: isMobile ? "13px" : "14px" }}>📞 +1 (555) 123-4567</li>
            <li style={{ fontSize: isMobile ? "13px" : "14px", marginTop: isMobile ? "10px" : "15px" }}>Follow us:</li>
            <li style={{ marginTop: "8px", fontSize: isMobile ? "14px" : "18px" }}>
              <a href="#" style={{ color: "#D4AF37", marginRight: isMobile ? "10px" : "15px", textDecoration: "none" }}>f</a>
              <a href="#" style={{ color: "#D4AF37", marginRight: isMobile ? "10px" : "15px", textDecoration: "none" }}>📷</a>
              <a href="#" style={{ color: "#D4AF37", textDecoration: "none" }}>𝕏</a>
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