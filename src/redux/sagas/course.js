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
  yield takeLatest(courseType.GET_NEW_UNVERIFY, getNewUnverify)
  yield takeLatest(courseType.GET_UNVERIFY, getUnverify)
  yield takeLatest(courseType.GET_VERIFY, getVerify)
  yield takeLatest(courseType.VERIFY_COURSE, verify)
  yield takeLatest(courseType.DELETE_COURSE, deleteCourse)
}

function* deleteCourse(action) {
  const { data, callback } = action.payload
  try {
    const { token, maKH } = data
    console.log(data)
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/delete`, {
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
function* verify(action) {
  const { data, callback } = action.payload
  try {
    const { token, maKH } = data
    console.log(data)
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/verify`, {
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
function* getVerify(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc`, {
        token,
      })
    )
    if (response?.data.success) {
      yield put({
        type: courseType.GET_UPLOAD_VERIFY_COURSE_SUCCESS,
        payload: { data: response?.data?.data },
      })
    }
    console.tron.log({ response: response.data })
    callback(response?.data)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
}
function* getUnverify(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/unverify`, {
        token,
      })
    )
    if (response?.data.success) {
      yield put({
        type: courseType.GET_BOUGHT_UNVERIFY_COURSE_SUCCESS,
        payload: { data: response?.data?.data },
      })
    }
    console.tron.log({ response: response.data })
    callback(response?.data)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
}
function* getNewUnverify(action) {
  const { data, callback } = action.payload
  try {
    const { token } = data
    const response = yield call(
      () => axios.post(`${URL}/api/khoahoc/upload/recent`, {
        token,
      })
    )
    if (response?.data.success) {
      yield put({
        type: courseType.GET_HOME_SUCCESS,
        payload: { data: response?.data?.data },
      })
    }
    console.tron.log({ response: response.data })
    callback(response?.data)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
    callback({ success: false, message: error.message })
  }
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
        type: courseType.GET_UPLOAD_VERIFY_COURSE_SUCCESS,
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
        type: courseType.GET_BOUGHT_UNVERIFY_COURSE_SUCCESS,
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
