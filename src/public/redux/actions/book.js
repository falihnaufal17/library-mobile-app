import axios from 'axios'

export const getBooks = () => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books`)
    }
}

export const searchBook = (search) => {
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books?${search}`)
    }
}

export const detailBook = (bookid) => {
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books/${bookid}`)
    }
}