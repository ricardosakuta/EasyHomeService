require('dotenv').config()

const headers = {
	'Accept': 'application/json'
}

export const getByEmail = (email) =>
    fetch(`${process.env.REACT_APP_API_HOST}/usuario/email/${email}`, {
        method: 'GET',
    }).then(res => res.json())

export const updatePerfil = (id, perfil_id) =>
    fetch(`${process.env.REACT_APP_API_HOST}/usuario/perfil/${id}`, {
        method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ perfil_id })
    }).then(res => res.json())