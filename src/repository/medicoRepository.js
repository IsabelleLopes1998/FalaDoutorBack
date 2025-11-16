const db = require('../config/database');
const Medico = require('../model/medicoModel');

const MedicoRepository ={

    async findAll(){
        const result = await db.query(
            'SELECT id, nome_completo, cpf, crm, data_nascimento, planos_saude FROM medicos'
        );

        return result.rows.map(
            (row) =>
                new Medico({
                    id: row.id,
                    nomeCompleto: row.nome_completo,
                    cpf: row.cpf,
                    crm: row.crm,
                    dataNascimento: row.data_nascimento,
                    planosSaude: row.planos_saude
                })
        );
    },

    async findById(id) {
        const result = await db.query(
            `SELECT id, nome_completo, cpf, crm, data_nascimento, planos_saude FROM medicos WHERE id = $1`,
            [id]
        )

        const row = result.rows[0];
        if(!row) return null;

        return new Medico({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            crm: row.crm,
            dataNascimento: row.data_nascimento,
            planosSaude: row.planos_saude
        });
    },

    async create({
        nomeCompleto,
        cpf,
        crm,
        dataNascimento,
        planosSaude
    }){
        const result = await db.query(
            `INSERT INTO medicos (nome_completo, cpf, crm, data_nascimento, planos_saude)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome_completo, cpf, crm, data_nascimento, planos_saude`,
           [nomeCompleto, cpf, crm, dataNascimento, planosSaude] 
        );

        const row = result.rows[0];
        return new Medico({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            crm: row.crm,
            dataNascimento: row.data_nascimento,
            planosSaude: row.planos_saude
        });
    },

    async update(id, {nomeCompleto, cpf, crm, dataNascimento, planosSaude}){

        const result = await db.query(
            `UPDATE medicos SET 
                nome_completo = $1, 
                cpf = $2, 
                crm = $3, 
                data_nascimento = $4, 
                planos_saude = $5::plano_saude[]
            WHERE id = $6
            RETURNING id, nome_completo, cpf, crm, data_nascimento, planos_saude`,
            [nomeCompleto, cpf, crm, dataNascimento, planosSaude, id]
        );

        const row = result.rows[0];
        if(!row) return null;

        return new Medico({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            crm: row.crm,
            dataNascimento: row.data_nascimento,
            planosSaude: row.planos_saude
        });
    },

    async delete(id){
        const result = await db.query(
            'DELETE FROM medicos WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    },
};

module.exports = MedicoRepository;