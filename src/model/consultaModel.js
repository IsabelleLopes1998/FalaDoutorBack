class Consulta {
    constructor({
        id,
        data,
        hora,
        medicoId,
        pacienteId,
        valor,
        medicoNome,
        pacienteNome,
        planoSaudeNome,
    }) {
        this.id = id;
        this.data = data;
        this.hora = hora;
        this.medicoId = medicoId;
        this.pacienteId = pacienteId;
        this.valor = valor;
        this.medicoNome = medicoNome;
        this.pacienteNome = pacienteNome;
        this.planoSaudeNome = planoSaudeNome;
    }
}
module.exports = Consulta;