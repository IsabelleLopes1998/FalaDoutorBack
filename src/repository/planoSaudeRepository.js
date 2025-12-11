const db = require('../config/database');
const PlanoSaude = require('../model/planoSaude');


const PlanoSaudeRepository = {

    async findAll(){
        const result = await db.query(
            'SELECT id, nome, valor FROM planos_saude ORDER BY nome',
        );

        return result.rows.map(
            (row) => new PlanoSaude({
                id: row.id,
                nome: row.nome,
                valor: row.valor
            })
        );
    },

    async findById(id){
        const result = await db.query(
            `SELECT id, nome, valor FROM planos_saude WHERE id = $1`,
            [id]
        );

        const row = result.rows[0];
        if(!row) return null;

        return new PlanoSaude({
            id: row.id,
                nome: row.nome,
                valor: row.valor
        });
    },

    async create({
        nome,
        valor,
        
    }){
        const result = await db.query(
            `INSERT INTO planos_saude (nome, valor)
            VALUES ($1, $2)
            RETURNING id, nome, valor`,
            [nome, valor]
        );

        const row = result.rows[0];
        return new PlanoSaude({
            id: row.id,
            nome: row.nome,
            valor: row.valor
        });
    },

    async update(id, {nome, valor}){

        const result = await db.query(
            `UPDATE planos_saude SET
                nome = $1,
                valor = $2
            WHERE id = $3
            RETURNING id, nome, valor`,
            [nome, valor, id]
        );
        const row = result.rows[0];
        if(!row) return null;

        return new PlanoSaude({
            id: row.id,
            nome: row.nome,
            valor: row.valor
        });
    },

    async delete(id){
        const result = await db.query(
            'DELETE FROM planos_saude WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    },
};

module.exports = PlanoSaudeRepository;
