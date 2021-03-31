require('dotenv').config()

const headers = {
	'Accept': 'application/json'
}

export const getAll = () =>
	fetch(`${process.env.REACT_APP_API_HOST}/cidades`)
		.then(res => res.json())
		.then(data => data)

export const update = (id, query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/cidades/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => res.json())
	.then(data => data)

export const add = (query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/cidades`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => res.json())
    .then(data => data)

export const deleteById = (idCidade) =>
	fetch(`${process.env.REACT_APP_API_HOST}/cidades/${idCidade}`, {
		method: 'DELETE'
	}).then(res => res.json())
	.then(data => data.cidade)