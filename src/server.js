
const express = require('express');
const session = require('express-session');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedDatabase = require('./seed');

const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();


app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));



const authRoutes = require('./routes/authRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const relatoriosRoutes = require('./routes/relatoriosRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userControlRoutes = require('./routes/userControlRoutes');
const managePermissionsRoutes = require('./routes/managePermissionsRoutes');
const createUserRoutes = require('./routes/createUserRoutes');
const userListRoutes = require('./routes/userListRoutes');
const accessLogRoutes = require('./routes/accessLogRoutes');






app.use('/auth', authRoutes);
app.use(financeiroRoutes);
app.use(produtosRoutes);
app.use(relatoriosRoutes);
app.use(perfilRoutes);
app.use(dashboardRoutes);
app.use(userControlRoutes);
app.use('/managePermissions', managePermissionsRoutes);
app.use(createUserRoutes);
app.use(userListRoutes);
app.use(accessLogRoutes);



app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

//rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout');
        }
        res.redirect('/auth/login');
    });
});

(async () => {
    console.log('Criando um SUPERUSER inicial: Login: alex@gmail.com - senha: 8520');
    await seedDatabase();
})();

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
