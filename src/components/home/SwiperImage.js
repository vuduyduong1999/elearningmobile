import React, { useState, createRef } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import SwiperBack from '../../../assets/images/SwiperBack.svg'
import SwiperNext from '../../../assets/images/SwiperNext.svg'

const { width: wi } = Dimensions.get('window')
const rate = wi / 375
const SwiperImage = ({
  arrayImage,
  style,
}) => {
  const { width = 310 * rate, height = 195 * rate } = style
  const [indexSwiper, setIndexSwiper] = useState(0)
  const refFlatList = createRef()
  const handleSetIndexSwiper = (offset) => {
    setIndexSwiper(Math.round(offset.x / width))
  }
  const _renderItem = ({ item }) => {
    return <Image source={item} style={{ width, height }} resizeMode="cover" />
  }
  const handleBack = () => {
    const newIndex = indexSwiper - 1

    if (indexSwiper > 0) {
      refFlatList.current.scrollToIndex({
        animated: true,
        index: newIndex,
      })
      setIndexSwiper(newIndex)
    }
  }
  const handleNext = () => {
    const newIndex = indexSwiper + 1
    if (indexSwiper < arrayImage.length - 1) {
      refFlatList.current.scrollToIndex({
        animated: true,
        index: newIndex,
      })
      setIndexSwiper(newIndex)
    }
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={refFlatList}
        data={arrayImage}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={indexSwiper}
        onMomentumScrollEnd={({ nativeEvent: { contentOffset } }) => handleSetIndexSwiper(contentOffset)}
        renderItem={_renderItem}
        keyExtractor={(item) => `key_swiper${item}`}
      />
      <View style={[styles.viewbtn, { width: width - (20 * rate) }]}>
        <TouchableOpacity onPress={handleBack}>
          {indexSwiper > 0 && (
            <SwiperBack
              height={15.5 * rate}
              width={15.5 * rate}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          {indexSwiper < arrayImage.length - 1 && (
            <SwiperNext
              height={15.5 * rate}
              width={15.5 * rate}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default SwiperImage
const styles = StyleSheet.create({
  container: {
    width: 310 * rate,
    height: 195 * rate,
    borderRadius: 5 * rate,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  viewbtn: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
