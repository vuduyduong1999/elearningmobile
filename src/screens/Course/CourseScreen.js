import React, { useEffect, useState } from 'react'
import {
  View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { TabView } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS, TextStyles } from '../../../assets/styles'
import { Header } from '../../components'
import { IMAGES } from '../../../assets/images'
import BoughtView from './BoughtView'
import UploadView from './UploadView'
import { courseAction } from '../../redux/actions'
import { Helpers } from '../../utils'

const { width } = Dimensions.get('window')
const rate = width / 375
const selectecTabColor = (b) => {
  return b
    ? {
      backgroundColor: COLORS.WHITE,
      color: COLORS.PRIMARY_PURPLE,
    }
    : {
      color: COLORS.WHITE,
    }
}
const CourseScreen = (props) => {
  const courseBoughtUnverify = useSelector((state) => state?.course?.courseBoughtUnverify)
  const courseUploadVerify = useSelector((state) => state?.course?.courseUploadVerify)

  const { navigation } = props
  const [search, setSearch] = useState('')
  const [routesTabView] = useState([
    { key: 'bought', title: `Đã mua (${courseBoughtUnverify?.length})` },
    { key: 'upload', title: `Đã đăng (${courseUploadVerify?.length})` },
  ])
  const dispatch = useDispatch()
  useEffect(() => {

  })
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'bought':
        return <BoughtView navigation={navigation} />
      case 'upload':
        return <UploadView navigation={navigation} />
      default:
    }
  }
  const [indexTabView, setIndexTabView] = React.useState(0)
  const _renderTabBar = (props) => {
    const { jumpTo, navigationState } = props

    return (
      <View style={styles.containerTab}>
        {navigationState.routes.map((item, idx) => (
          <View key={`keyTab_${item.key}`} style={styles.contentTab}>
            <TouchableOpacity
              onPress={() => {
                jumpTo(item.key)
              }}
              style={[
                styles.touchTab,
                {
                  backgroundColor: selectecTabColor(
                    idx === navigationState.index,
                  ).backgroundColor,
                },
              ]}
            >
              <Text
                style={[
                  TextStyles.semiBold,
                  {
                    color: selectecTabColor(idx === navigationState.index)
                      .color,
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title="Khóa  học" transparent comWhite />
      <View style={styles.container}>
        <View style={styles.search}>
          <FastImage
            source={IMAGES.Search}
            style={{
              height: 20 * rate,
              width: 20 * rate,
              marginRight: 10 * rate,
            }}
            resizeMode="contain"
            tintColor={COLORS.GREY}
          />
          <TextInput
            style={{ ...TextStyles.semiBold, padding: 0, flex: 1 }}
            onChangeText={(t) => { setSearch(t) }}
            placeholder="Tìm theo mã"
            value={search}
            onFocus={() => { setSearch('') }}
          />
        </View>
      </View>
      <TabView
        navigationState={{ index: indexTabView, routes: routesTabView }}
        renderScene={renderScene}
        onIndexChange={setIndexTabView}
        renderTabBar={_renderTabBar}
      />
    </View>
  )
}
export default CourseScreen
const styles = StyleSheet.create({
  search: {
    // borderRadius: 20 * rate,
    flexDirection: 'row',
    alignItems: 'center',
    width: 345 * rate,
    height: 40 * rate,
    borderRadius: 20 * rate,
    backgroundColor: COLORS.WHITE,
    padding: 10 * rate,
    marginBottom: 15 * rate,
  },
  container: {
    marginHorizontal: 15 * rate,
  },
  contentTab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  containerTab: { flexDirection: 'row' },
  touchTab: {
    height: 50 * rate,
    width: 146 * rate,
    borderRadius: rate * 15,
    borderColor: COLORS.WHITE,
    borderWidth: 2 * StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
