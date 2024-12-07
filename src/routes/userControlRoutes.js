
const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/createUserController');
const isAdmin = require('../middleware/isAdmin');


router.get('/userControl', isAdmin, (req, res) => {
    const user = req.session.user;


    res.render('userControl', { user });
});


router.post('/userControl/createUser', isAdmin, createUser);

module.exports = router;
