const express = require('express');
const router = express.Router();

const authRoutes = require('./apis/auth.api');
const userRoutes = require('./apis/user.api');
const livekitRoutes = require('./apis/livekit.api');

// Health check endpoint
router.get('/health', (req, res) => {
  return res.success();
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/livekit', livekitRoutes);

module.exports = router;
