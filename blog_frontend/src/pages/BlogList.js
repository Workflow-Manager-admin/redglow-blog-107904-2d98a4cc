import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

// PUBLIC_INTERFACE
function BlogList() {
  /**
   * Home/BlogList page: Modern landing layout per requirements.
   * Shows welcome, search, categories, grid, newsletter form, and footer.
   */

  // Placeholder blog data
  const allPosts = [
    { id: 1, title: 'First Blog Post', summary: 'This is a summary of the first blog post.', category: 'Tech' },
    { id: 2, title: 'Second Blog Post', summary: 'This is a summary of the second blog post.', category: 'LifeStyle' },
    { id: 3, title: 'Third Blog Post', summary: 'A quick note about the third blog post.', category: 'Finance' },
    { id: 4, title: 'React UI Design', summary: 'Building beautiful UIs with React.', category: 'Tech' },
    { id: 5, title: 'Healthy Living', summary: 'Tips and tricks for a lifestyle upgrade.', category: 'LifeStyle' },
    { id: 6, title: 'Investing 101', summary: 'Getting started with personal finance.', category: 'Finance' },
  ];

  const CATEGORIES = ['All', 'Tech', 'LifeStyle', 'Finance'];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = useNavigate();

  // Memoized filter logic for performance
  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (category !== 'All') posts = posts.filter(p => p.category === category);
    if (search.trim() !== '') {
      const s = search.trim().toLowerCase();
      posts = posts.filter(
        p => p.title.toLowerCase().includes(s) || p.summary.toLowerCase().includes(s)
      );
    }
    return posts;
  }, [allPosts, search, category]);

  // Newsletter placeholder submit handler
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!newsletterEmail.trim() || subscribed) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3500); // Reset demo
    setNewsletterEmail('');
  }

  return (
    <div style={{ padding: '0', background: 'var(--bg-primary)' }}>
      {/* Welcome Message */}
      <section style={{
        paddingTop: '2.7rem', paddingBottom: '2rem', textAlign: 'center',
        background: 'var(--bg-secondary)'
      }}>
        <h1 style={{
          fontSize: '2.6rem', fontWeight: 800, margin: '0 auto 0.65rem',
          color: '#e63946', letterSpacing: '.01em'
        }}>
          Welcome to Kavia Blog
        </h1>
        <p style={{
          color: 'var(--text-primary)', fontSize: '1.19rem', fontWeight: 500, maxWidth: 520,
          margin: '0 auto', opacity: 0.95, letterSpacing: '0.01em'
        }}>
          Discover curated stories and insightful articles on technology, life, and finance.<br />
          Browse, search, or filter—your next read awaits below.
        </p>
      </section>

      {/* Search and Categories */}
      <section style={{
        maxWidth: 900, margin: '2.2rem auto 0', padding: '0 1.25rem'
      }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap'
        }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            aria-label="Search blog posts"
            style={{
              flex: 1,
              minWidth: 180,
              border: '1px solid var(--border-color)',
              borderRadius: 24,
              padding: '0.75rem 1.2rem',
              fontSize: 17,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
        {/* Categories Filter */}
        <div style={{
          display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              style={{
                border: 'none',
                background: category === cat ? '#e63946' : 'var(--bg-secondary)',
                color: category === cat ? '#fff' : 'var(--text-primary)',
                fontWeight: category === cat ? 700 : 550,
                fontSize: '1.05rem',
                borderRadius: 22,
                padding: '0.57rem 1.4rem',
                cursor: 'pointer',
                outline: category === cat ? '2px solid #e63946' : 'none',
                opacity: category === cat ? 1 : 0.82,
                letterSpacing: '.01em',
                transition: 'background 0.15s, color 0.18s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid Presentation */}
      <section style={{
        maxWidth: 1150,
        margin: '0 auto 2.7rem',
        padding: '0 1.25rem'
      }}>
        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center', fontWeight: 500,
            color: '#e63946', marginTop: '3rem',
            fontSize: '1.17rem', opacity: 0.8
          }}>
            No blog posts found.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {filteredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/post/${post.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section style={{
        width: '100%',
        background: 'var(--bg-secondary)',
        padding: '2.5rem 1.1rem 2.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30
      }}>
        <h2 style={{
          color: '#e63946',
          fontSize: '1.58rem',
          fontWeight: 700,
          marginBottom: 10,
          letterSpacing: '.01em'
        }}>
          Subscribe to our Newsletter
        </h2>
        <p style={{
          color: 'var(--text-primary)',
          fontWeight: 500,
          opacity: 0.92,
          marginBottom: 20,
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          Get the latest blog updates and insights right in your inbox!
        </p>
        <form
          onSubmit={handleNewsletterSubmit}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.7rem',
            maxWidth: 440,
            width: '100%',
            margin: '0 auto',
            justifyContent: 'center'
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email for newsletter"
            value={newsletterEmail}
            onChange={e => setNewsletterEmail(e.target.value)}
            required
            disabled={subscribed}
            style={{
              flex: 1,
              padding: '0.77rem 1.25rem',
              border: '1.5px solid var(--border-color)',
              borderRadius: 22,
              fontSize: 16,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              outline: 'none',
              opacity: subscribed ? 0.6 : 1,
              transition: 'border-color 0.18s'
            }}
          />
          <button
            type="submit"
            disabled={subscribed}
            style={{
              padding: '0.8rem 1.7rem',
              border: 'none',
              borderRadius: 22,
              background: '#e63946',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: subscribed ? 'not-allowed' : 'pointer',
              opacity: subscribed ? 0.7 : 1,
              transition: 'background 0.16s'
            }}
            aria-label="Subscribe to newsletter"
          >
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        {subscribed && (
          <div style={{
            color: '#e63946',
            marginTop: 16,
            fontWeight: 600,
            fontSize: 16
          }}>
            Thank you for subscribing!
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        width: '100%',
        background: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        padding: '1.3rem 0 1rem',
        fontWeight: 500,
        fontSize: '1.07rem',
        letterSpacing: '.01em',
        borderTop: '1px solid var(--border-color)',
        marginTop: 0
      }}>
        &copy; {new Date().getFullYear()} Kavia Blog. All rights reserved. | Crafted with ❤️ for readers.
      </footer>
    </div>
  );
}

export default BlogList;
