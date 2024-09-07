import React from 'react';
import { StyleSheet } from 'react-native';
import DeviceInfo, { isTablet } from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
import {
  widthPercentageToDP
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      view: {
        justifyContent: 'center',
        alignItems: 'center',

        width: widthPercentageToDP(94),
        padding: DeviceInfo.isTablet()
          ? widthPercentageToDP(2)
          : widthPercentageToDP(4),
        borderRadius: widthPercentageToDP(6),
        zIndex: -1,
      },
      activityIndicator: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      text: {
        fontFamily: theme.fonts.boldFont,
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(4),
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    });
  return React.useMemo(() => styles(), []);
};
