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

ALTER TABLE empresa ADD COLUMN telefone varchar;