import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
export const defaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    myOwnProperty:true,
    primaryButton: '#01B763',
    background: 'white',
    primaryText: '#212121',
    placeholderText:'#9E9E9E',
    inactiveButton: '#109C5B',
    grey700:'#616161',
    textViewBackground:'#FAFAFA',
    borderColor:'#EEEEEE',
    greyDot:'#E0E0E0',
    lightGrey:"#757575",
    dullGreyBackground:'#F5F5F5',
    transparentGreen:'#01B76314',
    dullBlack:'#424242',
    greyBackground:'#F8F8F8',
    transparentGreenBackground:'#01B7631A',
  },
  fonts: {
    boldFont: 'Urbanist-Bold',
    mediumFont: 'Urbanist-Medium',
    regularFont: 'Urbanist-Regular',
    semiBoldFont: 'Urbanist-SemiBold',
  },
};

export default defaultTheme;
