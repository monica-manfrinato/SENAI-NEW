//interage com a view, definindo as respostas q serão enviadas para o usuário (prepara o JSON para enviar)
//só chama a service, salva em uma variável de resposta e manda

const ProdutoService = require('../services/produtoService')

class ProdutoController{
    async listarProduto(req,res){
        try {
            const resultado = await ProdutoService.listarProdutos()
            res.json(resultado)
            
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
        }
    }


    async buscarProdutoPorId(req,res){
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }


    async cadastrarProduto(req,res){
        try {
            const dadosDoProduto = {
                ...req.body, // pega todos os campos enviados no body
                imagem: req.file ? req.file.path : null // adiciona o caminho da imagem
            };
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }


    async atualizarProduto(req,res){
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }


    async apagarProduto(req,res){
        try {
            const resultado = await ProdutoService.apagarProduto(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }
}

module.exports = new ProdutoController()