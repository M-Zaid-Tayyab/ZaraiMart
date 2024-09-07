import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      view: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      icon: {
        width: isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(6),
        height: isTablet() ? heightPercentageToDP(3) : heightPercentageToDP(3),
      },
      eye: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      clear: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      input: {
        width: widthPercentageToDP(67),
        paddingHorizontal: widthPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(3.6),
        paddingVertical: 15,
      },
      textView: {
        paddingHorizontal: widthPercentageToDP(2),
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: widthPercentageToDP(0.15),
        borderRadius: widthPercentageToDP(3.4),
        borderColor:theme.colors.borderColor,
        width: widthPercentageToDP(92),
        backgroundColor: theme.colors.textViewBackground,
      },
      icons: {
        height: heightPercentageToDP(2.1),
        width: widthPercentageToDP(4.1),
      },
      rightIcon: {
        height: heightPercentageToDP(2.5),
        width: widthPercentageToDP(5),
      },
      errorMessage: {
        color: theme.colors.error,
        textAlign: 'center',
        fontSize: isTablet() ? widthPercentageToDP(1.5) : undefined,
      },
    });

  return React.useMemo(() => styles(), []);
};
