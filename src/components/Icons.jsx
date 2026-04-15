import React from 'react';

// Common base style for all icons
const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: { display: "inline-block", verticalAlign: "middle" }
};

export const SparklesIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M9 3v2M12 2l-1 2-2-1 1-2 2 1zM21 16l-1.5-1.5L21 13l-1.5 1.5L18 13l1.5 1.5L18 16l1.5-1.5L21 16zM15 11l-3-3m0 0L9 5M12 8L9 5m3 3l3-3m-3 3v8m0 0l3 3m-3-3l-3 3"></path>
    <path d="m14 14-6-6M9 14l5-5"></path>
    <path d="M12 2v2"></path>
    <path d="M3 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
    <path d="m10.5 7.5-1-1"></path>
    <path d="m14.5 10.5-1-1"></path>
  </svg>
); // Just a simple sparkle representation

export const SimpleSparkleIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
    <path d="M22 3h1v1h-1z"></path>
    <path d="M4 3h1v1H4z"></path>
  </svg>
);

export const StarIcon = ({ size = "1em", color = "currentColor", fill = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} fill={fill} style={{ ...defaultProps.style, ...style }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const HandWaveIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M18 11V6a2 2 0 0 0-4 0v5"></path>
    <path d="M14 10V4a2 2 0 0 0-4 0v6"></path>
    <path d="M10 10.5V3a2 2 0 0 0-4 0v9"></path>
    <path d="M6 14v-2a2 2 0 0 0-4 0v5.5C2 19.4 3.6 21 5.5 21h6c3.6 0 6.5-2.9 6.5-6.5V13a2 2 0 0 0-4 0v1"></path>
  </svg>
);

export const ShoppingBagIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
    <path d="M3 6h18"></path>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export const WarningIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

export const EditIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
    <path d="m15 5 4 4"></path>
  </svg>
);

export const TrashIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

export const CrownIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="m2 4 3 12h14l3-12-6 7-4-11-4 11z"></path>
    <path d="M5 22h14M2 4l3 12h14l3-12-6 7-4-11-4 11zM10 22h4"></path>
  </svg>
);

export const ScissorsIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>
);

export const HeartIcon = ({ size = "1em", color = "currentColor", fill = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} fill={fill} style={{ ...defaultProps.style, ...style }}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

export const DressIcon = ({ size = "1em", color = "currentColor", style }) => (
  <svg {...defaultProps} width={size} height={size} stroke={color} style={{ ...defaultProps.style, ...style }}>
    <path d="M9 2v4a3 3 0 0 0 6 0V2"></path>
    <path d="M15 2h3a2 2 0 0 1 2 2v5L16 6"></path>
    <path d="M9 2H6a2 2 0 0 0-2 2v5l4-3"></path>
    <path d="M8 8V6"></path>
    <path d="M16 8V6"></path>
    <path d="M6 10l-2 11c-.3 1.6 1 3 2.7 3h10.6c1.7 0 3-1.4 2.7-3L18 10"></path>
  </svg>
);
