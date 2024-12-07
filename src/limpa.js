const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        // Excluir registros de logs de acesso
        await prisma.accessLog.deleteMany({});
        console.log("Todos os dados da tabela AccessLog foram apagados.");

        // Excluir permissões
        await prisma.access.deleteMany({});
        console.log("Todos os dados da tabela Access foram apagados.");

        // Excluir usuários
        await prisma.user.deleteMany({});
        console.log("Todos os dados da tabela User foram apagados.");

        console.log("Banco de dados completamente limpo.");
    } catch (error) {
        console.error('Erro ao limpar o banco de dados:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Executa o script ao ser chamado diretamente
if (require.main === module) {
    clearDatabase().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}

module.exports = clearDatabase;
