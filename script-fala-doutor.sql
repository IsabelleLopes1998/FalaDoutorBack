CREATE TABLE medicos (
    id serial PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf char(11) NOT NULL UNIQUE,
    crm VARCHAR(20) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    
    planos_saude plano_saude[] NOT NULL
)

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    plano_saude plano_saude NOT NULL   
)


CREATE EXTENSION IF NOT EXISTS "pgcrypto";

create table planos_saude (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	nome varchar(100) not null,
	valor numeric(10,2) not null
);

create table medicos_planos(
	medico_id medicos
);

INSERT INTO planos_saude (nome, valor)
VALUES
    ('UNIMED', 350.00),
    ('BRADESCO', 420.00),
    ('HAPVIDA', 280.00);

ALTER TABLE pacientes
    ADD COLUMN IF NOT EXISTS plano_saude_id uuid;


UPDATE pacientes p
SET plano_saude_id = ps.id
FROM planos_saude ps
WHERE p.plano_saude::text = ps.nome
  AND p.plano_saude_id IS NULL;

ALTER TABLE pacientes
  DROP COLUMN plano_saude;

CREATE TABLE IF NOT EXISTS medico_planos_saude (
    medico_id      integer      NOT NULL,
    plano_saude_id uuid         NOT NULL,
    PRIMARY KEY (medico_id, plano_saude_id),
    CONSTRAINT fk_medico
      FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    CONSTRAINT fk_plano_saude
      FOREIGN KEY (plano_saude_id) REFERENCES planos_saude(id) ON DELETE RESTRICT
);











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

INSERT INTO medico_planos_saude (medico_id, plano_saude_id)
SELECT
    m.id,
    ps.id
FROM medicos m
JOIN planos_saude ps
  ON ps.nome = ANY (m.planos_saude::text[])
ON CONFLICT DO NOTHING;



SELECT
  m.id,
  m.nome_completo,
  m.planos_saude,
  array_agg(ps.nome ORDER BY ps.nome) AS planos_via_juncao
FROM medicos m
LEFT JOIN medico_planos_saude mps ON mps.medico_id = m.id
LEFT JOIN planos_saude ps ON ps.id = mps.plano_saude_id
GROUP BY m.id, m.nome_completo, m.planos_saude;


ALTER TABLE medico_planos_saude
  ADD CONSTRAINT medicos_planos_saude_medico_plano_uniq UNIQUE (medico_id, plano_saude_id);
ALTER TABLE medicos DROP COLUMN planos_saude;


SELECT m.id, m.nome_completo, json_agg(ps.nome ORDER BY ps.nome) planos
FROM medicos m
LEFT JOIN medico_planos_saude mps ON mps.medico_id = m.id
LEFT JOIN planos_saude ps ON ps.id = mps.plano_saude_id
GROUP BY m.id, m.nome_completo
ORDER BY m.id;

ALTER TABLE medico_planos_saude
  DROP CONSTRAINT IF EXISTS medico_planos_saude_medico_id_fkey,
  ADD CONSTRAINT medico_planos_saude_medico_id_fkey
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE;

ALTER TABLE medico_planos_saude
  DROP CONSTRAINT IF EXISTS medico_planos_saude_plano_saude_id_fkey,
  ADD CONSTRAINT medico_planos_saude_plano_saude_id_fkey
    FOREIGN KEY (plano_saude_id) REFERENCES planos_saude(id) ON DELETE CASCADE;

ALTER TABLE pacientes
  DROP CONSTRAINT IF EXISTS pacientes_plano_saude_fk,
  ADD CONSTRAINT pacientes_plano_saude_fk
    FOREIGN KEY (plano_saude_id) REFERENCES planos_saude(id) ON DELETE RESTRICT;

select * from planos_saude;

insert into planos_saude values(nome = "CLINICA SIM", valor = "85,00");



