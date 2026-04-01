import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div id="home" style={{
      background: "#880E4F",
      padding: isMobile ? "48px 20px 40px" : "80px 40px 70px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(circle at 20% 50%, rgba(233,30,99,0.35) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,213,79,0.12) 0%, transparent 40%),
          radial-gradient(circle at 60% 85%, rgba(194,24,91,0.45) 0%, transparent 50%)
        `,
      }} />

      {/* Festive badge */}
      <div style={{
        display: "inline-block",
        background: "rgba(255,213,79,0.12)",
        border: "1px solid rgba(255,213,79,0.4)",
        color: "#FFD54F",
        padding: "5px 18px",
        borderRadius: "20px",
        fontSize: isMobile ? "10px" : "11px",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "18px",
        position: "relative",
      }}>
        ✦ New Festive Collection 2026
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: isMobile ? "36px" : "58px",
        fontWeight: "700",
        color: "#fff",
        lineHeight: "1.1",
        margin: "0 0 12px",
        position: "relative",
      }}>
        House of{" "}
        <span style={{ color: "#FFD54F", fontStyle: "italic" }}>Jodha</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: isMobile ? "14px" : "16px",
        color: "rgba(255,255,255,0.75)",
        maxWidth: "520px",
        margin: "0 auto 32px",
        lineHeight: "1.75",
        position: "relative",
      }}>
        Exquisite Indian ethnic wear designed for the modern diva.
        Handpicked, carefully curated, and tailored to perfection.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
        <button
          onClick={() => {
            const el = document.getElementById("products");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            background: "linear-gradient(135deg, #E91E63, #C2185B)",
            color: "#fff",
            border: "none",
            padding: isMobile ? "12px 28px" : "14px 40px",
            borderRadius: "4px",
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(233,30,99,0.5)",
            letterSpacing: "0.5px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(233,30,99,0.6)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(233,30,99,0.5)";
          }}
        >
          Explore Collection →
        </button>
        <button
          onClick={() => navigate("/collection/all")}
          style={{
            background: "transparent",
            color: "#FFD54F",
            border: "1.5px solid #FFD54F",
            padding: isMobile ? "12px 28px" : "14px 40px",
            borderRadius: "4px",
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: "700",
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,213,79,0.12)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          View All
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex",
        gap: isMobile ? "24px" : "52px",
        justifyContent: "center",
        marginTop: isMobile ? "36px" : "52px",
        position: "relative",
      }}>
        {[
          { num: "2.4k+", label: "Happy Customers" },
          { num: "500+", label: "Designs" },
          { num: "4.9 ★", label: "Avg Rating" },
          { num: "100%", label: "Handcrafted" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Georgia', serif",
              fontSize: isMobile ? "20px" : "26px",
              fontWeight: "700",
              color: "#FFD54F",
            }}>
              {num}
            </div>
            <div style={{
              fontSize: isMobile ? "9px" : "11px",
              color: "rgba(255,255,255,0.55)",
              marginTop: "3px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}