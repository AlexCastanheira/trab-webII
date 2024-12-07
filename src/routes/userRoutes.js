
const express = require('express');
const router = express.Router();
const isSuperuser = require('../middleware/isSuperuser');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/isAuthenticated');
const userController = require('../controllers/userController');


router.get('/user-control', isAuthenticated, isAdmin, userController.userControl);


module.exports = router;
