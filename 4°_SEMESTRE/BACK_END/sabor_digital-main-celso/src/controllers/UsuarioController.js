const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
    // Métodos de Autenticação solicitados:

    async registrar(req, res) {
        try {
            const resultado = await UsuarioService.registrarUsuario(req.body);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async login(req, res) {
        try {
            const resultado = await UsuarioService.login(req.body);
            res.status(200).json(resultado);
        } catch (erro) {
            res.status(erro.status || 401).json({
                sucesso: false,
                mensagem: erro.mensagem || "Credenciais inválidas",
                erro: erro.stack || erro
            });
        }
    }

    // Métodos do CRUD: NÃO ESTÃO SENDO IMPLEMENTADOS AINDA!

//     async listar(req, res) {
//         try {
//             const resultado = await UsuarioService.listarUsuarios();
//             res.json(resultado);
//         } catch (erro) {
//             res.status(erro.status || 500).json({
//                 sucesso: false,
//                 mensagem: erro.mensagem || "Erro interno do servidor",
//                 erro: erro.stack || erro
//             });
//         }
//     }

//     async buscarPorId(req, res) {
//         try {
//             const resultado = await UsuarioService.buscarUsuarioPorId(req.params.id);
//             res.json(resultado);
//         } catch (erro) {
//             res.status(erro.status || 500).json({
//                 sucesso: false,
//                 mensagem: erro.mensagem || "Erro interno do servidor",
//                 erro: erro.stack || erro
//             });
//         }
//     }

//     async atualizar(req, res) {
//         try {
//             const dados = { ...req.body, file: req.file };
//             // CORRIGIDO: Ajustada a letra maiúscula de 'atualizarusuario' para 'atualizarUsuario'
//             const resultado = await UsuarioService.atualizarUsuario(req.params.id, dados);
//             res.json(resultado);
//         } catch (erro) {
//             res.status(erro.status || 500).json({
//                 sucesso: false,
//                 mensagem: erro.mensagem || "Erro interno do servidor",
//                 erro: erro.stack || erro
//             });
//         }
//     }

//     async deletar(req, res) {
//         try {
//             const resultado = await UsuarioService.deletarUsuario(req.params.id);
//             res.json(resultado);
//         } catch (erro) {
//             res.status(erro.status || 500).json({
//                 sucesso: false,
//                 mensagem: erro.mensagem || "Erro interno do servidor",
//                 erro: erro.stack || erro
//             });
//         }
//     }
}

module.exports = new UsuarioController();