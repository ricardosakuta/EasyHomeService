require('dotenv').config()

const headers = {
  'Accept': 'application/json'
}

export const get = (idCidade) =>
  fetch(`${process.env.REACT_APP_API_HOST}/cidades/${idCidade}` ,{ headers })
    .then(res => res.json())
    .then(data => data.cidade)

export const getAll = () =>
    fetch(`${process.env.REACT_APP_API_HOST}/cidades`,{ headers })
      .then(res => res.json())
      .then(data => data)