import { combineReducers } from 'redux'

//import all reducers
import book from './book'
import category from './category'
import location from './location'
import status from './status'
//combine them
const appReducer = combineReducers({
    book,
    category,
    location,
    status
})

export default appReducer