const ProdutoRepository = require('../repositories/produtoRepository')

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
        const produtos = await ProdutoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
    }

    async atualizarProduto(id, dadosDoProduto){
        const produtos = await ProdutoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
     }

    async apagarProduto(id){
        const produtos = await ProdutoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
     }


}