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
//  IshaniFace — modern cute girl avatar, scales via `size` prop
// ─────────────────────────────────────────────────────────────────
const IshaniFace = ({ size = 30, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 115"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', ...style }}
    aria-hidden="true"
  >
    {/* ── Hair back / flowing sides ── */}
    <path d="M18 44 Q14 62 13 80 Q16 92 22 98 Q26 86 28 74 Q30 60 33 50 Z" fill="#2c1a0e"/>
    <path d="M82 44 Q86 62 87 80 Q84 92 78 98 Q74 86 72 74 Q70 60 67 50 Z" fill="#2c1a0e"/>
    <ellipse cx="50" cy="48" rx="36" ry="38" fill="#2c1a0e"/>

    {/* ── Face ── */}
    <ellipse cx="50" cy="60" rx="28" ry="29" fill="#f9d4b0"/>
    <ellipse cx="24" cy="64" rx="7" ry="16" fill="rgba(200,130,80,0.15)"/>
    <ellipse cx="76" cy="64" rx="7" ry="16" fill="rgba(200,130,80,0.15)"/>

    {/* ── Hair top with soft side-swept bangs ── */}
    <path d="M14 48 Q18 18 50 14 Q82 18 86 48 Q72 34 58 33 Q50 31 42 33 Q28 34 14 48 Z" fill="#3d2410"/>
    <path d="M14 48 Q28 28 46 31 Q38 40 30 50 Q22 56 16 62 Z" fill="#4a2c14"/>
    <path d="M18 50 Q30 33 44 32 Q37 42 28 52 Q22 58 18 63 Z" fill="#5c3a1e"/>
    <path d="M44 15 Q50 13 56 15 Q52 24 50 26 Q48 24 44 15 Z" fill="rgba(255,220,160,0.15)"/>

    {/* ── Half-up scrunchie + mini bun ── */}
    <path d="M46 22 Q54 17 65 19 Q70 20 72 24 Q65 28 58 28 Q52 29 48 32 Z" fill="#3d2410"/>
    <ellipse cx="68" cy="22" rx="7" ry="4" fill="#4a2c14" transform="rotate(-25 68 22)"/>
    <ellipse cx="62" cy="19" rx="6" ry="3" fill="#f472b6" transform="rotate(-40 62 19)"/>
    <ellipse cx="74" cy="23" rx="6" ry="3" fill="#f472b6" transform="rotate(-40 74 23)"/>
    <circle cx="68" cy="21" r="2.5" fill="#ec4899"/>

    {/* ── Ears ── */}
    <ellipse cx="23" cy="61" rx="5" ry="6.5" fill="#f9d4b0"/>
    <ellipse cx="23" cy="61" rx="3" ry="4"   fill="#f0b88a"/>
    <ellipse cx="77" cy="61" rx="5" ry="6.5" fill="#f9d4b0"/>
    <ellipse cx="77" cy="61" rx="3" ry="4"   fill="#f0b88a"/>
    <circle cx="23" cy="66" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="1.2"/>
    <circle cx="77" cy="66" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="1.2"/>

    {/* ── Bindi ── */}
    <circle cx="50" cy="46" r="1.5" fill="#D4AF37"/>
    <circle cx="50" cy="46" r="0.9" fill="#ff3366"/>

    {/* ── Eyebrows ── */}
    <path d="M34 53 Q40 49 47 51" stroke="#2c1a0e" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M53 51 Q60 49 66 53" stroke="#2c1a0e" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

    {/* ── Eyes ── */}
    <ellipse cx="40" cy="57" rx="8"  ry="4" fill="rgba(180,120,160,0.18)"/>
    <ellipse cx="60" cy="57" rx="8"  ry="4" fill="rgba(180,120,160,0.18)"/>
    <ellipse cx="40" cy="59" rx="7.5" ry="5.5" fill="white"/>
    <ellipse cx="60" cy="59" rx="7.5" ry="5.5" fill="white"/>
    <circle cx="40" cy="60" r="4.5" fill="#7b4a2d"/>
    <circle cx="60" cy="60" r="4.5" fill="#7b4a2d"/>
    <circle cx="40" cy="60" r="3.2" fill="#5c3317"/>
    <circle cx="60" cy="60" r="3.2" fill="#5c3317"/>
    <circle cx="40" cy="60" r="1.8" fill="#120800"/>
    <circle cx="60" cy="60" r="1.8" fill="#120800"/>
    <circle cx="37.5" cy="57.5" r="1.4" fill="white"/>
    <circle cx="57.5" cy="57.5" r="1.4" fill="white"/>
    <circle cx="42"   cy="62"   r="0.7" fill="rgba(255,255,255,0.65)"/>
    <circle cx="62"   cy="62"   r="0.7" fill="rgba(255,255,255,0.65)"/>

    {/* ── Lashes ── */}
    <path d="M33 56 Q34 52 36 55" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M36 54 Q37 50 39 53" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M39 53 Q40 49 42 53" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M42 53 Q44 49 46 53" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M45 54 Q47 51 48 55" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M52 55 Q54 51 55 54" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M55 53 Q57 49 59 53" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M59 53 Q61 49 63 53" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M63 54 Q65 50 67 54" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    <path d="M66 55 Q68 52 69 56" stroke="#120800" strokeWidth="0.85" fill="none" strokeLinecap="round"/>

    {/* ── Nose (tiny button) ── */}
    <path d="M47 70 Q50 73 53 70" stroke="rgba(180,100,60,0.32)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <circle cx="47.5" cy="70.5" r="1"  fill="rgba(180,100,60,0.18)"/>
    <circle cx="52.5" cy="70.5" r="1"  fill="rgba(180,100,60,0.18)"/>

    {/* ── Rosy cheeks ── */}
    <ellipse cx="30" cy="68" rx="9" ry="5.5" fill="rgba(255,150,130,0.28)"/>
    <ellipse cx="70" cy="68" rx="9" ry="5.5" fill="rgba(255,150,130,0.28)"/>

    {/* ── Lips — small cupid's bow ── */}
    <path d="M44 77 Q47 74 50 75.5 Q53 74 56 77 Q53 78.5 50 78 Q47 78.5 44 77 Z" fill="#d4635a"/>
    <path d="M44 77 Q47 74.5 50 76 Q53 74.5 56 77" fill="none" stroke="#b84d44" strokeWidth="0.6"/>
    <path d="M44 77 Q47 82 50 82.5 Q53 82 56 77 Q53 78.5 50 78 Q47 78.5 44 77 Z" fill="#e8887a"/>
    <ellipse cx="50" cy="79.5" rx="3" ry="1.3" fill="rgba(255,255,255,0.3)"/>

    {/* ── Neck ── */}
    <rect x="44" y="85" width="12" height="10" rx="3" fill="#f9d4b0"/>

    {/* ── Outfit ── */}
    <path d="M28 93 Q37 87 44 89 Q47 95 50 94 Q53 95 56 89 Q63 87 72 93 L76 115 L24 115 Z" fill="#7c3aed"/>
    <path d="M28 93 Q37 87 44 89 Q47 95 50 94 Q53 95 56 89 Q63 87 72 93" stroke="#D4AF37" strokeWidth="1" fill="none"/>
    <circle cx="44.5" cy="90" r="0.8" fill="#D4AF37"/>
    <circle cx="47"   cy="88" r="0.8" fill="#D4AF37"/>
    <circle cx="50"   cy="87.5" r="0.8" fill="#D4AF37"/>
    <circle cx="53"   cy="88" r="0.8" fill="#D4AF37"/>
    <circle cx="55.5" cy="90" r="0.8" fill="#D4AF37"/>
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
        body: JSON.stringify({ message: userMessage.text, history: messages.map(m => ({ role: m.role, text: m.text })) })
      });
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Apologies darling, I seem to have lost connection. Could you try asking me again?' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container" ref={containerRef}>
      <style>{`.orb-glow { animation-duration: 8s !important; }`}</style>

      <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat} aria-label="Chat with Ishani">
        <span className="orb-glow" />
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 100, position: 'relative' }}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <IshaniFace size={36} style={{ zIndex: 100, position: 'relative' }} />
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar"><IshaniFace size={30} /></div>
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
                  <div className="message-avatar"><IshaniFace size={24} /></div>
                )}
                <div className={`message-bubble ${message.role}`}>{makeLinksClickable(message.text)}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper model">
                <div className="message-avatar"><IshaniFace size={24} /></div>
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