import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      contentContainer: {
        paddingBottom: heightPercentageToDP(10),
      },
      Img: {
        height: heightPercentageToDP(30),
        marginTop: heightPercentageToDP(5.1),
        width: widthPercentageToDP(60),
        alignSelf: 'center',
      },
      controller: {marginVertical: heightPercentageToDP(1)},
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      subContainer: {
        // paddingTop: Platform.OS === 'android' ? heightPercentageToDP(2) : 0,
        paddingHorizontal: widthPercentageToDP(3),
      },
      text: {
        color: theme.colors.primaryText,
        width: widthPercentageToDP(80),
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(4),
        paddingBottom: heightPercentageToDP(3),
      },
      button: {
        marginTop: heightPercentageToDP(8.3),
        alignSelf: 'center',
      },
      icons: {
        height: heightPercentageToDP(2.1),
        width: widthPercentageToDP(4.1),
      },
      iconStyle: {
        borderColor: theme.colors.primaryButton,
        borderWidth: widthPercentageToDP(0.64),
        borderRadius: widthPercentageToDP(1.7),
      },
      checkBoxText: {
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(3.4),
      },
      centeredView: {
        marginHorizontal: widthPercentageToDP(9),
        backgroundColor: 'white',
        borderRadius: widthPercentageToDP(10),
        marginTop: heightPercentageToDP(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(7),
        paddingVertical: heightPercentageToDP(3),
      },
      congratsText: {
        fontFamily: theme.fonts.boldFont,
        paddingVertical: heightPercentageToDP(2),
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(5.5),
      },
      congratsSubText: {
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4),
        alignSelf: 'center',
      },
      successImg: {
        height: heightPercentageToDP(21),
        width: widthPercentageToDP(42),
        marginVertical: heightPercentageToDP(2),
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2,
      },
      loaderImg: {
        height: heightPercentageToDP(8),
        width: widthPercentageToDP(16),
        marginTop: heightPercentageToDP(4),
      },
    });
  return React.useMemo(() => styles(), []);
};
