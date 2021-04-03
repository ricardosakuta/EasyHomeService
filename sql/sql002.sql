CREATE TABLE setor (
    id integer primary key,
    descricao varchar(255) not null,
    cidade_id integer,
    CONSTRAINT fk_cidade
        FOREIGN KEY(cidade_id) 
	    REFERENCES cidade(id)
);