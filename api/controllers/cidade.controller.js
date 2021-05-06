const { pool } = require('../db/config')
const { validationResult } = require('express-validator')

exports.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
	'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

exports.getAll = async (req, res) => {
	pool.query('SELECT * FROM cidade order by id', (error, results) => {
		if (error) {
			res.status(422).json({ message: error.message });
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

	const { nome, uf } = req.body

	pool.query('SELECT * FROM cidade WHERE nome LIKE $1', [nome], (error, results) => {
		if (results.rowCount > 0) {
			res.status(422).json({ message: 'Cidade já cadastrada!' });
			return;
		} else {
			pool.query(
				'INSERT INTO cidade (id, nome, uf) VALUES ((select coalesce(max(id), 0)+1 from cidade), $1, $2)',
				[nome, uf],
				(error) => {
					if (error) {
						res.status(422).json({ message: error.message });
					}
					res.status(201).json({ status: 'success', message: 'Cidade gravada com sucesso.' })
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

	const { nome, uf } = req.body

	pool.query(
		'UPDATE cidade set nome=$1, uf=$2 WHERE id=$3',
		[nome, uf, req.params.id],
		(error) => {
			if (error) {
				return res.status(422).json({ message: error.message });				
			}
			res.status(201).json({ status: 'success', message: 'Cidade atualizada com sucesso.' })
		},
	)
}

exports.delete = async (req, res) => {
	pool.query(
		'DELETE FROM cidade WHERE id=$1',
		[req.params.id],
		(error) => {
			if (error) {
				throw error
			}
			res.status(201).json({ status: 'success', message: 'Cidade apagada com sucesso.' })
		}
	)
}