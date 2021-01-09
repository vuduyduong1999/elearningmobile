import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { userType } from '../types'
import { URL } from '../../configs'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* userSagas() {
  yield takeLatest(userType.LOGIN, login)
  yield takeLatest(userType.GET_PROFILE, getprofile)
}
function* getprofile(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/auth/`, {
        token,
      })
    )
    const ndata = response?.data
    if (ndata.success) {
      yield put({
        type: userType.GET_PROFILE_SUCCESS,
        payload: { data: ndata?.data },
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
}
function* login(action) {
  const { data, callback } = action.payload
  try {
    const response = yield call(
      () => axios.post(`${URL}/api/auth/login`, {
        ...data,
      })
    )
    const ndata = response?.data
    if (ndata.success) {
      yield put({
        type: userType.LOGIN_SUCCESS,
        payload: { data: ndata?.data },
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
}
