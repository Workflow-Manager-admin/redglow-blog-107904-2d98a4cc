import Logo from "./Logo";

/**
 * PUBLIC_INTERFACE
 * HeroSection displays a visually rich site intro/header at the top of the homepage.
 * It includes: Logo/brand, tagline/description, and an accent call-to-action.
 * Uses a gradient background and adapts to light/dark themes.
 */
import React, { useState, useEffect } from "react";
import Logo from "./Logo";

/**
 * PUBLIC_INTERFACE
 * HeroSection displays a visually rich site intro/header at the top of the homepage.
 * It includes: Logo/brand, tagline/description, and an accent call-to-action.
 * Uses a gradient background and adapts to light/dark themes. Now has entrance animation (slide in from right).
 */
function HeroSection() {
  // Mounting logic for entrance animation (slide in from right)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Delay for smoother entrance, matching Navbar but in opposite direction
    const timeout = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={
        "hero-gradient hero-section-entrance" +
        (mounted ? " hero-section-entrance--mounted" : "")
      }
      style={{
        width: "100%",
        padding: "3.8rem 0 3.1rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 280,
        boxSizing: "border-box",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: "2.3rem",
        position: "relative",
        boxShadow: "0 4px 28px rgba(230,57,70,0.05)",
        zIndex: 1, // sits above background
        overflow: "hidden"
      }}
      aria-label="Site hero/introduction"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1050,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2.3rem",
          padding: "0 1.7rem",
          flexWrap: "wrap"
        }}
      >
        {/* Left: Logo + Branding */}
        <div style={{ flex: 2, minWidth: 240, display: "flex", flexDirection: "row", alignItems: "center", gap: "1.2rem" }}>
          <span className="quickblog-logo-group" style={{ display: "inline-flex", alignItems: "center", gap: ".8rem" }}>
            <span className="quickblog-logo-wrap">
              <Logo className="quickblog-logo" style={{ width: 48, height: 48 }} />
            </span>
            <span
              className="navbar-brand-text"
              style={{
                fontWeight: 900,
                fontSize: "2.4rem",
                letterSpacing: ".01em",
                color: "var(--text-primary)",
                userSelect: "none",
                textShadow: "0 0.5px 10px #ffe2e2, 0 1px 1px rgba(44,44,53,.18)"
              }}
            >
              EchoPages
            </span>
          </span>
        </div>
        {/* Center: Tagline/Description */}
        <div
          style={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: 530,
            minWidth: 200,
            gap: "1rem"
          }}
        >
          <h1 style={{
            fontSize: "2.1rem",
            fontWeight: 800,
            margin: 0,
            color: "#e63946",
            letterSpacing: ".01em",
            lineHeight: 1.13
          }}>
            Welcome to EchoPages
          </h1>
          <p style={{
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            opacity: 0.88,
            margin: "0.35rem 0 0.1rem 0"
          }}>
            A modern blog for <span style={{ color: "#e63946", fontWeight: 700 }}>insightful reads</span>
            &nbsp;on tech, life, and finance. Minimal.<span style={{color:"#e63946",fontWeight:600}}> Clean.</span> Engaging.
          </p>
          {/* CTA Button */}
          <a
            href="#blog-grid"
            style={{
              marginTop: 12,
              background: "#e63946",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.12rem",
              padding: "0.72em 2.5em",
              borderRadius: 24,
              border: "none",
              textDecoration: "none",
              boxShadow: "0 2px 13px rgba(230,57,70,0.13)",
              letterSpacing: ".01em",
              transition: "background 0.19s, box-shadow 0.17s",
              display: "inline-block",
              cursor: "pointer"
            }}
            aria-label="Scroll to blog grid"
          >
            Start Reading →
          </a>
        </div>
        {/* Right: Accent Illustration or Visual */}
        <div
          style={{
            flex: 2.6,
            minWidth: 180,
            maxWidth: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          aria-hidden="true"
        >
          {/* Accent SVG Illustration / Placeholder */}
          <svg
            viewBox="0 0 130 130"
            width={120}
            height={120}
            aria-hidden="true"
            focusable="false"
            style={{ display: "block", filter: "drop-shadow(0 2px 8px #e6394633)" }}
          >
            <defs>
              <linearGradient id="accent-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e63946" />
                <stop offset="75%" stopColor="#ffb3b3" />
              </linearGradient>
            </defs>
            <ellipse cx="68" cy="70" rx="53" ry="46" fill="url(#accent-grad)" opacity="0.12"/>
            <circle cx="65" cy="55" r="37" fill="#e63946" opacity="0.24"/>
            <rect x="44" y="38" rx="10" width="43" height="55" fill="#fff" stroke="#e63946" strokeWidth="3"/>
            <rect x="53" y="47" rx="3" width="25" height="6.5" fill="#e63946" opacity="0.13"/>
            <rect x="53" y="57" rx="1.8" width="22" height="4" fill="#e63946" opacity="0.09"/>
            <rect x="53" y="65" rx="2.4" width="30" height="5" fill="#e63946" opacity="0.11"/>
            <rect x="53" y="74" rx="2.2" width="16" height="4" fill="#e63946" opacity="0.07"/>
            <rect x="53" y="82.5" rx="1.8" width="30" height="4" fill="#e63946" opacity="0.10"/>
            <rect x="45" y="101" rx="8" width="40" height="7" fill="#e63946" opacity="0.09"/>
          </svg>
        </div>
      </div>
      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 870px) {
            .hero-gradient > div {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 1.3rem !important;
            }
            .hero-gradient { padding: 2.2rem 0 2rem 0 !important; min-height: 180px !important; }
          }
          @media (max-width: 560px) {
            .hero-gradient {
              padding: 1.0rem 0 1.7rem 0 !important;
              border-bottom-left-radius: 18px !important;
              border-bottom-right-radius: 18px !important;
            }
            .navbar-brand-text { font-size: 1.21rem !important; }
          }
        `}
      </style>
    </section>
  );
}

export default HeroSection;
