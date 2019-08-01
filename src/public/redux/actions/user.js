import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${ApiUrl}/users`)
    }
}

export const login = (data) => {
    return {
        type: 'LOGIN_USER',
        payload: axios.post(`${ApiUrl}/users/login`, data)
    }
}

export const logout = (iduser) => {
    return {
        type: 'LOGOUT_USER',
        payload: axios.patch(`${ApiUrl}/users/logout/${iduser}`)
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER_USER',
        payload: axios.post(`${ApiUrl}/users/register`, data)
    }
}