class Paciente{
    constructor({id,
        nomeCompleto,
        cpf,
        dataNascimento,
        planoSaude
    }){
        this.id = id,
        this.nomeCompleto = nomeCompleto,
        this.cpf = cpf,
        this.dataNascimento = dataNascimento,
        this.planoSaude= planoSaude
    }
}

module.exports= Paciente;