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
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const toggleChat = () => setIsOpen(prev => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        .orb-glow {
          animation-duration: 8s !important; /* Slow and soothing RGB rotation */
        }
      `}</style>
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