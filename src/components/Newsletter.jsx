export default function Newsletter() {
  const isMobile = window.innerWidth <= 768;

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! Check your email for exclusive offers.");
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(184, 68, 141, 0.1) 0%, rgba(184, 68, 141, 0.05) 100%)",
      padding: isMobile ? "40px 15px" : "60px 30px",
      textAlign: "center",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ fontSize: isMobile ? "24px" : "32px", marginBottom: "15px", color: "#08060d" }}>
        Join Our Community
      </h2>
      <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#666", marginBottom: "25px" }}>
        Get exclusive offers, new arrivals, and fashion tips delivered to your inbox
      </p>
      
      <form onSubmit={handleSubscribe} style={{
        display: "flex",
        gap: isMobile ? "8px" : "10px",
        maxWidth: "500px",
        margin: "0 auto",
        justifyContent: "center",
        flexDirection: isMobile ? "column" : "row",
        flexWrap: "wrap"
      }}>
        <input
          type="email"
          name="newsletterEmail"
          id="newsletterEmail"
          placeholder="Enter your email"
          required
          style={{
            flex: isMobile ? "1" : "1",
            minWidth: isMobile ? "100%" : "200px",
            padding: isMobile ? "10px 15px" : "12px 20px",
            border: "1px solid #D4AF37",
            borderRadius: "4px",
            fontSize: isMobile ? "13px" : "14px",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#D4AF37",
            color: "#fff",
            border: "none",
            padding: isMobile ? "10px 20px" : "12px 30px",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s",
            width: isMobile ? "100%" : "auto"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#a0337a";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "#D4AF37";
            e.target.style.transform = "scale(1)";
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}