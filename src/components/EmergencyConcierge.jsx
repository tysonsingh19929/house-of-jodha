import React from 'react';

export default function EmergencyConcierge() {
  const handleConciergeClick = () => {
    const greetingText = `Namaste. Welcome to The Sringar House Private Concierge. I am your personal stylist today. Take a deep breath—we have you fully covered.\n\nLet's get this sorted for you immediately. Could you share:\n\nWhat is the occasion or deadline?\nDo you have a sense of their style (or a photo of them)?\n\nI will personally hand-pick 3 exclusive ensembles from our vault, share photos with you, and coordinate premium white-glove delivery to their doorstep.`;

    const phoneNumber = "9967670497"; // Private Concierge WhatsApp
    const encodedMessage = encodeURIComponent(greetingText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="emergency-concierge-container">
      <style>{`
        .emergency-concierge-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 10000;
          font-family: 'DM Sans', sans-serif;
        }

        .emergency-concierge-btn {
          background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); /* Emerald/Deep Green Gradient */
          color: #D4AF37; /* Luxury Gold */
          border: 2.5px solid #D4AF37; /* Gold Border */
          border-radius: 30px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), 0 4px 15px rgba(6, 78, 59, 0.3);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: conciergeGlow 2.5s infinite alternate;
        }

        .emergency-concierge-btn:hover {
          transform: scale(1.05) translateY(-4px);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.7), 0 8px 30px rgba(6, 78, 59, 0.4);
        }

        @keyframes conciergeGlow {
          0% {
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(6, 78, 59, 0.3);
          }
          100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 4px 20px rgba(6, 78, 59, 0.5);
          }
        }

        .concierge-bell {
          font-size: 18px;
          display: inline-block;
        }

        .emergency-concierge-btn:hover .concierge-bell {
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
          .emergency-concierge-container {
            bottom: 80px; /* Floats perfectly above Sort/Filter panels */
            left: 16px;
            right: 16px;
            display: flex;
            justify-content: center;
          }

          .emergency-concierge-btn {
            width: 100%;
            justify-content: center;
            font-size: 12px;
            padding: 10px 16px;
          }
        }
      `}</style>

      <button onClick={handleConciergeClick} className="emergency-concierge-btn">
        <span className="concierge-bell">🔔</span>
        <span>Emergency Concierge — Delivered in 24-48 Hours</span>
      </button>
    </div>
  );
}
