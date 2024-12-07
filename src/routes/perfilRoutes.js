
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const upload = require('../middleware/upload');
const perfilController = require('../controllers/perfilController');

router.get('/perfil', isAuthenticated, perfilController.renderProfile);


router.post('/perfil', isAuthenticated, upload.single('image'), perfilController.updateProfileImage);

module.exports = router;
