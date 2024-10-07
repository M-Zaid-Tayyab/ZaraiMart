import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        paddingHorizontal: wp(3),
      },
      orderCardStyle: {
        marginTop: hp(2),
        backgroundColor: theme.colors.textViewBackground,
      },
      lineSeperator: {
        borderWidth: wp(0.15),
        borderColor: theme.colors.borderColor,
        marginTop: hp(2),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:theme.colors.textViewBackground,
        borderRadius:wp(2),
      },
      button: {
        marginTop:hp(35),
        alignSelf: 'center',
      },
      priceText: {
        marginTop: hp(0.6),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: wp(5.2),
      },
      
      priceContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        marginTop: hp(2),
        borderRadius: wp(3),
      },
      amountText: {
        color: theme.colors.grey700,
        fontFamily: theme.fonts.mediumFont,
        fontSize: wp(3.5),
      },
      totalText: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: wp(3.8),
      },
      input: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.8),
        borderRadius: wp(2),
        marginVertical: hp(3),
        color:theme.colors.primaryText,
        fontFamily: theme.fonts.regularFont,
        fontSize: wp(3.4),
      },
      expiryDateInput: {
        backgroundColor:theme.colors.textViewBackground,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.8),
        borderRadius: wp(2),
        marginVertical: hp(3),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.regularFont,
        fontSize: wp(3.4),
        width: wp(45),
      },
      cardInput: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        borderRadius: wp(3),
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.regularFont,
        fontSize: wp(3.4),
        width: wp(70),
      },
      icn: {
        height: hp(3),
        width: wp(6),
        marginLeft: wp(2),
      },
      spaceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
      },
      controller:{
        marginTop:hp(2)
      }
    });
  return React.useMemo(() => styles(), []);
};
