import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function Navbar({ theme, toggleTheme }) {
  /**
   * Navbar component: displays the app logo/title, navigation links,
   * accent button (for future CTA), and the light/dark mode toggle.
   */
  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '.03em' }}>
        BlogKavia
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Accent CTA Button */}
        <button
          style={{
            backgroundColor: '#e63946',
            color: '#ffffff',
            border: 'none',
            borderRadius: '24px',
            padding: '0.5rem 1.2rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          Accent Action
        </button>
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{ background: 'var(--button-bg)', color: 'var(--button-text)' }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
