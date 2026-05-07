//coloca as rotas que vem pro endpoint produto (então viria o produto antes, e essa parte é oq vem DEPOIS dele)

const express = require ('express')
const router = express.Router()
const ProdutoController = require('../controllers/produtoController')

router.get('/', ProdutoController.listarProduto)
router.get('/:id', ProdutoController.buscarProdutoPorId)
router.post('/', ProdutoController.cadastrarProduto)
router.put('/:id', ProdutoController.atualizarProduto)
router.delete('/:id', ProdutoController.apagarProduto)


module.exports = router