import React from "react";

// PUBLIC_INTERFACE
function Logo({ className = "", style = {} }) {
  /**
   * Renders the logo for QuickBlog.
   * Can be styled/scaled via className and/or style.
   * Uses a minimal, modern SVG for placeholder branding.
   */
  return (
    <svg
      className={className}
      style={style}
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-label="QuickBlog Logo"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      focusable="false"
    >
      <circle cx="20" cy="20" r="18" fill="#e63946" stroke="#fffafa" strokeWidth="2"/>
      <text x="50%" y="54%" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#fffafa" dy=".3em">QB</text>
    </svg>
  );
}

export default Logo;
