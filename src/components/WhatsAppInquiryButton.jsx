import { useState, useEffect } from "react";

export default function WhatsAppInquiryButton({
  message,
  label = "Inquire this",
  buttonStyle = {},
  tooltipText = "Tap for full product info",
  tooltipDuration = 4000,
  phoneNumber = "9967670497",
  onClick,
  ...props
}) {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), tooltipDuration);
    return () => clearTimeout(timer);
  }, [tooltipDuration]);

  const baseStyle = {
    position: "relative",
    width: "100%",
    padding: "10px 16px",
    background: "rgba(37, 211, 102, 0.25)",
    backdropFilter: "blur(8px)",
    color: "#000",
    border: "1px solid rgba(0, 102, 51, 0.9)",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: 700,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    boxShadow: "0 2px 6px rgba(37, 211, 102, 0.2)",
    ...buttonStyle,
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (typeof onClick === "function") {
      onClick(e);
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "rgba(37, 211, 102, 0.2)";
    e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.9)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = baseStyle.background;
    e.currentTarget.style.borderColor = baseStyle.border;
  };

  return (
    <div
      style={{
        position: "relative",
        width: baseStyle.width || "auto",
        display: "inline-flex",
      }}
      {...props}
    >
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "10px",
            background: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            padding: "6px 10px",
            borderRadius: "6px",
            pointerEvents: "none",
            opacity: showTooltip ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 12,
            border: "1px solid rgba(37, 211, 102, 0.35)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
          }}
        >
          {tooltipText}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(0, 0, 0, 0.85)",
            }}
          />
        </div>
      )}

      <button
        onClick={handleClick}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title="Inquire via WhatsApp"
        type="button"
      >
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#25D366",
            boxShadow: "0 0 8px rgba(37, 211, 102, 0.8)",
            zIndex: 10,
          }}
        />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {label}
      </button>
    </div>
  );
}
