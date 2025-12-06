const { RtcTokenBuilder, RtcRole } = require('agora-token');
const { AGORA_APP_ID, AGORA_APP_CERTIFICATE } = require('../config');

exports.token = (req, res) => {
  if (!AGORA_APP_ID || !AGORA_APP_CERTIFICATE) {
    return res.error(400, 'Agora configuration is missing');
  }

  const { uid, channel } = req.query;

  if (!uid || !channel) {
    return res.error(400, 'UID and channel are required');
  }

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600; // 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      channel,
      uid,
      role,
      privilegeExpiredTs
    );

    return res.success({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.error(500, error.message);
  }
};
