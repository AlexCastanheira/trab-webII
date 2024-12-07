const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

const getUserList = async (req, res) => {
    try {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                profileImage: true,
                Access: {
                    select: {
                        module: true,
                    },
                },
            },
        });

        //transformar a lista de módulos de cada user num formato amigável
        const usersWithModules = users.map(user => ({
            ...user,
            modules: user.Access.map(access => access.module),
        }));

        res.render('userList', { users: usersWithModules });
    } catch (error) {
        console.error('Erro ao buscar usuários e permissões:', error);
        res.status(500).send('Erro ao carregar usuários');
    }
};

module.exports = { getUserList };
