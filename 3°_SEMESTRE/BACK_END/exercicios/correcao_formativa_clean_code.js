// ==========================================
// FUNÇÕES AUXILIARES DE VALIDAÇÃO
// ==========================================

function validarId(id) {
    if (!id || isNaN(id)) {
        return "ID inválido";
    }
    return null;
}

function verificarExistencia(item) {
    if (!item || item.length === 0) {
        return "Elemento não encontrado";
    }
    return null;
}

function verificarElementosObrigatorios(cliente, valor) {
    if (!cliente || !valor) {
        return "Nome do cliente e valor são campos obrigatórios!";
    }
    return null;
}

function catchFunction(erro, res){
        console.error('Erro ao executar processo', erro);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao executar processo',
            erro: erro.message
        });
}

// ==========================================
// EXERCÍCIO 1 - USUÁRIOS
// ==========================================

// GET USUÁRIOS
app.get('/usuarios', async (req, res) => {
    try {
        const listaUsuarios = await queryAsync("SELECT * FROM usuario");
        res.status(200).json({
            sucesso: true,
            dados: listaUsuarios,
            total: listaUsuarios.length
        });
    } catch (erro) {
        catchFunction(erro, res)
    }
});

// GET USUÁRIOS PELO ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const erroId = validarId(id);
        if (erroId) {
            return res.status(400).json({ 
                sucesso: false, 
                mensagem: erroId });
        }

        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [id]);


        const erroExistencia = verificarExistencia(usuario);
        if (erroExistencia) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: erroExistencia });
        }

        res.status(200).json({
            sucesso: true,
            id: id,
            dados: usuario[0]
        });

    } catch (erro) {
        catchFunction(erro, res)

    }
});

// ==========================================
// EXERCÍCIO 2 - PEDIDOS
// ==========================================

app.post('/pedidos', async (req, res) => {
    try {
        const { cliente, valor } = req.body;
        
        const erroObrigatorio = verificarElementosObrigatorios(cliente, valor);
        if (erroObrigatorio) {
            return res.status(400).json({ 
                sucesso: false, 
                mensagem: erroObrigatorio });
        }

        if (typeof valor !== 'number') {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O preço deve ser um número!'
            });
        }

        const novoPedido = {
            cliente: cliente.trim(),
            valor: valor
        };

        const pedido = await queryAsync('INSERT INTO pedido SET ?', [novoPedido]);
        res.status(201).json({
            sucesso: true,
            mensagem: 'Pedido cadastrado com sucesso!',
            id: pedido.insertId
        });
    } catch (erro) {
        catchFunction(erro, res)
    }
});

// ==========================================
// EXERCÍCIO 3 - SALAS
// ==========================================

app.put('/salas/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const dadosDaSala = req.body; 

        const erroId = validarId(id);
        if (erroId) {
            return res.status(400).json({ 
                sucesso: false, 
                mensagem: erroId });
        }

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id]);

        const erroExistencia = verificarExistencia(sala);
        if (erroExistencia) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: erroExistencia });
        }
        

        await queryAsync("UPDATE sala SET ? WHERE id = ?", [dadosDaSala, id]);
        
        res.status(200).json({
            sucesso: true,
            mensagem: 'Atualização feita com sucesso!'
        });

    } catch (erro) {
        catchFunction(erro, res)
    }
});

app.delete('/salas/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const erroId = validarId(id);
        if (erroId) {
            return res.status(400).json({ 
                sucesso: false, 
                mensagem: erroId });
        }
        
        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id]);

        const erroExistencia = verificarExistencia(sala);
        if (erroExistencia) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: erroExistencia });
        }

        await queryAsync('DELETE FROM sala WHERE id = ?', [id]);
        
        res.status(200).json({
            sucesso: true,
            mensagem: 'Sala apagada'
        });
    } catch (erro) {
        catchFunction(erro, res)
    }
});