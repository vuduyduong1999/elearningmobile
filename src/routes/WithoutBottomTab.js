import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SCREEN_NAME } from '../configs'
import { BackgroundHOC, DetailCourseScreen } from '../screens'

const Stack = createStackNavigator()

const WithoutBottomTab = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={SCREEN_NAME.DETAILCOURSE} component={BackgroundHOC(DetailCourseScreen)} />

    </Stack.Navigator>
  )
}
export default WithoutBottomTab
