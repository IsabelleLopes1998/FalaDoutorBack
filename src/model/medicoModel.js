class Medico{
    constructor({
        id,
        nomeCompleto,
        cpf,
        crm,
        dataNascimento,
        planosSaude
    }){
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.crm = crm;
        this.dataNascimento = dataNascimento;
        this.planosSaude = planosSaude;
    }
}

module.exports = Medico;