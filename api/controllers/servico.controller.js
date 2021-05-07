const { pool } = require('../db/config')
const { validationResult } = require('express-validator')
const AwsConfig = require('../AWS/Config')
const fs = require('fs');
require('dotenv').config();

exports.getAll = async (req, res) => {
    let imagens = [];

    pool.query(
        `select *
		from servico
        where empresa_id = $1
        order by seq`,
        [req.params.id],
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

exports.post = async (req, res) => {
    const file = req.file
    const { empresa_id, seq, nome, descricao, valor, extensao } = req.body
    let messageError = '';

    if (nome === "" || !descricao === "")
        res.status(422).json({ message: "Dados incorretos!" });

    if (!file) {
        res.status(422).json({ message: "Favor inserir uma imagem válida!" });
        return;
    }

    const fileKey = 'EMP' + empresa_id + 'ID' + seq + '.' + extensao;

    await pool.query(
        'INSERT INTO servico (empresa_id, seq, nome, descricao, imagem_url, valor) VALUES ($1, $2, $3, $4, $5, $6)',
        [empresa_id, seq, nome, descricao, fileKey, valor],
        (error, result) => {
            if (error) {
                messageError = error.message;
                return;
            }
        },
    )

    if (messageError) {
        res.status(422).json({ message: messageError });
        return;
    }

    try {
        const fileContent = fs.readFileSync(file.path);

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: fileContent
        };

        // Uploading files to the bucket
        AwsConfig.s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }

            pool.query(
                'UPDATE servico SET imagem_url = $1 WHERE empresa_id = $2 AND seq = $3',
                [data.Location, empresa_id, seq],
                () => {
                    fs.unlink(file.path, (err => {
                        if (err) console.log(err);
                    }));
                }
            )
        });

    } catch (error) {
        return res.status(422).json({ message: "Erro ao salvar a imagem" });
    }

    return res.send({ message: 'Serviço adicionado com sucesso!' })
}, (error, req, res, next) => {
    return res.status(400).send({ message: error.message })
};

exports.update = async (req, res) => {
    const file = req.file
    const { nome, descricao, valor, extensao } = req.body
    let messageError = '';

    const fileKey = 'EMP' + req.params.empresa_id + 'ID' + req.params.seq + '.' + extensao;

    if (nome === "" || descricao === "")
        res.status(422).json({ message: "Dados incorretos!" });

    await pool.query(
        `UPDATE servico 
            SET nome = $1,
            descricao = $2,
            valor = $3
            WHERE empresa_id = $4
              AND seq = $5`,
        [nome, descricao, valor, req.params.empresa_id, req.params.seq],
        (error) => {
            if (error) {
                messageError = error.message;
                return;
            }
        },
    )

    if (messageError) {
        res.status(422).json({ message: messageError });
        return;
    }

    if (!file) {
        return res.send({ message: 'Serviço atualizado com sucesso!' });
    }

    try {
        const fileContent = fs.readFileSync(file.path);

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: fileContent
        };

        // Uploading files to the bucket
        AwsConfig.s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }

            console.log(file.path);

            pool.query(
                'UPDATE servico SET imagem_url = $1 WHERE empresa_id = $2 AND seq = $3',
                [data.Location, req.params.empresa_id, req.params.seq],
                () => {
                    fs.unlink(file.path, (err => {
                        if (err) console.log(err);
                    }));
                }
            )
        });
    } catch (error) {
        return res.status(422).json({ message: "Erro ao atualizar a imagem" });
    }

    return res.send({ message: 'Serviço atualizado com sucesso!' });
}, (error, req, res, next) => {
    return res.status(400).send({ message: error.message })
};

exports.delete = async (req, res) => {
    pool.query(
        'DELETE FROM servico WHERE empresa_id=$1 and seq=$2',
        [req.params.empresa_id, req.params.seq],
        (error) => {
            if (error) {
                res.status(422).json({ message: error.message });
            }
            res.status(201).json({ status: 'success', message: 'Serviço apagado com sucesso.' })
        },
    )
}