// tabela de relacionamento entre medico e plano de saude
class MedicoPlanoSaude{
    constructor({
        medico_id,
        plano_saude_id
    }){
        this.medico_id = medico_id;
        this.plano_saude_id = plano_saude_id;
    }
}

module.exports = MedicoPlanoSaude;