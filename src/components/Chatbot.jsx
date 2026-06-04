import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const normalizeApiBase = (base) => base.replace(/\/+$/, '');
const buildApiUrl = (path) => {
  const normalizedBase = normalizeApiBase(API_BASE_URL);
  return `${normalizedBase}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Helper function to convert URLs in text to clickable links
const makeLinksClickable = (text) => {
  if (!text || typeof text !== 'string') return text;
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0; // Reset regex state
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#D4AF37', textDecoration: 'underline' }}
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const ISHANI_AVATAR = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); // 'menu', 'chat', 'gifting'
  const [step, setStep] = useState(1); // 1: Recipient, 2: Occasion, 3: Style, 4: Sizing, 5: Sender details
  
  // Gifting questionnaire state
  const [giftingData, setGiftingData] = useState({
    recipient: "",
    recipientCustom: "",
    occasion: "",
    occasionCustom: "",
    style: "",
    styleCustom: "",
    sizingType: "", // 'known' or 'contact'
    size: "",
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: ""
  });

  const [messages, setMessages] = useState([
    { role: 'model', text: 'Namaste! Welcome to The Sringar House. I am Ishani, your Senior Fashion Consultant. How can I help you pick the perfect outfit today, love?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(() => {
    return sessionStorage.getItem('ishani_greeted') === 'true';
  });
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setShowGreeting(false);
      setHasGreeted(true);
      sessionStorage.setItem('ishani_greeted', 'true');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasGreeted) {
        setShowGreeting(true);
      }
    }, 4000); // Appears 4 seconds after page load
    return () => clearTimeout(timer);
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    // Auto-open chatbot ONCE per session when the site loads
    const hasAutoOpened = sessionStorage.getItem('chatbot_auto_opened') === 'true';
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('chatbot_auto_opened', 'true');
      }, 1500); // Auto-opens 1.5 seconds after page load
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showGreeting) {
      const hideTimer = setTimeout(() => {
        setShowGreeting(false);
        setHasGreeted(true);
        sessionStorage.setItem('ishani_greeted', 'true');
      }, 12000); // Auto-hides after 12 seconds
      return () => clearTimeout(hideTimer);
    }
  }, [showGreeting]);

  useEffect(() => {
    if (isOpen && view === 'chat') scrollToBottom();
  }, [messages, isOpen, view]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Listen to custom global events to open the concierge suite directly into gifting mode
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setView('gifting');
      setStep(1);
    };
    window.addEventListener("open-gift-concierge", handleOpenEvent);
    return () => {
      window.removeEventListener("open-gift-concierge", handleOpenEvent);
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const historyToSend = messages.length > 0 && messages[0].role === 'model' ? messages.slice(1) : messages;

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
      const response = await fetch(buildApiUrl('/chat/message'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: historyToSend.map(m => ({
            role: m.role,
            text: m.text,
            parts: [{ text: m.text }]
          }))
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Chatbot API Error:", response.status, errText);
        throw new Error('Server error');
      }

      const data = await response.json();
      const replyText = data.reply || data.text || data.response || data.message || "I'm having a little trouble formatting my response right now.";
      setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'model', text: 'Apologies darling, I seem to have lost connection. Could you try asking me again?' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Emergency Concierge WhatsApp Handover handler
  const handleEmergencyConciergeClick = () => {
    const greetingText = `Namaste. Welcome to The Sringar House Private Concierge. I am your personal stylist today. Take a deep breath—we have you fully covered.\n\nLet's get this sorted for you immediately. Could you share:\n\nWhat is the occasion or deadline?\nDo you have a sense of their style (or a photo of them)?\n\nI will personally hand-pick 3 exclusive ensembles from our vault, share photos with you, and coordinate premium white-glove delivery to their doorstep.`;
    const phoneNumber = "9967670497"; // Private Concierge WhatsApp
    const encodedMessage = encodeURIComponent(greetingText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // Gift Concierge Handlers
  const handleSelect = (field, value) => {
    setGiftingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      setView('menu');
    } else {
      setStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return giftingData.recipient === "Other" ? giftingData.recipientCustom.trim() !== "" : giftingData.recipient !== "";
    }
    if (step === 2) {
      return giftingData.occasion === "Other" ? giftingData.occasionCustom.trim() !== "" : giftingData.occasion !== "";
    }
    if (step === 3) {
      return giftingData.style === "Other" ? giftingData.styleCustom.trim() !== "" : giftingData.style !== "";
    }
    if (step === 4) {
      if (giftingData.sizingType === "known") return giftingData.size !== "";
      if (giftingData.sizingType === "contact") return giftingData.recipientName.trim() !== "" && giftingData.recipientPhone.trim() !== "";
      return false;
    }
    if (step === 5) {
      return giftingData.senderName.trim() !== "";
    }
    return true;
  };

  const handleGiftingSubmit = () => {
    const recipientText = giftingData.recipient === "Other" ? giftingData.recipientCustom : giftingData.recipient;
    const occasionText = giftingData.occasion === "Other" ? giftingData.occasionCustom : giftingData.occasion;
    const styleText = giftingData.style === "Other" ? giftingData.styleCustom : giftingData.style;
    
    let sizingText = "";
    if (giftingData.sizingType === "known") {
      sizingText = `Standard Size: ${giftingData.size}`;
    } else {
      sizingText = `Contact Recipient for Sizing\n   *Recipient Name:* ${giftingData.recipientName}\n   *Recipient Phone:* ${giftingData.recipientPhone}`;
    }

    const message = `*✨ THE SRINGAR HOUSE - GIFT CONCIERGE INQUIRY ✨*\n\nHello! I would like to consult with a gifting expert. Here are my preferences:\n\n👤 *Gift For:* ${recipientText}\n🎉 *Occasion:* ${occasionText}\n🎨 *Style Preference:* ${styleText}\n📏 *Sizing Selection:* ${sizingText}\n\n*Sender Details:*\n✍️ *Name:* ${giftingData.senderName}\n📞 *Phone:* ${giftingData.senderPhone || "Not provided"}\n\nPlease guide me with the best curated options!`;

    const phoneNumber = "9967670497"; // Consultant WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    setView('menu');
    setIsOpen(false);
  };

  // Header content helper
  const getHeaderContent = () => {
    if (view === 'chat') {
      return {
        title: "Ishani",
        subtitle: "AI Senior Stylist",
        avatar: ISHANI_AVATAR,
        showBack: true
      };
    }
    if (view === 'gifting') {
      return {
        title: "Gift Curator",
        subtitle: `Curating a Gift (Step ${step} of 5)`,
        avatar: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=150&h=150&q=80",
        showBack: true
      };
    }
    return {
      title: "The Sringar Suite",
      subtitle: "Private Concierge Suite",
      avatar: ISHANI_AVATAR,
      showBack: false
    };
  };

  const header = getHeaderContent();

  return (
    <div className="chatbot-container" ref={containerRef}>
      <style>{`
        .chatbot-toggle {
          overflow: visible !important;
        }
        .chatbot-toggle::before {
          background: conic-gradient(from 0deg, #D4AF37, #AA8A2A, #064e3b, #D4AF37) !important;
          animation: spinRGBOrb 3s linear infinite !important;
        }
        .orb-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #D4AF37, #AA8A2A, #064e3b, #D4AF37) !important;
          box-shadow: none !important;
          z-index: 1;
          animation: spinRGBOrb 3s linear infinite !important;
          pointer-events: none;
          filter: blur(8px) !important;
          opacity: 0.9;
        }
        @keyframes spinRGBOrb {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ishani-greeting-bubble {
          position: absolute;
          bottom: calc(100% + 20px);
          right: 0;
          width: 270px;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 16px 16px 4px 16px;
          padding: 16px 20px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.15);
          animation: popInGreeting 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 101;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .ishani-greeting-bubble:hover {
          transform: translateY(-2px);
        }
        .ishani-greeting-bubble::after {
          content: '';
          position: absolute;
          bottom: -7px;
          right: 22px;
          width: 14px;
          height: 14px;
          background: #fff;
          border-right: 1px solid rgba(212, 175, 55, 0.4);
          border-bottom: 1px solid rgba(212, 175, 55, 0.4);
          transform: rotate(45deg);
        }
        .close-greeting {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          font-size: 16px;
          color: #999;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
          transition: color 0.2s;
        }
        .close-greeting:hover { color: #1a1a1a; }
        .greeting-content strong {
          display: block;
          color: #1a1a1a;
          margin-bottom: 6px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 700;
        }
        .greeting-content p {
          margin: 0;
          color: #555;
          font-size: 13px;
          line-height: 1.5;
        }
        @keyframes popInGreeting {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {showGreeting && !isOpen && (
        <div className="ishani-greeting-bubble" onClick={toggleChat}>
          <button
            className="close-greeting"
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
              setHasGreeted(true);
              sessionStorage.setItem('ishani_greeted', 'true');
            }}
            aria-label="Dismiss"
          >
            ✕
          </button>
          <div className="greeting-content">
            <strong>Namaste! 🙏</strong>
            <p>Welcome to The Sringar Suite. I am Ishani. Click here for styling curations and concierge assistance.</p>
          </div>
        </div>
      )}

      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle Concierge Suite"
      >
        <span className="orb-glow" />
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 100, position: "relative" }}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <img src={ISHANI_AVATAR} alt="Concierge" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', zIndex: 100, position: 'relative', border: '2px solid #D4AF37' }} />
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header" style={{ display: 'flex', alignItems: 'center', padding: '14px', background: 'linear-gradient(135deg, #111 0%, #292929 100%)', borderBottom: '1.5px solid #D4AF37' }}>
            {header.showBack && (
              <button 
                onClick={handleBack} 
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', paddingRight: '10px', display: 'flex', alignItems: 'center' }}
                aria-label="Back"
              >
                ←
              </button>
            )}
            
            <div className="chatbot-avatar" style={{ width: '32px', height: '32px', border: '1.5px solid #D4AF37', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
              <img src={header.avatar} alt="Header Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div className="chatbot-title" style={{ flex: 1 }}>
              <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#fff', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.5px' }}>{header.title}</h3>
              <span style={{ fontSize: '10px', color: '#D4AF37', fontWeight: '500' }}>{header.subtitle}</span>
            </div>
            
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close" style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* VIEW: MENU */}
          {view === 'menu' && (
            <>
              <div className="concierge-menu-content animate-fade-in-up" style={{ padding: '20px 20px 10px 20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1, backgroundColor: 'rgba(250, 250, 250, 0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                  <h3 style={{ margin: '0', fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: '700', color: '#1a1a1a', letterSpacing: '0.5px' }}>
                    The Sringar Suite
                  </h3>
                  <span style={{ fontSize: '10px', color: '#AA8A2A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Private Concierge & Styling
                  </span>
                </div>

                <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#555', textAlign: 'center', lineHeight: '1.6', fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif" }}>
                  "Namaste! Welcome to your styling suite. Let us discover your next ensemble or craft an exquisite gift together."
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Card 1: AI Stylist Chat */}
                  <div 
                    className="concierge-menu-card" 
                    onClick={() => setView('chat')}
                    style={{
                      padding: '14px 16px',
                      background: '#fff',
                      border: '1.5px solid #eaeaea',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px', background: '#fdf8ee', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#111', fontFamily: "'DM Sans', sans-serif" }}>
                        AI Stylist & Sizing Chat
                      </h4>
                      <p style={{ margin: '0', fontSize: '11px', color: '#777', lineHeight: '1.3' }}>
                        Inquire about sizes, jewelry pairings, and customization details.
                      </p>
                    </div>
                    <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 'bold' }}>→</div>
                  </div>

                  {/* Card 2: Gift curator */}
                  <div 
                    className="concierge-menu-card" 
                    onClick={() => { setView('gifting'); setStep(1); }}
                    style={{
                      padding: '14px 16px',
                      background: '#fff',
                      border: '1.5px solid #eaeaea',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px', background: '#fdf8ee', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎁</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#111', fontFamily: "'DM Sans', sans-serif" }}>
                        Bespoke Gift Curator
                      </h4>
                      <p style={{ margin: '0', fontSize: '11px', color: '#777', lineHeight: '1.3' }}>
                        Guided 5-step questionnaire to select the perfect outfit for a loved one.
                      </p>
                    </div>
                    <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 'bold' }}>→</div>
                  </div>

                  {/* Card 3: Emergency Concierge FAB equivalent */}
                  <div 
                    className="concierge-menu-card" 
                    onClick={handleEmergencyConciergeClick}
                    style={{
                      padding: '14px 16px',
                      background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
                      border: '1.5px solid #D4AF37',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 4px 12px rgba(6, 78, 59, 0.15)'
                    }}
                  >
                    <div style={{ fontSize: '24px', background: 'rgba(212,175,55,0.1)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🚨</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#D4AF37', fontFamily: "'DM Sans', sans-serif" }}>
                        Emergency Concierge (24-48h)
                      </h4>
                      <p style={{ margin: '0', fontSize: '11px', color: '#faecd1', lineHeight: '1.3' }}>
                        Stressed or facing a tight deadline? Direct WhatsApp style consultation.
                      </p>
                    </div>
                    <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 'bold' }}>→</div>
                  </div>

                </div>
              </div>

              {/* Fast-start AI chat input at the bottom of the menu */}
              <form 
                className="chatbot-input-area" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inputMessage.trim()) return;
                  setView('chat');
                  handleSendMessage(e);
                }}
                style={{ borderTop: '1px solid #EEE', background: 'white' }}
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Ishani anything to start chat..."
                  autoComplete="off"
                />
                <button type="submit" disabled={!inputMessage.trim()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}

          {/* VIEW: CHAT */}
          {view === 'chat' && (
            <>
              <div className="chatbot-messages" style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#FAFAFA' }}>
                {messages.map((message, index) => (
                  <div key={index} className={`message-wrapper ${message.role}`}>
                    {message.role === 'model' && (
                      <div className="message-avatar" style={{ width: '24px', height: '24px', border: '1px solid #D4AF37', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={ISHANI_AVATAR} alt="Ishani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div className={`message-bubble ${message.role}`}>{makeLinksClickable(message.text)}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message-wrapper model">
                    <div className="message-avatar" style={{ width: '24px', height: '24px', border: '1px solid #D4AF37', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={ISHANI_AVATAR} alt="Ishani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="message-bubble model typing">
                      <span className="dot" /><span className="dot" /><span className="dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about fabrics, sizes, or occasions..."
                  disabled={isTyping}
                  autoComplete="off"
                />
                <button type="submit" disabled={!inputMessage.trim() || isTyping}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}

          {/* VIEW: GIFT CURATOR */}
          {view === 'gifting' && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
              
              {/* Progress bar */}
              <div className="gift-concierge-progress-wrapper" style={{ padding: "12px 16px", borderBottom: "1px solid #eee", background: "#fff" }}>
                <div className="gift-concierge-progress-text" style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#AA8A2A", fontWeight: "700", letterSpacing: '0.5px' }}>
                  <span>GIFT SELECTOR</span>
                  <span>Step {step} of 5</span>
                </div>
                <div className="gift-concierge-progress-bar" style={{ height: "4px", background: "#f0f0f0", borderRadius: "2px", overflow: "hidden", marginTop: "6px" }}>
                  <div className="gift-concierge-progress-fill" style={{ height: "100%", background: "linear-gradient(90deg, #D4AF37, #AA8A2A)", borderRadius: "2px", width: `${(step / 5) * 100}%`, transition: "width 0.3s ease" }} />
                </div>
              </div>

              {/* Step content scrolling wrapper */}
              <div className="gifting-step-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* STEP 1: Recipient Relationship */}
                {step === 1 && (
                  <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: '#111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '700' }}>
                      Who is the luxury gift for?
                    </h3>
                    <p style={{ margin: '0 8px 10px 0', fontSize: '11px', color: '#777' }}>
                      Select their relationship to narrow appropriate ensembles.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {["Spouse", "Mother", "Bride", "Friend", "Other"].map(rel => (
                        <div
                          key={rel}
                          onClick={() => {
                            handleSelect("recipient", rel);
                            if (rel !== "Other") {
                              setStep(2);
                            }
                          }}
                          style={{
                            padding: '12px 16px',
                            border: giftingData.recipient === rel ? '2px solid #D4AF37' : '1px solid #eaeaea',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: giftingData.recipient === rel ? '#fdf8ee' : '#fff',
                            fontWeight: '600',
                            fontSize: '13px',
                            color: '#333',
                            transition: 'all 0.2s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{rel}</span>
                          {giftingData.recipient === rel && <span style={{ color: '#D4AF37' }}>✓</span>}
                        </div>
                      ))}
                    </div>

                    {giftingData.recipient === "Other" && (
                      <div className="animate-fade-in-up" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="e.g. Sister, Daughter, Daughter-in-law"
                          value={giftingData.recipientCustom}
                          onChange={(e) => handleSelect("recipientCustom", e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                        <button
                          disabled={!isStepValid()}
                          onClick={handleNext}
                          style={{
                            marginTop: '6px',
                            padding: '10px',
                            background: isStepValid() ? '#1a1a1a' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: isStepValid() ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: Occasion */}
                {step === 2 && (
                  <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: '#111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '700' }}>
                      What is the occasion?
                    </h3>
                    <p style={{ margin: '0', fontSize: '11px', color: '#777' }}>
                      Curations align with the event style standard.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {["Wedding", "Anniversary", "Milestone Celebration", "Urgent Apology / Last-Minute", "Other"].map(occ => (
                        <div
                          key={occ}
                          onClick={() => {
                            handleSelect("occasion", occ);
                            if (occ !== "Other") {
                              setStep(3);
                            }
                          }}
                          style={{
                            padding: '12px 16px',
                            border: giftingData.occasion === occ ? '2px solid #D4AF37' : '1px solid #eaeaea',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: giftingData.occasion === occ ? '#fdf8ee' : '#fff',
                            fontWeight: '600',
                            fontSize: '13px',
                            color: '#333',
                            transition: 'all 0.2s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{occ}</span>
                          {giftingData.occasion === occ && <span style={{ color: '#D4AF37' }}>✓</span>}
                        </div>
                      ))}
                    </div>

                    {giftingData.occasion === "Other" && (
                      <div className="animate-fade-in-up" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="e.g. Birthday, Diwali, Roka ceremony"
                          value={giftingData.occasionCustom}
                          onChange={(e) => handleSelect("occasionCustom", e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                        <button
                          disabled={!isStepValid()}
                          onClick={handleNext}
                          style={{
                            marginTop: '6px',
                            padding: '10px',
                            background: isStepValid() ? '#1a1a1a' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: isStepValid() ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Style Preference */}
                {step === 3 && (
                  <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: '#111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '700' }}>
                      What is their style preference?
                    </h3>
                    <p style={{ margin: '0', fontSize: '11px', color: '#777' }}>
                      Narrow down structural silhouettes and embroideries.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {["Traditional Silk", "Modern Minimalist", "Heavily Embroidered", "Other"].map(st => (
                        <div
                          key={st}
                          onClick={() => {
                            handleSelect("style", st);
                            if (st !== "Other") {
                              setStep(4);
                            }
                          }}
                          style={{
                            padding: '12px 16px',
                            border: giftingData.style === st ? '2px solid #D4AF37' : '1px solid #eaeaea',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: giftingData.style === st ? '#fdf8ee' : '#fff',
                            fontWeight: '600',
                            fontSize: '13px',
                            color: '#333',
                            transition: 'all 0.2s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{st}</span>
                          {giftingData.style === st && <span style={{ color: '#D4AF37' }}>✓</span>}
                        </div>
                      ))}
                    </div>

                    {giftingData.style === "Other" && (
                      <div className="animate-fade-in-up" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="e.g. Georgette prints, mirror work, pastels"
                          value={giftingData.styleCustom}
                          onChange={(e) => handleSelect("styleCustom", e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                        <button
                          disabled={!isStepValid()}
                          onClick={handleNext}
                          style={{
                            marginTop: '6px',
                            padding: '10px',
                            background: isStepValid() ? '#1a1a1a' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: isStepValid() ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 4: Sizing Details */}
                {step === 4 && (
                  <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: '#111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '700' }}>
                      Sizing curation
                    </h3>
                    <p style={{ margin: '0', fontSize: '11px', color: '#777' }}>
                      Choose how standard sizing will be selected.
                    </p>

                    {/* Sizing Radio 1 */}
                    <div 
                      onClick={() => handleSelect("sizingType", "known")}
                      style={{
                        padding: "12px",
                        border: giftingData.sizingType === "known" ? "2px solid #D4AF37" : "1.5px solid #eaeaea",
                        borderRadius: "10px",
                        cursor: "pointer",
                        background: giftingData.sizingType === "known" ? "#fdf8ee" : "#fff",
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "#111", display: 'flex', justifyContent: 'space-between' }}>
                        <span>I know their size</span>
                        <input type="radio" checked={giftingData.sizingType === 'known'} readOnly style={{ accentColor: '#D4AF37' }} />
                      </div>
                      <div style={{ fontSize: "11px", color: "#666", marginTop: "4px", lineHeight: '1.3' }}>Select standard size (XS, S, M, L, XL, XXL).</div>
                    </div>

                    {giftingData.sizingType === "known" && (
                      <div className="animate-fade-in-up" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "6px", margin: "4px 0 8px 0" }}>
                        {["XS", "S", "M", "L", "XL", "XXL"].map(sz => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSelect("size", sz)}
                            style={{
                              padding: "8px 0",
                              border: giftingData.size === sz ? "2px solid #111" : "1.5px solid #eee",
                              borderRadius: "6px",
                              background: giftingData.size === sz ? "#111" : "#fff",
                              color: giftingData.size === sz ? "#fff" : "#333",
                              fontWeight: "700",
                              fontSize: "11px",
                              cursor: "pointer",
                              transition: 'all 0.15s'
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Sizing Radio 2 */}
                    <div 
                      onClick={() => handleSelect("sizingType", "contact")}
                      style={{
                        padding: "12px",
                        border: giftingData.sizingType === "contact" ? "2px solid #D4AF37" : "1.5px solid #eaeaea",
                        borderRadius: "10px",
                        cursor: "pointer",
                        background: giftingData.sizingType === "contact" ? "#fdf8ee" : "#fff",
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "#111", display: 'flex', justifyContent: 'space-between' }}>
                        <span>Stylist should contact them</span>
                        <input type="radio" checked={giftingData.sizingType === 'contact'} readOnly style={{ accentColor: '#D4AF37' }} />
                      </div>
                      <div style={{ fontSize: "11px", color: "#666", marginTop: "4px", lineHeight: '1.3' }}>We will contact the recipient discreetly to verify measurements.</div>
                    </div>

                    {giftingData.sizingType === "contact" && (
                      <div className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "4px 0" }}>
                        <input
                          type="text"
                          placeholder="Recipient Full Name"
                          value={giftingData.recipientName}
                          onChange={(e) => handleSelect("recipientName", e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #ddd", outline: "none", fontSize: "12px", boxSizing: 'border-box' }}
                        />
                        <input
                          type="text"
                          placeholder="Recipient WhatsApp / Phone"
                          value={giftingData.recipientPhone}
                          onChange={(e) => handleSelect("recipientPhone", e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #ddd", outline: "none", fontSize: "12px", boxSizing: 'border-box' }}
                        />
                      </div>
                    )}

                    <button
                      disabled={!isStepValid()}
                      onClick={handleNext}
                      style={{
                        marginTop: "8px",
                        padding: "12px",
                        background: isStepValid() ? "#1a1a1a" : "#ccc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: isStepValid() ? "pointer" : "not-allowed",
                        fontWeight: "700",
                        fontSize: "12px",
                        transition: 'background 0.2s'
                      }}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 5: Sender details and submit */}
                {step === 5 && (
                  <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', color: '#111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '700' }}>
                      Sender Details
                    </h3>
                    <p style={{ margin: '0', fontSize: '11px', color: '#777' }}>
                      Stylist will consult options directly under your name reference.
                    </p>

                    <div>
                      <label style={{ fontSize: "10px", fontWeight: "700", color: "#555", display: "block", marginBottom: "4px", textTransform: 'uppercase' }}>Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Tyson Singh"
                        value={giftingData.senderName}
                        onChange={(e) => handleSelect("senderName", e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #ddd", outline: "none", fontSize: "12px", boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "10px", fontWeight: "700", color: "#555", display: "block", marginBottom: "4px", textTransform: 'uppercase' }}>Your Phone Number (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. +91 99999 99999"
                        value={giftingData.senderPhone}
                        onChange={(e) => handleSelect("senderPhone", e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #ddd", outline: "none", fontSize: "12px", boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      disabled={!isStepValid()}
                      onClick={handleGiftingSubmit}
                      style={{
                        marginTop: "12px",
                        padding: "14px",
                        background: isStepValid() ? "linear-gradient(135deg, #D4AF37 0%, #AA8A2A 100%)" : "#ccc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: isStepValid() ? "pointer" : "not-allowed",
                        fontWeight: "700",
                        fontSize: "13px",
                        letterSpacing: "0.5px",
                        boxShadow: isStepValid() ? "0 4px 12px rgba(212,175,55,0.3)" : "none",
                        transition: 'all 0.25s'
                      }}
                    >
                      CURATE MY LUXURY GIFT
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Chatbot;