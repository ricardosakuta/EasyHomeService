require('dotenv').config()

const headers = {
	'Accept': 'application/json'
}

export const getAll = () =>
	fetch(`${process.env.REACT_APP_API_HOST}/Setores`)
		.then(res => res.json())

export const update = (id, query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/Setores/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => {
		if (res.ok) {
			return res.json()
		} else {
			return res.json().then((data) => {
				let error      = new Error(res.status);
				error.response = data;
				error.status   = res.status;
				throw error;
			});
		}
	})

export const add = (query) =>
	fetch(`${process.env.REACT_APP_API_HOST}/Setores`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	}).then(res => {
		if (res.ok) {
			return res.json()
		} else {
			return res.json().then((data) => {
				let error      = new Error(res.status);
				error.response = data;
				error.status   = res.status;
				throw error;
			  });
		}
	})

export const deleteById = (idCidade) =>
	fetch(`${process.env.REACT_APP_API_HOST}/Setores/${idCidade}`, {
		method: 'DELETE'
	}).then(res => res.json())