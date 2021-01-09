import { courseType } from '../types'

export const GET_RECENT = (data, callback) => {
  return {
    type: courseType.GET_RECENT,
    payload: { data, callback },
  }
}
export const GET_BOUGHT = (data, callback) => {
  return {
    type: courseType.GET_BOUGHT_COURSE,
    payload: { data, callback },
  }
}
export const GET_UPLOAD = (data, callback) => {
  return {
    type: courseType.GET_UPLOAD_COURSE,
    payload: { data, callback },
  }
}
export const GET_LESSION = (data, callback) => {
  return {
    type: courseType.GET_LESSION,
    payload: { data, callback },
  }
}
