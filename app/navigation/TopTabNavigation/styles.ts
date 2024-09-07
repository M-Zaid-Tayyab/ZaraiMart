import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  widthPercentageToDP
} from 'react-native-responsive-screen';

export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      label: {
        fontFamily:theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(4),
      },
      indicatorStyle:{
        borderBottomColor: theme.colors.primaryButton,
      borderBottomWidth: widthPercentageToDP(0.7),
      borderRadius:widthPercentageToDP(40),
      }
    });
  return React.useMemo(() => styles(), []);
};
