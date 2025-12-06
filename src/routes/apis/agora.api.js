const express = require('express');
const router = express.Router();

const controller = require('../../controllers/agora.controller');

router.get('/token', controller.token);

module.exports = router;
