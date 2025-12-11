const ConsultaRepository = require('../repository/consultaRepository');
const PacienteRepository = require('../repository/pacienteRepository');
const MedicoPlanoSaudeRepository = require('../repository/medicoPlanoSaudeRepository');

const ConsultaService = {
    async listarTodos(){
        return ConsultaRepository.findAll();
    },
    async buscarPorId(id){
        return ConsultaRepository.findById(id);
    },
    async create(dados){
        const planoPaciente = await PacienteRepository.findPlanoSaudeDoPaciente(dados.pacienteId);
        const planosMedico = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(dados.medicoId);


        if(!planosMedico && !planoPaciente){
            throw new Error('Médico e Pacientenão possui planos de saúde cadastrados');
        };

        if(!planoPaciente){
            throw new Error('Paciente não possui plano de saúde cadastrado');
        };

        const medicoAtendePlano = planosMedico.some(
            plano => plano.id === planoPaciente.id
        );

        if(!medicoAtendePlano){
            throw new Error('Médico não atende o plano de saúde do paciente');
        }

        dados.valor = planoPaciente.valor;

        return ConsultaRepository.create(dados);
    },

    async atualizar(id, dados){
        return ConsultaRepository.update(id, dados);
    },

    async remover(id){
        return ConsultaRepository.delete(id);
    },
};

module.exports = ConsultaService;