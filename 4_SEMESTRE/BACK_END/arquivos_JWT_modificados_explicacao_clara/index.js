// ==============================================================================
// AGREGADOR DE ROTAS PRINCIPAL (routes/index.js)
// Arquitetura MVC: Centralizador de Endpoints da Aplicação
//
// OBJETIVO PARA A PROVA:
// Este arquivo funciona como o "hub" central da API. Em vez de declarar todas
// as rotas diretamente no server.js/app.js, importamos os módulos de rotas
// específicos por domínio (auth, produtos, pedidos) e os conectamos aqui.
// ==============================================================================

const express = require('express');
const router = express.Router(); // Instancia o roteador principal do Express

// ------------------------------------------------------------------------------
// IMPORTAÇÃO DOS MÓDULOS DE ROTAS
// ------------------------------------------------------------------------------
const produtoRoutes = require('./produtoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const authRoutes = require('./authRoutes');

// CONCEITO DE PROVA - ROTAS DESATIVADAS:
// 'usuarioRoutes' está comentado para evitar erros de execução (como chamar métodos 
// do Controller/Service que ainda não foram criados) enquanto o sistema foca no fluxo de auth.
// const usuarioRoutes = require('./usuarioRoutes');

// ------------------------------------------------------------------------------
// 1. ROTA BASE / HEALTH CHECK
// Endpoint: GET / (ou GET /api/)
// ------------------------------------------------------------------------------
// Utilizada para verificar se a API está online e respondendo corretamente.
router.get('/', (req, res) => {
    res.json({
        mensagem: "API SaborDigital funcionando 🍝",
        versao: "1.0.0",
        arquitetura: "MVC + SOLID (Refatorada)"
    });
});

// ------------------------------------------------------------------------------
// 2. REGISTRO E PREFIXAÇÃO DOS DOMÍNIOS DE ROTAS
// ------------------------------------------------------------------------------
// CONCEITO DE PROVA - router.use(prefixo, moduloDeRotas):
// Mapeia todos os endpoints definidos dentro dos arquivos de rota para um prefixo específico na URL.

// Rota pública de autenticação (Gera o prefixo /auth/registrar e /auth/login)
router.use('/auth', authRoutes);

// Rota de Usuários (Comentada temporariamente para manter o build estável)
// router.use('/usuarios', usuarioRoutes);

// Rotas protegidas ou públicas de negócio da aplicação:
router.use('/produtos', produtoRoutes);   // Acessa as rotas de produtoRoutes com o prefixo /produtos
router.use('/cardapios', cardapioRoutes); // Acessa as rotas de cardapioRoutes com o prefixo /cardapios
router.use('/pedidos', pedidoRoutes);     // Acessa as rotas de pedidoRoutes com o prefixo /pedidos

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO ROTEADOR CENTRAL
// ------------------------------------------------------------------------------
// Exportado para ser acoplado no arquivo principal da aplicação (ex: app.use('/api', router) no app.js/server.js)
module.exports = router;