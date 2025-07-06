const mongoose = require('mongoose');

/**
 * User Mongoose schema.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    minlength: 3,
    maxlength: 32,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
