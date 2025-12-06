const express = require('express');
const router = express.Router();

const authRoutes = require('./apis/auth.api');
const userRoutes = require('./apis/user.api');
const agoraRoutes = require('./apis/agora.api');

// Health check endpoint
router.get('/health', (req, res) => {
  return res.success();
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/agora', agoraRoutes);

module.exports = router;
