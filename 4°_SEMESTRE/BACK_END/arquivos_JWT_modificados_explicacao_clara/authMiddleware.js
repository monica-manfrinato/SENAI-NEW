// ==============================================================================
// MIDDLEWARE DE AUTENTICAÇÃO E AUTORIZAÇÃO (authMiddleware.js)
// Objetivo: Proteger rotas privadas verificando a validade do Token JWT
// e aplicando regras de controle de acesso baseadas em perfil (RBAC).
// ==============================================================================

const jwt = require('jsonwebtoken'); // Biblioteca para validar e decodificar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET; // Chave secreta importada do arquivo .env

// ------------------------------------------------------------------------------
// 1. MIDDLEWARE: verificarToken (Autenticação - "Quem é você?")
// ------------------------------------------------------------------------------
// Função: Garante que o usuário enviou um token válido e que não expirou.
const verificarToken = (req, res, next) => {

    // PASSO 1: Extrai o cabeçalho 'authorization' vindo da requisição HTTP (Postman/Front-end)
    const authHeader = req.headers.authorization;

    // Se o cabeçalho não existir, a requisição é bloqueada imediatamente.
    // HTTP 401 Unauthorized = Não Autenticado (falta de identificação).
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    // PASSO 2: O padrão do cabeçalho é a string "Bearer <TOKEN>".
    // Usamos .split(' ') para separar pelo espaço em branco e pegar o índice [1] (apenas a chave do token).
    const token = authHeader.split(' ')[1];

    try {
        // PASSO 3: jwt.verify() testa se o token foi assinado com a nossa JWT_SECRET.
        // Se o token for falso, manipulado ou expirado, essa linha lança um erro e cai no 'catch'.
        const decodificado = jwt.verify(token, JWT_SECRET);

        // PASSO 4: Injeção de Dados na Requisição!
        // Salvamos o perfil (ex: "admin" ou "cliente") retornado do token dentro do próprio objeto 'req'.
        // Isso permite que os próximos middlewares ou controllers acessem essa informação.
        req.usuarioPapel = decodificado.usuarioPapel;

        // PASSO 5: Autoriza a requisição a continuar para a próxima função/middleware na rota.
        return next();

    } catch (erro) {
        // Se o token estiver vencido ou for inválido/adulterado
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
};

// ------------------------------------------------------------------------------
// 2. MIDDLEWARE: verificarAdmin (Autorização / RBAC - "O que você pode fazer?")
// ------------------------------------------------------------------------------
// Função: Restringe a rota apenas para usuários cadastrados como 'admin'.
// IMPORTANTE: Este middleware SEMPRE deve ser colocado DEPOIS do 'verificarToken' nas rotas,
// pois ele depende da variável 'req.usuarioPapel' preenchida anteriormente.
const verificarAdmin = (req, res, next) => {

    // PASSO 1: Verifica se o perfil injetado no req pelo 'verificarToken' é diferente de 'admin'
    if (req.usuarioPapel !== 'admin') {
        // HTTP 403 Forbidden = Proibido (a API reconhece o usuário, mas ele NÃO tem permissão de acesso).
        return res.status(403).json({ mensagem: "Acesso restrito para administradores" });
    }

    // PASSO 2: Se for admin, permite avançar para o Controller
    return next();
};

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DOS MIDDLEWARES
// ------------------------------------------------------------------------------
// Exportamos em formato de objeto para permitir a desestruturação no arquivo de rotas:
// const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
module.exports = { verificarToken, verificarAdmin };