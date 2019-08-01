import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getLocations = () => {
    return {
        type: 'GET_LOCATION',
        payload: axios.get(`${ApiUrl}/location`)
    }
}