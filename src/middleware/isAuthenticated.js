
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        res.locals.accessGranted = true; // Define que o acesso foi autenticado
        return next();
    }
    res.locals.accessGranted = false; // não logado
    res.redirect('/auth/login');  //redireciona para a página de login
};

module.exports = isAuthenticated;
