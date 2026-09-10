// Nome do Arquivo (ex: authMiddleware.js, UsuarioService.js, etc.) 
// Caminho da Pasta (ex: src/middlewares/, src/services/, etc.) 
// Camada / Função (ex: Controller, Repository, Middleware, Config, Rotas, Service)


// ========================================== BLOCO 1  ========================================== 

const express = require('express'); 
const router = express.Router(); 
const ProdutoController = require('../controllers/ProdutoController'); 
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware'); 

router.get('/', ProdutoController.listar); 
router.post('/', verificarToken, verificarAdmin, ProdutoController.cadastrar); 
router.delete('/:id', verificarToken, verificarAdmin, ProdutoController.deletar); 

module.exports = router; 

// NOME ARQUIVO: produtoRoutes
// CAMINHO DA PASTA: src/routes/produtoRoutes
// CAMADA/FUNÇÃO: Informa as rotas de CRUD de produtos, agora adicionando as exigencias de verificação de token e de adimin dependendo da ação

//RESPOSTA IDEAL: Função: Mapeia os endpoints HTTP (GET, POST, DELETE) para o recurso de produtos e aplica a esteira de segurança com os middlewares verificarToken e verificarAdmin nas ações restritas
 

// ========================================== BLOCO 2  ========================================== 

const pool = require('../config/database'); 

class UsuarioRepository { 

    async findByEmail(email) { 
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]); 
        return rows[0]; 
    } 

    async create(dados) { 
        const { nome, email, senha, papel } = dados; 
        const [result] = await pool.query( 
            'INSERT INTO usuario (nome, email, senha, papel) VALUES (?, ?, ?, ?)', 
            [nome, email, senha, papel || 'cliente'] 
        ); 

        return result.insertId; 
    } 
} 

module.exports = new UsuarioRepository(); 

 // NOME ARQUIVO: usuarioRepository
// CAMINHO DA PASTA: src/repositories/usuarioRepository
// CAMADA/FUNÇÃO: É responsável pela persistencia, salvando os dados recebidos no banco

//RESPOSTA IDEAL:  Comunica-se diretamente com o banco de dados executando instruções SQL (SELECT para buscar por e-mail e INSERT para cadastrar novos registros)

// ========================================== BLOCO 3  ========================================== 

DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=root 
DB_NAME=sabordigital_celso 
DB_PORT=3306 
JWT_SECRET='k9mP2$vX8@zQ5!wL3%dN7&sB4*fY6-hJ1' 

// NOME ARQUIVO: .env
// CAMINHO DA PASTA: mesmo nível do src
// CAMADA/FUNÇÃO: Responsável por armazenar os valores de identificação do banco, além da chave secreta do middleware (corrige se estiver errado isso pfv)

//RESPOSTA IDEAL:Armazena dados sensíveis e credenciais do ambiente (conexão com o MySQL e segredo de criptografia do JWT), impedindo que senhas e chaves fiquem expostas diretamente no código-fonte.



// ========================================== BLOCO 4  ========================================== 

 
const UsuarioService = require('../services/UsuarioService'); 

class UsuarioController { 

    async login(req, res) { 
        try { 
            const resultado = await UsuarioService.login(req.body); 
            res.status(200).json(resultado); 
        } catch (erro) { 
            res.status(erro.status || 401).json({ 
                sucesso: false, 
                mensagem: erro.mensagem || "Credenciais inválidas" 
            }); 
        } 
    } 
} 

module.exports = new UsuarioController(); 

// NOME ARQUIVO: usuarioController
// CAMINHO DA PASTA: src/controllers/usuarioController
// CAMADA/FUNÇÃO: Responsável pelo try catch, recebendo a resposta da validação feita pelo service e enviando o res correto para o front
 
//RESPOSTA IDEAL: Recebe as requisições HTTP do cliente (req.body), delega a lógica de autenticação ao UsuarioService e devolve a resposta HTTP adequada (res.status(200) para sucesso ou o bloco catch tratando exceções)
 
// ========================================== BLOCO 5  ========================================== 

