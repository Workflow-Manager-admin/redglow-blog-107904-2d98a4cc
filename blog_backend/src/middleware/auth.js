/**
 * JWT authentication middleware for protected routes.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

/**
 * PUBLIC_INTERFACE
 * Express middleware that authenticates requests using JWT.
 * If valid, attaches user to req.user; else returns 401.
 */
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found.' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = { authenticateJWT };
