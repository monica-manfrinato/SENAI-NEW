const multer = require('multer');
const path = require('path'); // Biblioteca nativa para manipular caminhos
const fs = require('fs');     // Biblioteca nativa para manipular o sistema de arquivos

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = 'uploads'; // Diretório base
        let subfolder = '';

        // Extrai a extensão e padroniza para minúsculo
        const ext = path.extname(file.originalname).toLowerCase();

        // Lógica de subpastas por tipo de arquivo
        if (ext === '.png') subfolder = 'PNG files';
        else if (ext === '.pdf') subfolder = 'PDF files';
        else if (ext === '.jpg') subfolder = 'JPG files';
        else subfolder = 'other files';

        // Une os caminhos: diretório atual + uploads + subpasta
        const uploadDir = path.join(__dirname, '..', '..', baseDir, subfolder);

        // Cria a pasta fisicamente se não existir (evita que a aplicação quebre)
        fs.mkdirSync(uploadDir, { recursive: true });

        cb(null, uploadDir);
    },

    // Gera um nome único usando a data atual e o nome original
    filename: (req, file, cb) => { 
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

module.exports = multer({ storage }); // Exporta a instância configurada


exports.uploadFiles = (req, res) => {
    // Verifica se os arquivos foram recebidos no req.files
    if (!req.files || req.files.length === 0) {
        // Se vazio, retorna erro 400 (conforme testado no Insomnia)
        return res.status(400).json({ message: "arquivo inválido" });
    }

    // Se houver arquivos, retorna sucesso com status 200
    return res.status(200).json({
        message: "arquivo recebido com sucesso"
    });
};


const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Importa a config
const uploadController = require('../controllers/uploadController'); // Importa o controller

// Define a rota POST /upload com o middleware para até 10 arquivos
router.post('/upload', upload.array('arquivo', 10), uploadController.uploadFiles);

module.exports = router;
