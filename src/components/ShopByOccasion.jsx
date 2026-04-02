import React from 'react';
import { Link } from 'react-router-dom';

const ShopByOccasion = () => {
  const occasions = [
    { key: 'mehendi', title: 'MEHENDI', color: '#D4F1D4' },
    { key: 'sangeet', title: 'SANGEET', color: '#FFF4D6' },
    { key: 'wedding', title: 'WEDDING', color: '#F8D7E0' },
    { key: 'engagement', title: 'ENGAGEMENT', color: '#F4ECF7' },
    { key: 'reception', title: 'RECEPTION', color: '#E0F7F9' },
    { key: 'cocktail', title: 'COCKTAIL', color: '#FDEDEC' }
  ];

  return (
    <section style={{ padding: "40px 20px", background: "#f9f7f0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", color: "#2C4F3E", marginBottom: "30px", fontWeight: "600" }}>
          Shop by Occasion
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          padding: "0 15px"
        }}>
          {occasions.map((occasion) => (
            <Link 
              key={occasion.key}
              to={`/occasion/${occasion.key}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: occasion.color,
                padding: "40px 20px",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#2c2c2c", margin: "0" }}>
                  {occasion.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", margin: "10px 0 0 0" }}>
                  Explore Collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;