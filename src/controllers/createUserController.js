const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const userRole = req.session.user.role;

    //determinar os papéis que podem ser criados pelo usuário logado
    const allowedRoles = userRole === 'SUPERUSER' ? ['ADMIN', 'COMUM'] : ['COMUM'];

    // Verificar se o papel é permitido
    if (!allowedRoles.includes(role)) {
        return res.status(403).send("Você não tem permissão para criar esse tipo de usuário.");
    }

    try {
        //criptografar senha
        const hashedPassword = await bcrypt.hash(password, 10);

        //criar o usuário no banco
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            },
        });


        console.log("Usuário criado:", user);

        //redirecionar para a página de controle
        res.redirect('/userControl');
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).send("Ocorreu um erro ao criar o usuário.");
    }
};

module.exports = { createUser };
