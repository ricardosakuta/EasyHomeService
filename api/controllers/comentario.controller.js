const { pool } = require('../db/config')
const { validationResult } = require('express-validator')
require('dotenv').config();

exports.getAll = async (req, res) => {
    pool.query(
        `SELECT co.*, cl.nome as nome_cliente
		 FROM comentario co
         JOIN cliente cl on (cl.id = co.cliente_id)
		 WHERE empresa_id = $1
           AND seq_servico = $2
           ORDER BY seq_comentario DESC
		   LIMIT 7`,
        [req.params.empresa_id, req.params.seq_servico],
        (error, results) => {
            if (error) {
                return res.status(422).json({ message: error.message });
            }
            res.status(200).json(results.rows)
        })
}

exports.add = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array(),
            message: 'Dados incorretos!'
        });
        return;
    }

    const { empresa_id, seq_servico, texto, cliente_id } = req.body;

    pool.query(
        `INSERT INTO comentario
         (empresa_id, seq_servico, seq_comentario, texto, cliente_id)
          VALUES ($1, $2,
            (select coalesce(max(seq_comentario), 0)+1 from comentario WHERE empresa_id = $1 AND seq_servico = $2),
            $3, $4)`,
        [empresa_id, seq_servico, texto, cliente_id],
        (error) => {
            if (error) {
                console.log(error.message);
                res.status(422).json({ message: error.message });
            } else
                res.status(201).json({ status: 'success', message: 'comentario gravado com sucesso.' })
        }
    )
}