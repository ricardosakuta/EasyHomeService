const { pool } = require('../db/config')
const { validationResult } = require('express-validator')

exports.get = async (req, res) => {
	pool.query('SELECT * FROM empresa WHERE cliente_id = $1',
		[req.params.idCliente], (error, results) => {
			if (error) {
				return res.status(422).json({ message: error.message });
			}
			return res.status(200).json(results.rows[0])
		})
}

exports.add = async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array(),
			message: 'Dados incorretos!'
		});
	}

	const { nome, descricao, cliente_id, cidade_id, setor_id } = req.body

	pool.query('SELECT * FROM empresa WHERE nome = $1', [nome], (error, results) => {
		if (results.rowCount > 0) {
			res.status(422).json({ message: 'Empresa já cadastrada!' });
			return;
		} else {
			pool.query(
				'INSERT INTO empresa (nome, descricao, cliente_id, cidade_id, setor_id) VALUES ($1, $2, $3, $4, $5)',
				[nome, descricao, cliente_id, cidade_id, setor_id],
				(error) => {
					if (error) {
						res.status(422).json({ message: error.message });
						return;
					}
					res.status(201).json({ status: 'success', message: 'Empresa gravada com sucesso.' })
				},
			)
		}
	})
}

exports.update = async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array(),
			message: 'Dados incorretos!'
		});
	}

	const { nome, descricao, cliente_id, cidade_id, setor_id } = req.body

	pool.query('SELECT * FROM empresa WHERE id = $1', [req.params.id], (error, results) => {
		if (results.rowCount = 0) {
			res.status(422).json({ message: 'Empresa não encontrada!' });
			return;
		} else {
			pool.query(
				`update empresa
					set nome = $1,
					descricao = $2,
					cliente_id = $3,
					cidade_id = $4,
					setor_id = $5
				where id = $6`,
				[nome, descricao, cliente_id, cidade_id, setor_id, req.params.id],
				(error) => {
					if (error) {
						res.status(422).json({ message: error.message });
						return;
					}
					res.status(201).json({ status: 'success', message: 'Empresa atualizada com sucesso.' })
				},
			)
		}
	})
}

exports.delete = async (req, res) => {
	pool.query(
		'DELETE FROM servico WHERE empresa_id=$1',
		[req.params.id],
		(error) => {
			if (error) {
				return res.status(422).json({ message: error.message });
			}
		}
	)

	pool.query(
		'DELETE FROM empresa WHERE id=$1',
		[req.params.id],
		(error) => {
			if (error) {
				return res.status(422).json({ message: error.message });
			}
			res.status(201).json({ status: 'success', message: 'Empresa apagada com sucesso.' })
		}
	)
}
