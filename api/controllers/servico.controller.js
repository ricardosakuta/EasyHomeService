const { pool } = require('../db/config')
const { validationResult } = require('express-validator')

const AwsConfig = require('../AWS/Config')



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

exports.post = async (req, res) => {
    const file = req.file
    const { nome, descricao, valor, empresa_id } = req.body
    let imagem_url;
    let id = 4;

    if (!file) {
        const error = new Error('Favor inserir uma imágem válida!')
        error.httpStatusCode = 400
        return next(error)
    }
    const fileKey = 'EMP' + empresa_id + 'ID' + id + '.jpg'
    AwsConfig.uploadFile(file.path, fileKey);

    res.send({message: 'Serviço adicionado com sucesso!'})
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
};