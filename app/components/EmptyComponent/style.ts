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
      mainView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(100),
      },
      lottie:{
        width: widthPercentageToDP(50),
        height: heightPercentageToDP(20),
      }
    });
  return React.useMemo(() => styles(), []);
};
