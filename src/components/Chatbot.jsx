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

const ISHANI_AVATAR = "https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&w=150&h=150&q=80";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(buildApiUrl('/chat/message'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
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

  return (
    <div className="chatbot-container" ref={containerRef}>
      <style>{`
        .chatbot-toggle {
          overflow: visible !important;
        }
        .orb-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: #D4AF37;
          box-shadow: 0 0 20px 8px rgba(212, 175, 55, 0.6);
          z-index: 1;
          animation: pulseOrb 2.5s ease-in-out infinite alternate !important;
          pointer-events: none;
        }
        @keyframes pulseOrb {
          0% { transform: scale(1); opacity: 0.6; filter: blur(4px); }
          100% { transform: scale(1.15); opacity: 1; filter: blur(8px); }
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
            <p>Looking for a specific outfit? I know every piece in our collection. Let me help you find your perfect match!</p>
          </div>
        </div>
      )}

      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Chat with Ishani"
      >
        <span className="orb-glow" />
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 100, position: "relative" }}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <img src={ISHANI_AVATAR} alt="Chat with Ishani" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', zIndex: 100, position: 'relative', border: '2px solid #D4AF37' }} />
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img src={ISHANI_AVATAR} alt="Ishani" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div className="chatbot-title">
              <h3>Ishani</h3>
              <span>Senior Fashion Consultant</span>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message-wrapper ${message.role}`}>
                {message.role === 'model' && (
                  <div className="message-avatar">
                    <img src={ISHANI_AVATAR} alt="Ishani" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className={`message-bubble ${message.role}`}>{makeLinksClickable(message.text)}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper model">
                <div className="message-avatar">
                  <img src={ISHANI_AVATAR} alt="Ishani" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
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
        </div>
      )}
    </div>
  );
};

export default Chatbot;