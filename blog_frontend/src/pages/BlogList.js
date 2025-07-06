import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

// PUBLIC_INTERFACE
function BlogList() {
  /**
   * BlogList page: displays a static list of blog post cards.
   * Each card should navigate to the BlogDetail view using useNavigate.
   * In a real app, this would be generated from data.
   */
  const navigate = useNavigate();

  // Placeholder blog data
  const posts = [
    { id: 1, title: 'First Blog Post', summary: 'This is a summary of the first blog post.' },
    { id: 2, title: 'Second Blog Post', summary: 'This is a summary of the second blog post.' },
    { id: 3, title: 'Third Blog Post', summary: 'A quick note about the third blog post.' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'left', fontSize: '2.25rem', marginBottom: '1.5rem' }}>Blog Posts</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {posts.map(post => (
          <BlogCard key={post.id} post={post} onClick={() => navigate(`/post/${post.id}`)} />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
