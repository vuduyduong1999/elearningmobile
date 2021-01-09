/* eslint-disable no-case-declarations */
import moment from 'moment'
import { userType } from '../types'

const initState = {
  token: '',
  accountType: '',
}

const userReducer = (state = initState, action) => {
  const data = action?.payload?.data

  switch (action.type) {
    case userType.GET_PROFILE_SUCCESS:
      return {
        ...state, profile: { ...data },
      }
    case userType.LOGIN_SUCCESS:
      const { token, accountType } = data
      return {
        ...state, token, accountType,
      }

    default:
      return state
  }
}
export default userReducer
