
const hasPermission = (permission) => {
    return (req, res, next) => {
        const user = req.session.user;

        //verificar se o usuário está logado
        if (!user) {
            return res.redirect('/auth/login');
        }

        //permitir acesso total para SUPERUSER e ADMIN
        if (user.role === 'SUPERUSER' || user.role === 'ADMIN') {
            return next();
        }

        // Verificar se o usuário tem a permissão específica
        if (user.permissions && user.permissions.includes(permission)) {
            return next();
        }

        //se não tiver permissão, redirecionar para access-denied
        res.render('access-denied', { error: 'Você não tem permissão para acessar este módulo.' });
    };
};

module.exports = hasPermission;
