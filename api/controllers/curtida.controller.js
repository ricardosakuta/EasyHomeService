const { pool } = require('../db/config')
const { validationResult } = require('express-validator')
require('dotenv').config();

exports.getByQuantidade = async (req, res) => {
    let cliente_id = req.params.cliente_id;
    
    if (!cliente_id)
        cliente_id = 0;

    console.log("cliente_id" + cliente_id);

    pool.query(
        `select count(*) as qtd, s.*, e.nome as nome_empresa, e.telefone, e.cidade_id,
        (
			select count(*)
			from curtida q
			where q.empresa_id = s.empresa_id
			  and q.seq = s.seq
              and q.cliente_id = $1
		) as curtiu
		from curtida c
        join servico s on (s.empresa_id = c.empresa_id and s.seq = c.seq)
        join empresa e on (e.id = s.empresa_id)
        group by s.empresa_id, s.seq, e.nome, e.telefone, e.cidade_id
        order by qtd`,
        [cliente_id],
        (error, results) => {
            if (error) {
                throw error
            }

            results.rows.forEach(element => {
                element.imagem_url = element.imagem_url + "?" + new Date().getTime();
            });

            res.status(200).json(results.rows)
        })
}

exports.getBycliente = async (req, res) => {
    pool.query(
        `select s.*, e.nome as nome_empresa, e.telefone, e.cidade_id,
		from curtida c
        join  servico s on (s.empresa_id = c.empresa_id and s.seq = c.seq)
        join empresa e on (e.id = s.empresa_id)
        where c.cliente_id = $1`,
        [req.params.cliente_id],
        (error, results) => {
            if (error) {
                throw error
            }

            results.rows.forEach(element => {
                element.imagem_url = element.imagem_url + "?" + new Date().getTime();
            });

            res.status(200).json(results.rows)
        })
}

exports.add = async (req, res) => {
    const { empresa_id, seq, cliente_id } = req.body;

    console.log(empresa_id);
    console.log(seq);
    console.log(cliente_id);

    pool.query(
        'INSERT INTO curtida (empresa_id, seq, cliente_id) VALUES ($1, $2, $3)',
        [empresa_id, seq, cliente_id],
        (error) => {
            if (error)
                res.status(422).json({ message: error.message });
            else
                res.status(201).json({ status: 'success', message: 'Setor gravado com sucesso.' })
        },
    )
}

exports.delete = async (req, res) => {
	pool.query(
		`DELETE FROM curtida 
         WHERE empresa_id = $1
           AND seq = $2
           AND cliente_id = $3`,
		[req.params.empresa_id, req.params.seq, req.params.cliente_id],
		(error) => {
			if (error) {
				throw error
			}
			res.status(201).json({ status: 'success', message: 'Curtida apagada com sucesso.' })
		}
	)
}