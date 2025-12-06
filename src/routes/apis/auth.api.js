const express = require('express');
const router = express.Router();

const controller = require('../../controllers/auth.controller');
const { authenticate } = require('../../middleware/auth.middleware');

router.post('/login', controller.login);
router.post('/logout', authenticate, controller.logout);

module.exports = router;
