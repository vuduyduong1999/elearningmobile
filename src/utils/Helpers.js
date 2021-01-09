import { showMessage } from 'react-native-flash-message'
import { IMAGES } from '../../assets/images'
import { MessageStyles } from '../../assets/styles'

export const showMess = (message, type = 'error') => {
  console.tron.log({ message })
  if (type === 'success') {
    return showMessage({
      message,
      ...MessageStyles.success,
    })
  }
  if (type === 'info') {
    return showMessage({
      message,
      ...MessageStyles.success,
    })
  }
  return showMessage({
    message,
    ...MessageStyles.error,
  })
}
export const autoExportImage = () => {
  const ran = Math.floor(Math.random() * 5) + 1
  return IMAGES[`c${ran}`]
}
export const truncateString = (input, l) => {
  if (input.length > l) {
    return `${input.substring(0, l)}...`
  }
  return input
}
