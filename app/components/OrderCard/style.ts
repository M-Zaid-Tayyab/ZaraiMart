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
      rowContainer: {
        flexDirection: 'row',
      },
      txtContainer: {
        flex: 1,
        marginLeft: heightPercentageToDP(2),
      },
      cropImage: {
        borderRadius: widthPercentageToDP(6),
        width: widthPercentageToDP(28),
        height: heightPercentageToDP(13),
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
        // color: theme.colors.dullBlack,
        fontSize: widthPercentageToDP(3.7),
      },
      headingText: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.5),
      },
      sellerImg: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
        borderRadius: widthPercentageToDP(50),
        marginRight: widthPercentageToDP(1.5),
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
    });
  return React.useMemo(() => styles(), []);
};
