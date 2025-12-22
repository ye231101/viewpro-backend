const express = require('express');
const router = express.Router();

const controller = require('../../controllers/user.controller');
const { authenticate } = require('../../middleware/auth.middleware');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/check', controller.check);
router.put('/available', authenticate, controller.available);
router.put('/unavailable', authenticate, controller.unavailable);
router.put('/updateFCMToken', authenticate, controller.updateFCMToken);
router.post('/requestCall', controller.requestCall);
router.post('/cancelCall', controller.cancelCall);
router.post('/inviteCall', controller.inviteCall);
router.post('/acceptCall', controller.acceptCall);

module.exports = router;
