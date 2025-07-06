import React from 'react';
import { useParams, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function BlogDetail() {
  /**
   * BlogDetail page: shows full content of a selected blog post.
   * Content is currently static; in the future, would use route param + data.
   */
  const { id } = useParams();

  // Placeholder blog details
  const posts = {
    1: { title: 'First Blog Post', content: 'Full content for post 1. Lorem ipsum dolor sit amet.' },
    2: { title: 'Second Blog Post', content: 'Full content for post 2. Vestibulum nec velit eu erat.' },
    3: { title: 'Third Blog Post', content: 'Full content for post 3. Sed est eros, varius vitae dictum.' }
  };

  const post = posts[id];

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
        <h2>Post not found</h2>
        <Link to="/">← Back to Blog List</Link>
      </div>
    );
  }

  return (
    <article style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem', textAlign: 'left' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{post.content}</p>
      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '2rem',
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }}>
        ← Back to Blog List
      </Link>
    </article>
  );
}

export default BlogDetail;
