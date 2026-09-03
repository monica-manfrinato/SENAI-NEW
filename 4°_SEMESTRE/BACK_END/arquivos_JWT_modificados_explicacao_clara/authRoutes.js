// ==============================================================================
// ROTAS DE AUTENTICAÇÃO (authRoutes.js)
// Objetivo: Definir os pontos de entrada públicos da aplicação para registro e login.
//
// CONCEITO DE PROVA - ROTAS PÚBLICAS vs PROTEGIDAS:
// Este arquivo NÃO aplica middlewares de autenticação (como 'verificarToken'), pois
// qualquer visitante precisa ter livre acesso para criar uma conta ou fazer login.
// ==============================================================================

const express = require('express'); 
const router = express.Router(); // Instancia o roteador do Express para criar miniapplicações de rotas modularizadas
const UsuarioController = require('../controllers/UsuarioController'); // Importa a camada de controle responsável por responder às rotas

// ------------------------------------------------------------------------------
// 1. ROTA DE REGISTRO
// Endpoint completo: POST /auth/registrar (quando acoplado no index.js)
// ------------------------------------------------------------------------------
// CONCEITO DE PROVA - POR QUE MÉTODO POST?
// Usamos POST (e não GET) para requisições de autenticação e cadastro porque os dados 
// sensíveis (como a senha) devem trafegar dentro do corpo da requisição (req.body) 
// criptografados, em vez de ficarem visíveis e expostos no histórico da URL.
router.post('/registrar', UsuarioController.registrar); 

// ------------------------------------------------------------------------------
// 2. ROTA DE LOGIN
// Endpoint completo: POST /auth/login (quando acoplado no index.js)
// ------------------------------------------------------------------------------
// Recebe as credenciais (email/senha) e, em caso de sucesso, retorna o token JWT 
// assinado que o front-end utilizará nas chamadas para rotas protegidas.
router.post('/login', UsuarioController.login); 

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO ROTEADOR
// ------------------------------------------------------------------------------
// Exporta o roteador configurado para ser montado com o prefixo '/auth' dentro de src/routes/index.js
module.exports = router;