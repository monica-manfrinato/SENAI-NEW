// ==============================================================================
// SERVIÇO DE USUÁRIOS (UsuarioService.js)
// Arquitetura MVC: Camada de Regras de Negócio (Business Logic)
//
// OBJETIVO PARA A PROVA:
// O Service é o "coração" da aplicação. Ele aplica regras de validação (e-mail único),
// executa a segurança (hash de senha com bcrypt) e orquestra a autenticação (JWT).
// Ele NÃO lida diretamente com requisições HTTP (função do Controller) nem faz 
// SQL puro (função do Repository).
// ==============================================================================

const UsuarioRepository = require("../repositories/UsuarioRepository");
const bcrypt = require("bcryptjs"); // Biblioteca para hashing seguro de senhas
const jwt = require("jsonwebtoken"); // Biblioteca para geração e assinatura de tokens de acesso
const JWT_SECRET = process.env.JWT_SECRET; // Chave secreta global do sistema

class UsuarioService {

  // --------------------------------------------------------------------------
  // 1. MÉTODO: registrarUsuario
  // Regra de Negócio: Impedir duplicidade de e-mail e nunca salvar senhas em texto puro.
  // --------------------------------------------------------------------------
  async registrarUsuario(dados) {
    const { nome, email, senha, papel } = dados;

    // VALIDAÇÃO 1: Verifica se já existe uma conta cadastrada com este e-mail
    const emailValidado = await UsuarioRepository.findByEmail(email);
    if (emailValidado) {
      // Lança um erro customizado que será capturado pelo 'catch' do Controller (HTTP 400)
      throw { status: 400, mensagem: "Email já cadastrado" };
    }

    // CONCEITO DE PROVA - CRIPTOGRAFIA DE SENHA (bcryptjs):
    // 1. Salt: String aleatória gerada para garantir que duas senhas iguais gerem hashes diferentes no banco.
    // 2. Hash: Algoritmo unidirecional (não existe função "descriptografar").
    const salt = await bcrypt.genSalt(10); // Custo de processamento = 10 rounds
    const senhaHash = await bcrypt.hash(senha, salt);

    // PASSO FINAL: Persiste o usuário no banco com a SENHA CRIPTOGRAFADA
    const idInserido = await UsuarioRepository.create({
      nome,
      email,
      senha: senhaHash, // Armazena a senha criptografada, NUNCA a senha original!
      papel,
    });

    return {
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso",
      id: idInserido,
    };
  }

  // --------------------------------------------------------------------------
  // 2. MÉTODO: login
  // Regra de Negócio: Autenticar credenciais e gerar o token de acesso (JWT) com RBAC.
  // --------------------------------------------------------------------------
  async login(dadosLogin) {
    const { email, senha } = dadosLogin;

    // ETAPA 1: Busca o usuário no banco pelo e-mail
    const usuario = await UsuarioRepository.findByEmail(email);

    // CONCEITO DE PROVA - SEGURANÇA EM MENSAGENS DE ERRO:
    // Retornamos "Email ou senha inválidos" em vez de "Email não encontrado".
    // Isso evita o ataque de "Enumeração de Usuários", onde um hacker descobre quais e-mails existem no sistema.
    if (!usuario) {
      throw { status: 401, mensagem: "Email ou senha inválidos" };
    }

    // ETAPA 2: Comparação de Senha
    // bcrypt.compare() pega a senha digitada em texto puro, aplica o mesmo hash e compara com o banco.
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw { status: 401, mensagem: "Email ou senha inválidos" };
    }

    // CONCEITO DE PROVA - GERAÇÃO DO TOKEN JWT (jwt.sign):
    // Parâmetro 1: Payload (dados públicos codificados dentro do token, como id e papel para o RBAC).
    // Parâmetro 2: JWT_SECRET (chave secreta do .env para assinar o token).
    // Parâmetro 3: Options (tempo de expiração do token).
    const token = jwt.sign(
      { id: usuario.id, usuarioPapel: usuario.papel }, // NOTA: usuarioPapel é lido pelo authMiddleware!
      JWT_SECRET,
      { expiresIn: '1h' } // Token expira automaticamente após 1 hora de emitido
    );

    // RETORNO DE SUCESSO:
    // Opcionalmente retorna os dados básicos do usuário para o front-end, OMITINDO o hash da senha!
    return {
      sucesso: true,
      mensagem: "Login realizado com sucesso",
      token, // O front-end/Postman guardará este token para as próximas requisições
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel
      }
    };
  }
}

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO SERVICE
// ------------------------------------------------------------------------------
module.exports = new UsuarioService();