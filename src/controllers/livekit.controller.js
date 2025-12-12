const { AccessToken } = require('livekit-server-sdk');
const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = require('../config');

exports.token = async (req, res) => {
  if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
    return res.error(400, 'Livekit configuration is missing');
  }

  const { room, username } = req.query;

  if (!room || !username) {
    return res.error(400, 'Missing room or username');
  }

  try {
    const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: username,
    });

    token.addGrant({
      roomJoin: true,
      room: room,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();
    return res.success({ token: jwt });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.error(500, error.message);
  }
};
