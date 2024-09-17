import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      view: {
        backgroundColor: theme.colors.background,
      },
      flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // width:widthPercentageToDP(35),
        marginTop:heightPercentageToDP(1)
      },
      cropImage: {
        borderRadius:widthPercentageToDP(6),
      },
      nameText: {
        marginTop:heightPercentageToDP(1),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(5.6),
      },
      priceText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(5.6),
        marginVertical:heightPercentageToDP(1)
      },
      icon: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(5),
      },
      seperatorIcon: {
        height: heightPercentageToDP(1.7),
        width: widthPercentageToDP(0.4),
        marginLeft:widthPercentageToDP(2)
      },
      ratingText: {
        fontFamily: theme.fonts.mediumFont,
        color: theme.colors.grey700,
        fontSize: widthPercentageToDP(3),
        marginLeft:widthPercentageToDP(1)
      },
      greenContainer:{
        paddingHorizontal:widthPercentageToDP(2.2),
        paddingVertical:heightPercentageToDP(0.6),
        borderWidth:widthPercentageToDP(0.27),
        borderRadius:widthPercentageToDP(2),
        borderColor:theme.colors.primaryButton,
        marginLeft:widthPercentageToDP(2)
      },
      soldText: {
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(2.5),
      },
    });
  return React.useMemo(() => styles(), []);
};
