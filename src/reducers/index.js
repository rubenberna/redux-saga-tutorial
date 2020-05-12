import { combineReducers } from 'redux';
import UsersReducer from './usersReducer'

export default combineReducers({
  users: UsersReducer
})