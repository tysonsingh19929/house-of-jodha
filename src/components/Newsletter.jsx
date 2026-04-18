import { useState } from "react";

export default function Newsletter() {
  const isMobile = window.innerWidth <= 768;
  const [toast, setToast] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 4000);
    e.target.reset();
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(184, 68, 141, 0.1) 0%, rgba(184, 68, 141, 0.05) 100%)",
      padding: isMobile ? "40px 15px" : "60px 30px",
      textAlign: "center",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <style>{`
      @keyframes slideUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
    `}</style>
      {toast && (
        <div style={{
          position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)",
          background: "#08060d", color: "#fff", padding: "14px 24px",
          borderRadius: "30px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          animation: "slideUp 0.3s ease", fontWeight: "500", fontSize: "14px",
          zIndex: 9999, border: "1px solid rgba(212,175,55,0.3)",
          whiteSpace: "nowrap"
        }}>
          ✨ Thank you for subscribing! Check your email for exclusive offers.
        </div>
      )}

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