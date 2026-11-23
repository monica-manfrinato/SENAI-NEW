require('dotenv').config()
const bcrypt = require("bcryptjs")
const crypto = require("crypto")


function gerarHashSenha(senha){
    return bcrypt.hashSync(senha, 10)
}

function criptografarCpf(cpf){
    const cifra= crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)

    return cifra.update(cpf, "utf8", "hex") + cifra.final("hex")
}

console.log('Hash da senha tatuagem123:', gerarHashSenha('tatuagem123'))
console.log('CPF 49026007821 criptografado:', criptografarCpf('49026007821'))
console.log('CPF 49026007822 criptografado:', criptografarCpf('49026007822'))
console.log('CPF 49026007823 criptografado:', criptografarCpf('49026007823'))