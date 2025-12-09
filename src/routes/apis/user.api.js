const express = require('express');
const router = express.Router();

const controller = require('../../controllers/user.controller');
const { authenticate } = require('../../middleware/auth.middleware');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.get('/check', controller.check);
router.put('/available', authenticate, controller.available);
router.put('/unavailable', authenticate, controller.unavailable);

module.exports = router;
