export default function CustomerReviews() {
  const reviews = [
    {
      name: "Sandra Whitworth",
      location: "Guildford, United Kingdom",
      rating: 5,
      text: "Just splendid! My daughter in law to be is having a Hindu wedding in our garden. When choosing the Sari, Shri and her mum helped choose over the phone! What a great choice.",
      date: "24/03/2026"
    },
    {
      name: "Aicha",
      location: "New York, United States",
      rating: 5,
      text: "I'm a huge Bollywood fan and I tried your website, and to tell you the truth, I'm not disappointed at all. I'm very, very happy with my 5 dresses, very satisfied.",
      date: "23/03/2026"
    },
    {
      name: "Shanti Venkatakrishnan",
      location: "Croydon, United Kingdom",
      rating: 5,
      text: "Dress arrived. It is beautiful. Quality of dress material is also very good and fitting is excellent. Thank you so much for everything.",
      date: "21/03/2026"
    },
    {
      name: "Areej Amir",
      location: "Gold coast, Australia",
      rating: 5,
      text: "Absolutely OBSESSED!!! Thank you so much - I received my suits today and I had to try them on immediately. OMG they fit like a dream!",
      date: "05/03/2026"
    }
  ];

  return (
    <div id="reviews" style={{
      padding: "60px 30px",
      background: "var(--accent-bg)",
      borderBottom: "1px solid var(--accent-border)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "36px" }}>
        Customer Reviews
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
        maxWidth: "1126px",
        margin: "0 auto"
      }}>
        {reviews.map((review, idx) => (
          <div key={idx} style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "8px",
            border: "1px solid var(--accent-border)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} style={{ fontSize: "18px", color: "#ffc107" }}>⭐</span>
              ))}
            </div>
            <p style={{ color: "var(--text)", marginBottom: "15px", lineHeight: "1.6" }}>
              "{review.text}"
            </p>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "15px" }}>
              <p style={{ margin: "0 0 5px 0", fontWeight: "600", color: "#08060d" }}>
                {review.name}
              </p>
              <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666" }}>
                {review.location}
              </p>
              <p style={{ margin: "0", fontSize: "12px", color: "var(--text)" }}>
                {review.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}