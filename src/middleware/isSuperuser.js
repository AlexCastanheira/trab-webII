
const isSuperuser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'SUPERUSER') {
        return next();  // Permite o acesso
    }
    res.redirect('/access-denied');
};

module.exports = isSuperuser;
