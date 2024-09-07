import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.greyBackground,
      },
      subContainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      orderCardStyle: {
        marginTop: heightPercentageToDP(2),
      },
      modalView: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: widthPercentageToDP(3),
        width: widthPercentageToDP(100),
        borderTopStartRadius: widthPercentageToDP(10),
        borderTopEndRadius: widthPercentageToDP(10),
        paddingBottom: heightPercentageToDP(3),
        paddingTop: heightPercentageToDP(1),
        position: 'absolute',
        bottom: 0,
      },
      reviewHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.8),
        alignSelf: 'center',
      },
      secHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.8),
        alignSelf: 'center',
        marginTop:heightPercentageToDP(2),
      },
      lineSeperator: {
        borderWidth: widthPercentageToDP(0.15),
        borderColor: theme.colors.borderColor,
        marginTop: heightPercentageToDP(2),
      },
      topIndicator: {
        borderWidth: widthPercentageToDP(0.4),
        borderColor: theme.colors.greyDot,
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        marginBottom: heightPercentageToDP(2),
      },
      reviewSubHeading: {
        color: theme.colors.grey700,
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.5),
        marginVertical: heightPercentageToDP(1),
        alignSelf: 'center',
      },
      starImg:{
        width: widthPercentageToDP(6.2),
        height: heightPercentageToDP(3),
        marginRight: heightPercentageToDP(1),
      },
      rowContainer:{
        paddingTop:heightPercentageToDP(2),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
      cancelButton:{
        backgroundColor: theme.colors.transparentGreenBackground,
        width: widthPercentageToDP(33),
      },
      submitButton:{
        width: widthPercentageToDP(40),
      },
    });
  return React.useMemo(() => styles(), []);
};
