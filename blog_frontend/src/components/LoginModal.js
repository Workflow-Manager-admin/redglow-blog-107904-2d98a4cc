import React, { useState } from 'react';

/**
 * LoginModal component.
 *
 * Props:
 *   open         - boolean, controls modal visibility
 *   onClose      - function, called to close the modal
 *   onLogin      - function, called when login succeeds (fake demo only)
 */
 // PUBLIC_INTERFACE
function LoginModal({ open, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Placeholder for error messaging and UI transitions
  const [error, setError] = useState('');

  if (!open) return null;

  // Demo: just treat any non-empty email and password as valid.
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // In real implementation: send credentials to backend and validate.
    // Here: fake login
    onLogin({ username: email });
    onClose();
  }

  function handleGoogleSignIn() {
    // Stub for Google OAuth; would launch real flow in production.
    // For demo, just mark as logged in with a placeholder username.
    onLogin({ username: 'google-user' });
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 1000,
      background: 'rgba(24, 28, 34, 0.55)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        borderRadius: 12,
        maxWidth: 360,
        minWidth: 300,
        boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
        padding: '2.2rem 2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <button
          aria-label="Close login"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            position: 'absolute',
            top: 10,
            right: 16,
            fontSize: 22,
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >×</button>
        <h2 style={{ marginBottom: '1.7rem', fontWeight: 700, color: '#e63946', fontSize: '1.32rem' }}>
          Log in to continue
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '0.72rem',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              fontSize: 16,
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '0.72rem',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              fontSize: 16,
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            required
          />
          {error && (
            <div style={{ color: '#e63946', marginTop: -10, fontSize: 13 }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 0',
              background: '#e63946',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.16s'
            }}
          >
            Sign In
          </button>
        </form>
        <div style={{
          borderBottom: '1px solid var(--border-color)',
          margin: '1.3rem 0'
        }}></div>
        <button
          onClick={handleGoogleSignIn}
          style={{
            background: '#fff',
            color: '#333',
            border: '1px solid #e63946',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            padding: '0.75rem 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
          aria-label="Sign in with Google"
        >
          <span role="img" aria-label="Google">🔒</span> Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
