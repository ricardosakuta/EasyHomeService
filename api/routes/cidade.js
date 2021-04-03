var express = require('express');
var router = express.Router();
const { pool } = require('../db/config')
const { check, validationResult } = require('express-validator')
const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
                 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

/* GET users listing. */
router.get('/', function (req, res, next) {
	pool.query('SELECT * FROM cidade order by id', (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json(results.rows)
	})
});

router.post(
	'/',
	[
		check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
		check('uf').isIn(estados),
	],
	function (req, res, next) {
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
							throw error
						}
						res.status(201).json({ status: 'success', message: 'Cidade gravada com sucesso.' })
					},
				)
			}
		})
	});

router.put(
	'/:id',
	[
		check('nome').not().isEmpty().isLength({ min: 5, max: 100 }).trim(),
		check('uf').isIn(estados),
	],
	function (req, res, next) {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
				message: 'Dados incorretos!'
			})
		}

		const { nome, uf } = req.body
		console.log(nome);
		console.log(uf);
		console.log( req.params.id);

		pool.query(
			'UPDATE cidade set nome=$1, uf=$2 WHERE id=$3',
			[nome, uf, req.params.id],
			(error) => {
				if (error) {
					throw error
				}
				res.status(201).json({ status: 'success', message: 'Cidade atualizada com sucesso.' })
			},
		)
	});

router.delete('/:id', function (req, res) {
	pool.query(
		'DELETE FROM cidade WHERE id=$1',
		[req.params.id],
		(error, results) => {
			if (error) {
				throw error
			}
			res.status(201).json({ status: 'success', message: 'Cidade apagada com sucesso.' })
		},
	)
});

module.exports = router;