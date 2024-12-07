const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/createUserController');
const isAdmin = require('../middleware/isAdmin');

// Rota para o formulário de criação de usuário
router.get('/createUser', isAdmin, (req, res) => {
    const userRole = req.session.user.role;

    // determinar os papéis permitidos para a criação de usuários
    let allowedRoles = ['COMUM']; //padrão para ADMIN
    if (userRole === 'SUPERUSER') {
        allowedRoles = ['ADMIN', 'COMUM']; // SUPERUSER pode criar ADMIN ou COMUM
    }

    res.render('createUser', { allowedRoles, user: req.session.user });
});


router.post('/createUser', isAdmin, createUser);

module.exports = router;
