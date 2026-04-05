import React from 'react';
import { Link } from 'react-router-dom';

const ShopByOccasion = () => {
  const occasions = [
    { 
      key: 'mehendi', 
      title: 'MEHENDI', 
      image: 'https://images.pexels.com/photos/34833771/pexels-photo-34833771.jpeg?auto=compress&w=800&format=webp' 
    },
    { 
      key: 'sangeet', 
      title: 'SANGEET', 
      image: 'https://images.pexels.com/photos/33411709/pexels-photo-33411709.jpeg?auto=compress&w=800&format=webp' 
    },
    { 
      key: 'wedding', 
      title: 'WEDDING', 
      image: 'https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&w=800&format=webp' 
    },
    { 
      key: 'engagement', 
      title: 'ENGAGEMENT', 
      image: 'https://images.pexels.com/photos/29494642/pexels-photo-29494642.jpeg?auto=compress&w=800&format=webp' 
    },
    { 
      key: 'reception', 
      title: 'RECEPTION', 
      image: 'https://images.pexels.com/photos/32081722/pexels-photo-32081722.jpeg?auto=compress&w=800&format=webp' 
    },
    { 
      key: 'cocktail', 
      title: 'COCKTAIL', 
      image: 'https://images.pexels.com/photos/30184613/pexels-photo-30184613.jpeg?auto=compress&w=800&format=webp' 
    }
  ];

  return (
    <section id="shop-by-occasion" style={{ padding: "60px 20px", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "32px", 
          color: "#1a1a1a", 
          marginBottom: "40px", 
          fontWeight: "600",
          letterSpacing: "1px"
        }}>
          Shop by Occasion
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Slightly wider for banners
          gap: "24px",
        }}>
          {occasions.map((occasion) => (
            <Link 
              key={occasion.key}
              to={`/occasion/${occasion.key}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                height: "200px", // Fixed height for the banner
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                // SET BACKGROUND IMAGE HERE
                background: `url(${occasion.image}) no-repeat center center`,
                backgroundSize: "cover"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
              >
                {/* DARK OVERLAY FOR TEXT READABILITY */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5))",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px"
                }}>
                  <h3 style={{ 
                    fontSize: "24px", 
                    fontWeight: "700", 
                    color: "#fff", 
                    margin: "0",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}>
                    {occasion.title}
                  </h3>
                  <div style={{
                    marginTop: "10px",
                    padding: "6px 16px",
                    border: "1px solid #fff",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    borderRadius: "4px"
                  }}>
                    Explore Collection
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;