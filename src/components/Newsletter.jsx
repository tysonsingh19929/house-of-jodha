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
      background: "#0a0f0d",
      backgroundImage: "linear-gradient(135deg, #111 0%, #0a0f0d 100%)",
      padding: isMobile ? "60px 20px" : "100px 30px",
      textAlign: "center",
      borderBottom: "1px solid rgba(212,175,55,0.1)",
      position: "relative",
      overflow: "hidden"
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

      {/* Decorative Blur */}
      <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", background: "#D4AF37", filter: "blur(200px)", opacity: "0.15", borderRadius: "50%", pointerEvents: "none" }} />

      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "46px", marginBottom: "16px", color: "#fff", fontWeight: "600", position: "relative", zIndex: 1 }}>
        Join The <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Inner Circle</span>
      </h2>
      <p style={{ fontSize: isMobile ? "14px" : "16px", color: "rgba(255,255,255,0.6)", marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px auto", lineHeight: "1.6", position: "relative", zIndex: 1 }}>
        Subscribe to receive early access to new collections, exclusive high-fashion insights, and private invitations.
      </p>

      <form onSubmit={handleSubscribe} style={{
        display: "flex",
        gap: isMobile ? "12px" : "0",
        maxWidth: "480px",
        margin: "0 auto",
        justifyContent: "center",
        flexDirection: isMobile ? "column" : "row",
        position: "relative",
        zIndex: 1
      }}>
        <input
          type="email"
          name="newsletterEmail"
          id="newsletterEmail"
          placeholder="Enter your email address"
          required
          style={{
            flex: isMobile ? "1" : "1",
            minWidth: isMobile ? "100%" : "200px",
            padding: isMobile ? "14px 20px" : "16px 24px",
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: isMobile ? "12px" : "30px 0 0 30px",
            fontSize: "14px",
            color: "#fff",
            outline: "none",
            backdropFilter: "blur(10px)"
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)",
            color: "#0a0f0d",
            border: "none",
            padding: isMobile ? "14px 24px" : "16px 36px",
            borderRadius: isMobile ? "12px" : "0 30px 30px 0",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s",
            width: isMobile ? "100%" : "auto",
            fontSize: "14px",
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}
          onMouseEnter={e => {
            e.target.style.opacity = "0.9";
          }}
          onMouseLeave={e => {
            e.target.style.opacity = "1";
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}