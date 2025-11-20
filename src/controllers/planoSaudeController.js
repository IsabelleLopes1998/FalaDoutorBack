const PlanoSaudeService = require('../services/planoSaudeService')

const PlanoSaudeController = {

     async listar (req, res){
        const planosSaude = await PlanoSaudeService.listarTodos();
        return res.json(planosSaude);
    },

    async buscarPorId (req, res){
        const {id} = req.params;
        const plano = await PlanoSaudeService.buscarPorId(id);

        if(!plano){
            return res.status(404).json({message: 'Plano de Saúde não encontrado'});
        }

        return res.json(plano);
    },

    async criar (req, res){
        const {nome, valor} = req.body;

        const novoPlano = await PlanoSaudeService.criar({
            nome,
            valor
        });

        return res.status(201).json(novoPlano);
    },

    async atualizar (req, res) {
        const {id} = req.params;
        const {nome, valor}= req.body;

        const planoAtualizado = await PlanoSaudeService.atualizar(id, {
            nome,
            valor
        });

        if(!planoAtualizado){
            return res.status(404).json({message: 'Plano de Saúde não encontrado para atualização'});
        }

        return res.json(planoAtualizado);
    },

    async remover (req, res) {
        const {id} = req.params;

        const removido = await PlanoSaudeService.remover(id);

        if(!removido){
            return res.status(404).json({message: 'Plano de Saúde não encontrado para remoção'});
        }

        return res.status(204).send();
    },
    
};

module.exports = PlanoSaudeController;
