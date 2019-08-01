let initialState = {
    statusList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default status = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STATUS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_STATUS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_STATUS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                statusList: action.payload.data.result
            }
        default:
            return state
    }
}