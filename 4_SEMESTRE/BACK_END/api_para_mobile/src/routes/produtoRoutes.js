const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer');

// Importação dos middlewares de autenticação
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Rotas públicas (qualquer pessoa visualiza o cardápio)
router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);

// Rotas protegidas (exigem login e permissão de admin)
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.cadastrar);
router.put('/:id', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, ProdutoController.deletar);

module.exports = router;