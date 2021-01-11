import React, { useEffect, useState } from 'react'
import {
  View, Text, Dimensions, TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, TextStyles } from '../../../assets/styles'

const { width } = Dimensions.get('window')
const rate = width / 375
const ModalConfirm = ({
  isVisible, handleConfirm, handleOff, title,
}) => {
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
        <Text style={{ ...TextStyles.latoblackSmall }}>{title}</Text>
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
              colors={['#221159', '#9EECD9']}
              start={{ x: 0.0, y: 1 }}
              end={{ x: 1, y: 0 }}
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
export default ModalConfirm
