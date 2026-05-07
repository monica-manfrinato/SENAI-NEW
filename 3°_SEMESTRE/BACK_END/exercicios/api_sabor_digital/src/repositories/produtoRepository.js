//Acessa o banco de dados, então precisa ligar com o database q cuida dessa conexão
const pool = require('../config/database')

//trabalha mais com os métodos
class ProdutoRepository{ //nome bem direto ___ + Repository
    async listarProdutos(){
        const listaProdutos = await pool.query('SELECT * FROM produto')
        return listaProdutos
    }

    async buscarProdutoPorId(id){
        const mostrarProduto = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0]
    }

    async cadastrarProduto(dadosDoProduto){
        const resultadoCadastro = await pool.query('INSERT INTO produto SET ?', [dadosDoProduto])
        return resultadoCadastro.insertId
    }

    async atualizarProduto(id, dadosDoProduto){
        const camposProduto = []
        const dadoProduto = []

        for (const [key, value] of Object.entries(dadosDoProduto)){
            camposProduto.push(`${key} = ?`)
            dadosDoProduto.push(value)
        }

        if (camposProduto.length === 0) return null
        dadosDoProduto.push(id)

        const query = `UPDATE produto SET ${camposProduto.join(',')} WHERE id = ?`
        const resultado = await pool.query(query, dadoProduto)

        return resultado.affectedRows
    }

    async apagarProduto(id){
        await pool.query('DELETE FROM produto WHERE id = ? ', [id])
        return true
    }

}

module.exports = new ProdutoRepository()