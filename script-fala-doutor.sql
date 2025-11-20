DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plano_saude') THEN 
CREATE TYPE plano_saude AS ENUM ('UNIMED','BRADESCO','HAPVIDA');
END IF;
END
$$;

DROP TABLE IF EXISTS medicos;

CREATE TABLE medicos (
    id serial PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf char(11) NOT NULL UNIQUE,
    crm VARCHAR(20) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    
    planos_saude plano_saude[] NOT NULL
)

DROP TABLE IF EXISTS pacientes;
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    plano_saude plano_saude NOT NULL   
)

INSERT INTO medicos (nome_completo, cpf, crm, data_nascimento, planos_saude)
VALUES (
    'Dra. Isabelle Lopes',
    '1071246943',
    'CRM123456',
    '1985-05-15',
    '{"UNIMED", "BRADESCO"}'
);

INSERT INTO pacientes (nome_completo, cpf, data_nascimento, plano_saude)
VALUES (
    'Maria Julia',
    '25603366512',
    '1993-02-15',
    'UNIMED'
);

UPDATE medicos
SET 
    nome_completo = 'Dra Isabelle Bernardina da Silva Lopes',
    cpf = '10771246943',
    crm = '123456',
    data_nascimento = '1998-05-17',
    planos_saude = '{"UNIMED", "BRADESCO"}'
WHERE id = 17;

UPDATE pacientes
SET 
    nome_completo = 'Dr. Ranniery',
    cpf = '04722173303',
    data_nascimento = '1993-02-15',
    plano_saude ='UNIMED'
WHERE id = 6;


SELECT  * FROM medicos;
SELECT  * FROM pacientes;
SELECT  * FROM pacientes where id = 4;
SELECT
    id,
    nome_completo,
    planos_saude
FROM medicos
WHERE planos_saude @> '{"UNIMED"}';


DELETE FROM medicos
WHERE id = 23;

delete from pacientes where id=7;


