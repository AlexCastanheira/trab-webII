const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//função para obter os logs
const getAccessLogs = async (req, res) => {
    try {
        const accessLogs = await prisma.accessLog.findMany({
            orderBy: {
                createdAt: 'desc',  //ordena os logs pela data de criação (do mais recente ao mais antigo)
            },
            include: {
                user: true,  //inclui os dados do usuário que fez o acesso
            },
        });

        //renderiza a página de logs
        res.render('access-logs', { accessLogs });
    } catch (error) {
        console.error("Erro ao buscar logs:", error);
        res.status(500).render('error', { message: 'Erro ao carregar os logs.' });
    }
};

module.exports = { getAccessLogs };
