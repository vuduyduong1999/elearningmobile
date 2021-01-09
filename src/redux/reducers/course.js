/* eslint-disable no-case-declarations */
import moment from 'moment'
import { courseType } from '../types'

const initState = {
  courseHome: [],
  courseBoughtUnverify: [],
  courseUploadVerify: [],
}

const userReducer = (state = initState, action) => {
  const data = action?.payload?.data
  switch (action.type) {
    case courseType.GET_HOME_SUCCESS:
      return {
        ...state, courseHome: data,
      }
    case courseType.GET_BOUGHT_COURSE_SUCCESS:
      return {
        ...state, courseBoughtUnverify: data,
      }
    case courseType.GET_UPLOAD_COURSE_SUCCESS:
      return {
        ...state, courseUploadVerify: data,
      }

    default:
      return state
  }
}
export default userReducer
