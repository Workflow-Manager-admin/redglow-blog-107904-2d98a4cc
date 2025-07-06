const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret'; // Don't use in production

// PUBLIC_INTERFACE
function generateToken(user) {
  /** Generates JWT for a user object */
  return jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

// PUBLIC_INTERFACE
function verifyToken(token) {
  /** Verifies JWT and returns the decoded object. Throws on error. */
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
