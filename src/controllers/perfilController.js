const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//caminho para uma imagem padrão
const DEFAULT_PROFILE_IMAGE = '/images/default-profile.jpg';

const renderProfile = async (req, res) => {
    const userId = req.session.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        //verifica se o usuário tem uma imagem no banco, caso contrário, usa a imagem padrão
        user.profileImage = user.profileImage || DEFAULT_PROFILE_IMAGE;

        res.render('perfil', { user });
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        res.status(500).send('Erro ao carregar o perfil.');
    }
};

const updateProfileImage = async (req, res) => {
    const userId = req.session.userId;

    try {
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        await prisma.user.update({
            where: { id: userId },
            data: { profileImage: imagePath }
        });

        //para carregar a imagem no momento que o user atualiza
        req.session.user.profileImage = imagePath || DEFAULT_PROFILE_IMAGE;
        res.redirect('/perfil');
    } catch (error) {
        console.error('Erro ao atualizar a imagem:', error);
        res.status(500).send('Erro ao atualizar a imagem.');
    }
};

module.exports = {
    renderProfile,
    updateProfileImage
};
