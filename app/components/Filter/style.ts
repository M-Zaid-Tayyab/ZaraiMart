import React from 'react';
import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      nameText: {
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.8),
      },
      greenContainer:{
        paddingHorizontal:widthPercentageToDP(4),
        paddingVertical:heightPercentageToDP(0.8),
        borderWidth:widthPercentageToDP(0.5),
        borderRadius:widthPercentageToDP(90),
        borderColor:theme.colors.primaryButton,
      },
      rowContainer:{
        flexDirection:'row',
        alignItems:'center',
      },
      star:{
        width:widthPercentageToDP(3),
        height:heightPercentageToDP(2),
        marginRight:widthPercentageToDP(1.5),
      }
    });
  return React.useMemo(() => styles(), []);
};
