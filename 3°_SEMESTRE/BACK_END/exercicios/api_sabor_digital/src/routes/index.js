const express = require('express')
const router = express.Router()
const produtoRoutes = require('./produtoRoutes')
const pedidoRoutes = require('./pedidoRoutes')

router.get('/', (req, res) => {
    res.json({
        mensagem: 'API Sabor Digital rodando!',
        versao: '5.0.8'
    })
})

router.use('/produtos', produtoRoutes)
router.use('/pedidos', pedidoRoutes)

// Se não quiser mais upload separado, não use uploadRoutes aqui

module.exports = router
