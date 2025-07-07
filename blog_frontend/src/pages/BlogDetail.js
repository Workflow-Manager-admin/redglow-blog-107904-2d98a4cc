import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * BlogDetail page: displays a single blog post in detail.
 * Features:
 * - Title and featured image side-by-side (responsive)
 * - Subtitle/summary below title
 * - Author name and published date
 * - Blog content in article
 * - Comments section (list of name + comment)
 * - Social media sharing icons (visual only, no functionality)
 */

const BLOG_DATA = {
  1: {
    title: 'First Blog Post',
    featuredImg: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80',
    summary: 'This is a summary of the first blog post.',
    author: 'Alice',
    date: '2024-06-10',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed feugiat arcu, eu tempus nisi. Suspendisse volutpat lectus vitae felis dictum, in aliquam erat rhoncus. Cras tincidunt ex et urna ullamcorper, nec imperdiet orci cursus.

Donec dictum, risus a fermentum vestibulum, enim augue euismod libero, in tempus massa sapien eget nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse id suscipit nulla, at malesuada erat.`,
    comments: [
      { name: 'Jane', text: 'Great insights! Love this post.' },
      { name: 'Bob', text: 'Very informative and well-written.' }
    ]
  },
  2: {
    title: 'Second Blog Post',
    featuredImg: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
    summary: 'A summary of the second blog post.',
    author: 'Bob',
    date: '2024-06-11',
    content: `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris rutrum, augue a dictum cursus, lectus lacus molestie erat, vel dictum nulla nunc et dolor.

Curabitur eu nulla ac lorem efficitur posuere. Vivamus nec porttitor nisi, ut porta mauris.`,
    comments: [
      { name: 'Alice', text: 'Love the clarity in this write-up.' },
      { name: 'Elizabeth', text: "Helped me understand the topic better, thanks!" }
    ]
  },
  3: {
    title: 'Third Blog Post',
    featuredImg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    summary: 'All about the third blog entry in brief.',
    author: 'Elizabeth',
    date: '2024-06-12',
    content: `Sed est eros, varius vitae dictum at, malesuada a nulla. Nulla facilisi. Integer volutpat lacus augue, nec malesuada ligula dictum ac.

Quisque a risus accumsan, volutpat mi in, tincidunt velit. Etiam tincidunt risus nec elit malesuada, eget cursus ligula facilisis.`,
    comments: [
      { name: 'Charlie', text: "Another fantastic post. Keep it up!" }
    ]
  }
};

function formatDate(dateStr) {
  // Helper to format ISO date string to readable format (e.g., June 10, 2024)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_DATA[id];

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
        <h2>Post not found</h2>
        <Link to="/">← Back to Blog List</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 840,
        margin: '2rem auto',
        padding: '1.7rem 1.2rem 3.5rem 1.2rem',
        background: 'var(--bg-primary)',
        borderRadius: 18,
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 24px rgba(44, 44, 53, 0.07)'
      }}
    >
      {/* Title and Featured Image */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.1rem',
          alignItems: 'center',
          marginBottom: '1.35rem'
        }}
      >
        <div style={{ flex: 2 }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#e63946',
              margin: 0,
              lineHeight: 1.14,
              wordBreak: 'break-word'
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              fontSize: '1.18rem',
              margin: '0.55rem 0 0.45rem 0',
              color: 'var(--text-primary)',
              fontWeight: 500,
              opacity: 0.88,
              letterSpacing: '0.01em'
            }}
          >
            {post.summary}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '1.2rem',
            marginTop: 12,
            fontSize: '1.05rem',
            color: 'var(--text-secondary)'
          }}>
            <span style={{
              fontWeight: 600,
              color: '#61dafb',
              textAlign: 'right',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
            }}>
              By {post.author}
            </span>
            <span style={{
              opacity: 0.84,
              fontWeight: 500,
              fontSize: '0.98rem'
            }}>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
        <div style={{
          flex: 1.2,
          minWidth: 142,
          maxWidth: 260,
          minHeight: 100,
          alignSelf: 'flex-start',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 2px 15px rgba(38, 38, 44, 0.08)',
          background: '#ececec'
        }}>
          <img
            src={post.featuredImg}
            alt="Featured"
            style={{
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 14,
              aspectRatio: '4/3'
            }}
          />
        </div>
      </section>
      {/* End Title/Image */}

      {/* CONTENT */}
      <article style={{ color: 'var(--text-primary)', fontSize: '1.17rem', lineHeight: 1.75, marginBottom: '2.3rem', marginTop: '1.05rem' }}>
        {post.content.split('\n').map((para, i) =>
          <p key={i} style={{margin: '0 0 1.3em 0', whiteSpace: 'pre-line'}}>{para}</p>
        )}
      </article>

      {/* COMMENT Section */}
      <section style={{margin: '2.2rem 0 2.2rem 0'}}>
        <h3 style={{
          fontSize: '1.28rem',
          fontWeight: 700,
          marginBottom: 14,
          color: '#e63946',
        }}>
          Comments
        </h3>
        {post.comments.length === 0 && (
          <div style={{color: 'var(--text-secondary)', opacity: 0.75}}>No comments yet.</div>
        )}
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {post.comments.map((c, idx) => (
            <li key={idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '0.9rem 1.3rem'
            }}>
              <span style={{fontWeight: 700, color: '#e63946', marginRight: 12}}>
                {c.name}
              </span>
              <span style={{color: 'var(--text-primary)'}}>
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SOCIAL MEDIA SHARE ICONS */}
      <section style={{margin: '2.5rem 0 1.4rem 0', textAlign: 'center'}}>
        <span style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '1.09rem',
          marginBottom: 10,
          color: 'var(--text-primary)'
        }}>Share this post:</span>
        <div style={{display: 'flex', justifyContent: 'center', gap: 20}}>
          {/* Social icons as images from public folder */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            aria-label="Share on Facebook"
            style={iconStyle}
          >
            <img
              src="/facebook.png"
              alt="Facebook"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Instagram"
            aria-label="Share on Instagram"
            style={iconStyle}
          >
            <img
              src="/instagram.png"
              alt="Instagram"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on YouTube"
            aria-label="Share on YouTube"
            style={iconStyle}
          >
            <img
              src="/youtube.png"
              alt="YouTube"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
        </div>
      </section>
      {/* Back link */}
      <div style={{ marginTop: '2.2rem' }}>
        <Link
          to="/"
          style={{
            color: 'var(--text-secondary)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '1.09rem',
            letterSpacing: '.01em'
          }}
        >
          ← Back to Blog List
        </Link>
      </div>
      {/* Responsive Styles */}
      <style>
        {`
        @media (max-width: 860px) {
          div[role="main-detail"] > section:first-child {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .blog-detail-responsive {
            padding: 0.5rem 0.35rem 2.2rem 0.35rem !important;
          }
          .blogdetail-title {
            font-size: 1.7rem !important;
          }
          .blogdetail-summary {
            font-size: 1.06rem !important;
          }
        }
        `}
      </style>
    </div>
  );
}

const iconStyle = {
  background: '#e63946',
  color: '#fff',
  fontSize: 27,
  width: 44,
  height: 44,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  marginRight: 0,
  boxShadow: '0 2px 8px rgba(230,57,70,0.13)',
  cursor: 'pointer',
  userSelect: 'none'
};

export default BlogDetail;
