// ==============================================================================
// CONTROLLER DE USUÁRIOS (UsuarioController.js)
// Arquitetura MVC: Camada de Controle (HTTP Handling)
//
// OBJETIVO PARA A PROVA:
// O Controller NÃO processa regras de negócio e NÃO acessa o Banco de Dados.
// Sua função é estritamente:
// 1. Receber as requisições HTTP (req) enviadas pelo cliente.
// 2. Repassar os dados para a Camada de Serviço (UsuarioService).
// 3. Devolver uma resposta HTTP adequada (res) com o código de status correto.
// ==============================================================================

const UsuarioService = require('../services/UsuarioService'); // Importa a camada de regras de negócio

class UsuarioController {

    // --------------------------------------------------------------------------
    // 1. MÉTODO: registrar
    // Rota: POST /auth/registrar
    // --------------------------------------------------------------------------
    async registrar(req, res) {
        try {
            // req.body: Contém os dados enviados no corpo da requisição (nome, email, senha, papel).
            // Delegamos a criação do usuário e o hash da senha para o UsuarioService.
            const resultado = await UsuarioService.registrarUsuario(req.body);

            // HTTP 201 Created = Recurso criado com sucesso.
            // Retorna o objeto contendo confirmação/dados do usuário recém-criado.
            res.status(201).json(resultado);

        } catch (erro) {
            // Tratamento Dinâmico de Erro:
            // Usa erro.status retornado pelo Service (ex: 400 se o email já existir).
            // Se não houver status definido, assume erro 500 (Internal Server Error).
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    // --------------------------------------------------------------------------
    // 2. MÉTODO: login
    // Rota: POST /auth/login
    // --------------------------------------------------------------------------
    async login(req, res) {
        try {
            // req.body: Contém as credenciais de acesso ({ email, senha }).
            // O Service verifica a senha e gera o Token JWT caso estejam corretas.
            const resultado = await UsuarioService.login(req.body);

            // HTTP 200 OK = Requisição bem-sucedida.
            // Retorna a resposta contendo a mensagem, dados básicos e o TOKEN JWT gerado.
            res.status(200).json(resultado);

        } catch (erro) {
            // Tratamento de Erro de Autenticação:
            // Caso a senha esteja errada ou o e-mail não exista, cai aqui.
            // HTTP 401 Unauthorized = Credenciais inválidas / não autorizado.
            res.status(erro.status || 401).json({
                sucesso: false,
                mensagem: erro.mensagem || "Credenciais inválidas",
                erro: erro.stack || erro
            });
        }
    }
}

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO CONTROLLER
// ------------------------------------------------------------------------------
// Instanciamos a classe (new UsuarioController()) ao exportar (Padrão Singleton).
// Isso permite usar diretamente UsuarioController.login no arquivo de rotas sem re-instanciar.
module.exports = new UsuarioController();