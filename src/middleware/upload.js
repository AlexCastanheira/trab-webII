const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Caminho absoluto para a pasta images
const imagesDir = path.join(__dirname, '../public/images');

//se não existir a pasta, cria ela
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// armazenamento das imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define o diretório onde serão armazenados
        cb(null, imagesDir);  //usa o caminho absoluto para a pasta
    },
    filename: (req, file, cb) => {
        //define o nome do arquivo (usa o timestamp para evitar nomes duplicados)
        cb(null, Date.now() + path.extname(file.originalname));  //mantem a extensão do arquivo
    }
});

//filtra apenas os arquivos de imagem
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas.'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
