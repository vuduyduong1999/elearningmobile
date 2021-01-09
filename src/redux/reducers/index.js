import { combineReducers } from 'redux'
import user from './user'
import course from './course'

const appReducer = combineReducers({
  user,
  course,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
