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
			res.status(200).json({message: 'Perfil atualizado com sucesso!'})
		}
	)
}