// ==============================================================================
// ROTAS DE PRODUTOS (produtoRoutes.js)
// Arquitetura MVC: Aplicação Prática do RBAC (Role-Based Access Control)
//
// OBJETIVO PARA A PROVA:
// Este arquivo exemplifica a separação entre ROTAS PÚBLICAS (qualquer cliente lê)
// e ROTAS PROTEGIDAS (apenas administradores autenticados alteram o banco).
// ==============================================================================

const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer'); // Middleware de upload de arquivos (Imagens)

// IMPORTAÇÃO DOS MIDDLEWARES DE SEGURANÇA:
// Desestruturamos do authMiddleware as duas barreiras de validação.
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// ------------------------------------------------------------------------------
// 1. ROTAS PÚBLICAS (Leitura do Cardápio/Produtos)
// ------------------------------------------------------------------------------
// CONCEITO DE PROVA:
// Não possuem middlewares de autenticação passados na cadeia de execução.
// Qualquer usuário (logado ou visitante anônimo) pode visualizar os produtos.

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);

// ------------------------------------------------------------------------------
// 2. ROTAS PROTEGIDAS POR PAPEL / RBAC (Criação, Edição e Remoção)
// ------------------------------------------------------------------------------
// CONCEITO DE PROVA - CADEIA DE EXECUÇÃO DE MIDDLEWARES (EXECUTION PIPELINE):
// O Express executa as funções na ordem exata em que são declaradas:
//
//  [ Requisição HTTP ] 
//          │
//          ▼
//   1. verificarToken   ---> Valida o JWT. Se for inválido, devolve 401 Unauthorized.
//          │                 Injeta o papel do usuário em `req.usuarioPapel`.
//          ▼
//   2. verificarAdmin   ---> Verifica se `req.usuarioPapel === 'admin'`. 
//          │                 Se for 'cliente', intercepta e devolve 403 Forbidden.
//          ▼
//   3. upload.single()  ---> Se passou pelos dois testes, processa o upload de imagem.
//          │
//          ▼
//   4. Controller       ---> Executa a lógica final no banco de dados.

// Rota de Cadastro: Exige Login + Permissão de Admin + Upload de Imagem
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.cadastrar);

// Rota de Edição: Exige Login + Permissão de Admin + Upload opcional de Imagem
router.put('/:id', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.atualizar);

// Rota de Exclusão: Exige Login + Permissão de Admin
router.delete('/:id', verificarToken, verificarAdmin, ProdutoController.deletar);

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO ROTEADOR
// ------------------------------------------------------------------------------
module.exports = router;