import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OccasionPage({ cartCount, onCartClick }) {
  const { occasion } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const occasionDetails = {
    mehendi: {
      name: "Mehendi Collection",
      emoji: "💚",
      description: "Celebrate the joy of Mehendi with our vibrant and colorful collection. Green is the color of choice for this auspicious occasion.",
      tips: "Mehendi designs should be bright, festive, and comfortable. Opt for light fabrics with beautiful embroidery."
    },
    sangeet: {
      name: "Sangeet Collection",
      emoji: "🎵",
      description: "Get ready to dance and celebrate music with our elegant Sangeet collection. Perfect for a night of music and celebrations.",
      tips: "Choose designs that allow movement and comfort for dancing. Opt for fabrics that shimmer and shine."
    },
    wedding: {
      name: "Wedding Collection",
      emoji: "💍",
      description: "The most special day deserves the most beautiful outfit. Our wedding collection features exquisite designs for the bride.",
      tips: "Wedding outfits should be grand and statement-making. Choose premium fabrics with intricate embroidery."
    },
    engagement: {
      name: "Engagement Collection",
      emoji: "✨",
      description: "Make your engagement day memorable with our stunning and elegant collection. Perfect for the soon-to-be bride.",
      tips: "Engagement outfits should be elegant yet not overshadow the main event. Choose sophisticated designs in pastels."
    },
    reception: {
      name: "Reception Collection",
      emoji: "🎉",
      description: "Celebrate the union with our glamorous reception collection. Show off your style with our premium designs.",
      tips: "Reception allows for more glamour and sparkle. Choose designs with mirror work and sequins."
    },
    cocktail: {
      name: "Cocktail Collection",
      emoji: "🍾",
      description: "For the modern woman who loves to party. Our cocktail collection is chic, modern, and absolutely stunning.",
      tips: "Cocktail wear can be more experimental. Choose contemporary designs with bold colors and unique patterns."
    }
  };

  const details = occasionDetails[occasion];

  if (!details) {
    return <div>Occasion not found</div>;
  }

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <div style={{ padding: isMobile ? "20px" : "40px 30px", maxWidth: "1126px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
        >
          ← Back to Home
        </button>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>{details.emoji}</div>
          <h1 style={{ color: "#2C4F3E", fontSize: isMobile ? "28px" : "36px", marginBottom: "15px" }}>
            {details.name}
          </h1>
          <p style={{ color: "#666", fontSize: isMobile ? "14px" : "16px", marginBottom: "20px", maxWidth: "600px", margin: "0 auto 20px" }}>
            {details.description}
          </p>
          <div style={{
            background: "rgba(212, 175, 55, 0.1)",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px"
          }}>
            <p style={{ color: "#2C4F3E", fontSize: isMobile ? "13px" : "14px", margin: "0", fontWeight: "600" }}>
              💡 Styling Tip: {details.tips}
            </p>
          </div>
        </div>

        <div style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #e5e4e7",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#08060d", marginBottom: "15px" }}>Shop {details.name}</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Browse our collection to find the perfect outfit for your {occasion} celebration.
          </p>
          <button 
            onClick={() => navigate("/")}
            style={{
              padding: "12px 30px",
              background: "#D4AF37",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            View All Collections
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
