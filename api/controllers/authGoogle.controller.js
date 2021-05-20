const { pool } = require('../db/config')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

exports.add = async (req, res) => {
    const { token } = req.body

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email } = ticket.getPayload();

    pool.query('INSERT INTO cliente (email, nome, perfil_id, data_criacao) '
        + 'VALUES ($1, $2, $3, current_timestamp) '
        + 'ON CONFLICT (email) '
        + 'DO UPDATE SET '
        + 'nome = $2 '
        + 'WHERE cliente.email = $1 ',
        [email, name, 2],
        (error) => {
            if (error)
                return res.status(422).json({ message: error.message });

            pool.query('SELECT id, perfil_id FROM cliente WHERE email LIKE $1', [email], (error, results) => {
                if (error || !results) 
                    return res.status(422).json({ message: error.message });

                let id = results.rows[0]["id"]
                let perfil = results.rows[0]["perfil_id"]
                req.session.userId = id
                return res.status(201).json({ status: 'success', message: 'Conectado!', email, name, id, perfil })
            });
        },
    )
}