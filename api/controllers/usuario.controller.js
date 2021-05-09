const { pool } = require('../db/config')
const { validationResult } = require('express-validator')

exports.getByEmail = async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array(),
			message: 'Dados incorretos!'
		});
		return;
	}

	pool.query(
		`select c.id, c.email, c.nome, c.perfil_id
		from cliente c
		inner join perfil p on (p.id = c.perfil_id)
        where email like $1`,
		[req.params.email],
		(error, results) => {
			if (error || !results.rows[0]) {
				res.status(422).json({
					errors: errors.array(),
					message: 'Usuário não encontrado!'
				});
			}
			res.status(200).json(results.rows[0])
		})
}

exports.update = async (req, res) => {
	const { perfil_id } = req.body

	pool.query(
		`update cliente
		set perfil_id = $1
		where id = $2`,
		[perfil_id, req.params.id],
		(error) => {
			if (error) {
				res.status(422).json({
					errors: errors.array(),
					message: 'Falha ao atualizar o perfil!'
				});
			}
			res.status(200).json({ message: 'Perfil atualizado com sucesso!' })
		}
	)
}

exports.add = async (req, res) => {
	const errors = validationResult(req);
	const perfil = 2;

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array(),
			message: 'Dados incorretos!'
		});
		return;
	}

	const { email, nome, senha, telefone } = req.body

	pool.query('SELECT * FROM cliente WHERE email LIKE $1', [email], (error, results) => {
		if (results.rowCount > 0) {
			res.status(422).json({ message: 'E-mail já cadastrado!' });
			return;
		} else {
			pool.query(
				`INSERT INTO cliente (email, nome, senha, telefone, perfil_id)
				VALUES ($1, $2, $3, $4, $5)`,
				[email, nome, senha, telefone, perfil],
				(error) => {
					if (error)
						res.status(422).json({ message: error.message });
					else
						pool.query('SELECT id, perfil_id FROM cliente WHERE email LIKE $1', [email], (error, results) => {
							if (error || !results)
								return res.status(422).json({ message: error.message });

							let id = results.rows[0]["id"];
							req.session.userId = id;
							return res.status(201).json({ status: 'success', message: 'Conectado!', email, nome, id, perfil })
						});
				},
			)
		}
	})
}

exports.login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array(),
			message: 'Dados incorretos!'
		});
		return;
	}

	const { email, senha } = req.body

	pool.query('SELECT * FROM cliente WHERE email LIKE $1 and senha LIKE $2',
		[email, senha],
		(error, results) => {
			if (results.rowCount === 0) {
				res.status(422).json({ message: 'E-mail ou senha inválido!' });
				return;
			} else {
				let id = results.rows[0]["id"];
				let perfil = results.rows[0]["perfil_id"];
				let nome = results.rows[0]["nome"];
				req.session.userId = id;
				return res.status(201).json({ status: 'success', message: 'Conectado!', email, nome, id, perfil });
			}
		})
}