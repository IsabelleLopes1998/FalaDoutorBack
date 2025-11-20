const MedicoService = require('../services/medicoService');

const MedicoController = {

    async listar(req, res) {
        const medicos = await MedicoService.listarTodos();
        return res.json(medicos);
    },

    async buscarPorId(req, res) {
        const { id } = req.params;
        const medico = await MedicoService.buscarPorId(id);

        if (!medico) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }

        return res.json(medico);
    },

    async criar(req, res) {
        const { nomeCompleto, cpf, crm, dataNascimento, planosSaude } = req.body;

        const novoMedico = await MedicoService.criar({
            nomeCompleto,
            cpf,
            crm,
            dataNascimento,
            planosSaude
        });

        return res.status(201).json(novoMedico);
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { nomeCompleto, cpf, crm, dataNascimento, planosSaude } = req.body;

        const medicoAtualizado = await MedicoService.atualizar(id, {
            nomeCompleto,
            cpf,
            crm,
            dataNascimento,
            planosSaude
        });

        if (!medicoAtualizado) {
            return res.status(404).json({ message: 'Médico não encontrado para atualização' });
        }

        return res.json(medicoAtualizado);
    },

    async remover(req, res) {
        const { id } = req.params;

        const removido = await MedicoService.remover(id);

        if (!removido) {
            return res.status(404).json({ message: 'Médico não encontrado para remoção' });
        }

        return res.status(204).send();
    },

};

module.exports = MedicoController;
