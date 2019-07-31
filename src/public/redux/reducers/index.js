import { combineReducers } from 'redux'

//import all reducers
import book from './book'

//combine them
const appReducer = combineReducers({
    book
})

export default appReducer