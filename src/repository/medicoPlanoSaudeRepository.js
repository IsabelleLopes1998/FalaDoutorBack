const db = require('../config/database');

const MedicoPlanoSaudeRepository = {
    async findPlanosByMedicoId(medicoId, executor = db){
        const result = await executor.query(
            `SELECT ps.id, ps.nome, ps.valor
            FROM medico_planos_saude mps
            JOIN planos_saude ps ON ps.id = mps.plano_saude_id
            WHERE mps.medico_id = $1`,
            [medicoId]
        )
        return result.rows.map(
            row => ({
                id:row.id,
                nome: row.nome,
                valor: row.valor
            }));
    },

    async replaceMedicoPlanos(client, medicoId, planosSaudeIds = []){
        
        await client.query('DELETE from medico_planos_saude WHERE medico_id = $1', 
        [medicoId]);

        if(Array.isArray(planosSaudeIds) && planosSaudeIds.length){
            const values = planosSaudeIds.map((_,idx) => `($1, $${idx + 2})`).join(',');
            await client.query(`INSERT INTO medico_planos_saude (medico_id, plano_saude_id) VALUES ${values}`,
                [medicoId, ...planosSaudeIds]);
        }   

    },  
};

module.exports = MedicoPlanoSaudeRepository;
