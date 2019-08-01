import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getBooks = () => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${ApiUrl}/books`)
    }
}

export const searchBook = (search) => {
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`${ApiUrl}/books?${search}`)
    }
}

export const detailBook = (bookid) => {
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`${ApiUrl}/books/${bookid}`)
    }
}

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: axios.post(`${ApiUrl}/books`, data)
    }
}