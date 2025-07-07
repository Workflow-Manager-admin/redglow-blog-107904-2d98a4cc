import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Footer: Responsive, accessible footer for every page.
 * Left: Logo, site name, description, social icons.
 * Right: Link groups (e.g., Links and Tags).
 */
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        marginTop: 0,
        padding: "2.4rem 0 1.5rem 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        fontSize: "1.04rem",
        letterSpacing: ".01em",
        display: "flex",
        justifyContent: "center",
      }}
      role="contentinfo"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1150,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "2.4rem",
        }}
      >
        {/* Left Side: Logo, name, desc, socials */}
        <section
          style={{
            flex: 2,
            minWidth: 230,
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
          }}
        >
          {/* Logo + Site name */}
          <Link
            to="/"
            aria-label="Back to homepage"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              textDecoration: "none",
              marginBottom: "0.3rem",
            }}
            className="footer-logo-link"
          >
            <Logo className="quickblog-logo" style={{ width: 32, height: 32 }} />
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "var(--text-primary)",
                letterSpacing: ".01em",
                textShadow:
                  "0 1px 6px #f3d8d8, 0 1px 4px rgba(44,44,53,.11)",
              }}
              className="footer-brand-text"
            >
              EchoPages
            </span>
          </Link>
          {/* Description */}
          <div
            style={{
              color: "var(--text-primary)",
              opacity: 0.82,
              fontSize: "1.08rem",
              marginBottom: "0.25rem",
              maxWidth: 285,
            }}
          >
            A modern blog for insightful reads on tech, life, and finance. Minimal. Clean. <span style={{ color: "#e63946", fontWeight: 600 }}>Engaging.</span>
          </div>
          {/* Social icons */}
          <nav
            aria-label="Social media"
            style={{ display: "flex", gap: 12, marginTop: 1 }}
          >
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              style={iconBtnStyle}
            >
              <span role="img" aria-label="Twitter">
                🐦
              </span>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={iconBtnStyle}
            >
              <span role="img" aria-label="Facebook">
                📘
              </span>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={iconBtnStyle}
            >
              <span role="img" aria-label="LinkedIn">
                💼
              </span>
            </a>
            <a
              href="mailto:hello@echopages.com"
              aria-label="Contact email"
              style={iconBtnStyle}
            >
              <span role="img" aria-label="Email">
                ✉️
              </span>
            </a>
          </nav>
        </section>
        {/* Right Side: Links and Tags */}
        <nav
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "2.2rem",
            minWidth: 240,
          }}
          aria-label="Footer navigation"
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              minWidth: 110,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <li
              style={{
                fontWeight: 700,
                color: "#e63946",
                marginBottom: 3,
                letterSpacing: ".01em",
                fontSize: "1.09rem",
              }}
            >
              Links
            </li>
            <li>
              <Link to="/" style={footerLinkStyle}>
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/blog" style={footerLinkStyle}>
                Blog
              </Link>
            </li>
          </ul>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              minWidth: 110,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <li
              style={{
                fontWeight: 700,
                color: "#e63946",
                marginBottom: 3,
                letterSpacing: ".01em",
                fontSize: "1.09rem",
              }}
            >
              Tags
            </li>
            <li>
              <Link to="/" style={footerLinkStyle}>
                All
              </Link>
            </li>
            <li>
              <Link to="/?tag=Tech" style={footerLinkStyle}>
                Tech
              </Link>
            </li>
            <li>
              <Link to="/?tag=LifeStyle" style={footerLinkStyle}>
                LifeStyle
              </Link>
            </li>
            <li>
              <Link to="/?tag=Finance" style={footerLinkStyle}>
                Finance
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Responsive CSS (in js, can be moved to css for production) */}
      <style>
        {`
        @media (max-width: 830px) {
          footer > div {
            flex-direction: column !important;
            gap: 1.6rem !important;
            align-items: flex-start !important;
          }
          footer nav[aria-label="Footer navigation"] {
            justify-content: flex-start !important;
            gap: 1.35rem !important;
          }
        }
        @media (max-width: 500px) {
          .footer-logo-link .footer-brand-text {
            font-size: 1.01rem !important;
          }
          footer ul {
            min-width: 70px !important;
          }
        }
      `}
      </style>
    </footer>
  );
}

// Styles
const iconBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#e63946",
  color: "#fff",
  width: 34,
  height: 34,
  borderRadius: "50%",
  fontSize: 20,
  marginRight: 0,
  textDecoration: "none",
  transition: "opacity 0.18s, box-shadow 0.16s, transform 0.18s",
  boxShadow: "0 2px 7px rgba(230,57,70,0.13)",
  cursor: "pointer",
  outline: "none",
};

const footerLinkStyle = {
  color: "var(--text-primary)",
  opacity: 0.84,
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1.02rem",
  transition: "color 0.14s, opacity 0.13s",
};
export default Footer;
