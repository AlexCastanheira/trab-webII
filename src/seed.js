const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        const existingSuperuser = await prisma.user.findFirst({
            where: { role: 'SUPERUSER' },
        });

        if (!existingSuperuser) {
            const password = await bcrypt.hash('8520', 10);
            const user = await prisma.user.create({
                data: {
                    username: 'Alex',
                    email: 'alex@gmail.com',
                    password: password,
                    role: 'SUPERUSER',
                },
            });
            console.log('Superuser criado: ', user);
        } else {
            console.log('Superuser já existe no banco.');
        }
    } catch (e) {
        console.error('Erro ao executar o seed:', e);
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = seedDatabase;

// Permite rodar o seed manualmente (usando `node src/seed.js`)
if (require.main === module) {
    seedDatabase();
}
