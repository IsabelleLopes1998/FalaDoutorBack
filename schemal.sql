DO $$
BEGIN

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typename = 'plano_saude') 
        THEN CREATE TYPE plano_saude AS ENUM (
            'UNIMED',
            'BRADESCO',
            'HAPVIDA'
    );
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