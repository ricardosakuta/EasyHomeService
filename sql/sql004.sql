CREATE TABLE empresa (
    id serial primary key,
    nome varchar(255) not null,
	descricao varchar(255) not null,
    imagem_url varchar(255),
    cliente_id integer not null,
    cidade_id integer not null,
    setor_id integer not null,
	CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id) 
	    REFERENCES cliente(id),
	CONSTRAINT fk_cidade
        FOREIGN KEY(cidade_id) 
	    REFERENCES cidade(id),
	CONSTRAINT fk_setor
        FOREIGN KEY(setor_id) 
	    REFERENCES setor(id)
);

CREATE INDEX idx_empresa_nome on empresa(nome);

CREATE TABLE servico (
    empresa_id integer not null,
    seq integer not null,
    nome varchar(255) not null,
	descricao varchar(255) not null,
    imagem_url varchar(255) not null,
    valor float,
	PRIMARY KEY(empresa_id, seq),
	CONSTRAINT fk_empresa
        FOREIGN KEY(empresa_id) 
	    REFERENCES empresa(id)
);

CREATE INDEX idx_servico_empresa on servico(empresa_id);