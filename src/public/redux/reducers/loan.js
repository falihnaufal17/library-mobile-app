let initialState = {
    loanList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default loan = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'POST_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                loanList: [...state.loanList, action.payload.data[0]]
            }
        default:
            return state
    }
}