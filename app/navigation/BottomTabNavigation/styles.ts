import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      tabbarIcon: {
        marginBottom:heightPercentageToDP(-1),
        fontSize: widthPercentageToDP(20),
      },
      tabbar: {
        backgroundColor: theme.colors.background,
        height:
          Platform.OS == 'ios'
            ? heightPercentageToDP(8)
            : heightPercentageToDP(7),
        paddingBottom: heightPercentageToDP(1),
        borderTopWidth:0,
        elevation:0,
        shadowOpacity:0,
      },
    });
  return React.useMemo(() => styles(), []);
};
