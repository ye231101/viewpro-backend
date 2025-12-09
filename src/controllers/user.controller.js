const { users } = require('../data/temp');

exports.list = async (req, res) => {
  try {
    return res.success({ users });
  } catch (error) {
    console.error('Error get user list:', error);
    return res.error(500, 'Failed to get user list');
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.error(404, 'User not found');
    }
    return res.success({ user });
  } catch (error) {
    console.error('Error get user:', error);
    return res.error(500, 'Failed to get user');
  }
};

exports.check = async (req, res) => {
  try {
    const list = users.find((user) => user.status === 'available');
    return res.success({ users: list });
  } catch (error) {
    console.error('Error get user:', error);
    return res.error(500, 'Failed to get user');
  }
};

exports.available = async (req, res) => {
  try {
    req.user.status = 'available';
    return res.success({ message: 'Set to available successfully' });
  } catch (error) {
    console.error('Error set to available:', error);
    return res.error(500, 'Failed to set to available');
  }
};

exports.unavailable = async (req, res) => {
  try {
    req.user.status = 'unavailable';
    return res.success({ message: 'Set to unavailable successfully' });
  } catch (error) {
    console.error('Error set to unavailable:', error);
    return res.error(500, 'Failed to set to unavailable');
  }
};
