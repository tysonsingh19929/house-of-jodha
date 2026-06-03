import { useState, useEffect } from "react";
import "./GiftConciergeFlow.css";

export default function GiftConciergeFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Bifurcated Choice, 1: Recipient, 2: Occasion, 3: Style, 4: Sizing, 5: Contact
  const [data, setData] = useState({
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

  useEffect(() => {
    // Check if user has already made a choice in this session
    const choice = sessionStorage.getItem("gift_concierge_choice");
    if (!choice) {
      // Auto-open after a small delay on homepage
      const timer = setTimeout(() => {
        if (window.location.pathname === "/") {
          setIsOpen(true);
          setStep(0);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Listen to custom global events to open the concierge
    const handleOpenEvent = (e) => {
      setIsOpen(true);
      // If triggered explicitly, skip the bifurcated splash and start the questionnaire directly (step 1)
      if (e.detail?.direct) {
        setStep(1);
      } else {
        setStep(0);
      }
    };

    window.addEventListener("open-gift-concierge", handleOpenEvent);
    return () => {
      window.removeEventListener("open-gift-concierge", handleOpenEvent);
    };
  }, []);

  const closeFlow = () => {
    setIsOpen(false);
  };

  const handleMyself = () => {
    sessionStorage.setItem("gift_concierge_choice", "myself");
    closeFlow();
  };

  const startGifting = () => {
    sessionStorage.setItem("gift_concierge_choice", "gifting");
    setStep(1);
  };

  const handleSelect = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const isStepValid = () => {
    if (step === 1) {
      return data.recipient === "Other" ? data.recipientCustom.trim() !== "" : data.recipient !== "";
    }
    if (step === 2) {
      return data.occasion === "Other" ? data.occasionCustom.trim() !== "" : data.occasion !== "";
    }
    if (step === 3) {
      return data.style === "Other" ? data.styleCustom.trim() !== "" : data.style !== "";
    }
    if (step === 4) {
      if (data.sizingType === "known") return data.size !== "";
      if (data.sizingType === "contact") return data.recipientName.trim() !== "" && data.recipientPhone.trim() !== "";
      return false;
    }
    if (step === 5) {
      return data.senderName.trim() !== "";
    }
    return true;
  };

  const handleSubmit = () => {
    const recipientText = data.recipient === "Other" ? data.recipientCustom : data.recipient;
    const occasionText = data.occasion === "Other" ? data.occasionCustom : data.occasion;
    const styleText = data.style === "Other" ? data.styleCustom : data.style;
    
    let sizingText = "";
    if (data.sizingType === "known") {
      sizingText = `Standard Size: ${data.size}`;
    } else {
      sizingText = `Contact Recipient for Sizing\n   *Recipient Name:* ${data.recipientName}\n   *Recipient Phone:* ${data.recipientPhone}`;
    }

    const message = `*✨ THE SRINGAR HOUSE - GIFT CONCIERGE INQUIRY ✨*\n\nHello! I would like to consult with a gifting expert. Here are my preferences:\n\n👤 *Gift For:* ${recipientText}\n🎉 *Occasion:* ${occasionText}\n🎨 *Style Preference:* ${styleText}\n📏 *Sizing Selection:* ${sizingText}\n\n*Sender Details:*\n✍️ *Name:* ${data.senderName}\n📞 *Phone:* ${data.senderPhone || "Not provided"}\n\nPlease guide me with the best curated options!`;

    const phoneNumber = "9967670497"; // Consultant WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    sessionStorage.setItem("gift_concierge_choice", "completed");
    window.open(whatsappUrl, "_blank");
    closeFlow();
  };

  if (!isOpen) return null;

  return (
    <div className={`gift-concierge-overlay ${isOpen ? "active" : ""}`} onClick={closeFlow}>
      <div className="gift-concierge-container" onClick={(e) => e.stopPropagation()}>
        {/* Glowing Gold Metallic Gradient Defs */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} width="0" height="0">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="25%" stopColor="#fcf6ba" />
              <stop offset="50%" stopColor="#b38728" />
              <stop offset="75%" stopColor="#fbf5b7" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
        <button className="gift-concierge-close" onClick={closeFlow} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {step > 0 && (
          <button className="gift-concierge-back" onClick={handleBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        )}

        {step > 0 && (
          <div className="gift-concierge-progress-wrapper">
            <div className="gift-concierge-progress-text">
              <span>Gift Concierge</span>
              <span>Step {step} of 5</span>
            </div>
            <div className="gift-concierge-progress-bar">
              <div className="gift-concierge-progress-fill" style={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="gift-concierge-step-content">
          {/* STEP 0: Bifurcated Entrance */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <h2 className="gift-concierge-title" style={{ textAlign: "center", fontSize: "32px", marginBottom: "12px" }}>
                Welcome to The Sringar House
              </h2>
              <p className="gift-concierge-subtitle" style={{ textAlign: "center", marginBottom: "28px" }}>
                Select your luxury shopping experience today
              </p>
              
              <div className="bifurcated-grid">
                <div className="bifurcated-card" onClick={handleMyself}>
                  <div className="bifurcated-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="bifurcated-card-title">Shopping for Myself</h3>
                    <p className="bifurcated-card-desc">
                      Browse our standard collections of premium lehengas, sarees, and fine jewellery.
                    </p>
                  </div>
                  <button className="bifurcated-btn">Explore Catalog</button>
                </div>

                <div className="bifurcated-card gold-themed" onClick={startGifting}>
                  <div className="bifurcated-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12v10H4V12" />
                      <path d="M2 7h20v5H2z" />
                      <path d="M12 22V7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="bifurcated-card-title" style={{ color: "#D4AF37" }}>Gifting Someone Special</h3>
                    <p className="bifurcated-card-desc">
                      Let our Gift Concierge find the perfect outfit & match standard sizing directly.
                    </p>
                  </div>
                  <button className="bifurcated-btn">Launch Concierge</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Recipient */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">Who is the lucky recipient?</h3>
              <p className="gift-concierge-subtitle">Help us narrow down styles suited for them</p>
              
              <div className="options-grid">
                {[
                  { label: "Spouse", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="14" r="5" /><circle cx="16" cy="12" r="5" /><path d="M12 9a3 3 0 0 1 3 3" /><path d="M16 7l-2-2 2-2 2 2z" fill="url(#goldGradient)" /></svg> },
                  { label: "Mother", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9c0-5-4-9-9-9s-9 4-9 9a9 9 0 0 0 9 9z" /><path d="M12 7c-1.5 0-3 1.5-3 3 0 3 3 6 3 6s3-3 3-6c0-1.5-1.5-3-3-3z" /></svg> },
                  { label: "Bride", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M2 19h20L18 9l-4 5-2-7-2 7-4-5z" fill="rgba(212, 175, 55, 0.05)" /><circle cx="12" cy="4" r="1.5" fill="url(#goldGradient)" /><circle cx="6" cy="8" r="1.2" fill="url(#goldGradient)" /><circle cx="18" cy="8" r="1.2" fill="url(#goldGradient)" /><path d="M6 20a6 6 0 0 1 12 0" /></svg> },
                  { label: "Friend", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a4 4 0 0 1 4-4c2 0 4 2.5 4 4 0 1.5 2 4 4 4a4 4 0 0 0 4-4 4 4 0 0 0-4-4c-2 0-4 2.5-4 4 0 1.5-2 4-4 4a4 4 0 0 1-4-4z" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg> },
                  { label: "Other", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M15 8l-6 6M9 8h6v6" /></svg> }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.recipient === opt.label ? "selected" : ""}`}
                    onClick={() => {
                      handleSelect("recipient", opt.label);
                      if (opt.label !== "Other") {
                        setStep(2);
                      }
                    }}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.recipient === "Other" && (
                <div className="animate-fade-in-up" style={{ marginTop: "24px" }}>
                  <div className="custom-input-group">
                    <label className="custom-input-label">Specify Recipient Relationship</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sister, Daughter, Mother-in-law" 
                      className="custom-text-input"
                      value={data.recipientCustom}
                      onChange={(e) => handleSelect("recipientCustom", e.target.value)}
                    />
                  </div>
                  <button 
                    className="gift-concierge-action-btn" 
                    disabled={!isStepValid()} 
                    onClick={handleNext}
                    style={{ marginTop: "20px" }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Occasion */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">What is the occasion?</h3>
              <p className="gift-concierge-subtitle">Celebrate in style matching the event vibe</p>
              
              <div className="options-grid">
                {[
                  { label: "Wedding", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V11c0-3.9 3.1-7 7-7s7 3.1 7 7v10M9 21v-6c0-1.7 1.3-3 3-3s3 1.3 3 3v6" /></svg> },
                  { label: "Anniversary", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16.35l-1.45-1.32C9.4 10.36 6 7.28 6 3.5 6.42 1.42 8 0 10.5 0c1.74 0 3.41.81 4.5 2.09C16.09.81 17.76 0 19.5 0 22.58 0 25 2.42 25 5.5c0 3.78-3.4 6.86-8.55 11.54L15 17" /><path d="M8 21.35l-1.45-1.32C2.4 15.36 0 12.28 0 8.5 0 5.42 2.42 3 5.5 3c1.74 0 3.41.81 4.5 2.09C11.09 3.81 12.76 3 14.5 3 17.58 3 20 5.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L10 22" /></svg> },
                  { label: "Milestone Celebration", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="rgba(212, 175, 55, 0.05)" /><path d="M12 6v12M6 12h12" /></svg> },
                  { label: "Urgent Apology / Last-Minute", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /><path d="M12 2v2M12 20v2M4 12h2M18 12h2" /><path d="M16 16l-3-3" /></svg> },
                  { label: "Other", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M15 8l-6 6M9 8h6v6" /></svg> }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.occasion === opt.label ? "selected" : ""}`}
                    onClick={() => {
                      handleSelect("occasion", opt.label);
                      if (opt.label !== "Other") {
                        setStep(3);
                      }
                    }}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.occasion === "Other" && (
                <div className="animate-fade-in-up" style={{ marginTop: "24px" }}>
                  <div className="custom-input-group">
                    <label className="custom-input-label">Specify Occasion</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mehendi Ceremony, Birthday, Baby Shower" 
                      className="custom-text-input"
                      value={data.occasionCustom}
                      onChange={(e) => handleSelect("occasionCustom", e.target.value)}
                    />
                  </div>
                  <button 
                    className="gift-concierge-action-btn" 
                    disabled={!isStepValid()} 
                    onClick={handleNext}
                    style={{ marginTop: "20px" }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Style Preference */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">What is their style preference?</h3>
              <p className="gift-concierge-subtitle">Choose the silhouette details they love</p>
              
              <div className="options-grid">
                {[
                  { label: "Traditional Silk", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /><path d="M12 7v15" /></svg> },
                  { label: "Modern Minimalist", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 9l10 13 10-13z" /><path d="M2 9h20M12 2v20" /></svg> },
                  { label: "Heavily Embroidered", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" /><path d="M12 6v12M6 12h12M8.5 8.5l7 7M15.5 8.5l-7 7" /><circle cx="12" cy="12" r="3" /></svg> },
                  { label: "Other", icon: <svg viewBox="0 0 24 24" width="34" height="34" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M15 8l-6 6M9 8h6v6" /></svg> }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.style === opt.label ? "selected" : ""}`}
                    onClick={() => {
                      handleSelect("style", opt.label);
                      if (opt.label !== "Other") {
                        setStep(4);
                      }
                    }}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.style === "Other" && (
                <div className="animate-fade-in-up" style={{ marginTop: "24px" }}>
                  <div className="custom-input-group">
                    <label className="custom-input-label">Specify Style Details</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Pastel floral organza, Indo-western fusion" 
                      className="custom-text-input"
                      value={data.styleCustom}
                      onChange={(e) => handleSelect("styleCustom", e.target.value)}
                    />
                  </div>
                  <button 
                    className="gift-concierge-action-btn" 
                    disabled={!isStepValid()} 
                    onClick={handleNext}
                    style={{ marginTop: "20px" }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Sizing Details */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">Select Sizing Details</h3>
              <p className="gift-concierge-subtitle">Help us ensure an immaculate tailoring fit</p>
              
              <div className="sizing-selection-layout">
                {/* Option A: Known Size */}
                <div 
                  className={`sizing-suboption-container ${data.sizingType === "known" ? "selected" : ""}`}
                  style={{ 
                    cursor: "pointer", 
                    borderColor: data.sizingType === "known" ? "#D4AF37" : "rgba(255,255,255,0.05)",
                    background: data.sizingType === "known" ? "rgba(212, 175, 55, 0.03)" : "rgba(255,255,255,0.02)"
                  }}
                  onClick={() => handleSelect("sizingType", "known")}
                >
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input 
                      type="radio" 
                      name="sizingType" 
                      checked={data.sizingType === "known"} 
                      onChange={() => {}}
                      style={{ accentColor: "#D4AF37" }}
                    />
                    <strong style={{ fontSize: "14px" }}>I know their standard size</strong>
                  </div>
                  
                  {data.sizingType === "known" && (
                    <div className="options-grid animate-fade-in-up" style={{ marginTop: "12px", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                      {["XS", "S", "M", "L", "XL", "XXL"].map(sz => (
                        <div 
                          key={sz} 
                          className={`option-card ${data.size === sz ? "selected" : ""}`}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleSelect("size", sz); 
                            setStep(5);
                          }}
                          style={{ padding: "10px 4px", fontSize: "12px" }}
                        >
                          {sz}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Option B: Contact Recipient */}
                <div 
                  className={`sizing-suboption-container ${data.sizingType === "contact" ? "selected" : ""}`}
                  style={{ 
                    cursor: "pointer", 
                    borderColor: data.sizingType === "contact" ? "#D4AF37" : "rgba(255,255,255,0.05)",
                    background: data.sizingType === "contact" ? "rgba(212, 175, 55, 0.03)" : "rgba(255,255,255,0.02)"
                  }}
                  onClick={() => handleSelect("sizingType", "contact")}
                >
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                    <input 
                      type="radio" 
                      name="sizingType" 
                      checked={data.sizingType === "contact"} 
                      onChange={() => {}}
                      style={{ accentColor: "#D4AF37" }}
                    />
                    <strong style={{ fontSize: "14px" }}>Let concierge contact recipient for sizing</strong>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginLeft: "24px" }}>
                    We will reach out discreetly to gather size measurements without spoiling the surprise!
                  </p>

                  {data.sizingType === "contact" && (
                    <div className="animate-fade-in-up" style={{ marginTop: "16px" }}>
                      <div className="contact-fields-grid" onClick={(e) => e.stopPropagation()}>
                        <div className="custom-input-group">
                          <label className="custom-input-label">Recipient's Name</label>
                          <input 
                            type="text" 
                            placeholder="Recipient Name" 
                            className="custom-text-input"
                            value={data.recipientName}
                            onChange={(e) => handleSelect("recipientName", e.target.value)}
                          />
                        </div>
                        <div className="custom-input-group">
                          <label className="custom-input-label">Recipient's Contact (Phone)</label>
                          <input 
                            type="text" 
                            placeholder="Recipient Phone Number" 
                            className="custom-text-input"
                            value={data.recipientPhone}
                            onChange={(e) => handleSelect("recipientPhone", e.target.value)}
                          />
                        </div>
                      </div>
                      <button 
                        className="gift-concierge-action-btn" 
                        disabled={!isStepValid()} 
                        onClick={handleNext}
                        style={{ marginTop: "20px" }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Lead Capture & Submit */}
          {step === 5 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">Consultant Routing</h3>
              <p className="gift-concierge-subtitle">Enter details to connect directly on WhatsApp</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="custom-input-group">
                  <label className="custom-input-label">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="custom-text-input"
                    value={data.senderName}
                    onChange={(e) => handleSelect("senderName", e.target.value)}
                  />
                </div>
                
                <div className="custom-input-group">
                  <label className="custom-input-label">Your Phone Number (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. +91 9999999999" 
                    className="custom-text-input"
                    value={data.senderPhone}
                    onChange={(e) => handleSelect("senderPhone", e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="gift-concierge-action-btn" 
                disabled={!isStepValid()} 
                onClick={handleSubmit}
                style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Send to WhatsApp Concierge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
