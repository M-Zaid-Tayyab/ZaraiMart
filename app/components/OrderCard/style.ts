import React from 'react';
import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      view: {
        borderRadius:widthPercentageToDP(4),
        paddingHorizontal:widthPercentageToDP(3),
        paddingVertical:heightPercentageToDP(2),
        backgroundColor:theme.colors.background,
      },
      flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      centerSpace: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      rowContainer: {
        flexDirection: 'row',
      },
      txtContainer: {
        flex: 1,
        marginLeft: heightPercentageToDP(2),
      },
      cropImage: {
        borderRadius: widthPercentageToDP(6),
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(14),
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4.6),
      },
      priceText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(4.4),
      },
      qtText: {
        fontFamily: theme.fonts.mediumFont,
        color: theme.colors.grey700,
        fontSize: widthPercentageToDP(3),
        marginVertical: heightPercentageToDP(0.7),
      },
      greenText:{
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.dullBlack,
        fontSize: widthPercentageToDP(3.7),
      },
      headingText: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.5),
      },
      sellerImg: {
        height: widthPercentageToDP(7),
        width: widthPercentageToDP(7),
        borderRadius: widthPercentageToDP(50),
        marginRight: widthPercentageToDP(1.5),
      },
      greenDot:{
        padding:widthPercentageToDP(2),
        borderRadius:widthPercentageToDP(100),
        backgroundColor:theme.colors.primaryButton
      },
      cancelImg: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sellerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:heightPercentageToDP(1)
      },
      statusText: {
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(3),
      },
      greenContainer: {
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(0.6),
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.transparentGreen,
      },
      buttonContainer: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(1),
        backgroundColor: theme.colors.primaryButton,
        borderRadius: widthPercentageToDP(6),
      },
      buttonText: {
        color: 'white',
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(3.1),
      },
      penContainer:{
        backgroundColor: theme.colors.primaryButton,
        paddingHorizontal: widthPercentageToDP(1.5),
        paddingVertical: widthPercentageToDP(1.5),
        borderRadius: widthPercentageToDP(1),
        justifyContent: 'center',
        alignItems: 'center',
      },
      pen:{
        width: widthPercentageToDP(3),
        height: heightPercentageToDP(1.5),
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
    });
  return React.useMemo(() => styles(), []);
};
