import { useState } from "react";

export default function SizeChart({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("standard");

  if (!isOpen) return null;

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
      padding: isMobile ? "20px" : "0"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "8px",
        maxHeight: "90vh",
        overflow: "auto",
        maxWidth: isMobile ? "100%" : "800px",
        width: "100%",
        position: "relative"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 100
        }}>
          <h2 style={{ margin: "0", fontSize: "24px", color: "#333" }}>Size Guide</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid #eee",
          padding: "0 20px"
        }}>
          <button
            onClick={() => setActiveTab("standard")}
            style={{
              background: "none",
              border: "none",
              padding: "15px 20px",
              fontSize: "14px",
              fontWeight: activeTab === "standard" ? "600" : "500",
              color: activeTab === "standard" ? "#D4AF37" : "#666",
              borderBottom: activeTab === "standard" ? "2px solid #D4AF37" : "none",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            Standard Sizes
          </button>
          <button
            onClick={() => setActiveTab("measurements")}
            style={{
              background: "none",
              border: "none",
              padding: "15px 20px",
              fontSize: "14px",
              fontWeight: activeTab === "measurements" ? "600" : "500",
              color: activeTab === "measurements" ? "#D4AF37" : "#666",
              borderBottom: activeTab === "measurements" ? "2px solid #D4AF37" : "none",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            Measurements
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "30px 20px" }}>
          {activeTab === "standard" && (
            <div>
              <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#333", fontWeight: "600" }}>
                Indian Standard Size Chart
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px"
                }}>
                  <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                      <th style={{ padding: "12px 10px", textAlign: "left", borderBottom: "2px solid #ddd", fontWeight: "600" }}>Size</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", borderBottom: "2px solid #ddd", fontWeight: "600" }}>Bust (in)</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", borderBottom: "2px solid #ddd", fontWeight: "600" }}>Waist (in)</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", borderBottom: "2px solid #ddd", fontWeight: "600" }}>Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "XXXS", bust: "28", waist: "24", hip: "30" },
                      { size: "XXS", bust: "30", waist: "26", hip: "32" },
                      { size: "XS", bust: "32", waist: "28", hip: "34" },
                      { size: "S", bust: "34", waist: "30", hip: "36" },
                      { size: "M", bust: "36", waist: "32", hip: "38" },
                      { size: "L", bust: "38", waist: "34", hip: "40" },
                      { size: "XL", bust: "40", waist: "36", hip: "42" },
                      { size: "2XL", bust: "42", waist: "38", hip: "44" },
                      { size: "3XL", bust: "44", waist: "40", hip: "46" }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{
                          padding: "12px 10px",
                          fontWeight: "600",
                          color: "#D4AF37"
                        }}>
                          {row.size}
                        </td>
                        <td style={{ padding: "12px 10px", color: "#666" }}>{row.bust}</td>
                        <td style={{ padding: "12px 10px", color: "#666" }}>{row.waist}</td>
                        <td style={{ padding: "12px 10px", color: "#666" }}>{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "4px",
                marginTop: "20px",
                fontSize: "12px",
                color: "#666",
                lineHeight: "1.6"
              }}>
                <strong>Note:</strong> All measurements are in inches. For best fit, we recommend getting your dress tailored. Our maximum standard stitching size is up to 46 inches bust. For sizes beyond this, please select "Custom Fit" option.
              </div>
            </div>
          )}

          {activeTab === "measurements" && (
            <div>
              <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#333", fontWeight: "600" }}>
                How to Measure
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "25px"
              }}>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    📏 Bust
                  </h4>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", margin: "0" }}>
                    Measure around the fullest part of your chest. Keep the measuring tape loose and comfortable against your skin.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    📏 Waist
                  </h4>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", margin: "0" }}>
                    Measure around the skinniest part of your waist. Keep the tape snug but not tight.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    📏 Hip
                  </h4>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", margin: "0" }}>
                    Measure around the fullest part of your hips and bottom. Keep the tape parallel to the ground.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    📏 Length
                  </h4>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", margin: "0" }}>
                    For traditional outfits, measure from shoulder to the desired length (typically ankle length for lehengas).
                  </p>
                </div>
              </div>

              <div style={{
                background: "#fef3e6",
                padding: "15px",
                borderRadius: "4px",
                marginTop: "30px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.8"
              }}>
                <strong style={{ color: "#D4AF37" }}>💡 Tips for Perfect Fit:</strong>
                <ul style={{ margin: "10px 0 0 20px", paddingLeft: "0" }}>
                  <li>Wear the undergarments you'll wear with the outfit</li>
                  <li>Ask someone to help you measure for accuracy</li>
                  <li>Use a soft measuring tape, not a rigid ruler</li>
                  <li>Add 1-2 inches for comfort in the bust and waist</li>
                  <li>Our expert tailors can customize any outfit to your exact measurements</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
