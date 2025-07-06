/**
 * Entry point for blog_backend.
 *
 * Sets up Express, connects to MongoDB, provides authentication and blog CRUD endpoints.
 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/posts');
const { authenticateJWT } = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
// PUBLIC_INTERFACE
app.get('/api/health', (req, res) => {
  /** Health check (public) */
  res.json({ status: 'ok', message: 'blog_backend is running.' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Only start the server after DB connection is ready
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});
