require('dotenv').config()


export const getRelatorio = (codigo) =>
	fetch(`${process.env.REACT_APP_API_HOST}/relatorio/${codigo}`)
		.then(res => res.json())