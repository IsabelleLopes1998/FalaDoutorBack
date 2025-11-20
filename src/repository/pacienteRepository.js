const db = require('../config/database');
const Paciente = require('../model/pacienteModel');


function mapPaciente(row) {
    return new Paciente({
      id: row.id,
      nomeCompleto: row.nome_completo,
      cpf: row.cpf,
      dataNascimento: row.data_nascimento,
      planoSaude: row.plano_id
        ? { id: row.plano_id, nome: row.plano_nome, valor: row.plano_valor }
        : null,
    });
  }
  
  const PACIENTE_QUERY = `
    SELECT
      p.id,
      p.nome_completo,
      p.cpf,
      p.data_nascimento,
      p.plano_saude_id,
      ps.id   AS plano_id,
      ps.nome AS plano_nome,
      ps.valor AS plano_valor
    FROM pacientes p
    LEFT JOIN planos_saude ps ON ps.id = p.plano_saude_id
  `;

const PacienteRepository = {

    async findAll(){
        const result = await db.query(
            `${PACIENTE_QUERY} ORDER BY p.nome_completo`
        );
        return result.rows.map(mapPaciente);
    },

    async findById(id){
        const result = await db.query(
            `${PACIENTE_QUERY} WHERE p.id = $1`,
            [id]
        );

        const row = result.rows[0];
        if(!row) return null;
        return mapPaciente(row);
    },

    async create({
        nomeCompleto,
        cpf,
        dataNascimento,
        planoSaudeId
    }){
        const result = await db.query(
            `INSERT INTO pacientes (nome_completo, cpf, data_nascimento, plano_saude_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [nomeCompleto, cpf, dataNascimento, planoSaudeId]
        );

        return this.findById(result.rows[0].id);
    },

    async update(id, {nomeCompleto, cpf, dataNascimento, planoSaudeId}){

        const result = await db.query(
            `UPDATE pacientes SET
                nome_completo = $1,
                cpf = $2,
                data_nascimento = $3,
                plano_saude_id = $4
            WHERE id = $5
            RETURNING id`,
            [nomeCompleto, cpf, dataNascimento,planoSaudeId, id]
        );
        if(!result.rows[0]) return null;
        return this.findById(result.rows[0].id);
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
