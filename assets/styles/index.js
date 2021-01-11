import { Dimensions } from 'react-native'

export const COLORS = {
  PRIMARY_PURPLE: '#2A1476',
  PRIMARY_BG_COM: 'rgba(15,14,71,0.5)',
  WHITE: '#FFF',
  GREY_LIGHT: '#C1C1C1',
  PRIMARY_RED: '#F9504A',
  BLUE: '#3241CE',
  UNVERIFY: '#8B0505',
  VERIFY: '#33A242',
}
const { width } = Dimensions.get('window')
const rate = width / 375
export const Fonts = {
  sf: {
    regular: {
      fontFamily: 'SFProDisplay-Regular',
    },
    bold: {
      fontFamily: 'SFProDisplay-Bold',
    },
    semiBold: {
      fontFamily: 'SFProDisplay-Semibold',

    },
    medium: {
      fontFamily: 'SFProDisplay-Medium',
    },
  },
  lt: {
    black: {
      fontFamily: 'Lato-Black',
    },
    regular: {
      fontFamily: 'Lato-Regular',
    },
  },
}

export const TextStyles = {
  regular: {
    ...Fonts.sf.regular,
    fontSize: 14 * rate,
  },
  bold: {
    ...Fonts.sf.bold,

    fontSize: 16 * rate,
  },
  optionNormal: {
    ...Fonts.sf.regular,
    fontSize: 18 * rate,
  },
  optionBold: {
    ...Fonts.sf.bold,
    fontSize: 18 * rate,

  },
  semiBold: {
    ...Fonts.sf.semiBold,
    fontSize: 14 * rate,
  },
  medium: {
    ...Fonts.sf.medium,
    fontSize: 14 * rate,
    textAlign: 'center',
  },
  mediumNormal: {
    ...Fonts.sf.medium,
    fontSize: 14 * rate,
  },
  latoblackBig: {
    ...Fonts.lt.black,
    fontSize: 24 * rate,
  },
  latoblackSmall: {
    ...Fonts.lt.black,
    fontSize: 14 * rate,
  },
  latoRegular: {
    ...Fonts.lt.regular,
    fontSize: 11 * rate,
  },

}
export const MessageStyles = {
  error: {
    style: {
      backgroundColor: COLORS.PRIMARY_RED,
      alignItems: 'center',
    },
    duration: 2000,
    titleStyle: TextStyles.bold,
  },
  success: {
    style: {
      backgroundColor: COLORS.VERIFY,
      alignItems: 'center',
      borderColor: COLORS.WHITE,
      borderWidth: 2 * rate,
    },
    duration: 2000,
    titleStyle: TextStyles.bold,

  },
}
