const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');


router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', login);

module.exports = router;