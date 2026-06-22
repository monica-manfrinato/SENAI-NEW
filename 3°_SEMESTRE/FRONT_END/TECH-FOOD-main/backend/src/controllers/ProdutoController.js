const ProdutoService = require('../services/ProdutoService');

class ProdutoController {
    async listar(req, res) {
        try {
            const resultado = await ProdutoService.listarProdutos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

// async cadastrar(req, res) {
//     try {
//         // Logs para depuração
//         console.log('Body:', req.body);
//         console.log('File:', req.file);

//         // Monta o objeto com os dados do produto

//         // const dadosDoProduto = {
//         // ...req.body,
//         // preco: req.body.preco ? Math.abs(parseFloat(req.body.preco)) : null,
//         // imagem: req.file ? req.file.path : null
//         // };

//         const dadosDoProduto = {
//             nome: req.body.nome,
//             descricao: req.body.descricao,
//             preco: req.body.preco ? Math.abs(parseFloat(req.body.preco)) : null,
//             categoria: req.body.categoria,
//             disponivel: req.body.disponivel === "true" ? 1 : 0,
//             imagem: req.file ? req.file.path : null
//             };

//         // Chama o Service para salvar no banco
//         const resultado = await ProdutoService.cadastrarProduto(dadosDoProduto);

//         // Retorna resposta padronizada
//         res.status(201).json({
//             sucesso: true,
//             mensagem: "Produto cadastrado com sucesso",
//             resultado
//         });
//     } catch (erro) {
//         res.status(erro.status || 500).json({
//             sucesso: false,
//             mensagem: erro.mensagem || "Erro interno do servidor",
//             erro: erro.stack || erro
//         });
//     }
// }


    async cadastrar(req, res) {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const dadosDoProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco ? Math.abs(parseFloat(req.body.preco)) : null,
        categoria: req.body.categoria,
        disponivel: req.body.disponivel === "true" ? 1 : 0,
        imagem: req.file ? `uploads/${req.uploadSubfolder}/${req.file.filename}` : null
        };

        const resultado = await ProdutoService.cadastrarProduto(dadosDoProduto);

        res.status(201).json({
        sucesso: true,
        mensagem: "Produto cadastrado com sucesso",
        resultado
        });
    } catch (erro) {
        res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.mensagem || "Erro interno do servidor",
        erro: erro.stack || erro
        });
    }
    }
    async atualizar(req, res) {
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

async deletar(req, res) {
    try {
        const id = req.params.id;
        const existe = await ProdutoRepository.findById(id);

        if (!existe) {
        return res.status(404).json({ sucesso: false, mensagem: "Produto não encontrado" });
        }

        // Se o produto tinha imagem, apaga do disco
        if (existe.imagem) {
        const caminho = path.join(__dirname, "..", "..", existe.imagem);
        try {
            await fs.unlink(caminho);
        } catch (err) {
            console.error("Erro ao apagar imagem", err);
        }
        }

        // Só então apaga do banco
        await ProdutoRepository.delete(id);

        res.json({ sucesso: true, mensagem: "Produto apagado com sucesso" });

    } catch (erro) {
        res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.mensagem || "Erro interno do servidor",
        erro: erro.stack || erro
        });
    }
    }
}

module.exports = new ProdutoController();