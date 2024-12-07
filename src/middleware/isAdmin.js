
const isAdmin = (req, res, next) => {
    if (req.session.user && (req.session.user.role === 'SUPERUSER' || req.session.user.role === 'ADMIN')) {
        return next();  // Permite o acesso
    }
    res.redirect('/access-denied');
};

module.exports = isAdmin;
