const db = require('../config/database');
const Consulta = require('../model/consultaModel');

const ConsultaRepository = {
    async findAll() {
        const result = await db.query(
            `SELECT 
                c.id, 
                c.data, 
                c.hora, 
                c.medico_id, 
                c.paciente_id, 
                c.valor,
                c.status,
                m.nome_completo AS medico_nome,
                p.nome_completo AS paciente_nome,
                ps.nome AS plano_saude_nome
            FROM consultas c
            INNER JOIN medicos m ON c.medico_id = m.id
            INNER JOIN pacientes p ON c.paciente_id = p.id
            LEFT JOIN planos_saude ps ON p.plano_saude_id = ps.id
            ORDER BY c.data DESC, c.hora DESC`
        );

        return result.rows.map(row => new Consulta({
            id: row.id,
            data: row.data,
            hora: row.hora,
            medicoId: row.medico_id,
            pacienteId: row.paciente_id,
            valor: row.valor,
            status: row.status,
            medicoNome: row.medico_nome,
            pacienteNome: row.paciente_nome,
            planoSaudeNome: row.plano_saude_nome
        }));
    },

    async findById(id) {
        const result = await db.query(
            `SELECT 
                c.id, 
                c.data, 
                c.hora, 
                c.medico_id, 
                c.paciente_id, 
                c.valor,
                c.status,
                m.nome_completo AS medico_nome,
                p.nome_completo AS paciente_nome,
                ps.nome AS plano_saude_nome
            FROM consultas c
            INNER JOIN medicos m ON c.medico_id = m.id
            INNER JOIN pacientes p ON c.paciente_id = p.id
            LEFT JOIN planos_saude ps ON p.plano_saude_id = ps.id
            WHERE c.id = $1`,
            [id]
        );
        const row = result.rows[0];
        if (!row) return null;

        return new Consulta({
            id: row.id,
            data: row.data,
            hora: row.hora,
            medicoId: row.medico_id,
            pacienteId: row.paciente_id,
            valor: row.valor,
            status: row.status,
            medicoNome: row.medico_nome,
            pacienteNome: row.paciente_nome,
            planoSaudeNome: row.plano_saude_nome
        })
    },
    async create(consulta) {
        const result = await db.query(
            `INSERT INTO consultas (data, hora, medico_id, paciente_id, valor, status) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, data, hora, medico_id, paciente_id, valor, status`,
            [consulta.data, consulta.hora, consulta.medicoId, consulta.pacienteId, consulta.valor, consulta.status]
        );
        const row = result.rows[0];

        return new Consulta({
            id: row.id,
            data: row.data,
            hora: row.hora,
            medicoId: row.medico_id,
            pacienteId: row.paciente_id,
            valor: row.valor,
            status: row.status
        })
    },
    async update(id, consulta) {
        const result = await db.query(
            `UPDATE consultas 
            SET data = $1, 
                hora = $2, 
                medico_id = $3, 
                paciente_id = $4, 
                valor = $5,
                status = $6
            WHERE id = $7 
            RETURNING id, data, hora, medico_id, paciente_id, valor, status`,
            [consulta.data, consulta.hora, consulta.medicoId, consulta.pacienteId, consulta.valor, consulta.status, id]
        );
        const row = result.rows[0];
        if (!row) return null;
        return new Consulta({
            id: row.id,
            data: row.data,
            hora: row.hora,
            medicoId: row.medico_id,
            pacienteId: row.paciente_id,
            valor: row.valor,
            status: row.status
        })
    },
    async delete(id) {
        const result = await db.query(
            'DELETE FROM consultas WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    },
};

module.exports = ConsultaRepository;