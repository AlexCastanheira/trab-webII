const express = require('express');
const router = express.Router();
const {
    getManagePermissions,
    editUserPermissions,
    deleteUser,
    updateUserPermissions,
} = require('../controllers/managePermissionsController');

const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');


router.use(isAuthenticated);


router.get('/', isAdmin, getManagePermissions);

router.get('/:userId/edit', isAdmin, editUserPermissions);

router.post('/:userId/delete', isAdmin, deleteUser);

router.post('/:userId/update', isAdmin, updateUserPermissions);




module.exports = router;
