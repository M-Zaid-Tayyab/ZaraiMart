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
      searchIcon: {
        width: widthPercentageToDP(5),
        height: heightPercentageToDP(2.5),
      },
      search: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        paddingLeft:widthPercentageToDP(2),
        width: widthPercentageToDP(80),
        paddingVertical:heightPercentageToDP(1.2)
      },
      dummySearch: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        paddingLeft:widthPercentageToDP(2),
        width: widthPercentageToDP(80),
        
      },
      searchParent: {
        borderRadius: widthPercentageToDP(4),
        marginTop: heightPercentageToDP(2),
        alignSelf: 'center',
      },
      rowFlex:{
        paddingHorizontal:widthPercentageToDP(2),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      subRowFlex:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
    });
  return React.useMemo(() => styles(), []);
};
