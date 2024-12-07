
const express = require('express');
const router = express.Router();
const { checkModuleAccess } = require('../middleware/checkModuleAccess');
const isAuthenticated = require('../middleware/isAuthenticated');


router.get(
    '/financeiro',
    isAuthenticated,
    checkModuleAccess('Financeiro'),
    (req, res) => {
        res.render('financeiro');
    }
);

module.exports = router;
