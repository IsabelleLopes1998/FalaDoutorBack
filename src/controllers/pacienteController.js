const PacienteService = require('../services/pacienteService');

const PacienteController = {
    
    async listar (req, res){
        const pacientes = await PacienteService.listarTodos();
        return res.json(pacientes)
    },

    async buscarPorId (req, res){
        const {id} = req.params;
        const paciente = await PacienteService.buscarPorId(id);

        if(!paciente){
            return res.status(404).json({message: 'Paciente não encontrado'});
        }

        return res.json(paciente);
    },

    async criar (req, res){
        const {nomeCompleto, cpf, dataNascimento, planoSaude} = req.body;

        const novoPaciente = await PacienteService.criar({
            nomeCompleto,
            cpf,
            dataNascimento,
            planoSaude
        });

        return res.status(201).json(novoPaciente);
    },

    async atualizar (req, res){
        const {id} = req.params;
        const {nomeCompleto, cpf, dataNascimento, planoSaude} = req.body;

        const pacienteAtualizado = await PacienteService.atualizar(id, {
            nomeCompleto,
            cpf,
            dataNascimento,
            planoSaude
        });

        if(!pacienteAtualizado){
            return res.status(404).json({message: 'Paciente não encontrado'});
        }

        return res.json(pacienteAtualizado)
    },

    async remover (req, res){
        const {id} = req.params;

        const removido = await PacienteService.remover(id);

        if(!removido){
            return res.status(404).json({message: 'Paciente não encontrado'});
        }

        return res.status(204).send()
    }

}

module.exports = PacienteController