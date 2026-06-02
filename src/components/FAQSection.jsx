import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const isMobile = window.innerWidth <= 768;

  const faqs = [
    {
      q: "What is the shipping time?",
      a: "We deliver within 7-10 business days across India and 15-20 days internationally."
    },
    {
      q: "Do you offer customization/tailoring?",
      a: "Yes! All our dresses come with free tailoring. We provide bespoke, made-to-measure services."
    },
    {
      q: "What's your return policy?",
      a: "We offer 15 days return policy for unused items in original condition."
    },
    {
      q: "Can I exchange my order?",
      a: "Yes, you can exchange within 7 days of delivery if the item has a defect."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to UK, USA, Australia, Canada, and other countries worldwide."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit/debit cards, UPI, net banking, and digital wallets."
    }
  ];

  return (
    <div style={{
      padding: isMobile ? "60px 20px" : "100px 40px",
      background: "#fff",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", textAlign: "center", marginBottom: isMobile ? "40px" : "60px", fontSize: isMobile ? "32px" : "46px", color: "#1a1a1a", fontWeight: "700" }}>
          Frequently Asked <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Questions</span>
        </h2>

        <div style={{
          display: "flex", flexDirection: "column", gap: "8px"
        }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              borderBottom: "1px solid #eaeaea",
              overflow: "hidden",
              transition: "all 0.3s ease"
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{
                  width: "100%",
                  padding: isMobile ? "20px 0" : "24px 0",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: isMobile ? "15px" : "17px",
                  fontWeight: "500",
                  color: openIndex === idx ? "#D4AF37" : "#1a1a1a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "color 0.3s"
                }}
              >
                {faq.q}
                <span style={{
                  fontSize: "24px",
                  color: openIndex === idx ? "#D4AF37" : "#999",
                  transform: openIndex === idx ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s, color 0.3s",
                  lineHeight: 1
                }}>+</span>
              </button>
              <div style={{
                maxHeight: openIndex === idx ? "200px" : "0",
                opacity: openIndex === idx ? 1 : 0,
                transition: "all 0.3s ease-in-out",
              }}>
                <p style={{
                  padding: "0 0 24px 0",
                  margin: 0,
                  color: "#666",
                  lineHeight: "1.7",
                  fontSize: isMobile ? "14px" : "15px"
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
