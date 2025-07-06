import React from 'react';

// PUBLIC_INTERFACE
function BlogCard({ post, onClick }) {
  /**
   * BlogCard component: displays summary for a blog post.
   * Calls onClick when the card is clicked.
   */
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

export default BlogCard;
