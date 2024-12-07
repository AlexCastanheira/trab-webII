const express = require('express');
const router = express.Router();
const { checkModuleAccess } = require('../middleware/checkModuleAccess');
const isAuthenticated = require('../middleware/isAuthenticated');


router.get(
    '/relatorios',
    isAuthenticated,
    checkModuleAccess('Relatórios'),
    (req, res) => {
        res.render('relatorios');
    }
);

module.exports = router;
