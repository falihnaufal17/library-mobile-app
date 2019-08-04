import axios from 'axios'
let ApiUrl = `https://api-libraryku.herokuapp.com`

export const getBooks = (search = '') => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${ApiUrl}/books?search=${search}`)
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
    console.log(data)
    return {
        type: 'ADD_BOOK',
        payload: axios.post(`${ApiUrl}/books`, data)
    }
}