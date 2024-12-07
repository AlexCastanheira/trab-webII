
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

const { getUserList } = require('../controllers/userListController');


router.get('/userList', isAuthenticated, getUserList);

module.exports = router;
