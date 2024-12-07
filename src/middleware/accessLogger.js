const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logAccess = async (req, res, next) => {
    const userId = req.session.userId || null;
    const url = req.originalUrl;
    const isAllowed = res.locals.accessGranted || false;

    try {
        // Salva o log no banco de dados
        await prisma.accessLog.create({
            data: {
                url,
                granted: isAllowed,
                userId: userId,
            },
        });
    } catch (error) {
        console.error('Erro ao registrar log de acesso:', error);
    }

    next();
};

module.exports = logAccess;
