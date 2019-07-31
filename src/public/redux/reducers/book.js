const initialState = {
    bookList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default books = (state = initialState, action) => {
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
        default:
            return state
    }
}