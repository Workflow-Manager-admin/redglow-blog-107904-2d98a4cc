import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SkeletonLoader from '../components/SkeletonLoader';

// PUBLIC_INTERFACE
function BlogList() {
  /**
   * Home/BlogList page: Modern landing layout per requirements.
   * Shows welcome, search, categories, grid, newsletter form, and footer.
   * Now with soft loading skeletons and smooth fade-in on mount (simulates async load).
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

  // State for simulated loading per-section
  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [loadingNewsletter, setLoadingNewsletter] = useState(true);
  const [loadingFooter, setLoadingFooter] = useState(true);

  // Fade-in flag for visible mount
  const [show, setShow] = useState(false);

  // For forms
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = useNavigate();

  // Simulate async loading for each section: staggered reveal (for demo only)
  useEffect(() => {
    const to1 = setTimeout(() => setLoadingWelcome(false), 300);
    const to2 = setTimeout(() => setLoadingSearch(false), 520);
    const to3 = setTimeout(() => setLoadingCategories(false), 650);
    const to4 = setTimeout(() => setLoadingGrid(false), 900);
    const to5 = setTimeout(() => setLoadingNewsletter(false), 1120);
    const to6 = setTimeout(() => setLoadingFooter(false), 1300);
    const to7 = setTimeout(() => setShow(true), 1600);
    return () => {
      clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4); clearTimeout(to5); clearTimeout(to6); clearTimeout(to7);
    };
  }, []);

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
      <section
        className={`soft-fadein-section hero-gradient${!loadingWelcome && show ? ' visible' : ''}`}
        style={{
          paddingTop: '2.7rem',
          paddingBottom: '2rem',
          textAlign: 'center'
          // background removed; now provided via className for gradient
        }}
      >
        {loadingWelcome ? (
          <SkeletonLoader width="100%" height="6.1em" style={{maxWidth: 550, margin: "0 auto 1.1rem", borderRadius: 24}} />
        ) : (
          <>
            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              margin: '0 auto 0.65rem',
              color: '#e63946',
              letterSpacing: '.01em'
            }}>
              Welcome to EchoPages
            </h1>
            <p style={{
              color: 'var(--text-primary)', fontSize: '1.19rem', fontWeight: 500, maxWidth: 520,
              margin: '0 auto', opacity: 0.95, letterSpacing: '0.01em'
            }}>
              Discover curated stories and insightful articles on technology, life, and finance.<br />
              Browse, search, or filter—your next read awaits below.
            </p>
          </>
        )}
      </section>

      {/* Search and Categories */}
      <section style={{
        maxWidth: 900, margin: '2.2rem auto 0', padding: '0 1.25rem'
      }}>
        {/* Search Bar */}
        <div
          className={`soft-fadein-section${!loadingSearch && show ? ' visible' : ''}`}
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap'
          }}
        >
          {loadingSearch ? (
            <SkeletonLoader width="100%" height="2.8em" style={{borderRadius: 24}} />
          ) : (
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
          )}
        </div>
        {/* Categories Filter */}
        <div
          className={`soft-fadein-section${!loadingCategories && show ? ' visible' : ''}`}
          style={{
            display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'
          }}
        >
          {loadingCategories
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonLoader
                  key={idx}
                  width="90px"
                  height="2.1em"
                  style={{ borderRadius: 24 }}
                />
              ))
            : CATEGORIES.map(cat => (
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
      <section
        className={`soft-fadein-section${!loadingGrid && show ? ' visible' : ''}`}
        style={{
          maxWidth: 1150,
          margin: '0 auto 2.7rem',
          padding: '0 1.25rem'
        }}
      >
        {loadingGrid ? (
          // Show 3-4 skeleton blog cards as loading
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'stretch'
            }}
            aria-label="blog grid skeleton"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader
                key={i}
                width="100%"
                height="140px"
                style={{
                  marginBottom: 5,
                  borderRadius: 18,
                  minHeight: 140,
                  minWidth: 200
                }}
              />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
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
      <section
        className={`soft-fadein-section${!loadingNewsletter && show ? ' visible' : ''}`}
        style={{
          width: '100%',
          background: 'var(--bg-secondary)',
          padding: '2.5rem 1.1rem 2.8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 30
        }}
      >
        {loadingNewsletter ? (
          <SkeletonLoader width="94%" height="6.5em" style={{ maxWidth: 470, margin: "0 auto 1.2rem", borderRadius: 20 }} />
        ) : (
          <>
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
          </>
        )}
      </section>

      {/* Footer */}
      <footer
        className={`soft-fadein-section${!loadingFooter && show ? ' visible' : ''}`}
        style={{
          width: '100%',
          /* Remove hardcoded background/color so CSS handles both themes */
          textAlign: 'center',
          padding: '1.3rem 0 1rem',
          fontWeight: 'normal',
          fontSize: '1.07rem',
          letterSpacing: '.01em',
          borderTop: '1px solid var(--border-color)',
          marginTop: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          fontStyle: 'normal',
          textDecoration: 'none'
        }}
      >
        {loadingFooter ? (
          <SkeletonLoader width="50%" height="2em" style={{ borderRadius: 8, margin: "0 auto" }} />
        ) : (
          <>© 2025 EchoPages. All rights reserved. | Crafted with kavia ai for readers.</>
        )}
      </footer>
    </div>
  );
}

export default BlogList;
