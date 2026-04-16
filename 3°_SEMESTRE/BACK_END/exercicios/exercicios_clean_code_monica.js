function validarId(id) {
    if (!id || isNaN(id)) {
        return "ID inválido";
    }
    return null;
}

function verificarExistencia(item, res) {
    if (!item || item.length === 0) {
        return res.status(404).json({ sucesso: false, mensagem: "Elemento não encontrado" });
    }
}

function verificarElementosObrigatorios(cliente, valor, res) {
    if (!cliente || !valor) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Nome do cliente e valor são campos obrigatórios!"
        });
    }
}

//Exercício 1 - Usuários

//GET USUÁRIOS
app.get('/usuarios', async (req, res) => {

    try {
    const usuarios = await queryAsync("SELECT * FROM usuario")
        res.json({
            sucesso: true,
            dados: usuarios,
            total: usuarios.length
        })
    } 
    catch (erro) {
        console.error ('Erro ao listar usuários', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao listar usuários',
            erro: erro.message
        })
    }
})



//GET USUÁRIOS PELO ID

app.get('/usuarios/:id', async (req, res) => {

    try {

        const erro = validarId(id)
        if (erro){
            return res.status(400).json({
                sucesso:false,
                mensagem:erro
            })
        }

        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [req.params.id])

        verificarExistencia(usuario,res)

        res.json({
            sucesso: true,
            id: id, 
            dados: usuario
        })

        } 
    catch (erro) {
        console.error('Erro ao procurar usuário:', erro)
        res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao procurar usuário',
        erro: erro.message
        })
    }
})

//Exercício 2 - Pedidos

app.post('/pedidos', async (req,res) =>{
    try {
        const {cliente, valor} = req.body
        verificarElementosObrigatorios(cliente, valor)

        if (typeof valor !== 'number'){ 
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O preço deve ser um número!'
            })
        }

        const novoPedido = {
            cliente: cliente.trim(), 
            valor: valor
        }

        const pedido = await queryAsync('INSERT INTO pedido SET ?', [novoPedido]) 
        res.status(201).json({ 
            sucesso: true,
            mensagem: 'Pedido cadastrado com sucesso!',
            id: pedido.insertId
        } )
    } catch (erro) {

        console.error ('Erro ao salvar pedido:', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao salvar pedido.',
            erro: erro.message
        })
    }
})



//Exercício 3 - Salas

app.put('/salas/:id', async (req,res) =>{
    const{dadosDaSala} = req.body

    try{
        const erro = validarId(id)
        if (erro){
            return res.status(400).json({
                sucesso:false,
                mensagem:erro
            })
        }

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        verificarExistencia(sala,res)
        
        const salaAtualizada = {}
        if(dadosDaSala !== undefined) salaAtualizada.dados = dados.trim()
        
        await queryAsync("UPDATE sala SET ? WHERE id = ?", [dadosDaSala, id])
        res.json({
            sucesso:true,
            mensagem: 'Atualização feita com sucesso!'
        })
}

    catch (erro){
        console.error('Erro ao atualizar os dados da sala:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar os dados da sala',
            erro: erro.message
        })
    }
})



app.delete('/salas/:id', async (req, res) => {

    try {

        const erro = validarId(id)
        if (erro){
            return res.status(400).json({
                sucesso:false,
                mensagem:erro
            })
        }
        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        verificarExistencia(sala,res)

        await queryAsync('DELETE FROM sala WHERE id =?', [id])
        res.status(200).json({
            sucesso:true,
            mensagem:'Sala apagada'
        })
    } 
    catch (erro) {
        console.error('Erro ao excluir sala:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao apagar sala',
            erro: erro.message
        })
    }
})

