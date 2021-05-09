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

export const add = (query) =>
    fetch(`${process.env.REACT_APP_API_HOST}/usuario`, {
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
                let error = new Error(res.status);
                error.response = data;
                error.status = res.status;
                error.message = res.message;
                throw error;
            });
        }
    })

export const login = (query) =>
    fetch(`${process.env.REACT_APP_API_HOST}/usuario/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.json())