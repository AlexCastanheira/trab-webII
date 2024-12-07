const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkModuleAccess = (moduleName) => {
    return async (req, res, next) => {
        const userId = req.session.userId;


        //se for ADMIN ou SUPERUSER, ele tem permissão para todos os módulos
        const userRole = req.session.user.role;
        if (userRole === 'ADMIN' || userRole === 'SUPERUSER') {
            //gera log de acesso permitido para estes
            await prisma.accessLog.create({
                data: {
                    url: req.originalUrl,
                    granted: true,
                    userId: userId,
                },
            });

            return next(); //permite o acesso
        }

        try {
            //verifica as permissões do user no módulo específico
            const access = await prisma.access.findFirst({
                where: {
                    userId: userId,
                    module: moduleName,     //verifica o módulo solicitado
                    granted: true,          //verifica se o acesso foi concedido
                },
            });

            //se o acesso não for concedido, retorna acesso negado
            if (!access) {
                // Gera log de acesso negado (não tem permissão para o módulo)
                await prisma.accessLog.create({
                    data: {
                        url: req.originalUrl,    //URL acessada
                        granted: false,          //acesso negado
                        userId: userId,
                    },
                });

                return res.status(403).render('access-denied'); //permissão negada
            }

            // gera log de acesso permitido
            await prisma.accessLog.create({
                data: {
                    url: req.originalUrl,
                    granted: true,
                    userId: userId,
                },
            });

            return next();
        } catch (error) {
            console.error('Erro ao verificar permissões:', error);
            return res.status(500).render('error', { message: 'Erro interno no servidor.' });
        }
    };
};

module.exports = { checkModuleAccess };
