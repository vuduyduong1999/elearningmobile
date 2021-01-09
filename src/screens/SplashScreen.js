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
            Helpers.showMess('Cant get your profile in server...')
          } else {
            const accountType = response?.data?.ma
            if (accountType !== 'AD') {
              dispatch(courseAction.GET_RECENT({ token }, (res) => {
                if (!res?.success) {
                  Helpers.showMess('Cant get recent course!!!')
                } else {
                  dispatch(courseAction.GET_BOUGHT({ token }, (respo) => {
                    if (respo?.success) {
                      if (accountType === 'AT') {
                        dispatch(courseAction.GET_UPLOAD({ token }, (rs) => {
                          if (!rs?.success) {
                            Helpers.showMess('Couldnt get your uploaded course!!!')
                          }
                        }))
                      }
                    } else {
                      Helpers.showMess('Cant get recent bought course....!!!')
                    }
                  }))
                }
              }))
            } else {
              dispatch(courseAction.GET_NEW_UNVERIFY({ token }, (res) => {
                if (res?.success) {
                  dispatch(courseAction.GET_UNVERIFY({ token }, (rs) => {
                    if (rs?.success) {
                      dispatch(courseAction.GET_VERIFY({}, (rsp) => {
                        if (!rsp?.success) {
                          Helpers.showMess('Cant get all verify course...!!!')
                        }
                      }))
                    } else {
                      Helpers.showMess('Cant get all unverify course...!!!')
                    }
                  }))
                } else {
                  Helpers.showMess('Cant get newest unverify course...!!!')
                }
              }))
            }
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
