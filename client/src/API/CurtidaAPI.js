require('dotenv').config()

export const getByCliente = (cliente_id) =>
	fetch(`${process.env.REACT_APP_API_HOST}/curtida/${cliente_id}`)
		.then(res => res.json())

export const getByCurtida = (cliente_id) =>
	fetch(`${process.env.REACT_APP_API_HOST}/curtida/quantidade/${cliente_id}`)
		.then(res => res.json())

export const add = (query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/curtida`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => { res.json() })

export const deleteById = (empresa_id, seq, cliente_id) =>
	fetch(`${process.env.REACT_APP_API_HOST}/curtida/${empresa_id}/${seq}/${cliente_id}`, {
		method: 'DELETE'
	}).then(res => res.json())