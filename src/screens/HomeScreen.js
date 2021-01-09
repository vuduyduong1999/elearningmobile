import React, { useEffect, useState } from 'react'
import { View, Dimensions, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { IMAGES } from '../../assets/images'
import { COLORS, TextStyles } from '../../assets/styles'
import { Header, SwiperImage, Text } from '../components'
import { COURSE_DATA } from '../configs'
import { Helpers } from '../utils'

const { width } = Dimensions.get('window')
const rate = width / 375
const HomeScreen = (props) => {
  const { } = props
  const courseHome = useSelector((state) => state?.course?.courseHome)
  const renderItem = ({ item }) => <ItemRecent title={item.tenKhoaHoc} />
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 * rate }}>

      <Header title="Trang chủ" transparent comWhite />
      <View style={{ alignItems: 'center' }}>
        <SwiperImage arrayImage={[IMAGES.c1, IMAGES.c2, IMAGES.c3, IMAGES.c4]} style={{ width: 295 * rate, height: 220 * rate }} />
      </View>
      <Text style={{
        ...TextStyles.optionBold, color: COLORS.WHITE, fontSize: 14 * rate, marginTop: 14 * rate,
      }}
      >
        Xem gần đây :
      </Text>
      <FlatList
        data={courseHome}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 90 * rate, paddingTop: 5 * rate }}
        style={{ marginTop: 10 * rate }}
      />
    </View>
  )
}
export default HomeScreen
const ItemRecent = ({ title }) => <View style={{
  width: 160 * rate,
  height: 160 * rate,
  backgroundColor: COLORS.PRIMARY_BG_COM,
  borderRadius: 20 * rate,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15 * rate,
}}
>
  <FastImage source={Helpers.autoExportImage()} style={{ width: 145 * rate, height: 116 * rate }} resizeMode="contain" />
  <Text style={{ ...TextStyles.optionBold, fontSize: 13 * rate, color: COLORS.WHITE }}>{Helpers.truncateString(title, 20)}</Text>
</View>
