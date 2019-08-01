import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const addLoan = (data) => {
    return {
        type: 'POST_LOAN',
        payload: axios.post(`${ApiUrl}/loaning`, data)
    }
}
