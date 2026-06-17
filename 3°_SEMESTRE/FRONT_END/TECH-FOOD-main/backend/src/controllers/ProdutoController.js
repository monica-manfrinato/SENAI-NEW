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

async cadastrar(req, res) {
    try {
        // Logs para depuração
        console.log('Body:', req.body);
        console.log('File:', req.file);

        // Monta o objeto com os dados do produto
        const dadosDoProduto = {
        ...req.body,
        preco: req.body.preco ? Math.abs(parseFloat(req.body.preco)) : null,
        imagem: req.file ? req.file.path : null
        };


        // Chama o Service para salvar no banco
        const resultado = await ProdutoService.cadastrarProduto(dadosDoProduto);

        // Retorna resposta padronizada
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
            const resultado = await ProdutoService.deletarProduto(req.params.id);
            res.json(resultado);
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
