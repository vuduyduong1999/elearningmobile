import React, { useEffect } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  CourseScreen, HomeScreen, SettingScreen, BackgroundHOC,
} from '../screens'
import { SCREEN_NAME } from '../configs'
import MainTabbar from '../components/share/MainTabbar'

const Tab = createBottomTabNavigator()
const BottomTab = (props) => {
  const { navigation, route } = props

  return (
    <Tab.Navigator
      tabBar={(pro) => <MainTabbar {...pro} />}
      initialRouteName={SCREEN_NAME.MAIN.HOMESCEEN}
    >
      <Tab.Screen
        name={SCREEN_NAME.MAIN.COURSESCEEN}
        component={BackgroundHOC(CourseScreen)}
        options={{ title: 'Khóa học' }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MAIN.HOMESCEEN}
        component={BackgroundHOC(HomeScreen)}
        options={{
          title: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MAIN.SETTINGSCEEN}
        component={BackgroundHOC(SettingScreen)}
        options={{ title: 'Cài đặt' }}
      />

    </Tab.Navigator>
  )
}
export default BottomTab
