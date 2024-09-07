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
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(2.5),
        paddingVertical: heightPercentageToDP(1.5),
        backgroundColor: theme.colors.textViewBackground,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        width: widthPercentageToDP(6),
        height: heightPercentageToDP(2.5),
      },
      leftIcon: {
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(6),
      },
      titleText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.3),
        color: theme.colors.primaryText,
      },
      addressContainer: {
        marginLeft: widthPercentageToDP(3),
      },
      greenContainer: {
        marginLeft: widthPercentageToDP(2),
        backgroundColor: theme.colors.transparentGreen,
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(0.5),
        borderRadius: widthPercentageToDP(0.8),
      },
      defaultText: {
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(2.5),
        color: theme.colors.primaryButton,
      },
      addressText: {
        marginTop: heightPercentageToDP(0.4),
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.45),
        color: theme.colors.grey700,
      },
      outerCircle:{
        paddingHorizontal:widthPercentageToDP(1.8),
        paddingVertical:heightPercentageToDP(0.9),
        borderRadius:widthPercentageToDP(50),
        borderColor:theme.colors.primaryButton,
        borderWidth:widthPercentageToDP(0.6)
      },
      innerCircle:{
        paddingHorizontal:widthPercentageToDP(1.4),
        paddingVertical:heightPercentageToDP(0.7),
        borderRadius:widthPercentageToDP(50),
        backgroundColor:theme.colors.primaryButton,
      }
    });
  return React.useMemo(() => styles(), []);
};
