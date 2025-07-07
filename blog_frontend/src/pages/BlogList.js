// PUBLIC_INTERFACE
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SkeletonLoader from '../components/SkeletonLoader';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';

// PUBLIC_INTERFACE
function BlogList() {
  /**
   * Home/BlogList page: Modern landing layout per requirements.
   * Shows welcome, search, categories, grid, newsletter form, and footer.
   * Now with soft loading skeletons and smooth fade-in on mount (simulates async load).
   * Improved for: visually rich grid listing with each blog card showing
   * - Title
   * - Excerpt/summary
   * - Author
   * - Date
   * - Preview image
   * - Category badge
   * - Social icons (if desired)
   */
  // Improved demo blog data: enrich with images, author, date for grid effect
  const allPosts = [
    {
      id: 1,
      title: 'The Future of Artificial Intelligence',
      summary: 'A deep dive into AI advancements shaping industries and our daily life.',
      author: 'Alice',
      date: '2024-06-10',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&q=80',
    },
    {
      id: 2,
      title: 'Camping Under the Stars',
      summary: 'Discover the magic of camping beneath the stars and how to enhance your outdoor experience.',
      author: 'Bob',
      date: '2024-06-11',
      category: 'LifeStyle',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&q=80',
    },
    {
      id: 3,
      title: 'Mastering Personal Finance',
      summary: 'Learn the fundamentals of personal finance and secure your financial future.',
      author: 'Elizabeth',
      date: '2024-06-12',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80',
    },
    {
      id: 4,
      title: 'React UI Design',
      summary: 'Building beautiful UIs with React for modern web applications.',
      author: 'Charlie',
      date: '2024-06-13',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80',
    },
    {
      id: 5,
      title: 'Healthy Living',
      summary: 'Tips and tricks for a lifestyle upgrade to energize your day.',
      author: 'Jane',
      date: '2024-06-15',
      category: 'LifeStyle',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3f16?w=500&q=80',
    },
    {
      id: 6,
      title: 'Investing 101',
      summary: 'Getting started with personal finance, investing, and wealth planning.',
      author: 'Bob',
      date: '2024-06-15',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&q=80',
    },
  ];

  // Define top-level categories to display in the filter
  const CATEGORIES = ['All', 'Tech', 'LifeStyle', 'Finance'];

  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [loadingNewsletter, setLoadingNewsletter] = useState(true);
  const [loadingFooter, setLoadingFooter] = useState(true);

  const [show, setShow] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = useNavigate();

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

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!newsletterEmail.trim() || subscribed) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3500);
    setNewsletterEmail('');
  }

  // Modern, content-rich grid layout below
  return (
    <div style={{ padding: '0', background: 'var(--bg-primary)' }}>
      {/* Hero section: visually introduces site; sits above everything else */}
      <HeroSection />

      {/* Categories Section for filtering */}
      <CategoriesSection
        categories={CATEGORIES}
        currentCategory={category}
        onSelect={setCategory}
        loading={loadingCategories}
      />

      {/* --- CARDS GRID IMPROVED BELOW --- */}
      <section
        id="blog-grid"
        className={`soft-fadein-section${!loadingGrid && show ? ' visible' : ''}`}
        style={{
          maxWidth: 1150,
          margin: '0 auto 2.7rem',
          padding: '0 1.25rem'
        }}
      >
        {loadingGrid ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.1rem',
              alignItems: 'stretch'
            }}
            aria-label="blog grid skeleton"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader
                key={i}
                width="100%"
                height="240px"
                style={{
                  marginBottom: 5,
                  borderRadius: 20,
                  minHeight: 180,
                  minWidth: 230
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
          <div className="blog-grid-listing">
            {filteredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/post/${post.id}`)}
                contentRich
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

      {/* SOCIAL MEDIA ICONS: Consistent with BlogDetail.js */}
      <section style={{margin: '2.5rem auto 1.4rem auto', textAlign: 'center'}}>
        <span style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '1.09rem',
          marginBottom: 10,
          color: 'var(--text-primary)'
        }}>Follow us:</span>
        <div style={{display: 'flex', justifyContent: 'center', gap: 20}}>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Our Facebook"
            aria-label="Visit Facebook"
            style={{
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
            }}
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
            title="Our Instagram"
            aria-label="Visit Instagram"
            style={{
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
            }}
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
            title="Our YouTube"
            aria-label="Visit YouTube"
            style={{
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
            }}
          >
            <img
              src="/youtube.png"
              alt="YouTube"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
        </div>
      </section>

      {/* Footer removed: now globally handled in App.js */}
    </div>
  );
}

export default BlogList;
