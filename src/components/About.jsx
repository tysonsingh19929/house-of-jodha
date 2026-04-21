export default function About() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div id="about" style={{
      padding: isMobile ? "60px 20px" : "100px 40px",
      background: "#FAFAFA",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", textAlign: "center", marginBottom: "16px", fontSize: isMobile ? "32px" : "46px", color: "#1a1a1a", fontWeight: "700" }}>
          About The Sringar House
        </h2>
        <div style={{ width: "60px", height: "2px", background: "#D4AF37", margin: "0 auto 40px auto" }} />

        <div style={{ fontSize: isMobile ? "15px" : "17px", lineHeight: "1.9", color: "#555", marginBottom: isMobile ? "20px" : "30px", textAlign: "justify" }}>
          <p>
            <strong style={{ color: "#1a1a1a" }}>The Sringar House</strong> is an honest attempt to make every woman across the globe shine the brightest inside and out. We intend to dress up the fashionistas and discerning clients in the latest, trendiest, and beautiful Indian dresses.
          </p>

          <p>
            From traditional Saris, Anarkali Suits, Salwar Kameez, Lehengas, Shararas to modern Indo-Western fusion wear, we have it all available for our lovely ladies. Our beautiful Indian ethnic wear is sourced from skilled artisans across India and delivered to your doorstep.
          </p>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: isMobile ? "40px" : "50px", marginBottom: "16px", color: "#1a1a1a", fontSize: isMobile ? "24px" : "28px", fontWeight: "600", textAlign: "center" }}>
            Our Commitment
          </h3>
          <ul style={{ lineHeight: "2", fontSize: isMobile ? "15px" : "16px", paddingLeft: isMobile ? "20px" : "25px", margin: "0 auto", maxWidth: "600px", color: "#555" }}>
            <li>Varied choices ranging from minimal embellishments to elaborate, gorgeous designs</li>
            <li>Bespoke, made-to-measure, boutique-style stitching tailored to your body</li>
            <li>Premium quality fabrics and exquisite craftsmanship</li>
            <li>Quick doorstep deliveries across the globe</li>
            <li>Exceptional customer service and support</li>
          </ul>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", marginTop: isMobile ? "40px" : "50px", marginBottom: "16px", color: "#1a1a1a", fontSize: isMobile ? "24px" : "28px", fontWeight: "600", textAlign: "center" }}>
            The Art of Indian Ethnic Wear
          </h3>
          <p>
            The weaving, spinning, and dyeing of cotton clothing began during the Indus Valley Civilization and has evolved to create some of the most beautiful textile traditions in the world. Regional styles like Jamdani from Bengal, Bandhani from Rajasthan, Kanjeevaram from Tamil Nadu, and Banarasi from Varanasi represent the rich cultural heritage that we celebrate.
          </p>

          <p>
            Each piece tells a story of tradition, craftsmanship, and artistry. We take pride in bringing these masterpieces to women who appreciate true elegance and cultural beauty.
          </p>
        </div>
      </div>
    </div>
  );
}