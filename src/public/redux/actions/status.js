import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getStatus = () => {
    return {
        type: 'GET_STATUS',
        payload: axios.get(`${ApiUrl}/status`)
    }
}