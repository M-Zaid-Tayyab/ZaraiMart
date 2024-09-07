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
      orderCardStyle: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: theme.colors.textViewBackground,
      },
      lineSeperator: {
        borderWidth: widthPercentageToDP(0.15),
        borderColor: theme.colors.borderColor,
        marginTop: heightPercentageToDP(2),
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      button: {
        bottom: heightPercentageToDP(3),
        position: 'absolute',
        alignSelf: 'center',
      },
      priceText: {
        marginTop: heightPercentageToDP(0.6),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5.2),
      },
      addressText: {
        marginTop: heightPercentageToDP(1),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.5),
      },
      priceContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(2),
        marginTop: heightPercentageToDP(2),
        borderRadius: widthPercentageToDP(3),
      },
      amountText: {
        color: theme.colors.grey700,
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.5),
      },
      totalText: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.8),
      },
      buttonTop: {
        paddingVertical: heightPercentageToDP(0.6),
        paddingHorizontal:widthPercentageToDP(50),
        bottom: heightPercentageToDP(9.4),
        borderTopStartRadius:widthPercentageToDP(4),
        borderTopEndRadius:widthPercentageToDP(4),
        position: 'absolute',
      },
      scrollView: {height: heightPercentageToDP(64.2)},
    });
  return React.useMemo(() => styles(), []);
};
