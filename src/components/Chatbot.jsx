import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const normalizeApiBase = (base) => base.replace(/\/+$/, '');
const buildApiUrl = (path) => {
  const normalizedBase = normalizeApiBase(API_BASE_URL);
  return `${normalizedBase}${path.startsWith('/') ? '' : '/'}${path}`;
};

const makeLinksClickable = (text) => {
  if (!text || typeof text !== 'string') return text;
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0;
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

// ─────────────────────────────────────────────────────────────────
//  IshaniFace
//  viewBox "0 0 100 100" — face is designed to bleed to all edges
//  so it fills whatever circular container it's placed in.
//  clip prop: when true, applies an internal circular clipPath
//  (used for the floating orb toggle); when false the SVG is left
//  unclipped (the parent .chatbot-avatar already clips via border-radius).
// ─────────────────────────────────────────────────────────────────
const IshaniFace = ({ size = 30, clip = false, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', borderRadius: '50%', ...style }}
    aria-hidden="true"
  >
    <defs>
      {clip && (
        <clipPath id="face-orb-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      )}
    </defs>

    <g clipPath={clip ? 'url(#face-orb-clip)' : undefined}>

      {/* ── Background / hair back mass ── */}
      <ellipse cx="50" cy="42" rx="52" ry="54" fill="#1e0f06" />

      {/* ── Long flowing hair sides ── */}
      <path d="M0 50 Q-4 75 2 100 L14 100 Q18 78 20 60 Q22 48 24 40 Z" fill="#1e0f06" />
      <path d="M100 50 Q104 75 98 100 L86 100 Q82 78 80 60 Q78 48 76 40 Z" fill="#1e0f06" />

      {/* ── Face ── */}
      <ellipse cx="50" cy="62" rx="34" ry="36" fill="#f2c497" />

      {/* face side shading */}
      <ellipse cx="17" cy="66" rx="10" ry="22" fill="rgba(190,120,70,0.12)" />
      <ellipse cx="83" cy="66" rx="10" ry="22" fill="rgba(190,120,70,0.12)" />

      {/* ── Hair top — sleek centre-part, professional ── */}
      <path d="M-2 48 Q4 10 50 4 Q96 10 102 48 Q86 28 66 26 Q58 24 50 25 Q42 24 34 26 Q14 28 -2 48 Z" fill="#2a1208" />

      {/* centre-part subtle highlight */}
      <path d="M44 5 Q50 3 56 5 Q52 18 50 21 Q48 18 44 5 Z" fill="rgba(255,210,150,0.1)" />

      {/* hair sheen */}
      <path d="M8 42 Q18 16 36 22 Q24 36 16 52 Z" fill="rgba(255,200,120,0.07)" />
      <path d="M92 42 Q82 16 64 22 Q76 36 84 52 Z" fill="rgba(255,200,120,0.07)" />

      {/* ── Low bun / chignon — top right, professional ── */}
      <path d="M46 14 Q56 6 74 9 Q84 12 86 20 Q76 28 64 26 Q54 26 48 22 Z" fill="#2a1208" />
      <ellipse cx="78" cy="16" rx="12" ry="8" fill="#3a1a0a" transform="rotate(-18 78 16)" />
      <ellipse cx="78" cy="16" rx="7"  ry="5" fill="#4e2510" transform="rotate(-18 78 16)" />
      {/* bun shine */}
      <ellipse cx="73" cy="12" rx="3.5" ry="2" fill="rgba(255,220,160,0.13)" transform="rotate(-28 73 12)" />
      {/* gold hairpin */}
      <line x1="70" y1="10" x2="86" y2="22" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="70" cy="10" r="1.6" fill="#D4AF37" />
      <circle cx="86" cy="22" r="1.2" fill="#D4AF37" />

      {/* ── Ears ── */}
      <ellipse cx="17" cy="64" rx="7" ry="9"  fill="#f2c497" />
      <ellipse cx="17" cy="64" rx="4" ry="5.5" fill="#e0a878" />
      <ellipse cx="83" cy="64" rx="7" ry="9"  fill="#f2c497" />
      <ellipse cx="83" cy="64" rx="4" ry="5.5" fill="#e0a878" />

      {/* gold drop earrings */}
      <circle cx="17" cy="71" r="2.5" fill="#D4AF37" />
      <line   x1="17" y1="73" x2="17" y2="79" stroke="#D4AF37" strokeWidth="1.2" />
      <ellipse cx="17" cy="81" rx="2.2" ry="3" fill="#D4AF37" />
      <circle cx="83" cy="71" r="2.5" fill="#D4AF37" />
      <line   x1="83" y1="73" x2="83" y2="79" stroke="#D4AF37" strokeWidth="1.2" />
      <ellipse cx="83" cy="81" rx="2.2" ry="3" fill="#D4AF37" />

      {/* ── Bindi — small elegant ── */}
      <circle cx="50" cy="46" r="2.2" fill="#D4AF37" />
      <circle cx="50" cy="46" r="1.4" fill="#cc2255" />

      {/* ── Eyebrows — groomed professional arch ── */}
      <path d="M28 54 Q37 48 46 51"  stroke="#1e0f06" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M54 51 Q63 48 72 54"  stroke="#1e0f06" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* feather layer */}
      <path d="M28 54 Q37 49 46 52"  stroke="#2a1208" strokeWidth="1"   fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M54 52 Q63 49 72 54"  stroke="#2a1208" strokeWidth="1"   fill="none" strokeLinecap="round" opacity="0.45" />

      {/* ── Eye shadow subtle ── */}
      <ellipse cx="37" cy="59" rx="12" ry="5" fill="rgba(150,90,120,0.18)" />
      <ellipse cx="63" cy="59" rx="12" ry="5" fill="rgba(150,90,120,0.18)" />

      {/* ── Eye whites ── */}
      <ellipse cx="37" cy="62" rx="11" ry="7.5" fill="white" />
      <ellipse cx="63" cy="62" rx="11" ry="7.5" fill="white" />

      {/* ── Iris ── */}
      <circle cx="37" cy="63" r="6.5" fill="#6b3d20" />
      <circle cx="63" cy="63" r="6.5" fill="#6b3d20" />
      <circle cx="37" cy="63" r="5"   fill="#4e2a12" />
      <circle cx="63" cy="63" r="5"   fill="#4e2a12" />
      {/* pupils */}
      <circle cx="37" cy="63" r="2.8" fill="#0d0600" />
      <circle cx="63" cy="63" r="2.8" fill="#0d0600" />
      {/* limbal ring */}
      <circle cx="37" cy="63" r="6.5" fill="none" stroke="#1e0f06" strokeWidth="0.6" opacity="0.55" />
      <circle cx="63" cy="63" r="6.5" fill="none" stroke="#1e0f06" strokeWidth="0.6" opacity="0.55" />

      {/* eye shines */}
      <circle cx="34"   cy="60"   r="2.2" fill="white" />
      <circle cx="60"   cy="60"   r="2.2" fill="white" />
      <circle cx="40.5" cy="66"   r="1"   fill="rgba(255,255,255,0.55)" />
      <circle cx="66.5" cy="66"   r="1"   fill="rgba(255,255,255,0.55)" />

      {/* ── Top lashes — wispy upward ── */}
      <path d="M26 58 Q27 52 30 57" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M29 56 Q30 50 33 55" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M32 55 Q33 48 37 54" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M36 54 Q37 47 41 53" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M40 54 Q42 48 45 54" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M44 55 Q46 50 48 56" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />

      <path d="M52 56 Q54 50 56 55" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M56 54 Q58 47 62 53" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M61 54 Q63 47 67 53" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M66 54 Q68 48 71 54" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M70 55 Q72 51 74 57" stroke="#0d0600" strokeWidth="1.1" fill="none" strokeLinecap="round" />

      {/* lower lashes subtle */}
      <path d="M27 68 Q28 72 29 69" stroke="#4e2a12" strokeWidth="0.6" fill="none" />
      <path d="M46 70 Q47 74 48 71" stroke="#4e2a12" strokeWidth="0.6" fill="none" />
      <path d="M52 71 Q53 75 54 72" stroke="#4e2a12" strokeWidth="0.6" fill="none" />
      <path d="M72 68 Q73 72 74 69" stroke="#4e2a12" strokeWidth="0.6" fill="none" />

      {/* ── Nose — refined small ── */}
      <path d="M45 77 Q50 81 55 77" stroke="rgba(155,90,50,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="45.5" cy="77.5" r="1.4" fill="rgba(155,90,50,0.14)" />
      <circle cx="54.5" cy="77.5" r="1.4" fill="rgba(155,90,50,0.14)" />

      {/* ── Rosy cheeks — understated ── */}
      <ellipse cx="24" cy="72" rx="13" ry="7" fill="rgba(235,145,125,0.2)" />
      <ellipse cx="76" cy="72" rx="13" ry="7" fill="rgba(235,145,125,0.2)" />

      {/* ── LIPS — very small, professional cupid's bow ── */}
      {/* upper lip */}
      <path d="M44 86 Q47.5 82.5 50 83.5 Q52.5 82.5 56 86 Q53 87.5 50 87 Q47 87.5 44 86 Z" fill="#b84d44" />
      {/* cupid bow accent */}
      <path d="M44 86 Q47.5 83 50 84 Q52.5 83 56 86" fill="none" stroke="#9a3530" strokeWidth="0.7" strokeLinecap="round" />
      {/* lower lip — slightly fuller but still small */}
      <path d="M44 86 Q47 91 50 91.5 Q53 91 56 86 Q53 87.5 50 87 Q47 87.5 44 86 Z" fill="#cc6a62" />
      {/* lip shine */}
      <ellipse cx="50" cy="88.5" rx="3.8" ry="1.3" fill="rgba(255,255,255,0.26)" />

      {/* ── Neck ── */}
      <rect x="43" y="95" width="14" height="10" rx="3" fill="#f2c497" />

      {/* ── Outfit — navy professional kurta visible at bottom ── */}
      <path d="M10 106 Q28 96 43 99 Q47 107 50 105 Q53 107 57 99 Q72 96 90 106 L100 120 L0 120 Z" fill="#1e3a5f" />
      <path d="M43 99 Q47 107 50 105 Q53 107 57 99" stroke="#D4AF37" strokeWidth="1" fill="none" />
      {/* neckline embroidery */}
      <circle cx="43.5" cy="100" r="0.9" fill="#D4AF37" />
      <circle cx="46"   cy="98.5" r="0.9" fill="#D4AF37" />
      <circle cx="50"   cy="98"   r="0.9" fill="#D4AF37" />
      <circle cx="54"   cy="98.5" r="0.9" fill="#D4AF37" />
      <circle cx="56.5" cy="100" r="0.9" fill="#D4AF37" />

    </g>
  </svg>
);

// ─────────────────────────────────────────────────────────────────

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
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
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
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'Apologies darling, I seem to have lost connection. Could you try asking me again?'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container" ref={containerRef}>
      <style>{`
        .orb-glow { animation-duration: 8s !important; }

        /* Make the toggle button show Ishani's face filling the entire orb */
        .chatbot-toggle .ishani-orb-face {
          position: absolute;
          inset: 3px;          /* sits inside the 3px dark ring (.chatbot-toggle::after) */
          z-index: 2;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* ── Toggle button ── */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Chat with Ishani"
      >
        <span className="orb-glow" />

        {isOpen ? (
          /* X icon when open */
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="#ffffff" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ zIndex: 100, position: 'relative' }}
          >
            <line x1="18" y1="6"  x2="6"  y2="18" />
            <line x1="6"  y1="6"  x2="18" y2="18" />
          </svg>
        ) : (
          /* Ishani fills the orb */
          <span className="ishani-orb-face">
            <IshaniFace size="100%" clip={true} style={{ width: '100%', height: '100%' }} />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">

          {/* ── Header ── */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <IshaniFace size={34} clip={false} />
            </div>
            <div className="chatbot-title">
              <h3>Ishani</h3>
              <span>Senior Fashion Consultant</span>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6"  x2="6"  y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message-wrapper ${message.role}`}>
                {message.role === 'model' && (
                  <div className="message-avatar">
                    <IshaniFace size={24} clip={false} />
                  </div>
                )}
                <div className={`message-bubble ${message.role}`}>
                  {makeLinksClickable(message.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-wrapper model">
                <div className="message-avatar">
                  <IshaniFace size={24} clip={false} />
                </div>
                <div className="message-bubble model typing">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2"  x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default Chatbot;