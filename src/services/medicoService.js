const MedicoRepository = require('../repository/medicoRepository');

const MedicoService = {

    async listarTodos(){
        return MedicoRepository.findAll();
    },

    async buscarPorId(id){
        return MedicoRepository.findById(id);
    },

    async criar(dados){
        return MedicoRepository.create(dados);
    },

    async atualizar(id,dados){
        return MedicoRepository.update(id, dados);
    },

    async remover(id){
        return MedicoRepository.delete(id);
    },
};

module.exports = MedicoService;