import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
export default function PoliciesPage({
  cartCount, onCartClick, cartOpen, cartItems, removeFromCart
}) {
  const { policy } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [policy]);

  const policyContent = {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "April 2026",
      intro: "At The Sringar House, we value your privacy. This policy outlines how we handle your data:",
      sections: [
        { subtitle: "Information Collection", text: "We collect your name, contact details, and shipping address when you place an order or chat with Ishani, our AI assistant." },
        { subtitle: "Use of Data", text: "Your data is used solely to process orders, provide fashion consultations, and improve your shopping experience." },
        { subtitle: "Third-Party Sharing", text: "We do not sell your data. We only share necessary info with shipping partners (like BlueDart/Delhivery) and payment processors." },
        { subtitle: "Cookies", text: "Our website uses cookies to remember your cart and preferences." }
      ]
    },
    shipping: {
      title: "Shipping Info",
      tagline: "Delivering Elegance to Your Doorstep",
      sections: [
        { subtitle: "Processing Time", text: "All orders are processed within 2-3 business days. For custom-stitched lehengas or heavy ethnic wear, please allow 7-10 business days." },
        { subtitle: "Domestic Shipping", text: "We offer pan-India shipping. Delivery typically takes 5-7 business days after dispatch." },
        { subtitle: "Shipping Charges", text: "Free shipping on all orders above ₹4,999. For orders below this, a flat fee of ₹150 applies." },
        { subtitle: "Tracking", text: "Once dispatched, a tracking link will be sent to your registered email and phone number." }
      ]
    },
    returns: {
      title: "Returns & Exchange Policy",
      tagline: "Our Goal is Your Perfection",
      sections: [
        { subtitle: "Return Window", text: "We accept returns within 7 days of delivery." },
        { subtitle: "Eligibility", text: "Items must be unworn, unwashed, and in original packaging with all tags attached." },
        { subtitle: "Non-Returnable Items", text: "Due to hygiene and customization, stitched blouses, custom-fitted lehengas, and jewelry are not eligible for return." },
        { subtitle: "Refund Process", text: "Once we receive and inspect the item, your refund will be processed to the original payment method within 7-10 business days." },
        { subtitle: "Exchanges", text: "If you have a sizing issue, we offer a one-time free exchange for the same product in a different size." }
      ]
    },
    terms: {
      title: "Terms & Conditions",
      tagline: "Welcome to The Sringar House",
      intro: "By using thesringarhouse.com, you agree to the following:",
      sections: [
        { subtitle: "Product Accuracy", text: "We strive to show the most accurate colors of our fabrics. However, due to digital screen variations, slight color differences may occur." },
        { subtitle: "Pricing", text: "All prices listed are in INR and include applicable GST." },
        { subtitle: "Order Cancellation", text: "Orders can be cancelled within 24 hours of placement. Post-dispatch cancellations are not permitted." },
        { subtitle: "Intellectual Property", text: "All designs, images, and content on this site are the property of The Sringar House." },
        { subtitle: "Jurisdiction", text: "Any legal disputes are subject to the courts of Thane/Mumbai." }
      ]
    }
  };

  const currentPolicy = policyContent[policy];

  if (!currentPolicy) {
    return (
      <div style={{ background: "#FAFAFA", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
        <Navbar cartCount={cartCount} onCartClick={onCartClick} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#1a1a1a" }}>Policy Not Found</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 24px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Return Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      {cartOpen && (
        <Cart items={cartItems} onRemove={removeFromCart} onClose={onCartClick} />
      )}

      <div style={{ flex: 1, padding: isMobile ? "100px 20px 60px" : "140px 40px 80px", maxWidth: "800px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ background: "#fff", padding: isMobile ? "30px 20px" : "60px 50px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid #eaeaea" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "48px", color: "#1a1a1a", margin: "0 0 10px", fontWeight: "700" }}>
              {currentPolicy.title}
            </h1>
            {currentPolicy.tagline && <p style={{ color: "#D4AF37", fontSize: "16px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>{currentPolicy.tagline}</p>}
            {currentPolicy.lastUpdated && <p style={{ color: "#999", fontSize: "14px", marginTop: "10px" }}>Last Updated: {currentPolicy.lastUpdated}</p>}
            <div style={{ width: "60px", height: "2px", background: "#D4AF37", margin: "20px auto 0" }} />
          </div>

          {currentPolicy.intro && (
            <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.8", marginBottom: "30px" }}>
              {currentPolicy.intro}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {currentPolicy.sections.map((section, idx) => (
              <div key={idx}>
                {section.subtitle && <h3 style={{ fontSize: "18px", color: "#1a1a1a", marginBottom: "8px", fontWeight: "600" }}>{section.subtitle}</h3>}
                <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", margin: 0 }}>{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}