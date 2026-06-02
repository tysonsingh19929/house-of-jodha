export default function About() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div id="about" style={{
      padding: isMobile ? "60px 20px" : "120px 40px",
      background: "#FAFAFA",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
        gap: isMobile ? "40px" : "80px",
        alignItems: "center"
      }}>

        {/* Left Column - Large Editorial Heading */}
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            marginBottom: "24px",
            fontSize: isMobile ? "40px" : "64px",
            color: "#1a1a1a",
            fontWeight: "600",
            lineHeight: "1.1"
          }}>
            The Art of <br />
            <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Indian Ethnic</span> <br />
            Wear.
          </h2>
          <div style={{ width: "80px", height: "3px", background: "#D4AF37", marginBottom: "32px" }} />
          <p style={{ fontSize: isMobile ? "15px" : "18px", color: "#1a1a1a", fontWeight: "500", lineHeight: "1.6", margin: 0 }}>
            An honest attempt to make every woman across the globe shine the brightest inside and out.
          </p>
        </div>

        {/* Right Column - Elegant Text */}
        <div style={{ fontSize: isMobile ? "14px" : "15px", lineHeight: "1.9", color: "#666" }}>
          <p style={{ marginBottom: "24px" }}>
            <strong style={{ color: "#1a1a1a" }}>The Sringar House</strong> intends to dress up fashionistas and discerning clients in the latest, trendiest, and beautiful Indian dresses. From traditional Saris, Anarkali Suits, Salwar Kameez, Lehengas, Shararas to modern Indo-Western fusion wear, we have it all available for our lovely ladies.
          </p>

          <p style={{ marginBottom: "32px" }}>
            Our beautiful ethnic wear is sourced from skilled artisans across India and delivered to your doorstep. The weaving, spinning, and dyeing of cotton clothing has evolved to create some of the most beautiful textile traditions in the world. Regional styles like Jamdani, Bandhani, Kanjeevaram, and Banarasi represent the rich cultural heritage that we celebrate.
          </p>

          <div style={{ background: "#fff", padding: "32px", border: "1px solid #eaeaea", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: "16px", color: "#1a1a1a", fontSize: "22px", fontWeight: "700" }}>
              Our Commitment
            </h3>
            <ul style={{ paddingLeft: "20px", margin: "0", color: "#555", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>Bespoke, made-to-measure, boutique-style stitching tailored to your body.</li>
              <li>Premium quality fabrics and exquisite hand-crafted detailing.</li>
              <li>Quick and reliable doorstep deliveries across the globe.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}