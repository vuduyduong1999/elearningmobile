import React, { useEffect, useState } from 'react'
import SplScreen from 'react-native-splash-screen'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Helpers, NavigationHelper } from '../utils'
import { SCREEN_NAME } from '../configs'
import { courseAction, userAction } from '../redux/actions'

const SplashScreen = (props) => {
  // const { } = props
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const persist = useSelector((state) => state._persist)
  useEffect(() => {
    if (persist?.rehydrated === true) {
      if (token === '') {
        NavigationHelper.navigateReplaceScreen(SCREEN_NAME.LOGIN)
        SplScreen.hide()
      } else {
        dispatch(userAction.GET_PROFILE({ token }, (response) => {
          if (!response?.success) {
            Helpers.showMess('Không thể tải thông tin tài khoản')
          } else {
            const accountType = response?.data?.ma
            dispatch(courseAction.GET_RECENT({ token }, (res) => {
              if (!res?.success) {
                Helpers.showMess('Không thể  lấý những khóa học đã xem gần đây!!!')
              } else {
                dispatch(courseAction.GET_BOUGHT({ token }, (respo) => {
                  if (respo?.success) {
                    if (accountType === 'AT') {
                      dispatch(courseAction.GET_UPLOAD({ token }, (rs) => {
                        if (!rs?.success) {
                          Helpers.showMess('Không thể  danh sách video đã tải....!!!')
                        }
                      }))
                    }
                  } else {
                    Helpers.showMess('Không thể  lấý những khóa học đã mua gần đây!!!')
                  }
                }))
              }
            }))
          }
          NavigationHelper.navigateReplaceScreen(SCREEN_NAME.MAINBOTTOM)
          SplScreen.hide()
        }))
      }
    }
  })
  return (
    <View style={{ flex: 1 }} />
  )
}
export default SplashScreen
