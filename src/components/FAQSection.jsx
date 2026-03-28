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
      padding: isMobile ? "40px 15px" : "60px 30px",
      background: "#fff",
      borderTop: "1px solid #e5e4e7",
      borderBottom: "1px solid #e5e4e7"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: isMobile ? "30px" : "50px", fontSize: isMobile ? "28px" : "36px", color: "#2C4F3E" }}>
        Frequently Asked Questions
      </h2>

      <div style={{
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{
            marginBottom: isMobile ? "10px" : "15px",
            border: "1px solid #e5e4e7",
            borderRadius: "8px",
            overflow: "hidden"
          }}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              style={{
                width: "100%",
                padding: isMobile ? "12px 15px" : "15px 20px",
                background: openIndex === idx ? "rgba(184, 68, 141, 0.1)" : "#f8f8f8",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "600",
                color: "#08060d",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {faq.q}
              <span style={{ fontSize: isMobile ? "16px" : "20px" }}>{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div style={{
                padding: isMobile ? "12px 15px" : "15px 20px",
                background: "#fff",
                color: "#333",
                borderTop: "1px solid #e5e4e7",
                lineHeight: "1.6",
                fontSize: isMobile ? "13px" : "14px"
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
