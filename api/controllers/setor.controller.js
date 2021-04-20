const { pool } = require('../db/config')
const { validationResult } = require('express-validator')

exports.getAll = async (req, res) => {
	pool.query(
		`select s.id, s.descricao,  s.cidade_id, c.nome as cidade_nome, c.uf as cidade_uf
		from setor s 
		inner join cidade c on (c.id = s.cidade_id)
		order by s.id`,
		(error, results) => {
		if (error) {
			throw error
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

	const { descricao, cidade_id } = req.body

	pool.query('SELECT * FROM setor WHERE descricao LIKE $1 and cidade_id = $2', [descricao, cidade_id], (error, results) => {
		if (results.rowCount > 0) {
			res.status(422).json({ message: 'Setor já cadastrado!' });
			return;
		} else {
			pool.query(
				'INSERT INTO setor (id, descricao, cidade_id) VALUES ((select coalesce(max(id), 0)+1 from setor), $1, $2)',
				[descricao, cidade_id],
				(error) => {
					if (error)
						res.status(422).json({ message: error.message });
					else
						res.status(201).json({ status: 'success', message: 'Setor gravado com sucesso.' })
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
		})
	}

	const { descricao, cidade_id } = req.body

	pool.query(
		'UPDATE setor set descricao=$1, cidade_id=$2 WHERE id=$3',
		[descricao, cidade_id, req.params.id],
		(error) => {
			if (error) {
				res.status(422).json({ message: error.message });
			}
			res.status(201).json({ status: 'success', message: 'Setor atualizado com sucesso.' })
		},
	)
}

exports.delete = async (req, res) => {
	pool.query(
		'DELETE FROM setor WHERE id=$1',
		[req.params.id],
		(error, results) => {
			if (error) {
				res.status(422).json({ message: error.message });
			}
			res.status(201).json({ status: 'success', message: 'Setor apagado com sucesso.' })
		},
	)
}