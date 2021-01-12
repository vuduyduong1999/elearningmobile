import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
// import { createSelector } from 'reselect'
import Modal from 'react-native-modal'
import { createSelector } from 'reselect'
import moment from 'moment'
import { Helpers, NavigationHelper } from '../utils'
import { Header, Text } from '../components'
import { IMAGES } from '../../assets/images'
import { COLORS, TextStyles } from '../../assets/styles'
import { SCREEN_NAME } from '../configs'
import { userAction } from '../redux/actions'
// import { TextStyles, COLORS } from '../../../assets/styles'

const { width } = Dimensions.get('window')
const rate = width / 375
const UserScreen = () => {
  const dispatch = useDispatch()
  // const { } = props
  const token = useSelector(createSelector((state) => state.user, (user) => user.token))
  const profile = useSelector(createSelector((state) => state.user, (user) => user.profile))
  console.tron.log({ profile })
  const acctype = profile?.ma === 'AD' ? 'Admin' : profile?.ma === 'ST' ? 'Student' : 'Author'
  const [isConfirm, setIsConfirm] = useState(false)
  useEffect(() => {
    dispatch(userAction.GET_PROFILE({ token }, (response) => {
      if (!response?.success) {
        Helpers.showMess('Không thể tải thông tin tài khoản')
      }
    }))
  }, [])
  const handleConfirm = () => {
    dispatch({ type: 'LOGOUT' })
    NavigationHelper.navigationToScreen(SCREEN_NAME.LOGIN)
  }
  // -----------------
  return (
    <View
      style={styles.container}
    >
      <ModalConfirm
        isVisible={isConfirm}
        handleOff={() => { setIsConfirm(false) }}
        handleConfirm={handleConfirm}
      />
      <Header title="SETTING" transparent comWhite />
      <View style={styles.avatar}>
        <View style={{ width: 80 * rate, height: 80 * rate }}>
          <FastImage
            source={IMAGES.imageProfile}
            style={{
              height: 80 * rate,
              width: 80 * rate,
              borderRadius: 40 * rate,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          {/* <View style={{ alignItems: 'center', paddingVertical: 15 * rate }}>
            <Text style={{ ...TextStyles.bold }}>Tài khoản</Text>
          </View> */}
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Full name
            </Text>
            <Text style={styles.value}>
              {profile?.hoVaTen}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Account type
            </Text>
            <Text style={styles.value}>
              {acctype}
              {' '}
              (
              {profile?.ma}
              )
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Money
            </Text>
            <Text style={styles.value}>
              {profile?.soDu}
              <Text style={[styles.value, { color: COLORS.VERIFY }]}> $</Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Phone
            </Text>
            <Text style={styles.value}>
              {profile?.sdt}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Gender
            </Text>
            <Text style={styles.value}>
              {profile?.gioTinh}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ color: COLORS.WHITE, marginBottom: 0 }}>
              Birthday
            </Text>
            <Text style={styles.value}>{moment(profile?.ngaySinh).format('DD-MM-yyyy')}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              setIsConfirm(true)
            }}
            >
              <LinearGradient
                colors={['#FF8570', '#F9504A']}
                start={{ x: 0.25, y: 0.25 }}
                style={{
                  height: 50 * rate,
                  width: 255 * rate,
                  borderRadius: 10 * rate,
                  backgroundColor: COLORS.PRIMARY_PURPLE,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>LOG OUT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default UserScreen
const ModalConfirm = ({ isVisible, handleConfirm, handleOff }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationInTiming={100}
      animationOutTiming={500}
      delay={100}
      animationOut="fadeOutRight"
      backdropColor={COLORS.BLACK}
      onBackdropPress={() => { handleOff() }}
      backdropOpacity={0.5}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{
        width: 345 * rate,
        height: 106 * rate,
        backgroundColor: 'white',
        borderRadius: 15 * rate,
        alignItems: 'center',
        padding: 15 * rate,
      }}
      >
        <Text style={{ ...TextStyles.latoblackSmall }}>Do you want LOG OUT in app???</Text>
        <View style={{
          flexDirection: 'row',
          width: 315 * rate,
          marginTop: 20 * rate,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        >

          <TouchableOpacity onPress={() => {
            handleConfirm()
            handleOff()
          }}
          >
            <LinearGradient
              colors={['#FF8570', '#F9504A']}
              start={{ x: 0.25, y: 0.25 }}
              style={{
                height: 35 * rate,
                width: 110 * rate,
                borderRadius: 10 * rate,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>YES</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOff}>
            <View style={{
              height: 35 * rate,
              width: 110 * rate,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10 * rate,
              backgroundColor: COLORS.GREY_LIGHT,
            }}
            >
              <Text style={{ ...TextStyles.latoblackSmall }}>NO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 23 * rate,
    height: 23 * rate,
    borderRadius: 23 * rate,
    borderWidth: 2 * rate,
    borderColor: 'white',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.GREY,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingBottom: 10 * rate,
    paddingHorizontal: 10 * rate,
    marginBottom: 20 * rate,
    padding: 0,
  },
  item_end: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: COLORS.GREY_M,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingBottom: 18 * rate,
    marginBottom: 20 * rate,
  },
  container: { flex: 1 },
  avatar: { alignItems: 'center', marginTop: 10 * rate, marginBottom: 50 * rate },
  content: {
    flex: 1,
    paddingHorizontal: 15 * rate,
    paddingBottom: 110 * rate,
  },
  value: { ...TextStyles.semiBold, color: COLORS.WHITE },
})
