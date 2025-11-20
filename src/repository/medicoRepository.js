const db = require('../config/database');
const Medico = require('../model/medicoModel');
const MedicoPlanoSaudeRepository = require('./medicoPlanoSaudeRepository');

const MedicoRepository ={

    async findAll(){
        const result = await db.query(
            'SELECT id, nome_completo, cpf, crm, data_nascimento FROM medicos'
        );

        const medicos = result.rows.map(
            row => new Medico({
                id: row.id,
                nomeCompleto: row.nome_completo,
                cpf: row.cpf,
                crm: row.crm,
                dataNascimento: row.data_nascimento,
                planosSaude: []
            })
        )
        await Promise.all(
            medicos.map( async (medico) => {
                medico.planosSaude = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(medico.id);
                
            })
        )
        return medicos;
    },

    async findById(id) {
        const result = await db.query(
            `SELECT id, nome_completo, cpf, crm, data_nascimento FROM medicos WHERE id = $1`,
            [id]
        )

        const row = result.rows[0];
        if(!row) return null;

        const medico = new Medico({
            id: row.id,
            nomeCompleto: row.nome_completo,
            cpf: row.cpf,
            crm: row.crm,
            dataNascimento: row.data_nascimento,
            planosSaude: []
        });
        medico.planosSaude = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(medico.id);
        return medico;
    },

    async create({
        nomeCompleto,
        cpf,
        crm,
        dataNascimento,
        planosSaude = []
    }){
        const client = await db.connect();
        try{
            await client.query('BEGIN');

            const result = await client.query(
                `INSERT INTO medicos (nome_completo, cpf, crm, data_nascimento)
                VALUES ($1, $2, $3, $4)
                RETURNING id, nome_completo, cpf, crm, data_nascimento`,
               [nomeCompleto, cpf, crm, dataNascimento] 
            );
    
            const row = result.rows[0];
            const medicoId = row.id;

            const medico = new Medico({
                id: row.id,
                nomeCompleto: row.nome_completo,
                cpf: row.cpf,
                crm: row.crm,
                dataNascimento: row.data_nascimento,
                planosSaude: []
            });

            await MedicoPlanoSaudeRepository.replaceMedicoPlanos(client, medicoId, planosSaude);
            medico.planosSaude = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(medicoId, client);

            await client.query('COMMIT');
            return medico;

        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally{
            client.release();
        }
    
    },

    async update(id, {nomeCompleto, cpf, crm, dataNascimento, planosSaude =[]}){
        const client = await db.connect();

        try{
            await client.query('BEGIN');

            const result = await client.query(
                `UPDATE medicos SET 
                   nome_completo = $1, 
                   cpf = $2, 
                   crm = $3, 
                   data_nascimento = $4
                 WHERE id = $5
                 RETURNING id, nome_completo, cpf, crm, data_nascimento`,
                [nomeCompleto, cpf, crm, dataNascimento, id]
              );
              const row = result.rows[0];
              if(!row){
                await client.query('ROLLBACK');
                return null;
              }

              const medico = new Medico({
                id: row.id,
                nomeCompleto: row.nome_completo,
                cpf: row.cpf,
                crm: row.crm,
                dataNascimento: row.data_nascimento,
                planosSaude: []
              });
              await MedicoPlanoSaudeRepository.replaceMedicoPlanos(client, medico.id, planosSaude);
              medico.planosSaude = await MedicoPlanoSaudeRepository.findPlanosByMedicoId(medico.id, client);

              await client.query('COMMIT');
              return medico;

        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally{
            client.release();
        }
    },

    async delete(id){
        const client = await db.connect();

        try{
            await client.query('BEGIN');
            await client.query('DELETE FROM  medico_planos_saude WHERE medico_id = $1', [id]);

            const result = await client.query('DELETE FROM medicos WHERE id = $1', [id]);

            await client.query('COMMIT');
            return result.rowCount > 0;

        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally{
            client.release();
        }
    },  

};

module.exports = MedicoRepository;
