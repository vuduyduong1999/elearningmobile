import React, { useEffect, useState } from 'react'
import {
  View, Dimensions, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import { Header, Text } from '../../components'
import { IMAGES } from '../../../assets/images'
import { Helpers, NavigationHelper } from '../../utils'
import { COLORS, TextStyles } from '../../../assets/styles'

const { width } = Dimensions.get('window')
const rate = width / 375
const DetailCourseScreen = (props) => {
  const accountType = useSelector((state) => state?.user?.accountType)
  const { route } = props
  const { params } = route
  console.tron.log({ params })
  const textStyleVerify = params?.trangThai === 0 ? { color: COLORS.UNVERIFY } : { ...TextStyles.semiBold, color: COLORS.BLUE }
  const textVerify = params?.trangThai === 0 ? 'Chưa duyệt' : 'Đã duyệt'
  const arrayVideo = params?.arrayVideo
  const seen = params?.progress?.seen || 0
  const { owner, trangThai = 0 } = params
  const setIsConfirm = (r) => { }
  const handleVerify = () => { }
  const renderUser = () => {
    if (owner) {
      return (<View
        style={{
          paddingHorizontal: 15 * rate,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity onPress={() => {
          setIsConfirm(true)
        }}
        >
          <LinearGradient
            colors={['#FF8570', '#F9504A']}
            start={{ x: 0.25, y: 0.25 }}
            style={{
              height: 50 * rate,
              borderRadius: 10 * rate,
              backgroundColor: COLORS.PRIMARY_PURPLE,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 50 * rate,
            }}
          >
            <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Xóa</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>)
    }
    return null
  }
  const renderAdmin = (tt) => {
    return (
      <View
        style={{ paddingHorizontal: 15 * rate, flexDirection: 'row', justifyContent: 'space-around' }}
      >
        <TouchableOpacity onPress={() => {
          setIsConfirm(true)
        }}
        >
          <LinearGradient
            colors={['#FF8570', '#F9504A']}
            start={{ x: 0.25, y: 0.25 }}
            style={{
              height: 50 * rate,
              borderRadius: 10 * rate,
              backgroundColor: COLORS.PRIMARY_PURPLE,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30 * rate,
            }}
          >
            <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Xóa</Text>
          </LinearGradient>
        </TouchableOpacity>
        { tt === 0
          && <TouchableOpacity onPress={handleVerify}>
            <LinearGradient
              colors={['#221159', '#9EECD9']}
              // locations={[0, 0]}
              start={{ x: 0.0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                height: 50 * rate,
                borderRadius: 10 * rate,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30 * rate,
              }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Duyệt</Text>
            </LinearGradient>
          </TouchableOpacity>}
      </View>
    )
  }
  useEffect(() => {

  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={Helpers.truncateString(params?.tenKhoaHoc, 20)}
        imageLeft={IMAGES.Back}
        handleLeft={() => { NavigationHelper.navigationToBack() }}
        transparent
        comWhite
      />
      <ScrollView>
        <View style={{
          marginTop: 20 * rate,
          borderRadius: 20 * rate,
          marginHorizontal: 20 * rate,
          backgroundColor: COLORS.PRIMARY_BG_COM,
          padding: 12 * rate,
          marginBottom: 15 * rate,
        }}
        >
          <FastImage source={Helpers.autoExportImage()} style={{ width: 320 * rate, height: 230 * rate }} />
          <Text style={{
            ...TextStyles.optionBold, color: COLORS.WHITE, width: 320 * rate, marginTop: 10 * rate,
          }}
          >
            {params?.tenKhoaHoc}
          </Text>
          {params?.owner && <Text style={{ ...textStyleVerify, marginTop: 0 * rate }}>{textVerify}</Text>}
          <Text style={{
            ...TextStyles.latoRegular, color: COLORS.WHITE, width: 320 * rate, marginTop: 10 * rate,
          }}
          >
            {params?.moTa}
          </Text>
          <View style={{ borderBottomColor: COLORS.WHITE, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10 * rate }}>

            <Text style={{
              ...TextStyles.semiBold, color: COLORS.WHITE, width: 320 * rate, marginTop: 10 * rate,
            }}
            >
              Danh sách video
            </Text>
          </View>
          <View />
          <View style={{ marginTop: 20 * rate }}>
            {arrayVideo.length > 0 ? _.map(arrayVideo, (o, ind) => <VideoItem key={`list_Video_${ind}`} data={o} index={ind} seen={seen} />) : <Text style={{
              ...TextStyles.optionBold, color: COLORS.WHITE, marginTop: 50 * rate, textAlign: 'center', marginHorizontal: 15 * rate,
            }}
            >
              Chưa có video nào trong khóa học
            </Text>}
          </View>

        </View>

        {/* {} */}
        <View style={{ marginBottom: 70 * rate }}>
          {accountType === 'AD' ? renderAdmin(trangThai)
            : renderUser(0)}
        </View>
      </ScrollView>
    </View>
  )
}
export default DetailCourseScreen
const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 310 * rate,
    height: 70 * rate,
    borderRadius: 20 * rate,
    elevation: 2,
    padding: 15 * rate,
    marginBottom: 15 * rate,
  },
})
const VideoItem = ({ data, index, seen = 0 }) => {
  const minutes = data?.thoiLuong?.hours * 60 + data?.thoiLuong?.minute || 0
  const textStyleVerify = index > seen ? { color: COLORS.UNVERIFY } : { ...TextStyles.semiBold, color: COLORS.BLUE }
  const textSeen = index <= seen ? 'Đã xem' : 'Chưa xem'
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
    >
      <LinearGradient
        colors={['#fff', 'rgba(255,255,255,0)']}
        start={{ x: 0.5, y: -0.1 }}
        style={styles.item}
      >
        <FastImage
          source={IMAGES.Play}
          style={{
            width: 50 * rate,
            height: 50 * rate,
            marginRight: 20 * rate,
          }}
          resizeMode="contain"
        />
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ ...TextStyles.semiBold }}>
            {data?.tieuDe}
          </Text>
          <Text style={{}}>
            <Text style={{ ...TextStyles.semiBold }}>{minutes}</Text>
            {' '}
            phút
          </Text>
        </View>
        <View style={{ position: 'absolute', bottom: 15 * rate, right: 15 * rate }}>
          <Text style={{ ...textStyleVerify, textAlign: 'right' }}>{textSeen}</Text>
        </View>
      </LinearGradient>
    </Animatable.View>
  )
}
