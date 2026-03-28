export default function Newsletter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! Check your email for exclusive offers.");
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(184, 68, 141, 0.1) 0%, rgba(184, 68, 141, 0.05) 100%)",
      padding: "60px 30px",
      textAlign: "center",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ fontSize: "32px", marginBottom: "15px", color: "#08060d" }}>
        Join Our Community
      </h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        Get exclusive offers, new arrivals, and fashion tips delivered to your inbox
      </p>
      
      <form onSubmit={handleSubscribe} style={{
        display: "flex",
        gap: "10px",
        maxWidth: "500px",
        margin: "0 auto",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "12px 20px",
            border: "1px solid #B8448D",
            borderRadius: "4px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#B8448D",
            color: "#fff",
            border: "none",
            padding: "12px 30px",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => {
            e.target.style.background = "#a0337a";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "#B8448D";
            e.target.style.transform = "scale(1)";
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}