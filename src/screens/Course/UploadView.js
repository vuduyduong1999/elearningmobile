import React, { useEffect, useState } from 'react'
import {
  View, Dimensions, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { IMAGES } from '../../../assets/images'
import { COLORS, TextStyles } from '../../../assets/styles'
import { Text } from '../../components'
import { SCREEN_NAME } from '../../configs'
import { NavigationHelper } from '../../utils'
import { courseAction } from '../../redux/actions'

const { width } = Dimensions.get('window')
const rate = width / 375
const UploadView = (props) => {
  const { } = props
  const courseUploadVerify = useSelector((state) => state?.course?.courseUploadVerify)
  const courses = courseUploadVerify.sort((a, b) => b.id - a.id)
  const accountType = useSelector((state) => state?.user?.accountType)
  const renderItem = ({ item, index }) => {
    return <UploadItem data={item} index={index} />
  }
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {courseUploadVerify.length === 0
        && <Text style={{
          ...TextStyles.optionBold, color: COLORS.WHITE, marginTop: 50 * rate, textAlign: 'center', marginHorizontal: 15 * rate,
        }}
        >
          {accountType === 'ST' ? 'Bạn cần trờ thành giảng viên để có thể đăng tải khóa học.' : 'Bạn chưa đăng tải khóa học nào'}
        </Text>}
      <FlatList
        data={courses}
        extraData={courseUploadVerify}
        key="flashlist2"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `fl2_${item.id}`}
        contentContainerStyle={{ paddingBottom: 90 * rate, paddingTop: 5 * rate }}
        style={{ marginTop: 10 * rate }}
      />
    </View>
  )
}
export default UploadView
const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 345 * rate,
    height: 85 * rate,
    borderRadius: 20 * rate,
    elevation: 2,
    padding: 15 * rate,
    marginBottom: 15 * rate,
  },
})
const UploadItem = ({ data, index }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user?.token)
  const minutes = data?.tongThoiLuong?.hours * 60 + data?.tongThoiLuong?.minute
  const textStyleVerify = data?.trangThai === 0 ? { ...TextStyles.semiBold, color: COLORS.UNVERIFY } : { ...TextStyles.semiBold, color: COLORS.BLUE }
  const textVerify = data?.trangThai === 0 ? 'Chưa duyệt' : 'Đã duyệt'
  const handlePress = () => {
    let arrayVideo = []
    let owner = false
    dispatch(courseAction.GET_LESSION({ token, maKH: data?.id }, (response) => {
      if (response?.success) {
        arrayVideo = response?.data?.arrayVideo

        if (response?.data?.owner) { owner = true }
      }
      NavigationHelper.navigationToScreenInRoot(SCREEN_NAME.WITHOUTBOTTOM, SCREEN_NAME.DETAILCOURSE, { ...data, owner, arrayVideo })
    }))
  }
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
    >
      <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          colors={['#fff', 'rgba(255,255,255,0)']}
          style={styles.item}
        >
          <FastImage
            source={IMAGES.Course}
            style={{
              width: 50 * rate,
              height: 50 * rate,
              marginRight: 20 * rate,
            }}
            resizeMode="contain"
          />
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ ...TextStyles.semiBold }}>
              {data?.tenKhoaHoc}
            </Text>
            <Text style={{ color: 'black' }}>
              Số lượt mua:
              <Text style={{ ...TextStyles.semiBold }}>
                {' '}
                {data?.soLuongDaBan}
              </Text>

            </Text>
            <Text style={{}}>
              <Text style={{ ...TextStyles.semiBold }}>{data?.soLuongBaiGiang}</Text>
              {' '}
              videos -
              {' '}
              <Text style={{ ...TextStyles.semiBold }}>{minutes}</Text>
              {' '}
              phút
            </Text>
          </View>
          <View style={{ position: 'absolute', bottom: 15 * rate, right: 15 * rate }}>
            <Text style={{ ...textStyleVerify, textAlign: 'right' }}>{textVerify}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  )
}
