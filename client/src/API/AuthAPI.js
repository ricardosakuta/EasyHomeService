require('dotenv').config()

const headers = {
    'Accept': 'application/json'
}

export const add = async googleData =>
    fetch(`${process.env.REACT_APP_API_HOST}/auth/google`, {
        method: "POST",
        body: JSON.stringify({
            token: googleData.tokenId
        }),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.json()
    })