require('dotenv').config()

export const getAll = (idEmpresa) =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos/${idEmpresa}`)
		.then(res => res.json())

export const getByCidade = (cliente_id, cidade_id) =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos/cidade/${cliente_id}/${cidade_id}`)
		.then(res => res.json())

export const getByCurtida = () =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos/curtidas/${20}`)
		.then(res => res.json())

export const add = (formData) =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos`, {
		method: 'POST',
		body: formData,
	}).then(res => {
		if (res.ok) {
			return res.json()
		} else {
			return res.json().then((data) => {
				let error = new Error(res.status);
				error.response = data;
				error.status = res.status;
				throw error;
			});
		}
	})

export const update = (empresa_id, seq, formData) =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos/${empresa_id}/${seq}`, {
		method: 'PUT',
		body: formData,
	}).then(res => {
		if (res.ok) {
			return res.json()
		} else {
			return res.json().then((data) => {
				let error = new Error(res.status);
				error.response = data;
				error.status = res.status;
				throw error;
			});
		}
	})

export const deleteById = (empresa_id, seq) =>
	fetch(`${process.env.REACT_APP_API_HOST}/servicos/${empresa_id}/${seq}`, {
		method: 'DELETE'
	}).then(res => res.json())