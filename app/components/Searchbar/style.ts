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
        // marginHorizontal: widthPercentageToDP(2),
        // position: 'absolute',
        // top:
        //   Platform.OS == 'ios'
        //     ? heightPercentageToDP(2.4)
        //     : heightPercentageToDP(2.5),
      },
      search: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        paddingLeft:widthPercentageToDP(2),
        // left: widthPercentageToDP(10),
        // position: 'absolute',
        // top: Platform.OS == 'ios' ? heightPercentageToDP(1.33) : -1,
        // zIndex: 500,
        width: widthPercentageToDP(80),
        // height: 400,
      },
      searchParent: {
        borderRadius: widthPercentageToDP(4),
        // overflow: 'hidden',
        marginTop: heightPercentageToDP(2),
        alignSelf: 'center',
        // zIndex: 1,
      },
      searchView: {
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        opacity: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(2),
        overflow: 'hidden',
        height: heightPercentageToDP(5),
        zIndex: -1,
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
