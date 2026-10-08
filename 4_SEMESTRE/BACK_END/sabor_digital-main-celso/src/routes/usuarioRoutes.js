//NÃO É NECESSÁRIO PQ SÓ ESTAMOS APLICANDO O REGISTRO E O LOGIN COM JWT, E N TODO O CRUD


// const express = require('express');
// const router = express.Router();
// const UsuarioController = require('../controllers/UsuarioController');
// const upload = require('../config/multer');

// // 1. Importar os middlewares de autenticação (ajuste o caminho do arquivo se necessário)
// const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// // 2. Aplicar os middlewares nas rotas desejadas
// router.get('/', verificarToken, verificarAdmin, UsuarioController.listar);
// router.get('/:id', verificarToken, UsuarioController.buscarPorId);
// router.post('/', verificarToken, upload.single('imagem'), UsuarioController.cadastrar);
// router.put('/:id', verificarToken, upload.single('imagem'), UsuarioController.atualizar);
// router.delete('/:id', verificarToken, verificarAdmin, UsuarioController.deletar);

// module.exports = router;