import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const addLoan = (data) => {
    return {
        type: 'POST_LOAN',
        payload: axios.post(`${ApiUrl}/loaning`, data)
    }
}

export const getLoanByUser = (iduser) => {
    return {
        type: 'GET_LOANBYUSER',
        payload: axios.get(`${ApiUrl}/loaning/users/${iduser}`)
    }
}
