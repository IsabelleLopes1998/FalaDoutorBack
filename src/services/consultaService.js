const ConsultaRepository = require('../repository/consultaRepository');
const PacienteRepository = require('../repository/pacienteRepository');
const MedicoPlanoSaudeRepository = require('../repository/medicoPlanoSaudeRepository');

const ConsultaService = {
    /**
     * Valida se a consulta está válida:
     * 1. Plano do paciente está na lista de planos do médico
     * 2. Valor da consulta corresponde ao valor do plano
     * @param {number} medicoId - ID do médico
     * @param {number} pacienteId - ID do paciente
     * @param {number} valorConsulta - Valor informado da consulta
     * @returns {Promise<{valida: boolean, planoPaciente: object|null, planosMedico: array}>}
     */
    async validarConsulta(medicoId, pacienteId, valorConsulta) {
        const planoPaciente = await PacienteRepository.findPlanoSaudeDoPaciente(pacienteId);
        const planosMedico = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(medicoId);

        if (!planoPaciente) {
            return {
                valida: false,
                planoPaciente: null,
                planosMedico: planosMedico || []
            };
        }

        if (!planosMedico || planosMedico.length === 0) {
            return {
                valida: false,
                planoPaciente,
                planosMedico: []
            };
        }

        const medicoAtendePlano = planosMedico.some(
            plano => plano.id === planoPaciente.id
        );

        if (!medicoAtendePlano) {
            return {
                valida: false,
                planoPaciente,
                planosMedico
            };
        }

        const valorCorresponde = parseFloat(valorConsulta) === parseFloat(planoPaciente.valor);

        return {
            valida: medicoAtendePlano && valorCorresponde,
            planoPaciente,
            planosMedico
        };
    },

    async listarTodos() {
        return ConsultaRepository.findAll();
    },
    async buscarPorId(id) {
        return ConsultaRepository.findById(id);
    },
    async create(dados) {
        const planoPaciente = await PacienteRepository.findPlanoSaudeDoPaciente(dados.pacienteId);
        const planosMedico = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(dados.medicoId);


        if (!planosMedico && !planoPaciente) {
            throw new Error('Médico e Pacientenão possui planos de saúde cadastrados');
        };

        if (!planoPaciente) {
            throw new Error('Paciente não possui plano de saúde cadastrado');
        };

        const medicoAtendePlano = planosMedico.some(
            plano => plano.id === planoPaciente.id
        );

        if (!medicoAtendePlano) {
            throw new Error('Médico não atende o plano de saúde do paciente');
        }

        dados.valor = planoPaciente.valor;

        const validacao = await this.validarConsulta(dados.medicoId, dados.pacienteId, dados.valor);
        dados.status = validacao.valida ? 'valida' : 'invalida';

        return ConsultaRepository.create(dados);
    },

    async atualizar(id, dados) {
        
        const validacao = await this.validarConsulta(dados.medicoId, dados.pacienteId, dados.valor);
        dados.status = validacao.valida ? 'valida' : 'invalida';

        return ConsultaRepository.update(id, dados);
    },

    async remover(id) {
        return ConsultaRepository.delete(id);
    },
};

module.exports = ConsultaService;