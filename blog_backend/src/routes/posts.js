const express = require('express');
const { authenticateJWT } = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all blog posts (public)
 *     tags: [Blog]
 */
// PUBLIC_INTERFACE
router.get('/', async (req, res) => {
  /** Returns list of blog posts, sorted new-to-old. */
  try {
    const posts = await BlogPost.find().populate('author', 'username -_id').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts.' });
  }
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post (protected)
 *     tags: [Blog]
 */
// PUBLIC_INTERFACE
router.post('/', authenticateJWT, async (req, res) => {
  /** Creates a new blog post by authenticated user. */
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content are required.' });
  try {
    const post = new BlogPost({ author: req.user._id, title, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post.' });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get blog post by ID (public)
 *     tags: [Blog]
 */
// PUBLIC_INTERFACE
router.get('/:id', async (req, res) => {
  /** Returns a single blog post by its ID. */
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username -_id');
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load post.' });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update blog post (protected, only author)
 *     tags: [Blog]
 */
// PUBLIC_INTERFACE
router.put('/:id', authenticateJWT, async (req, res) => {
  /** Update a blog post (author only). */
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized.' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update post.' });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete blog post (protected, only author)
 *     tags: [Blog]
 */
// PUBLIC_INTERFACE
router.delete('/:id', authenticateJWT, async (req, res) => {
  /** Delete a blog post (author only). */
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized.' });
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post.' });
  }
});

module.exports = router;
