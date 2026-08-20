const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const upload = require('../config/multer');

router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.post('/', upload.single('imagem'), UsuarioController.cadastrar);
router.put('/:id', upload.single('imagem'), UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

module.exports = router;
