require('dotenv').config()


export const getAll = (empresa_id, seq_servico) =>
	fetch(`${process.env.REACT_APP_API_HOST}/comentario/${empresa_id}/${seq_servico}`)
		.then(res => res.json())

export const add = (query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/comentario`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => { res.json() })