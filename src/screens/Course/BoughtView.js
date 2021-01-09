import React, { useEffect, useState } from 'react'
import {
  View, Dimensions, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { createFilter } from 'react-native-search-filter'
import { IMAGES } from '../../../assets/images'
import { COLORS, TextStyles } from '../../../assets/styles'
import { Text } from '../../components'
import { NavigationHelper } from '../../utils'
import { SCREEN_NAME } from '../../configs'
import { courseAction } from '../../redux/actions'

const { width } = Dimensions.get('window')
const rate = width / 375
const BoughtView = (props) => {
  const { search } = props
  const courseBoughtUnverify = useSelector((state) => state?.course?.courseBoughtUnverify)
  const fillterCourse = courseBoughtUnverify.filter(createFilter(search, ['tenKhoaHoc']))

  const accountType = useSelector((state) => state?.user?.accountType)
  const contend = accountType === 'AD' ? 'Nothing' : 'You can buy course in website....!'

  const renderItem = ({ item, index }) => {
    return <BoughtItem data={item} index={index} />
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {courseBoughtUnverify.length === 0
        && <Text style={{
          ...TextStyles.optionBold, color: COLORS.WHITE, marginTop: 50 * rate, textAlign: 'center', marginHorizontal: 15 * rate,
        }}
        >
          {contend}
        </Text>}
      <FlatList
        data={fillterCourse}
        extraData={courseBoughtUnverify}
        renderItem={renderItem}
        key="flashlist1"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `fl1_${item.id}`}
        contentContainerStyle={{ paddingBottom: 90 * rate, paddingTop: 5 * rate }}
        style={{ marginTop: 10 * rate }}
      />

    </View>
  )
}
export default BoughtView
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
const BoughtItem = ({ data, index }) => {
  console.tron.log({ data })
  const dispatch = useDispatch()
  const accountType = useSelector((state) => state?.user?.accountType)
  const token = useSelector((state) => state.user?.token)
  const minutes = data?.tongThoiLuong?.hours * 60 + data?.tongThoiLuong?.minute
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
            {accountType === 'AD' ? <Text style={{ color: 'black' }}>
              Thời hạn :
              {' '}
              <Text style={{ ...TextStyles.semiBold }}>
                {data?.thoiHan}
                {' '}
                month
              </Text>
            </Text>
              : <Text style={{ color: 'black' }}>
                Progress:
                <Text style={{ ...TextStyles.semiBold }}>
                  {' '}
                  {data?.progress?.percent * 100}
                  %
                </Text>
              </Text>}
            <Text style={{ color: COLORS.GREY }}>
              <Text style={{ ...TextStyles.semiBold }}>{data?.soLuongBaiGiang}</Text>
              {' '}
              videos -
              {' '}
              <Text style={{ ...TextStyles.semiBold }}>{minutes}</Text>
              {' '}
              minutes
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  )
}
