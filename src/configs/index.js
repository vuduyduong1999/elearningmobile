import { IMAGES } from '../../assets/images'

const SCREEN_NAME = {
  LOGIN: 'LOGIN',
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  MAIN: {
    HOMESCEEN: 'HOMESCEEN',
    COURSESCEEN: 'COURSESCEEN',
    SETTINGSCEEN: 'SETTINGSCEEN',
  },
  MAINBOTTOM: 'MAINBOTTOM',
  WITHOUTBOTTOM: 'WITHOUTBOTTOM',
  DETAILCOURSE: 'DETAILCOURSE',

}
const TAB_DATA = [
  {
    title: 'Khóa học',
    image: IMAGES.CourseTab,
  },
  {
    title: 'Trang chủ',
    image: IMAGES.HomeTab,
  },
  {
    title: 'Cài đặt',
    image: IMAGES.SettingTab,
  },

]

const URL = 'http://192.168.1.7:3000'
// const URL = 'http://192.168.1.106:3000'
export {
  SCREEN_NAME, TAB_DATA, URL,
}
