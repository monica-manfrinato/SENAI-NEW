const UsuarioRepository = require("../repositories/UsuarioRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


class UsuarioService {
  async registrarUsuario(dados) {
    const { nome, email, senha, papel } = dados;

    const emailValidado = await UsuarioRepository.findByEmail(email);
    if (emailValidado) {
      throw { status: 400, mensagem: "Email já cadastrado" };
    }
    //Criptografando a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    //Salvando senha no banco
    const idInserido = await UsuarioRepository.create({
      nome,
      email,
      senha: senhaHash,
      papel,
    });
    return {
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso",
      id: idInserido,
    };
  }

  async login(dadosLogin) {
    const { email, senha } = dadosLogin;

    //Verificando email
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw { status: 401, mensagem: "Email ou senha inválidos" };
    }

    //Verificando se a senha digitada corresponde com a criptografada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw { status: 401, mensagem: "Email ou senha inválidos" };
    }

    //Gerar token com JWT (criptografando os dados)
    const token = jwt.sign(
        { id: usuario.id, papel: usuario.papel},
        JWT_SECRET,
        {expiresIn: '1h'} //define o tempo pelo qual esse toeken é válido
    )

    return {
      sucesso: true,
      mensagem: "Login realizado com sucesso",
      token,
      usuario:{
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel
      }
    };
  }
}
module.exports = new UsuarioService();
