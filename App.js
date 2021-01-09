import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTab, WithoutBottomTab } from './src/routes'
import store from './src/redux/store'
import { navigationRef } from './src/utils/NavigationHelper'
import { SplashScreen, LoginScreen, BackgroundHOC } from './src/screens'
import { SCREEN_NAME } from './src/configs'

const Stack = createStackNavigator()

const MainNavigate = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SPLASHSCREEN" component={BackgroundHOC(SplashScreen)} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAME.MAINBOTTOM} component={BottomTab} />
      <Stack.Screen name={SCREEN_NAME.WITHOUTBOTTOM} component={BackgroundHOC(WithoutBottomTab)} />

    </Stack.Navigator>
  )
}
const App = (props) => {
  const { } = props
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}

      >
        <MainNavigate />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  )
}
export default App
