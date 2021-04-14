CREATE TABLE perfil (
    id integer primary key,
	descricao varchar(255)
);

insert into perfil values (0, 'Administrador do sistema');
insert into perfil values (1, 'Gerente');
insert into perfil values (2, 'Cliente');

CREATE TABLE cliente (
    id serial primary key,
	email varchar(255) not null unique,
    nome varchar(255) not null,
	perfil_id integer not null,
    senha varchar(255),
	CONSTRAINT fk_perfil
        FOREIGN KEY(perfil_id) 
	    REFERENCES perfil(id)
);

CREATE INDEX idx_cliente_email on cliente(email)