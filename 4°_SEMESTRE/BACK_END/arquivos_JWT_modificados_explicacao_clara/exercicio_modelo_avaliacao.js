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

// NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO:

 

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

 // NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO:


// ========================================== BLOCO 3  ========================================== 

DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=root 
DB_NAME=sabordigital_celso 
DB_PORT=3306 
JWT_SECRET='k9mP2$vX8@zQ5!wL3%dN7&sB4*fY6-hJ1' 

// NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO: 

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

// NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO:
 
 
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

// NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO:


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

// NOME ARQUIVO:
// CAMINHO DA PASTA:
// CAMADA/FUNÇÃO: