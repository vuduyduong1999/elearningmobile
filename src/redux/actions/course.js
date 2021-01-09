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
export const GET_NEW_UNVERIFY = (data, callback) => {
  console.tron.log({ data })
  return {
    type: courseType.GET_NEW_UNVERIFY,
    payload: { data, callback },
  }
}
export const GET_UNVERIFY = (data, callback) => {
  return {
    type: courseType.GET_UNVERIFY,
    payload: { data, callback },
  }
}
export const GET_VERIFY = (data, callback) => {
  return {
    type: courseType.GET_VERIFY,
    payload: { data, callback },
  }
}
export const VERIFY_COURSE = (data, callback) => {
  return {
    type: courseType.VERIFY_COURSE,
    payload: { data, callback },
  }
}
export const DELETE_COURSE = (data, callback) => {
  return {
    type: courseType.DELETE_COURSE,
    payload: { data, callback },
  }
}
