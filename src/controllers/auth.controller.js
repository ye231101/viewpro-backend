const { users } = require('../data/temp');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.error(400, 'Username and password are required');
    }

    const user = users.find((user) => user.username === username);

    if (!user || user.password !== password) {
      return res.error(401, 'Invalid username or password');
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.success({ token });
  } catch (error) {
    console.error('Error login:', error);
    return res.error(500, error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    // The user is already authenticated via middleware (req.user)
    // Just update their status
    req.user.status = 'unavailable';
    return res.success({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logout:', error);
    return res.error(500, error.message);
  }
};
