import {StyleSheet, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      controller: {marginTop: heightPercentageToDP(3.5)},
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      inputStyle: {
        paddingVertical: heightPercentageToDP(1.5),
        width: widthPercentageToDP(83),
      },
      addImg: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(15),
        alignSelf:'center',
      },
      imgPlaceholder: {
        width: widthPercentageToDP(11),
        height: heightPercentageToDP(5.5),
      },
      removeImg: {
        width: widthPercentageToDP(4.4),
        height: heightPercentageToDP(2.5),
        position: 'absolute',
        left: heightPercentageToDP(-1.2),
        top: heightPercentageToDP(-0.8),
      },
      selectedImg: {
        width: widthPercentageToDP(16),
        height: heightPercentageToDP(8),
        borderRadius: widthPercentageToDP(3),
      },
      imgContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: widthPercentageToDP(26),
        paddingVertical: heightPercentageToDP(11),
        borderRadius: widthPercentageToDP(4),
        alignSelf: 'center',
      },
      subImgContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(1.5),
        borderRadius: widthPercentageToDP(3),
      },
      imgTxt: {
        fontSize: widthPercentageToDP(4),
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryText,
        alignSelf:'center',
      },
      button: {
        marginVertical: heightPercentageToDP(3),
        alignSelf: 'center',
      },
      row: {
        paddingTop: widthPercentageToDP(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      selectedImgContainer: {
        flexDirection: 'row',
      },

      dropdown: {
        marginTop:heightPercentageToDP(3.5),
        paddingVertical:heightPercentageToDP(1),
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.2),
        borderRadius: widthPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(4),
        backgroundColor:theme.colors.textViewBackground,
      },
      placeholderStyle: {
        color:theme.colors.placeholderText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.5),
      },
      selectedTextStyle: {
        color:theme.colors.primaryText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.7),
      },
      iconStyle: {
        width:widthPercentageToDP(5),
        height:heightPercentageToDP(2.5),
      },
      inputSearchStyle: {
        color:theme.colors.primaryText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.7),
        borderRadius: widthPercentageToDP(2),
      },
      containerStyle: {
        borderRadius: widthPercentageToDP(3),
        height:heightPercentageToDP(22),
      },
      unitContainerStyle:{
        borderRadius: widthPercentageToDP(3),
        height:heightPercentageToDP(29),
      }
    });
  return React.useMemo(() => styles(), []);
};
