const JogoService = require('../services/JogoService');

class JogoController {
    listar(req, res) {
        const resultado = JogoService.listarJogos();
        res.json(resultado);
    }

    buscarPorId(req, res) {
        const resultado = JogoService.buscarJogoPorId(req.params.id);
        if(!resultado.sucesso) {
            return res.status(404).json(resultado);
        }
        res.json(resultado);
    }

    cadastrar(req, res) {
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Dados do novo jogo',
                schema: {
                    $nome: 'Jogo da Mônica',
                    $desenvolvedora: 'Monica's games',
                    $preco: 30.50,
                    $anoLancamento: 2009
                }
            }
        */
        const resultado = JogoService.cadastrarJogo(req.body);
        if(!resultado.sucesso) {
            return res.status(400).json(resultado);
        }
        res.status(201).json(resultado);
    }

    atualizar(req, res) {

        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados do novo jogo atualizado',
            schema: {
                nome: 'Jogo da Mônica atualizado',
                desenvolvedora: 'Monica's games',
                preco: 40.50,
                anoLancamento: 2009
                }
            }
        */
        const resultado = JogoService.atualizarJogo(req.params.id, req.body);
        if(!resultado.sucesso) {
            return res.status(404).json(resultado);
        }
        res.json(resultado);
    }

    deletar(req, res) {
        const resultado = JogoService.deletarJogo(req.params.id);
        if(!resultado.sucesso) {
            return res.status(404).json(resultado);
        }
        res.status(204).send();
    }
}

module.exports = new JogoController();
