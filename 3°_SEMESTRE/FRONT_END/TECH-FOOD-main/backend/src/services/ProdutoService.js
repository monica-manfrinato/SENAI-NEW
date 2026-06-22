const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {
    async listarProdutos() {
        const produtos = await ProdutoRepository.findAll();
        return {
            sucesso: true,
            dados: produtos,
            total: produtos.length
        };
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        return {
            sucesso: true,
            dados: produto
        };
    }

    //CADASTRO DO PRODUTO!!!!
    async cadastrarProduto(dadosDoProduto){
        let { nome, descricao, preco, categoria, disponivel, imagem } = dadosDoProduto;

        // Converte o preço para número
        preco = parseFloat(preco);

        if (!nome || !descricao || preco === undefined || isNaN(preco)){
            throw {
                status: 400,
                mensagem: 'Nome, descrição e preço são campos obrigatórios!'
            };
        }

        if (typeof preco !== 'number' || preco <= 0){
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            };
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel ?? true,
            imagem
        };

        const resultado = await ProdutoRepository.cadastrarProduto(novoProduto);

        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso",
            resultado
        };
    }


    async atualizarProduto(id, dados) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        const atualizado = {};
        const { nome, descricao, preco, categoria, disponivel } = dados;

        if (nome !== undefined) atualizado.nome = nome.trim();
        if (descricao !== undefined) atualizado.descricao = descricao.trim();
        if (preco !== undefined) {
            if (typeof preco !== "number" || preco <= 0) {
                throw { status: 400, mensagem: "Preço deve ser um número positivo" };
            }
            atualizado.preco = preco;
        }
        if (categoria !== undefined) atualizado.categoria = categoria;
        if (disponivel !== undefined) atualizado.disponivel = disponivel;

        if (Object.keys(atualizado).length === 0) {
            throw { status: 400, mensagem: "Nenhum dado válido enviado para atualização" };
        }

        await ProdutoRepository.update(id, atualizado);

        return {
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        };
    }

    async deletarProduto(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        await ProdutoRepository.delete(id);

        return {
            sucesso: true,
            mensagem: "Produto apagado com sucesso"
        };
    }
}

module.exports = new ProdutoService();
