import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getCategories = () => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get(`${ApiUrl}/category`)
    }
}