CREATE TABLE curtida (
    empresa_id integer not null,
    seq integer not null,
    cliente_id integer not null,
	PRIMARY KEY(empresa_id, seq, cliente_id),
	CONSTRAINT fk_servico
        FOREIGN KEY(empresa_id, seq) 
	    REFERENCES servico(empresa_id, seq),
    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id) 
	    REFERENCES cliente(id)
);

CREATE TABLE comentario (
    empresa_id integer not null,
    seq_servico integer not null,
    seq_comentario  integer not null,
    cliente_id integer not null,
    texto varchar not null,
	PRIMARY KEY(empresa_id, seq_servico, seq_comentario),
	CONSTRAINT fk_servico
        FOREIGN KEY(empresa_id, seq_servico) 
	    REFERENCES servico(empresa_id, seq),
    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id) 
	    REFERENCES cliente(id)
);

ALTER TABLE empresa ADD COLUMN telefone varchar;
ALTER TABLE cliente ADD COLUMN data_criacao date;
ALTER TABLE servico ADD COLUMN data_criacao date;
ALTER TABLE cliente ADD telefone varchar;