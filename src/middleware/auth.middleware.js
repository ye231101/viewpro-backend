const { verifyToken, extractToken } = require('../utils/jwt');
const { users } = require('../data/temp');

/**
 * Authentication middleware to verify JWT token
 * Attaches the authenticated user to req.user
 */
const authenticate = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.error(401, 'User is not authenticated');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.error(401, 'User is not authenticated');
  }

  // Find the user from the decoded token
  const user = users.find((user) => user.id === decoded.id);

  if (!user) {
    return res.error(401, 'User is not authenticated');
  }

  // Attach user to request object
  req.user = user;

  next();
};

module.exports = {
  authenticate,
};
