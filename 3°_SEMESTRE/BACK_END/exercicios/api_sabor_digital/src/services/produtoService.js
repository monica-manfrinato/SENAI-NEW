//faz as validações, confirmações (tipo se o o campo está preenchido se n dar erro)

const produtoRepository = require('../repositories/produtoRepository')

class ProdutoService{
    async listarProdutos(){
        const produtos = await ProdutoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
    }

    async buscarProdutoPorId(id){

        if(!id || isNaN(id)){
            throw{
                status: 400, 
                mensagem: "ID inválido"
            }
        }

        const produto = await ProdutoRepository.buscarProdutoPorId(id)

        if (!produto){
            throw{
                status:404,
                mensagem:'Produto não encontrado'
            }
        }

        return{
            sucesso: true,
            dados: produto
        }


        const produtos = await ProdutoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
    }

    async cadastrarProduto(dadosDoProduto){
        const {nome, descricao, preco, categoria, disponivel} = dados

        if (!nome || !descricao || preco === undefined){
            throw{
                status: 400,
                mensagem: 'Nome, descrição e preço são campos obrigatórios!'
            }
        }
        
        if (typeof preco !== 'number' || preco <=0){
            throw{
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel || true
        }

        const resultado = await ProdutoRepository.cadastrarProduto(novoProduto)

        return{
            sucesso:true,
            mensagem: "Produto cadastrado com sucesso",
            resultado
        }
    }

    async atualizarProduto(id, dadosDoProduto){

        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem:"ID inválido"
            }
        }

        const produtoId = await produtoRepository.buscarProdutoPorId(id)
        if(produtoId.length == 0){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        const produtoAtualizado = {}
        const {nome, descricao, preco, categoria, disponivel} = dadosDoProduto

        if (nome !== undefined && nome.trim() !== ' ') produtoAtualizado.nome = nome.trim()
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if (preco !== undefined){
            if (typeof preco !== 'number' || preco <= 0){
                throw{
                    status: 400,
                    mensagem: "Preço deve ser um número positivo"
                }
            }
        } 
        produtoAtualizado.preco = preco

        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        if (Object.keys(produtoAtualizado).length === 0){
            throw{
                status: 400,
                mensagem:'Nenhum dado foi enviado para a atualização'
            }
        }

        await ProdutoRepository.atualizarProduto(id, produtoAtualizado)
        
        return{
            sucesso:true,
            mensagem: 'Produto atualizado'

        }

    }

    async apagarProduto(id){
        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const idProduto = await ProdutoRepository.buscarProdutoPorId(id)
        if (!idProduto){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        await ProdutoRepository.apagarProduto(id)
        return{
            sucesso:true,
            mensagem:'Produto apagado!'
        }
     }
}

module.exports = new ProdutoService()