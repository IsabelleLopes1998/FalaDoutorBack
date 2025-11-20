class Medico{
    constructor({
        id,
        nomeCompleto,
        cpf,
        crm,
        dataNascimento,
    }){
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.crm = crm;
        this.dataNascimento = dataNascimento;
    }
}

module.exports = Medico;