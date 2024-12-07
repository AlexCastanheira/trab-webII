const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { email, password } = req.body;


    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (user) {
        //verificar se a senha bate com o hash do banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            //armazenar as informações do usuário na sessão
            req.session.user = user;
            req.session.userId = user.id;
            req.session.user.image = user.profileImage


            console.log('Usuário logado', user);

            //redireciona para lista de usuarios depois do login
            return res.redirect('/userList');
        }
    }


    res.render('login', { error: 'Email ou senha incorretos' });

}

module.exports = { login };
