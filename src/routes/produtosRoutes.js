
const express = require('express');
const router = express.Router();
const { checkModuleAccess } = require('../middleware/checkModuleAccess');
const isAuthenticated = require('../middleware/isAuthenticated');


router.get(
    '/produtos',
    isAuthenticated,
    checkModuleAccess('Produtos'),
    (req, res) => {
        res.render('produtos');
    }
);

module.exports = router;
