const { RtcTokenBuilder, RtcRole, RtmTokenBuilder } = require('agora-token');
const { AGORA_APP_ID, AGORA_APP_CERTIFICATE } = require('../config');

exports.token = (req, res) => {
  if (!AGORA_APP_ID || !AGORA_APP_CERTIFICATE) {
    return res.error(400, 'Agora configuration is missing');
  }

  const { uid, channel } = req.query;

  if (!uid || !channel) {
    return res.error(400, 'uid and channel are required');
  }

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600; // 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const rtcToken = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      channel,
      uid,
      role,
      privilegeExpiredTs
    );

    const rtmToken = RtmTokenBuilder.buildToken(
      AGORA_APP_ID,
      AGORA_APP_CERTIFICATE,
      uid,
      privilegeExpiredTs
    );

    return res.success({ rtcToken, rtmToken });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.error(500, error.message);
  }
};
