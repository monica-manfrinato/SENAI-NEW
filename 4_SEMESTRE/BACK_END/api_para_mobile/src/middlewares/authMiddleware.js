const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

// Validação de token 
const verificarToken = (req, res, next) => {
    // 1. Pega o cabeçalho "Authorization: Bearer <token>" 
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({mensagem: "Token não fornecido"})

    const token = authHeader.split(' ')[1]

    try {
        const decodificado = jwt.verify(token, JWT_SECRET)
        req.usuarioPapel = decodificado.usuarioPapel
        return next()

    } catch (erro) {
        return res.status(401).json({mensagem: 'Token inválido'})
    }
}

const verificarAdmin = (req,res,next) =>{
    if (req.usuarioPapel !== 'admin'){
        return res.status(403).json({mensagem: "Acesso restrito para administradores"})
    }
    return next()
}


module.exports = {verificarToken, verificarAdmin}