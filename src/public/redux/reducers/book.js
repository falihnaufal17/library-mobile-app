const initialState = {
    bookList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default book = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_BOOKS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_BOOKS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.result
            }
        case 'GET_MOREBOOKS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_MOREBOOKS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_MOREBOOKS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.result
            }
        case 'DETAIL_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'DETAIL_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DETAIL_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.result
            }
        case 'ADD_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'ADD_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: [...state.bookList, action.payload.data[0]]
            }
        default:
            return state
    }
}