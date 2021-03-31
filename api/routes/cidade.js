var express = require('express');
var router = express.Router();
const { pool } = require('../db/config')
const { check, validationResult } = require('express-validator')

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
		check('uf').not().isEmpty().isLength({ min: 2, max: 2 }).trim(),
	],
	function (req, res, next) {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()})
		}

		const { nome, uf } = req.body

		pool.query(
			'INSERT INTO cidade (id, nome, uf) VALUES ((select coalesce(max(id), 0)+1 from cidade), $1, $2)',
			[nome, uf],
			(error) => {
				if (error) {
					throw error
				}
				res.status(201).json({ status: 'success', message: 'Cidade adicionada com sucesso.' })
			},
		)
	});

router.put(
	'/:id',
	[
		check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
		check('uf').not().isEmpty().isLength({ min: 2, max: 2 }).trim(),
	],
	function (req, res, next) {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()})
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
			if (results.rowCount === 0) {
				console.log('Nenhum linha foi apagada.')
			}
			console.log(results)
			res.status(201).json({ status: 'success', message: 'Cidade apagada com sucesso.' })
		},
	)
});

module.exports = router;