const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object containing id, username, etc.
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    status: user.status,
  };

  return jwt.sign(payload, JWT_SECRET);
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 * @param {Object} req - Express request object
 * @returns {string|null} Token or null if not found
 */
const extractToken = (req) => {
  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractToken,
};
