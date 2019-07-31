import { combineReducers } from 'redux'

//import all reducers
import books from './book'

//combine them
const appReducer = combineReducers({
    books
})

export default appReducer