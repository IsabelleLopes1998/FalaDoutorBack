const PacienteRepository = require('../repository/pacienteRepository');

const PacienteService = {

    async listarTodos() {
        return PacienteRepository.findAll()
    },

    async buscarPorId(id) {
        return PacienteRepository.findById(id);
    },

    async criar(dados) {
        return PacienteRepository.create(dados);
    },

    async atualizar(id, dados) {
        return PacienteRepository.update(id, dados);
    },

    async remover(id) {
        return PacienteRepository.delete(id);
    },
}

module.exports = PacienteService;
