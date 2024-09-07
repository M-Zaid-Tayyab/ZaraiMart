import {StyleSheet} from 'react-native';
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
        height: heightPercentageToDP(78),
        backgroundColor: theme.colors.greyBackground,
      },
      orderCardStyle: {
        marginTop: heightPercentageToDP(2),
      },
      modalView: {
        backgroundColor: theme.colors.greyBackground,
        paddingHorizontal: widthPercentageToDP(3),
        width: widthPercentageToDP(100),
        borderTopStartRadius: widthPercentageToDP(10),
        borderTopEndRadius: widthPercentageToDP(10),
        paddingBottom: heightPercentageToDP(3),
        paddingTop: heightPercentageToDP(1),
        position: 'absolute',
        bottom: 0,
      },
      reviewHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.8),
        alignSelf: 'center',
      },
      lineSeperator: {
        borderWidth: widthPercentageToDP(0.15),
        borderColor: theme.colors.borderColor,
        marginVertical: heightPercentageToDP(2),
      },
      topIndicator: {
        borderWidth: widthPercentageToDP(0.4),
        borderColor: theme.colors.greyDot,
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        marginBottom: heightPercentageToDP(2),
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      cancelButton: {
        backgroundColor: theme.colors.transparentGreenBackground,
        width: widthPercentageToDP(33),
      },
      submitButton: {
        width: widthPercentageToDP(40),
      },
      priceHeading: {
        color: theme.colors.lightGrey,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.2),
      },
      priceText: {
        marginTop: heightPercentageToDP(0.6),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5.2),
      },
      priceContainer: {
        paddingHorizontal: widthPercentageToDP(3),
        backgroundColor: theme.colors.background,
        marginTop: heightPercentageToDP(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      button: {
        width: widthPercentageToDP(55),
      },
    });
  return React.useMemo(() => styles(), []);
};
