const ConsultaService = require('../services/consultaService');

const ConsultaController = {
    async listar(req, res) {
        const consultas = await ConsultaService.listarTodos();
        return res.json(consultas);
    },
    async buscarPorId(req, res) {
        const { id } = req.params;
        const consulta = await ConsultaService.buscarPorId(id);

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada' });
        }

        return res.json(consulta);
    },

    async criar(req, res) {
        const { data, hora, medicoId, pacienteId, valor } = req.body;
        const novaConsulta = await ConsultaService.create({ data, hora, medicoId, pacienteId, valor });
        return res.status(201).json(novaConsulta);
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { data, hora, medicoId, pacienteId, valor } = req.body;
        const consultaAtualizada = await ConsultaService.atualizar(id, { data, hora, medicoId, pacienteId, valor });

        if (!consultaAtualizada) {
            return res.status(404).json({ message: 'Consulta não encontrada para atualização' });
        }

        return res.json(consultaAtualizada);
    },
    async remover(req, res) {
        const { id } = req.params;
        const removida = await ConsultaService.remover(id);

        if (!removida) {
            return res.status(404).json({ message: 'Consulta não encontrada para remoção' });
        }

        return res.status(204).send();
    }
};

module.exports = ConsultaController;
