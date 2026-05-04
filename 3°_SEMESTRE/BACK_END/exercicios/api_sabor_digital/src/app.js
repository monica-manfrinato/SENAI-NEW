const express = require('express')
const pool = require('./config/database') //para conseguir acessar o pool, que está dentro do database q está no config

const app = express()
app.use(express.json()) //faz o programa entender q as requisições trabalham com arquivos json

//Essa 'queryAsync' vai ser utilizada em qualquer requisição que precise conversar com o banco
const queryAsync = (sql, values=[]) =>{

//esse pool.query utiliza o pool (que foi criado no database para se conectar ao banco)
    return new Promise((resolve, reject) => {pool.query(sql, values, (err, results) => {
            if (err) reject (err)
            else resolve(results)
        })})
}

//GET TESTE

    app.get('/', (req,res) =>{ //teste padrão para saber se ta funcionando a comunicação
     res.send("API dos produtos ta funcionando ")
})
// GET ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get ('/produtos', async (req,res) =>{ //coloca o async pra informar q é assíncrona, e q vai ter q esperar uma resposta alguma hr

    try {
        const produtos = await queryAsync('SELECT * FROM produto ORDER BY id DESC')
        res.json({
            sucesso: true,
            dados:produtos,
            total: produtos.length
        })
    } 
    catch (erro) {
        console.error ('Erro ao listar produtos', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        })
    }
})


//GET COM ID

app.get('/produtos/:id', async (req, res) =>
{
    const{id} = req.params
    try{
        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de produto inválido"
            })
        }

        const produto = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])

        if(produto.length === 0 ){  //esse if direciona para o catch
        return res.status(404).json({ //404: erro de busca, elemento não encontrado
            sucesso: false,
            mensagem: 'Produto não encontrado'
        })
       }

       res.json({
        sucesso: true,
        id: id, 
        dados: produto
       })
    }

    catch(erro){
        console.error('Erro ao procurar produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao procurar produto',
            erro: erro.message
        })
    }
})



// POST ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/produtos', async (req,res) =>{
    try {
        const {nome, descricao, preco, disponibilidade} = req.body //requisição para cadastrar o novo produto
        if(!nome || !descricao || !preco){ //coloca o ! na frente, pra ver se título é falso, ou seja, está ausente, e nesse caso como ele é not null, não pode ser vazio
            return res.status(400).json( //400: erro onde o servidor não concluí o processo por falta de informação

                { //mensagem que será enviada ao front-end quando ocorrer o erro
                    sucesso: false,
                    mensagem: 'Nome, descrição, preço e status são obrigatórios!' //precisa validar no back também, pq não pode depender somente das validações do front, PRECISA SER FEITA A VALIDAÇÃO NOS DOIS!!!!
                }
            )
        }

        if (typeof preco !== 'number' || preco <= 0 ){ //garantir que o valor inserido é um número e que ele é maior que 0
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O preço deve ser um número positivo!'
            })
        }

        if (typeof disponibilidade !== 'boolean'){ 
            return res.status(400).json({
                sucesso: false,
                mensagem: 'A disponibilidade precisa estar em true or false!'
            })
        }

        const novoProduto = {
            nome: nome.trim(), 
            descricao: descricao.trim(),
            preco: preco, 
            disponivel: disponibilidade
        }

        const postagem = await queryAsync('INSERT INTO produto SET ?', [novoProduto]) //faz toda a função do insert into, funcionando até melgor do que a versão utilizada anteriormente no MySQL, MAIS SIMPLES É MELHOR!!!
        res.status(201).json({ //criação concluída
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso!',
            id: postagem.insertId
        } )
    } catch (erro) {

        console.error ('Erro ao salvar produto:', erro) //essa mensagem aparece no console
        res.status(500).json({ //status 500: erro do servidor
            sucesso:false,
            mensagem: 'Erro ao salvar produto.', //essa mensagem aparece para o usuário
            erro: erro.message
        })
    }
})

// PUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put('/produtos/:id', async (req,res) =>{
    const{id} = req.params
    const{nome, descricao, preco, disponibilidade} = req.body

    try{
            if(!id || isNaN(id)){
                 return res.status(400).json({
                 sucesso: false,
                 mensagem: "ID de produto inválido"
            })
        }
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])

        if (produtoExiste.length === 0){
            return res.status(404).json({
                sucesso:false,
                mensagem: 'Produto não encontrado'
            })
        }
        
        const produtoAtualizado = {}
        if(nome !== undefined) produtoAtualizado.nome = nome.trim()
        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if(preco !== undefined){
            if(typeof preco !== 'number' || preco <= 0 ){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O preço deve ser um número positivo'
                })
            }
            produtoAtualizado.preco = preco
        }
        if(disponibilidade !== undefined) produtoAtualizado.disponivel = disponibilidade

        if (Object.keys(produtoAtualizado).length === 0 )//função object faz uma análise dos objetos, e entre parenteses coloca o objeto a ser atualizado
            {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Nenhum campo para atualizar'
                })
            }
        
        await queryAsync('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id])
        res.json({
            sucesso:true,
            mensagem: 'Atualização feita com sucesso!'
        })
}

    catch (erro){
        console.error('Erro ao atualizar produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar produto',
            erro: erro.message
        })
    }
})

// DELETE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/produto/:id', async (req, res)=>{
    try {

        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID de produto inválido"
            })
        }
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])

        if (produtoExiste.length === 0){
            return res.status(404).json({
                sucesso:false,
                mensagem: 'Produto não encontrado'
            })
        }

        await queryAsync('DELETE FROM produto WHERE id =?', [id])
        res.status(200).json({
            sucesso:true,
            mensagem:'Produto apagado'
        })
    } 
    catch (erro) {
        console.error('Erro ao excluir produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao apagar produto',
            erro: erro.message
        })
    }
})



module.exports = app //precisa colocar isso, se n não vai rodar