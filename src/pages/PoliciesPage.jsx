import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function PoliciesPage({ cartCount, onCartClick, cartOpen, cartItems, removeFromCart }) {
  const { policy } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const policies = {
    privacy: {
      title: "Privacy Policy",
      content: `At House of Jodha, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information.

Information We Collect:
- Personal identification information (name, email address, phone number)
- Payment and billing information
- Shipping and delivery information
- Communication preferences and order history

How We Use Your Information:
- To process and fulfill your orders
- To improve our services and user experience
- To send promotional offers and updates (with your consent)
- To resolve disputes and enforce agreements
- To comply with legal obligations

Data Security:
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

Contact Us:
If you have any questions about our privacy practices, please contact us at privacy@houseofjodha.com`
    },
    shipping: {
      title: "Shipping Information",
      content: `Delivery & Shipping Policy

Shipping Locations:
We ship to all major cities in India and selected international locations.

Shipping Duration:
- Standard Shipping: 5-7 business days
- Express Shipping: 2-3 business days
- Premium Shipping: 1 business day

Shipping Costs:
- Orders above ₹5000: FREE Shipping
- Orders below ₹5000: ₹200 shipping charge

Tracking:
You will receive a tracking number via email once your order ships. You can track your package on our website.

Delivery Issues:
In case of delivery delays or issues, please contact our customer support team at support@houseofjodha.com

Note:
Please provide accurate delivery address to avoid any delays. Customs duties may apply for international orders.`
    },
    returns: {
      title: "Returns & Exchange Policy",
      content: `Return & Exchange Policy

Return Eligibility:
- Returns must be initiated within 15 days of delivery
- Items must be in original condition with all tags attached
- Garments must not have been worn or washed
- Original receipt or order confirmation is required

How to Return:
1. Contact customer support at support@houseofjodha.com
2. Provide your order number and return reason
3. We will provide you with a return shipping label
4. Ship the item back to us via the provided label

Return Processing:
- Returns are processed within 5-7 business days of receipt
- Refunds are credited to the original payment method
- A restocking fee of 10% may apply if item condition is compromised

Exchanges:
We offer free exchanges for size or color variations within 30 days of purchase.

Damaged or Defective Items:
If you receive a damaged or defective item, please report it within 24 hours for a full refund or replacement.`
    },
    terms: {
      title: "Terms & Conditions",
      content: `Terms & Conditions of Use

Acceptance of Terms:
By accessing and using the House of Jodha website and services, you accept and agree to be bound by the terms and conditions herein.

Use License:
Permission is granted to temporarily download and view one copy of the materials for personal, non-commercial transitory viewing only.

Disclaimer:
The materials on House of Jodha's website are provided on an 'as is' basis. House of Jodha makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Limitations of Liability:
In no event shall House of Jodha or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on House of Jodha's website.

Modifications to Terms:
House of Jodha may revise these terms of use at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.

Governing Law:
These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`
    }
  };

  const policyData = policies[policy];

  if (!policyData) {
    return <div>Policy not found</div>;
  }

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={() => onCartClick?.()} />
      )}      <div style={{ padding: isMobile ? "20px" : "40px 30px", maxWidth: "900px", margin: "0 auto" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ padding: "8px 16px", background: "#D4AF37", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
        >
          ← Back to Home
        </button>
        
        <h1 style={{ color: "#2C4F3E", fontSize: isMobile ? "24px" : "32px", marginBottom: "30px" }}>
          {policyData.title}
        </h1>

        <div style={{
          background: "#f9f9f9",
          padding: isMobile ? "20px" : "30px",
          borderRadius: "8px",
          lineHeight: "1.8",
          color: "#333",
          fontSize: isMobile ? "13px" : "14px",
          whiteSpace: "pre-wrap"
        }}>
          {policyData.content}
        </div>

        <div style={{
          marginTop: "40px",
          padding: "20px",
          background: "rgba(212, 175, 55, 0.1)",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <p style={{ margin: "0 0 15px 0", color: "#666" }}>
            Have questions about our policies?
          </p>
          <a href="mailto:support@houseofjodha.com" style={{
            padding: "10px 20px",
            background: "#D4AF37",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "600",
            display: "inline-block"
          }}>
            Contact Support
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
