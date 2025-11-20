const PlanoSaudeRepository = require('../repository/planoSaudeRepository');


const PlanoSaudeService = {

    async listarTodos(){
        return PlanoSaudeRepository.findAll()
    },

    async buscarPorId(id){
        return PlanoSaudeRepository.findById(id);
    },

    async criar(dados){
        return PlanoSaudeRepository.create(dados);
    },

    async atualizar(id, dados){
        return PlanoSaudeRepository.update(id, dados);
    },

    async remover(id){
        return PlanoSaudeRepository.delete(id);
    },
}


module.exports = PlanoSaudeService;