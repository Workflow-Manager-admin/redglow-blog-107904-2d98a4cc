import React from 'react';

/**
 * Helper to format ISO date to friendly format (e.g., Jun 2024)
 */
function formatBlogDate(dateStr) {
  if (!dateStr) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(dateStr).toLocaleDateString(undefined, options);
  } catch {
    return dateStr;
  }
}

// PUBLIC_INTERFACE
function BlogCard({ post, onClick, contentRich }) {
  /**
   * BlogCard component: visually present a blog post preview card with
   * - title, excerpt, preview image, author, date, category, and social icons (if contentRich)
   */
  // For "rich" layout, show image top, then content; fallback to minimal origin.
  if (!contentRich) {
    // Legacy fallback/minimal
    return (
      <div
        onClick={onClick}
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          boxShadow: '0 2px 8px rgba(230,57,70,0.08)',
          padding: '1.5rem 1.3rem',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s, transform 0.2s',
          minHeight: 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        tabIndex={0}
        aria-label={`Open blog post: ${post.title}`}
        onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      >
        <h2 style={{ color: '#e63946', fontSize: '1.35rem', marginBottom: '0.6rem', fontWeight: 700 }}>{post.title}</h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{post.summary}</p>
        <span style={{ alignSelf: 'flex-end', color: 'var(--text-secondary)', fontSize: '0.93rem', fontWeight: 600 }}>
          Read more →
        </span>
      </div>
    );
  }
  // Rich content-aware card
  return (
    <div
      className="blog-card-content-rich"
      onClick={onClick}
      style={{
        background: 'var(--bg-secondary)',
        border: '1.5px solid var(--border-color)',
        borderRadius: '18px',
        boxShadow: '0 2px 16px rgba(230,57,70,0.09)',
        cursor: 'pointer',
        transition: 'box-shadow 0.22s, transform 0.2s',
        minHeight: 230,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflow: 'hidden',
        position: 'relative',
      }}
      tabIndex={0}
      aria-label={`Open blog post: ${post.title}`}
      onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {/* Preview Image */}
      {post.image &&
        <div className="blog-card-image-area"
          style={{
            width: '100%',
            height: 140,
            overflow: 'hidden',
            background: '#ececec',
            position: 'relative',
            marginBottom: 0
          }}
        >
          <img
            src={post.image}
            alt={post.title + " preview"}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          {/* CATEGORY BADGE (top-left) */}
          <span
            style={{
              position: 'absolute',
              top: 13,
              left: 14,
              background: '#e63946',
              color: '#fff',
              padding: '0.2rem 0.85rem',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.98rem',
              letterSpacing: '.01em',
              boxShadow: '0 1px 6px rgba(230,57,70,0.13)',
              zIndex: 2,
            }}
          >
            {post.category}
          </span>
        </div>
      }
      {/* Card Content */}
      <div
        style={{
          padding: '1.18rem 1.15rem 1.10rem 1.15rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'flex-start',
          minHeight: "110px"
        }}
      >
        {/* Title */}
        <h2 style={{
          color: '#e63946',
          fontSize: '1.28rem',
          margin: 0,
          marginBottom: '0.44rem',
          fontWeight: 800,
          lineHeight: 1.18,
          wordBreak: 'break-word'
        }}>{post.title}</h2>
        {/* Summary/Excerpt */}
        <div style={{
          color: 'var(--text-primary)',
          opacity: 0.89,
          marginBottom: '0.67rem',
          fontSize: '1.02rem',
          fontWeight: 500,
          minHeight: "2.7em",
          letterSpacing: ".01em"
        }}>
          {post.summary}
        </div>
        {/* Meta & social row */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 'auto',
          gap: 10
        }}>
          {/* Author and date at left */}
          <span style={{
            fontSize: '0.97rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span role="img" aria-label="author">✍️</span>
            <span>{post.author}</span>
            <span style={{ color: "#adb3bb", fontWeight: 400, marginLeft: 7, fontSize: 13 }}>•</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)', opacity: 0.7 }}>{formatBlogDate(post.date)}</span>
          </span>
          {/* Social icons (always, for demo) */}
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" tabIndex={-1}
              title="Share on Facebook"
              style={{
                background: '#e63946',
                borderRadius: 999,
                width: 28, height: 28, display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 6px rgba(230,57,70,0.10)"
              }}>
              <img src="/images/facebook.png" alt="Facebook" style={{ width: 18, height: 18, display: "block" }} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" tabIndex={-1}
              title="Share on Instagram"
              style={{
                background: '#e63946', borderRadius: 999,
                width: 28, height: 28, display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 6px rgba(230,57,70,0.10)"
              }}>
              <img src="/images/instagram.png" alt="Instagram" style={{ width: 18, height: 18, display: "block" }} />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" tabIndex={-1}
              title="Share on YouTube"
              style={{
                background: '#e63946', borderRadius: 999,
                width: 28, height: 28, display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 6px rgba(230,57,70,0.10)"
              }}>
              <img src="/images/youtube.png" alt="YouTube" style={{ width: 18, height: 18, display: "block" }} />
            </a>
          </span>
        </div>
      </div>
      {/* Animated Read More arrow */}
      <div style={{
        alignSelf: 'flex-end', fontSize: 17, color: '#e63946',
        fontWeight: 700, marginRight: 18, marginBottom: 14,
        transition: 'color 0.19s'
      }}>
        <span style={{ opacity: 0.83 }}>Read more &rarr;</span>
      </div>
    </div>
  );
}

export default BlogCard;
