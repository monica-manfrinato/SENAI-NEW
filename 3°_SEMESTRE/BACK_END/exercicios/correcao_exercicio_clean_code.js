function validarId(id) {
    if (!id || isNaN(id)) {
        return "ID inválido";
    }
    return null;
}


function mensagem(res,tipo){
res.status(404).json({ 
    sucesso: false, 
    mensagem: `${tipo} não encontrado` });
}

function verificarExistencia(resultado, res, tipo) {
    if (!resultado || resultado.length === 0) {
        mensagem(res,tipo)
        return false
    }
    return true
}


//Exercício 1 - Usuários

//GET USUÁRIOS
app.get('/usuarios', async (req, res) => {

    try {
    const listaUsuarios = await queryAsync("SELECT * FROM usuario")
        res.json({
            sucesso: true,
            dados: listaUsuarios,
            total: listaUsuarios.length
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

        if ( !verificarExistencia(usuario,res,'usuário')){
            return //ele para o código, então se não tiver um usuário lá, vai acabar aqui o GET e vai pular essa resposta de baixo (q seria a resposta de sucesso)
        }

        res.status(200).json({
            sucesso: true,
            id: id, 
            dados: usuario[0] //garante que vai exibir só o 1° elemento encontrado (caso de algum erro e 2 coisas tiverem o msm id, por segurança, colocamos [0] para garantir que somente 1 coisa será exibida)
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


function validarDadosPedido(cliente, valor){
    if (!cliente || valor === undefined){
        return "Cliente e valor são obrigatórios"
    }


    if (typeof valor !== 'number' || valor <= 0){ 
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Valor inválido'
            })
        }
    return null
}
app.post('/pedidos', async (req,res) =>{
    try {
        const erro = validarDadosPedido(req.body)

        if(erro){
            return res.status(400).json({
                sucesso:false,
                mensagem: erro
            })
        }

        const pedido = await queryAsync('INSERT INTO pedido SET ?', [req.body]) 
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

function mensagem(res){
res.status(404).json({ 
    sucesso: false, 
    mensagem: "Nenhum dado foi enviado" });
}


function validarDadosAtualizados (dados, res){

    if(Object.keys(dados).length === 0){
        mensagem(res)
        return false    
    }
    return true
}


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

        if (!verificarExistencia(sala,res, "Sala")){
            return
        }
        
        if (!validarDadosAtualizados(dados)){
            return
        }


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

        if (!verificarExistencia(sala,res, "Sala")){
            return
        }

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

