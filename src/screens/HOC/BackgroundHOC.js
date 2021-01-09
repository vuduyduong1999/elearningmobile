import React, { useEffect } from 'react'
import {
  ImageBackground, StatusBar, StyleSheet, Dimensions, View,
} from 'react-native'
import { IMAGES } from '../../../assets/images'
// import BackgroundSVG from '../../../assets/images/background.svg'

// const { width, height } = Dimensions.get('window')
// const rate = width / 375
const BackgroundHOC = (Wrappercomponent) => {
  return (props) => {
    return (
      <ImageBackground source={IMAGES.BG} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="cover">
        <StatusBar hidden />
        <Wrappercomponent {...props} />
      </ImageBackground>
    )
  }
}

export default BackgroundHOC