const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET; 

const verificarToken = (req, res, next) => { 
    const authHeader = req.headers.authorization; 
    if (!authHeader) return res.status(401).json({ mensagem: "Token não fornecido" }); 


    const token = authHeader.split(' ')[1]; 

    try { 
        const decodificado = jwt.verify(token, JWT_SECRET); 
        req.usuarioPapel = decodificado.usuarioPapel; 
        return next(); 
        
    } catch (erro) { 
        return res.status(401).json({ mensagem: 'Token inválido' }); 
    } 

}; 


const verificarAdmin = (req, res, next) => { 

    if (req.usuarioPapel !== 'admin') { 
        return res.status(403).json({ mensagem: "Acesso restrito para administradores" }); 
    } 
    return next(); 
}; 

module.exports = { verificarToken, verificarAdmin }; 

// NOME ARQUIVO: authMiddleware
// CAMINHO DA PASTA: src/middleware/authMiddleware
// CAMADA/FUNÇÃO: é responsável pelas validações de token e de admin (é isso? explica melhor pfv)

//RESPOSTA IDEAL:

// FUNCIONAMENTO DA ESTEIRA DE SEGURANÇA

// 1. verificarToken (Garante a Identidade / Status 401)
// ----------------------------------------------------------------------
// - Lê o cabeçalho Authorization enviado na requisição HTTP.
// - Se o cabeçalho não existir, interrompe o fluxo e bloqueia a requisição devolvendo o status 401 (Unauthorized).
// - Extrai o código do token utilizando split(' ') para separar da palavra Bearer.
// - Utiliza jwt.verify(token, JWT_SECRET) para conferir a assinatura e o prazo de validade.
// - Se o token for falso ou expirado, o bloco catch captura e retorna 401 (Unauthorized).
// - Se o token for válido, pega a informação do papel do usuário e injeta diretamente na requisição (req.usuarioPapel = decodificado.usuarioPapel), chamando next() para prosseguir.

// 2. verificarAdmin (Garante a Permissão / Status 403)
// ----------------------------------------------------------------------
// - Deve ser colocado na rota sempre após o verificarToken.
// - Checa a propriedade req.usuarioPapel que foi injetada no passo anterior.
// - Se a propriedade for diferente de 'admin' (por exemplo, 'cliente'), bloqueia a ação devolvendo o status 403 (Forbidden).
// - Se for 'admin', chama o next() e autoriza a requisição a chegar ao controller.


// ========================================== BLOCO 6  ========================================== 

const UsuarioRepository = require('../repositories/UsuarioRepository'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

class UsuarioService { 
    async login(dados) { 
        const usuario = await UsuarioRepository.findByEmail(dados.email); 
        if (!usuario) throw { status: 401, mensagem: "Email ou senha inválidos" }; 

        const senhaValida = await bcrypt.compare(dados.senha, usuario.senha); 
        if (!senhaValida) throw { status: 401, mensagem: "Email ou senha inválidos" }; 

        const token = jwt.sign( 
            { id: usuario.id, usuarioPapel: usuario.papel }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        ); 

        return { token, usuario: { id: usuario.id, nome: usuario.nome, papel: usuario.papel } }; 
    }
} 

module.exports = new UsuarioService(); 

// NOME ARQUIVO: usuarioService
// CAMINHO DA PASTA: src/services/usuarioService
// CAMADA/FUNÇÃO: realiza as validações e regras de negócio, pega od dados do repository e valida

//RESPOSTA IDEAL:

// Função: Orquestra o fluxo de autenticação do usuário realizando três etapas cruciais:

// 1. Busca os dados: Consulta o banco de dados chamando UsuarioRepository.findByEmail(dados.email) para verificar se a conta existe.
// 2. Valida a credencial: Compara a senha informada no login com a senha criptografada armazenada no banco através do método bcrypt.compare.
// 3. Gera o acesso: Emite o token de acesso gerando e assinando o JWT com jwt.sign, definindo o payload com o id e o papel do usuário, o tempo de expiração e a chave secreta (JWT_SECRET).