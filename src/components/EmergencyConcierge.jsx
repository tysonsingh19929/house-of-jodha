import React, { useState } from 'react';

export default function EmergencyConcierge() {
  const [hovered, setHovered] = useState(false);

  const handleConciergeClick = () => {
    const greetingText = `Namaste. Welcome to The Sringar House Private Concierge. I am your personal stylist today. Take a deep breath—we have you fully covered.\n\nLet's get this sorted for you immediately. Could you share:\n\nWhat is the occasion or deadline?\nDo you have a sense of their style (or a photo of them)?\n\nI will personally hand-pick 3 exclusive ensembles from our vault, share photos with you, and coordinate premium white-glove delivery to their doorstep.`;

    const phoneNumber = "9967670497"; // Private Concierge WhatsApp
    const encodedMessage = encodeURIComponent(greetingText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div
      className="emergency-concierge-fab"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 10000,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <button
        onClick={handleConciergeClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', // Emerald/Deep Green Gradient
          color: '#D4AF37', // Luxury Gold
          border: '2.5px solid #D4AF37', // Gold Border
          borderRadius: '30px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: hovered 
            ? '0 0 25px rgba(212, 175, 55, 0.7), 0 8px 30px rgba(6, 78, 59, 0.4)' 
            : '0 0 15px rgba(212, 175, 55, 0.3), 0 4px 15px rgba(6, 78, 59, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: hovered ? 'scale(1.05) translateY(-4px)' : 'scale(1) translateY(0)',
          animation: 'conciergeGlow 2.5s infinite alternate',
        }}
      >
        <span className="concierge-bell" style={{ fontSize: '18px', display: 'inline-block' }}>🔔</span>
        <span>Emergency Concierge — Delivered in 24-48 Hours</span>

        <style>{`
          @keyframes conciergeGlow {
            0% {
              box-shadow: 0 0 10px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(6, 78, 59, 0.3);
            }
            100% {
              box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 4px 20px rgba(6, 78, 59, 0.5);
            }
          }
          .emergency-concierge-fab:hover .concierge-bell {
            animation: bellRing 0.8s ease-in-out infinite;
          }
          @keyframes bellRing {
            0%, 100% { transform: rotate(0); }
            15% { transform: rotate(-15deg); }
            30% { transform: rotate(15deg); }
            45% { transform: rotate(-10deg); }
            60% { transform: rotate(10deg); }
            75% { transform: rotate(-5deg); }
            90% { transform: rotate(5deg); }
          }
          @media (max-width: 768px) {
            .emergency-concierge-fab {
              bottom: auto;
              top: 10px;
              left: 50%;
              transform: translateX(-50%);
              width: 90%;
              display: flex;
              justify-content: center;
            }
            .emergency-concierge-fab button {
              width: 100%;
              font-size: 11px;
              padding: 8px 16px;
            }
          }
        `}</style>
      </button>
    </div>
  );
}
