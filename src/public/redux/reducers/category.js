let initialState = {
    categoryList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default category = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false,
            }
        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                categoryList: action.payload.data.result
            }
        default:
            return state
    }
}