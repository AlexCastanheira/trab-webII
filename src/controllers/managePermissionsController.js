const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

const getManagePermissions = async (req, res) => {
    try {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });

        res.render('managePermissions', { users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao carregar usuários');
    }
};

const editUserPermissions = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            include: { Access: true },
        });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        const modules = ['Financeiro', 'Produtos', 'Relatórios'];
        const userAccess = user.Access.map(a => a.module);

        res.render('editPermissions', {
            user,
            modules,
            userAccess,
        });
    } catch (error) {
        console.error('Erro ao carregar permissões:', error);
        res.status(500).send('Erro ao carregar permissões');
    }
};

const updateUserPermissions = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const permissions = req.body.permissions;

    try {
        // Remova todas as permissões existentes
        await prismaClient.access.deleteMany({ where: { userId } });

        // Adicione as novas permissões
        if (permissions) {
            const newAccess = Object.keys(permissions).map(module => ({
                userId,
                module,
                granted: true,
            }));
            await prismaClient.access.createMany({ data: newAccess });
        }

        res.redirect(`/managePermissions/${userId}/edit`);
    } catch (error) {
        console.error('Erro ao salvar permissões:', error);
        res.status(500).send('Erro ao salvar permissões');
    }
};



const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
        return res.status(400).send('ID inválido');
    }

    try {
        // Excluir permissões do usuário
        await prismaClient.access.deleteMany({ where: { userId } });

        // Excluir logs de acesso do usuário
        await prismaClient.accessLog.deleteMany({ where: { userId } });

        // Excluir o usuário
        await prismaClient.user.delete({ where: { id: userId } });

        res.redirect('/managePermissions');
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).send('Erro ao excluir usuário');
    }

};


module.exports = {
    getManagePermissions,
    editUserPermissions,
    deleteUser,
    updateUserPermissions,
};
