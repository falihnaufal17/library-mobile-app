import { AsyncStorage as storage } from 'react-native'

let initialState = {
    userList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

export default user = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'LOGIN_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'LOGIN_USER_FULFILLED':
            const token = action.payload.data.result.token
            const iduser = action.payload.data.result.iduser.toString()
            const id_card = action.payload.data.result.id_card.toString()
            const name = action.payload.data.result.name
            const image = action.payload.data.result.image
            const email = action.payload.data.result.email
            const status = action.payload.data.result.status.toString()
            const isverify = action.payload.data.result.isverify
            storage.setItem('token', token)
            storage.setItem('iduser', iduser)
            storage.setItem('id_card', id_card)
            storage.setItem('name', name)
            storage.setItem('image', image)
            storage.setItem('email', email)
            storage.setItem('status', status)
            storage.setItem('isverify', isverify)
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: [state.userList, action.payload.data[0]]
            }
        case 'LOGOUT_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'LOGOUT_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'LOGOUT_USER_FULFILLED':
            storage.clear()
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: [state.userList, action.payload.data[0]]
            }
        case 'REGISTER_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'REGISTER_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'REGISTER_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: [...state.userList, action.payload.data[0]]
            }
        default:
            return state
    }
}