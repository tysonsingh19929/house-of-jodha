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
                  { label: "Spouse", icon: "💍" },
                  { label: "Mother", icon: "👩" },
                  { label: "Bride", icon: "👰" },
                  { label: "Friend", icon: "👭" },
                  { label: "Other", icon: "✏️" }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.recipient === opt.label ? "selected" : ""}`}
                    onClick={() => handleSelect("recipient", opt.label)}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.recipient === "Other" && (
                <div className="custom-input-group animate-fade-in-up">
                  <label className="custom-input-label">Specify Recipient Relationship</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sister, Daughter, Mother-in-law" 
                    className="custom-text-input"
                    value={data.recipientCustom}
                    onChange={(e) => handleSelect("recipientCustom", e.target.value)}
                  />
                </div>
              )}

              <button 
                className="gift-concierge-action-btn" 
                disabled={!isStepValid()} 
                onClick={handleNext}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 2: Occasion */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">What is the occasion?</h3>
              <p className="gift-concierge-subtitle">Celebrate in style matching the event vibe</p>
              
              <div className="options-grid">
                {[
                  { label: "Wedding", icon: "💍" },
                  { label: "Anniversary", icon: "🎉" },
                  { label: "Milestone Celebration", icon: "✨" },
                  { label: "Urgent Apology / Last-Minute", icon: "💐" },
                  { label: "Other", icon: "✏️" }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.occasion === opt.label ? "selected" : ""}`}
                    onClick={() => handleSelect("occasion", opt.label)}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.occasion === "Other" && (
                <div className="custom-input-group animate-fade-in-up">
                  <label className="custom-input-label">Specify Occasion</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mehendi Ceremony, Birthday, Baby Shower" 
                    className="custom-text-input"
                    value={data.occasionCustom}
                    onChange={(e) => handleSelect("occasionCustom", e.target.value)}
                  />
                </div>
              )}

              <button 
                className="gift-concierge-action-btn" 
                disabled={!isStepValid()} 
                onClick={handleNext}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3: Style Preference */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="gift-concierge-title">What is their style preference?</h3>
              <p className="gift-concierge-subtitle">Choose the silhouette details they love</p>
              
              <div className="options-grid">
                {[
                  { label: "Traditional Silk", icon: "🧵" },
                  { label: "Modern Minimalist", icon: "💎" },
                  { label: "Heavily Embroidered", icon: "✨" },
                  { label: "Other", icon: "✏️" }
                ].map(opt => (
                  <div 
                    key={opt.label} 
                    className={`option-card ${data.style === opt.label ? "selected" : ""}`}
                    onClick={() => handleSelect("style", opt.label)}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-label">{opt.label}</span>
                  </div>
                ))}
              </div>

              {data.style === "Other" && (
                <div className="custom-input-group animate-fade-in-up">
                  <label className="custom-input-label">Specify Style Details</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Pastel floral organza, Indo-western fusion" 
                    className="custom-text-input"
                    value={data.styleCustom}
                    onChange={(e) => handleSelect("styleCustom", e.target.value)}
                  />
                </div>
              )}

              <button 
                className="gift-concierge-action-btn" 
                disabled={!isStepValid()} 
                onClick={handleNext}
              >
                Continue
              </button>
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
                          onClick={(e) => { e.stopPropagation(); handleSelect("size", sz); }}
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
                    <div className="contact-fields-grid animate-fade-in-up" style={{ marginTop: "16px" }} onClick={(e) => e.stopPropagation()}>
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
                  )}
                </div>
              </div>

              <button 
                className="gift-concierge-action-btn" 
                disabled={!isStepValid()} 
                onClick={handleNext}
              >
                Continue
              </button>
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
