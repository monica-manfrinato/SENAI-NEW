const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const authRoutes = require('./authRoutes');
// const usuarioRoutes = require('./usuarioRoutes');

// Rota base (Root endpoint)
router.get('/', (req, res) => {
    res.json({
        mensagem: "API SaborDigital funcionando 🍝",
        versao: "1.0.0",
        arquitetura: "MVC + SOLID (Refatorada)"
    });
});

// Registrar domínios de rotas
router.use('/auth', authRoutes);
// router.use('/usuarios', usuarioRoutes);
router.use('/produtos', produtoRoutes);
router.use('/cardapios', cardapioRoutes);
router.use('/pedidos', pedidoRoutes);

module.exports = router;