const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const accessLogController = require('../controllers/accessLogController');


router.get('/logs', isAuthenticated, accessLogController.getAccessLogs);

module.exports = router;
