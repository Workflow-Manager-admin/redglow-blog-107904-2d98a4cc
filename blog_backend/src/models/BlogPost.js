const mongoose = require('mongoose');

/**
 * BlogPost Mongoose schema.
 */
const blogPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Blog post title is required.'],
    maxlength: 120
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required.']
  }
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
