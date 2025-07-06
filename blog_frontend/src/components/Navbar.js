import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import Logo from './Logo';

// PUBLIC_INTERFACE
function Navbar({ theme, toggleTheme }) {
  /**
   * Navbar component: displays app logo/title, navigation links,
   * Login/Write button (depending on login state), and light/dark mode toggle.
   * The dark mode toggle is now to the left of the Home button for better UX.
   */

  const [modalOpen, setModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // Animation: Control mount state for entrance effect
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after first render to trigger the animation
    setMounted(true);
  }, []);

  // On production, user info would be managed globally or via context
  const handleLogin = (userObj) => {
    setAuthUser(userObj); // userObj: { username }
  };

  const handleLogout = () => {
    setAuthUser(null);
  };

  function handleWriteClick() {
    navigate('/write'); // This route/page can be implemented in future
    // For demo, you might alert or route to a future post creation page
    // alert('Write a new blog post (stub)');
  }

  return (
    <>
      <nav
        className={`navbar navbar-animated${mounted ? " navbar-animated--mounted" : ""}`}
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
        {/* Logo + Brand */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
          className="navbar-logo-link group-hover-zoom"
        >
          <span className="quickblog-logo-group" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".70rem",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          }}>
            <span className="quickblog-logo-wrap" style={{ display: "inline-flex", verticalAlign: "middle" }}>
              <Logo className="quickblog-logo" />
            </span>
            <span
              style={{
                // Remove direct color assignment so CSS applies based on theme
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '.03em',
                textAlign: 'center',
                lineHeight: 1,
                userSelect: "none"
              }}
              className="navbar-brand-text"
            >
              EchoPages
            </span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Theme Toggle Button to the left of Home */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{
              background: 'var(--button-bg)',
              color: 'var(--button-text)',
              position: 'static', // ensures it sits inline, not absolute
              marginRight: 0,
              top: 'unset',
              right: 'unset',
              order: 0,
            }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <Link
            to="/"
            style={{
              padding: '0.42rem 1rem',
              borderRadius: 20,
              color: 'var(--text-primary)',
              fontWeight: 600,
              letterSpacing: '.01em',
              background: 'none',
              border: 'none',
              textDecoration: 'none',
              fontSize: '1rem',
              order: 1,
            }}
          >
            Home
          </Link>
          {/* Dynamic Button Area: Login or Write */}
          {authUser ? (
            <>
              <button
                style={{
                  backgroundColor: '#e63946',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '0.5rem 1.2rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
                onClick={handleWriteClick}
              >
                Write
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 18,
                  border: 'none',
                  marginLeft: '0.6rem',
                  padding: '0.3rem 0.9rem',
                  cursor: 'pointer'
                }}
                aria-label="Log out"
              >Logout</button>
              {/* Optionally, show current username */}
              <span style={{
                marginLeft: '0.55rem', color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.97rem'
              }}>
                {authUser.username}
              </span>
            </>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                backgroundColor: '#e63946',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <LoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={handleLogin}
      />
      {/* Inline style for demo/preview if CSS file isn't loaded */}
      <style>
        {`
        /* No-op: styles moved to App.css or main CSS */
        `}
      </style>
    </>
  );
}

export default Navbar;
