const { users } = require('../data/temp');
const { messaging } = require('../utils/firebase');
const { getIO } = require('../utils/socket');

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
    const list = users.filter((user) => user.status === 'available');
    return res.success({ users: list });
  } catch (error) {
    console.error('Error get user:', error);
    return res.error(500, 'Failed to get user');
  }
};

exports.available = async (req, res) => {
  try {
    req.user.status = 'available';

    const io = getIO();
    io.emit('user:available', {
      username: req.user.username,
    });

    return res.success({ message: 'Set to available successfully' });
  } catch (error) {
    console.error('Error set to available:', error);
    return res.error(500, 'Failed to set to available');
  }
};

exports.unavailable = async (req, res) => {
  try {
    req.user.status = 'unavailable';

    const io = getIO();
    io.emit('user:unavailable', {
      username: req.user.username,
    });

    return res.success({ message: 'Set to unavailable successfully' });
  } catch (error) {
    console.error('Error set to unavailable:', error);
    return res.error(500, 'Failed to set to unavailable');
  }
};

exports.updateFCMToken = async (req, res) => {
  try {
    req.user.fcmToken = req.body.fcmToken;
    return res.success({ message: 'Set FCM token successfully' });
  } catch (error) {
    console.error('Error set to unavailable:', error);
    return res.error(500, 'Failed to set FCM token');
  }
};

exports.requestCall = async (req, res) => {
  try {
    const { callerName, roomName } = req.body;

    const list = users.filter((u) => u.status === 'available' && u.fcmToken);

    // Send messages to all available users and handle individual failures
    const sendPromises = list.map(async (item) => {
      try {
        const message = {
          token: item.fcmToken,
          data: {
            type: 'request_call',
            callerName,
            roomName,
          },
        };

        await messaging.send(message);
        return { success: true, user: item.username };
      } catch (error) {
        console.error(`Failed to send message to user ${item.username}:`, error.message);
        return { success: false, user: item.username, error: error.message };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(`requestCall: ${successCount} successful, ${failureCount} failed`);

    return res.success({
      results: {
        total: list.length,
        successCount: successCount,
        failureCount: failureCount,
      },
    });
  } catch (error) {
    console.error('Failed to requestCall:', error);
    return res.error(500, error.message);
  }
};

exports.cancelCall = async (req, res) => {
  try {
    const { callerName, roomName } = req.body;

    const list = users.filter((u) => u.status === 'available');

    // Send messages to all available users and handle individual failures
    const sendPromises = list.map(async (item) => {
      try {
        const message = {
          token: item.fcmToken,
          data: {
            type: 'cancel_call',
            callerName,
            roomName,
          },
        };

        await messaging.send(message);
        return { success: true, user: item.username };
      } catch (error) {
        console.error(`Failed to send message to user ${item.username}:`, error.message);
        return { success: false, user: item.username, error: error.message };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(`cancelCall: ${successCount} successful, ${failureCount} failed`);

    return res.success({
      results: {
        total: list.length,
        successCount: successCount,
        failureCount: failureCount,
      },
    });
  } catch (error) {
    console.error('Failed to cancelCall:', error);
    return res.error(500, error.message);
  }
};

exports.inviteCall = async (req, res) => {
  try {
    const { username, callerName, roomName } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.error(404, 'User not found');
    }

    if (!user.fcmToken) {
      return res.error(400, 'User FCM token not found');
    }

    const message = {
      token: user.fcmToken,
      data: {
        type: 'invite_call',
        username,
        callerName,
        roomName,
      },
    };

    await messaging.send(message);

    return res.success();
  } catch (error) {
    console.error('Failed to inviteCall:', error);
    return res.error(500, error.message);
  }
};

exports.acceptCall = async (req, res) => {
  try {
    const { username, roomName } = req.body;

    const list = users.filter((u) => u.username !== username && u.status === 'available');

    // Send messages to all available users and handle individual failures
    const sendPromises = list.map(async (item) => {
      try {
        const message = {
          token: item.fcmToken,
          data: {
            type: 'accept_call',
            roomName,
          },
        };

        await messaging.send(message);
        return { success: true, user: item.username };
      } catch (error) {
        console.error(`Failed to send message to user ${item.username}:`, error.message);
        return { success: false, user: item.username, error: error.message };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(`acceptCall: ${successCount} successful, ${failureCount} failed`);

    return res.success({
      results: {
        total: list.length,
        successCount: successCount,
        failureCount: failureCount,
      },
    });
  } catch (error) {
    console.error('Failed to acceptCall:', error);
    return res.error(500, error.message);
  }
};
