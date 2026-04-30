function validarId(id){
    if (!id ||isNaN(id)){
        return "ID inválido"
    }
    return null
}

function Catch(erro, res){
    res.status(500).json({
        erro: erro,
        sucesso: false
    })
}
// Exercício 1 - Produtos
app.get('/produtos', async (req, res) => {
    try {
        const listarProdutos = await queryAsync("SELECT * FROM produto")
        res.status(200).json({
            dados: listarProdutos,
            sucesso: true
            
        })

    } catch (erro) {
        Catch(erro, res)
        
    }
})

app.get('/produtos/:id', async (req, res) => {
    try {
        const id = req.params.id
        const erro = validarId(id)
        if (erro){
            return res.status(400).json({
                sucesso: false,
                mensagem: erro
            })
        }


        const exibirProduto = await queryAsync("SELECT * FROM produto WHERE id = ?", [id])
            if (exibirProduto.length === 0) {
                res.status(404).json({
                    sucesso: false
                })
            }
            else{
                res.status(200).json({
                    dados: exibirProduto[0],
                    sucesso: true
                })
            }
    } catch (erro) {
        Catch(erro, res)
    }
})



// Exercício 2 - Comentários

function validacaoDados(conteudo, idAutor){
    if (!conteudo || !idAutor){
        return `Conteúdo e o id do autor são campos obrigatórios`
    }
    return null

}
app.post('/comentarios', async (req, res) => {


    try {
        const { conteudo, idAutor } = req.body

       const erro = validacaoDados(conteudo, idAutor)
        
       if (erro){
        return res.status(400).json({
            mensagem: "Não foi possível realizar a postagem",
            erro: erro
        })}
        
      
       else{
        await queryAsync("INSERT INTO comentario SET ?", [{ texto: conteudo, autor_id: idAutor }])
        res.status(201).json({
            sucesso: true,
            mensagem: "Postagem realizada com sucesso!"
        })}
     
    } catch (erro) {
        Catch(erro,res)
    }
})

// Exercício 3 - Veículos

app.put('/v/:id', async (req, res) => {
    const identificador = req.params
    const body = req.body

    const carro = await queryAsync("SELECT * FROM veiculo WHERE id = ?", [identificador])

    if (carro.length === 0) {
        return res.send("inexistente")
    }

    await queryAsync("UPDATE veiculo SET ? WHERE id = ?", [body, identificador])

    res.send("atualizou")
})

app.delete('/v/:id', async (req, res) => {
    const i = req.params.id

    const c = await queryAsync("SELECT * FROM veiculo WHERE id = ?", [i])

    if (c.length === 0) {
        return res.send("inexistente")
    }

    await queryAsync("DELETE FROM veiculo WHERE id = ?", [i])

    res.send("deletado")
})





function validarCarro(carro, res){
    if (carro.length === 0) {
            return res.status(404)({
                sucesso: false,
                mensagem: "Veículo não encontrado"
            }
)}}

app.put('/veiculos/:id', async (req, res) => {

    try {

        const id = req.params.id
        const erro = validarId(id)
        if (erro){
            return res.status(400).json({
                sucesso: false,
                mensagem: erro
            })
        }

        const carro = await queryAsync("SELECT * FROM veiculo WHERE id = ?", [id])
        const erroValidacao = validarCarro(carro, res)

        if(erroValidacao){
            return res.status(400).json({
                sucesso: false,
                mensagem: "Não foi possível encontrar esse veículo"
            })
        }
        

        await queryAsync("UPDATE veiculo SET ? WHERE id = ?", [req.body, id])

        res.send("atualizou")


    } catch (erro) {
        Catch(erro, res)
    }
})




app.delete('/v/:id', async (req, res) => {

    try {
        
    } catch (erro) {
        Catch(erro, res)
    }

    const i = req.params.id

    const c = await queryAsync("SELECT * FROM veiculo WHERE id = ?", [i])

    if (c.length === 0) {
        return res.send("inexistente")
    }

    await queryAsync("DELETE FROM veiculo WHERE id = ?", [i])

    res.send("deletado")
})