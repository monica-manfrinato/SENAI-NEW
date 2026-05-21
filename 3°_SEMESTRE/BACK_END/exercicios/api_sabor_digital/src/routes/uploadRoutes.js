const express = require('express');
const router = express.Router();

// 1. LIGAÇÃO COM O CONFIG: Importa a configuração do Multer
const upload = require('../config/multer');

// 2. LIGAÇÃO COM O CONTROLLER: Importa a lógica de resposta
const uploadController = require('../controllers/uploadController');

// 3. DEFINIÇÃO DA ROTA: Liga tudo no endpoint /upload
// Utilizamos o método POST para o envio dos arquivos
// O middleware 'upload.array' processa os arquivos antes de chegar no Controller
router.post('/upload', upload.array('arquivo', 10), uploadController.uploadFiles);

// EXPORTAÇÃO: Permite que o app.js utilize estas rotas
module.exports = router;