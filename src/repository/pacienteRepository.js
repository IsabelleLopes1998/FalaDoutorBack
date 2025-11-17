const db = require('../config/database');
const Paciente = require('../model/pacienteModel');


const PacienteRepository = {

    async findAll(){
        const result = await db.query(
            'SELECT id, nome_completo, cpf, data_nascimento, plano_saude FROM pacientes'
        );

        return result.rows.map(
            (row) => new Paciente({
                id: row.id,
                nomeCompleto: row.nome_completo,
                cpf: row.cpf,
                dataNascimento: row.data_nascimento,
                planoSaude: row.plano_saude
            })
        );
    },

    async findById(id){
        const result = await db.query(
            `SELECT id, nome_completo, cpf, data_nascimento, plano_saude FROM pacientes WHERE id = $1`,
            [id]
        );

        const row = result.rows[0];
        if(!row) return null;

        return new Paciente({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            dataNascimento: row.data_nascimento,
            planoSaude: row.plano_saude
        });
    },

    async create({
        nomeCompleto,
        cpf,
        dataNascimento,
        planoSaude
    }){
        const result = await db.query(
            `INSERT INTO pacientes (nome_completo, cpf, data_nascimento, plano_saude)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome_completo, cpf, data_nascimento, plano_saude`,
            [nomeCompleto, cpf, dataNascimento, planoSaude]
        );

        const row = result.rows[0];
        return new Paciente({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            dataNascimento: row.data_nascimento,
            planoSaude: row.plano_saude
        });
    },

    async update(id, {nomeCompleto, cpf, dataNascimento, planoSaude}){

        const result = await db.query(
            `UPDATE pacientes SET
                nome_completo = $1,
                cpf = $2,
                data_nascimento = $3,
                plano_saude = $4
            WHERE id = $5
            RETURNING id, nome_completo, cpf, data_nascimento, plano_saude`,
            [nomeCompleto, cpf, dataNascimento, planoSaude, id]
        );
        const row = result.rows[0];
        if(!row) return null;

        return new Paciente({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            dataNascimento: row.data_nascimento,
            planoSaude: row.plano_saude
        });
    },

    async delete(id){
        const result = await db.query(
            'DELETE FROM pacientes WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    },
};

module.exports = PacienteRepository;