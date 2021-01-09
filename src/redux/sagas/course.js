import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { courseType } from '../types'
import { URL } from '../../configs'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* userSagas() {
  yield takeLatest(courseType.GET_RECENT, getRecent)
  yield takeLatest(courseType.GET_BOUGHT_COURSE, getBought)
  yield takeLatest(courseType.GET_UPLOAD_COURSE, getUpload)
  yield takeLatest(courseType.GET_LESSION, getLession)
}

function* getLession(action) {
  const { data, callback } = action.payload
  try {
    const { token, maKH } = data
    const response = yield call(
      () => axios.post(`${URL}/api/baigiang`, {
        token,
        maKH,
      })
    )
    callback(response?.data)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
}
function* getUpload(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/uploaded`, {
        token,
      })
    )
    const ndata = response?.data
    if (ndata.success) {
      yield put({
        type: courseType.GET_UPLOAD_COURSE_SUCCESS,
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
function* getBought(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/bought`, {
        token,
      })
    )
    const ndata = response?.data
    if (ndata.success) {
      yield put({
        type: courseType.GET_BOUGHT_COURSE_SUCCESS,
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
function* getRecent(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/tdht/`, {
        token,
      })
    )
    const ndata = response?.data
    if (ndata.success) {
      yield put({
        type: courseType.GET_HOME_SUCCESS,
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
