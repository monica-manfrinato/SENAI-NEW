const produtoRepository = require('../repositories/produtoRepository')
const fs = require('fs')
const path = require('path')

// Função para remover o arquivo fisicamente da pasta do projeto
function apagarFotoDoDisco(caminhoDaImagem) {
    if (!caminhoDaImagem) return;

    // Se o caminho não for absoluto, junta com o diretório raiz do projeto
    const caminhoAbsoluto = path.isAbsolute(caminhoDaImagem)
        ? caminhoDaImagem
        : path.join(process.cwd(), caminhoDaImagem);

    console.log("Tentando apagar arquivo no caminho:", caminhoAbsoluto); // Debug para testar

    fs.access(caminhoAbsoluto, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(caminhoAbsoluto, (erroDeletar) => {
                if (erroDeletar) {
                    console.error("Erro ao deletar arquivo:", erroDeletar);
                } else {
                    console.log("Arquivo deletado com sucesso do disco!");
                }
            });
        } else {
            console.error("Arquivo não encontrado no caminho especificado:", caminhoAbsoluto);
        }
    });
}
class ProdutoService {
    async listarProdutos() {
        const produtos = await produtoRepository.listarProdutos()
        return {
            sucesso: true,
            dados: produtos,
            total: produtos.length
        }
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" }
        }
        const produto = await produtoRepository.buscarProdutoPorId(id)
        if (!produto) {
            throw { status: 404, mensagem: 'Produto não encontrado' }
        }
        return { sucesso: true, dados: produto }
    }

    async cadastrarProduto(dadosDoProduto) {
        let { nome, descricao, preco, categoria, disponivel, imagem } = dadosDoProduto;
        preco = parseFloat(preco);
        
        if (!nome || !descricao || preco === undefined || isNaN(preco)) {
            throw { status: 400, mensagem: 'Nome, descrição e preço são campos obrigatórios!' };
        }
        if (typeof preco !== 'number' || preco <= 0) {
            throw { status: 400, mensagem: "Preço deve ser um número positivo" };
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel ?? true,
            imagem
        };
        
        const resultado = await produtoRepository.cadastrarProduto(novoProduto);
        return { sucesso: true, mensagem: "Produto cadastrado com sucesso", resultado };
    }

    async atualizarProduto(id, dadosDoProduto = {}) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" }
        }
        
        const produtoExistente = await produtoRepository.buscarProdutoPorId(id)
        if (!produtoExistente) {
            throw { status: 404, mensagem: "Produto não encontrado" }
        }

        const produtoAtualizado = {}
        const { nome, descricao, preco, categoria, disponivel, imagem } = dadosDoProduto || {}

        if (nome !== undefined && nome.trim() !== '') {
            produtoAtualizado.nome = nome.trim()
        }
        if (descricao !== undefined) {
            produtoAtualizado.descricao = descricao.trim()
        }
        if (preco !== undefined) {
            const precoConvertido = parseFloat(preco)
            if (isNaN(precoConvertido) || precoConvertido <= 0) {
                throw { status: 400, mensagem: "Preço deve ser um número positivo" }
            }
            produtoAtualizado.preco = precoConvertido
        }
        if (imagem !== undefined) {
            produtoAtualizado.imagem = imagem

            // ⚠️ SE FOI ENVIADA UMA NOVA IMAGEM, APAGA A IMAGEM ANTIGA DO DISCO
            if (produtoExistente.imagem) {
                apagarFotoDoDisco(produtoExistente.imagem)
            }
        }
        if (categoria !== undefined) {
            produtoAtualizado.categoria = categoria
        }
        if (disponivel !== undefined) {
            produtoAtualizado.disponivel = disponivel
        }

        if (Object.keys(produtoAtualizado).length === 0) {
            throw { status: 400, mensagem: 'Nenhum dado foi enviado para a atualização' }
        }

        await produtoRepository.atualizarProduto(id, produtoAtualizado)
        return { sucesso: true, mensagem: 'Produto atualizado com sucesso' }
    }

    async apagarProduto(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" }
        }

        const produtoExistente = await produtoRepository.buscarProdutoPorId(id)
        if (!produtoExistente) {
            throw { status: 404, mensagem: "Produto não encontrado" }
        }

        // ⚠️ SE O PRODUTO TIVER UMA IMAGEM, REMOVE ELA DO DISCO ANTES DE APAGAR DO BANCO
        if (produtoExistente.imagem) {
            apagarFotoDoDisco(produtoExistente.imagem)
        }

        // 🔍 ADICIONE ESTA LINHA PARA VER O QUE O BANCO DEVOLVEU:
        console.log("Objeto do produto retornado do banco:", produtoExistente);

        await produtoRepository.apagarProduto(id)
        return { sucesso: true, mensagem: 'Produto e imagem apagados com sucesso!' }
    }
}

module.exports = new ProdutoService()