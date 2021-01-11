import LinearGradient from 'react-native-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { IMAGES } from '../../assets/images'
import { COLORS, TextStyles } from '../../assets/styles'
import { Text } from '../components'
import { SCREEN_NAME } from '../configs'
import { NavigationHelper, Helpers } from '../utils'
import { userAction, courseAction } from '../redux/actions'

const { width } = Dimensions.get('window')
const rate = width / 375
const LoginScreen = () => {
  const dispatch = useDispatch()
  const [sdt, setSdt] = useState(__DEV__ ? '0909123456' : undefined)
  const [password, setPassword] = useState(__DEV__ ? '123456' : '123456')
  const handleSignIn = () => {
    dispatch(userAction.LOGIN({ sdt, password }, (response) => {
      if (response) {
        if (response?.success) {
          const { token, accountType } = response?.data
          if (accountType !== 'AD') {
            Helpers.showMess('Sign in successfully ....!!!', 'success')
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
          NavigationHelper.navigateReplaceScreen(SCREEN_NAME.MAINBOTTOM)
        } else {
          Helpers.showMess(response?.message)
        }
      } else {
        Helpers.showMess('Cant sign in ....!!!')
      }
    }))
  }
  return (
    <LinearGradient
      colors={['#17112B', '#3F0FDF']}
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 45 * rate,
        backgroundColor: COLORS.PRIMARY_RED,
      }}
    >
      <Animatable.View
        animation="zoomInDown"
        duration={800}
      >
        <FastImage
          source={IMAGES.Logo}
          style={{
            width: 90 * rate,
            height: 90 * rate,
          }}
          resizeMode="contain"
        />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        style={{
          width: '100%',
          flex: 1,
          marginTop: 60 * rate,
          backgroundColor: COLORS.WHITE,
          borderTopLeftRadius: 40 * rate,
          borderTopRightRadius: 40 * rate,
          paddingHorizontal: 30 * rate,
          paddingTop: 40 * rate,
        }}
      >
        <Text style={{ ...TextStyles.latoblackBig }}>Đăng nhập</Text>
        <View
          animation="fadeInLeft"
          delay={100}
          style={{
            borderBottomColor: COLORS.PRIMARY_PURPLE,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 50 * rate,
          }}
        >
          <Text style={{ marginBottom: 5 * rate }}>
            Số điện thoại
          </Text>
          <TextInput
            style={{ ...TextStyles.semiBold, padding: 0 }}
            value={sdt}
            onChangeText={(t) => { setSdt(t) }}
            placeholder="Nhập tên đăng nhập"
            keyboardType="number-pad"
          />
        </View>
        <View
          animation="fadeInLeft"
          delay={200}
          style={{
            borderBottomColor: COLORS.PRIMARY_PURPLE,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 15 * rate,
          }}
        >
          <Text style={{ marginBottom: 5 * rate }}>
            Mật khẩu
          </Text>
          <TextInput
            style={{ ...TextStyles.semiBold, padding: 0 }}
            value={password}
            onChangeText={(t) => { setPassword(t) }}
            secureTextEntry
            onFocus={() => { setPassword('') }}
          />
        </View>
        <View
          style={{ alignItems: 'center', marginTop: 70 * rate }}
        >
          <TouchableOpacity onPress={handleSignIn}>
            <LinearGradient
              colors={['#221159', '#9EECD9']}
              // locations={[0, 0]}
              start={{ x: 0.0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50 * rate,
                width: 255 * rate,
                borderRadius: 10 * rate,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Đăng nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  )
}
export default LoginScreen
