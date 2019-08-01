import { combineReducers } from 'redux'

//import all reducers
import book from './book'
import category from './category'
import location from './location'
import status from './status'
import user from './user'
import loan from './loan'
//combine them
const appReducer = combineReducers({
    book,
    category,
    location,
    status,
    user,
    loan
})

export default appReducer